# Metadata Dictionary

This dictionary defines the minimum semantics carried by the EGXO example schema. Required means required by version 1.0.0. A production project can add optional fields, but it should not silently change the meaning, unit, clock, coordinate frame, or permission represented here.

## Record and release identity

| Field | Type | Required | Meaning and producer guidance |
| --- | --- | --- | --- |
| `schema_version` | string | Yes | Version of the episode schema used to validate the record. |
| `release.dataset_id` | string | Yes | Stable dataset identity across releases. |
| `release.release_id` | string | Yes | Unique immutable release identifier. |
| `release.release_version` | semver string | Yes | Version of the delivered dataset release. |
| `release.published_at` | ISO 8601 date-time | Yes | Release publication time in UTC. |
| `release.dataset_card_path` | path | Yes | Dataset card containing purpose, composition, risks, and intended use. |
| `release.manifest_path` | path | Yes | Manifest that enumerates episode records and assets. |
| `release.split` | enum or null | No | `train`, `validation`, `test`, `holdout`, or null when no split applies. |

## Episode identity and boundaries

| Field | Type | Required | Meaning and producer guidance |
| --- | --- | --- | --- |
| `episode.episode_id` | string | Yes | Stable episode identifier within the dataset. |
| `episode.session_id` | string | Yes | Capture session containing one or more takes or episodes. |
| `episode.take_id` | string | Yes | Raw or curated take from which the episode was derived. |
| `episode.started_at` | ISO 8601 date-time | Yes | Wall-clock start used for audit and lineage, not frame alignment. |
| `episode.ended_at` | ISO 8601 date-time | Yes | Wall-clock end used for audit and lineage. |
| `episode.duration_ns` | integer, ns | Yes | Episode duration in nanoseconds. |
| `episode.outcome` | enum | Yes | `success`, `partial_success`, `failure`, or `aborted`. |
| `episode.terminal_reason` | string | Yes | Observable reason the episode ended. |
| `episode.parent_episode_id` | string or null | No | Source episode when the record is a clip or derived view. |

## Task and environment

| Field | Type | Required | Meaning and producer guidance |
| --- | --- | --- | --- |
| `task.task_id` | string | Yes | Stable task definition identifier. |
| `task.name` | string | Yes | Human-readable task name. |
| `task.instruction` | string | Yes | Instruction given to the contributor or execution system. |
| `task.start_condition` | string | Yes | Observable state that marks the start boundary. |
| `task.terminal_condition` | string | Yes | Observable state that marks completion. |
| `task.environment.setting_type` | enum | Yes | Home, workplace, laboratory, simulated, or other. |
| `task.environment.workspace_id` | string | Yes | Pseudonymous physical or simulated workspace identifier. |
| `task.environment.lighting` | string | Yes | Operational lighting description or controlled value. |
| `task.environment.clutter_level` | enum | Yes | Low, moderate, or high clutter under a project-defined rubric. |
| `task.objects` | string array | Yes | Objects and tools required to interpret task coverage. |
| `task.critical_actions` | string array | Yes | Actions that must be visible or measurable for acceptance. |

## Capture context

| Field | Type | Required | Meaning and producer guidance |
| --- | --- | --- | --- |
| `capture.contributor_id` | string | Yes | Pseudonymous or minimized contributor key. Do not store unnecessary direct identifiers. |
| `capture.collection_protocol_version` | semver string | Yes | Exact protocol version followed during capture. |
| `capture.capture_device_id` | string | Yes | Device or rig identifier used to resolve calibration and hardware history. |
| `capture.viewpoint` | enum | Yes | Egocentric, exocentric, or synchronized ego-exo. |
| `capture.mount` | enum | Yes | Head, glasses, chest, shoulder, wrist, handheld, robot, fixed external, or other. |
| `capture.site_id` | string | Yes | Minimized collection site identifier. |
| `capture.locale` | string or null | No | Locale only at a privacy-approved granularity. |

## RGB stream

