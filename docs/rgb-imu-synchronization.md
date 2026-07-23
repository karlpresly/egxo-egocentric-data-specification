# RGB and IMU Synchronization

RGB and IMU are synchronized when every video frame and motion-sensor sample can be placed on a common timeline with a measured error bound. Matching start times or recording both streams on one device is not enough.

## Why it matters

Video shows appearance, objects, hands, and scene change. An inertial measurement unit usually adds:

- accelerometer data for linear acceleration, including gravity
- gyroscope data for angular velocity
- optional magnetometer data for magnetic heading

A model or preprocessing system can combine these signals only when it knows which motion samples correspond to each frame. An unknown offset can pair a frame with motion from the wrong moment. Clock drift can make alignment look correct at the start and wrong at the end.

## The synchronization record

Version 1.0.0 requires:

- a reference clock
- the RGB and IMU clock identifiers
- timestamp unit
- signed IMU-to-RGB offset
- estimated drift in parts per million
- correction model
- interpolation policy
- maximum residual alignment error
- missing-sample policy
- validation method and result

The signed offset uses this convention:

```text
rgb_time_ns = imu_time_ns + imu_to_rgb_offset_ns
```

Store the convention next to the value. An offset without direction is ambiguous.

## Capture clocks, not file times

Filesystem creation time, MP4 modification time, upload time, and wall-clock start time are audit metadata. They are not a reliable synchronization timeline.

Use device or monotonic timestamps close to sensor acquisition. For video, preserve per-frame presentation or capture timestamps. For IMU, preserve a timestamp per sample. Record the clock domain for each stream.

## Offset and drift

Two clocks can differ in two ways:

1. Offset: one clock starts ahead of or behind the other.
2. Drift: the clocks run at slightly different rates.

A constant offset can be sufficient for a short, hardware-synchronized take. Longer sessions or independent devices usually need drift estimation. A simple linear mapping is:

```text
rgb_time = a * imu_time + b
```

Here, `b` represents offset and `a` represents relative clock rate. Record the fitted model, estimation windows, residual error, and failure threshold.

## Interpolation

Video and IMU usually run at different rates. A 30 fps video may be paired with 200 Hz IMU. A pipeline therefore needs a declared policy:

- `nearest`: select the closest sensor sample
- `linear`: interpolate scalar or vector measurements between neighboring samples
- `spherical_linear`: interpolate orientations represented as quaternions
- `none`: keep asynchronous records and let the consumer align them

Interpolation must not silently bridge long gaps. Set a maximum gap or reject the episode.

## Coordinate frames and calibration

Time alignment does not establish spatial alignment. The IMU axes and camera axes can point in different directions and have different origins.

Record:

- axis order
- handedness
- positive directions
- accelerometer and gyroscope units
- sensor-to-camera rigid transform when required
- bias, scale, and alignment calibration version

Do not call a stream synchronized and calibrated when only timestamps were matched.

## Validation methods

Choose a method that produces an observable correspondence across modalities. Examples include:

- hardware trigger or shared timestamp source
- visible device motion with a corresponding gyroscope peak
- a controlled synchronization gesture at the start and end
- repeated cross-correlation checks across the episode
- device-provided synchronization telemetry verified against raw samples

Validate both ends of a take when drift is possible. Report the maximum or high-percentile residual error in milliseconds and the exact acceptance threshold.

## Acceptance questions

- Are per-frame RGB timestamps present?
- Does every IMU row have a sensor timestamp?
- Are both clock domains named?
- Is the offset direction explicit?
- Was drift estimated over the full take?
- Is interpolation bounded across missing samples?
- Are IMU units and axes documented?
- Is spatial calibration versioned?
- Does the measured residual error satisfy the model-facing threshold?
- Can the buyer reproduce the mapping from raw timestamps?

The required threshold is project-specific. A package should state the number and the reason, not claim a universal synchronization tolerance.