| Field | Type | Required | Unit or meaning |
| --- | --- | --- | --- |
| `streams.rgb[].stream_id` | string | Yes | Stable stream identifier. |
| `streams.rgb[].file.path` | path | Yes | Release-relative media path. |
| `streams.rgb[].file.sha256` | hex string | Yes | SHA-256 checksum of the delivered file. |
| `streams.rgb[].file.byte_size` | integer | Yes | File size in bytes. |
| `streams.rgb[].codec` | string | Yes | Encoded video codec such as H.264 or AV1. |
| `streams.rgb[].container` | string | Yes | Container such as MP4 or Matroska. |
| `streams.rgb[].width_px` | integer | Yes | Encoded frame width in pixels. |
| `streams.rgb[].height_px` | integer | Yes | Encoded frame height in pixels. |
| `streams.rgb[].nominal_fps` | number | Yes | Intended frame rate. Per-frame timestamps remain authoritative. |
| `streams.rgb[].frame_count` | integer | Yes | Number of decodable delivered frames. |
| `streams.rgb[].clock_id` | string | Yes | Clock domain used by frame timestamps. |
| `streams.rgb[].timestamp_file` | file record | Yes | Per-frame timestamps and checksum. |
| `streams.rgb[].first_timestamp_ns` | integer | Yes | First timestamp in the stream clock domain. |
| `streams.rgb[].last_timestamp_ns` | integer | Yes | Last timestamp in the stream clock domain. |
| `streams.rgb[].color_space` | string | Yes | Color space needed for consistent decode and preprocessing. |
| `streams.rgb[].camera_intrinsics_path` | path or null | No | Camera matrix and lens parameters. |
| `streams.rgb[].distortion_model` | string or null | No | Named distortion model used with the intrinsics. |

## IMU stream

| Field | Type | Required | Unit or meaning |
| --- | --- | --- | --- |
| `streams.imu[].stream_id` | string | Yes | Stable stream identifier. |
| `streams.imu[].file` | file record | Yes | Sensor file path, checksum, and byte size. |
| `streams.imu[].format` | string | Yes | Tabular or binary serialization such as Parquet. |
| `streams.imu[].nominal_sample_rate_hz` | number | Yes | Intended sampling rate in hertz. Individual timestamps remain authoritative. |
| `streams.imu[].sample_count` | integer | Yes | Delivered sensor rows. |
| `streams.imu[].clock_id` | string | Yes | Clock domain used by IMU timestamps. |
| `streams.imu[].timestamp_field` | string | Yes | Column holding the sample timestamp. |
| `streams.imu[].timestamp_unit` | constant | Yes | Nanoseconds in version 1.0.0. |
| `streams.imu[].accelerometer_fields` | 3 strings | Yes | Ordered x, y, z linear-acceleration fields. |
| `streams.imu[].accelerometer_unit` | constant | Yes | Metres per second squared (`m/s^2`). |
| `streams.imu[].gyroscope_fields` | 3 strings | Yes | Ordered x, y, z angular-velocity fields. |
| `streams.imu[].gyroscope_unit` | constant | Yes | Radians per second (`rad/s`). |
| `streams.imu[].magnetometer_fields` | array or null | No | Magnetic-field axes when captured and calibrated. |
| `streams.imu[].coordinate_frame` | string | Yes | Axis orientation and handedness. |
| `streams.imu[].sensor_to_camera_transform_path` | path or null | No | Rigid transform from IMU frame to camera frame. |
| `streams.imu[].calibration_version` | string | Yes | Version of bias, scale, alignment, and transform calibration. |

## Synchronization

| Field | Type | Required | Unit or meaning |
| --- | --- | --- | --- |
| `synchronization.reference_clock_id` | string | Yes | Clock domain to which other streams are mapped. |
| `synchronization.timestamp_unit` | constant | Yes | Nanoseconds in version 1.0.0. |
| `synchronization.rgb_clock_id` | string | Yes | RGB timestamp clock. Must match the referenced RGB stream. |
| `synchronization.imu_clock_id` | string | Yes | IMU timestamp clock. Must match the referenced IMU stream. |
| `synchronization.imu_to_rgb_offset_ns` | signed integer, ns | Yes | Offset added to IMU timestamps to map them to RGB time. |
| `synchronization.estimated_drift_ppm` | number, ppm | Yes | Estimated relative clock-rate error. |
| `synchronization.drift_correction_model` | enum | No | None, constant offset, linear, piecewise linear, or other. |
| `synchronization.interpolation_policy` | enum | Yes | None, nearest, linear, or spherical linear. |
| `synchronization.maximum_alignment_error_ms` | number, ms | Yes | Maximum residual error after correction. |
| `synchronization.missing_sample_policy` | enum | No | Reject, mark gap, bounded interpolation, or other. |
| `synchronization.validation_method` | string | Yes | How offset and drift were estimated and checked. |
| `synchronization.validation_result` | enum | Yes | Pass, fail, or not evaluated. |

## Annotation records

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `annotations.specification_version` | semver string | Yes | Annotation instructions and label semantics used. |
| `annotations.ontology_version` | string | Yes | Versioned label set. |
| `annotations.segments[]` | array | Yes | Temporal segments with stable IDs, labels, bounds, confidence, and review status. |
| `annotations.hand_object_events_path` | path or null | No | Contact, grasp, release, and object-state events. |
| `annotations.pose_path` | path or null | No | Body, hand, object, or camera pose records with stated coordinate frames. |
| `annotations.language_path` | path or null | No | Instructions, narrations, summaries, or question-answer records. |

## Quality and acceptance

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `quality.automated_checks[]` | array | Yes | Named checks with category, result, measured value, threshold, and policy version. |
| `quality.manual_review` | object | Yes | Pseudonymous reviewer, review time, and result. |
| `quality.critical_action_visibility_rate` | number, 0-1 | Yes | Project-defined fraction of critical actions meeting visibility criteria. |
| `quality.acceptance_status` | enum | Yes | Accepted, rejected, quarantined, or needs rework. |
| `quality.rejection_reasons` | string array | Yes | Explicit reasons for non-acceptance. Empty only when accepted. |

## Rights and privacy

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `rights.rights_record_id` | string | Yes | Link to the auditable rights record. |
| `rights.consent_or_legal_basis` | string | Yes | Basis for capture and processing. This is not a proxy for every downstream permission. |
| `rights.media_license` | string | Yes | License or contract governing media. |
| `rights.metadata_license` | string | Yes | License or contract governing metadata and labels. |
| `rights.model_training_permission` | enum | Yes | Permitted, prohibited, not applicable, or requires separate approval. |
| `rights.commercial_use_permission` | enum | Yes | Separate commercial-use decision. |
| `rights.redistribution_permission` | enum | Yes | Separate redistribution decision. |
| `rights.derived_model_permission` | enum | Yes | Separate decision for trained or derived models. |
| `rights.retention_policy_id` | string | Yes | Retention and deletion schedule. |
| `rights.privacy_review_status` | enum | Yes | Pass, fail, pending, or not applicable. |
| `rights.redactions_applied` | string array | No | Applied face, screen, audio, document, or identifier redactions. |
| `rights.restrictions` | string array | No | Geographic, purpose, vendor, access, export, or display restrictions. |
| `rights.release_eligibility` | enum | Yes | Eligible, ineligible, conditional, or pending. |

## Provenance and lineage

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `provenance.source_session_id` | string | Yes | Source session used to produce the record. |
| `provenance.collection_protocol_version` | semver string | Yes | Collection protocol version. |
| `provenance.annotation_specification_version` | semver string | Yes | Annotation specification version. |
| `provenance.qa_policy_version` | semver string | Yes | Acceptance policy version. |
| `provenance.transformations[]` | array | Yes | Ordered transformation name, tool, version, parameters, and time. |
| `provenance.record_created_at` | ISO 8601 date-time | Yes | First creation time for this metadata record. |
| `provenance.record_updated_at` | ISO 8601 date-time | Yes | Last material update time. |
| `provenance.lineage_record_path` | path | Yes | Release-relative path to the detailed lineage record. |

## Null and missing-value policy

Use `null` only when the schema explicitly allows it and the field does not apply or is unavailable under an accepted policy. Do not use empty strings, magic numbers, or zero vectors to mean unknown. A required field that cannot be produced should fail validation or trigger an explicit project-approved exception.
