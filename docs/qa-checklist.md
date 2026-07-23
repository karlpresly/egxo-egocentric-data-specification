# Egocentric Episode QA Checklist

An episode is accepted only when media, metadata, synchronization, visibility, privacy, annotations, rights, and buyer ingest satisfy the written project policy. File validity alone is not acceptance.

## 1. Media integrity

- [ ] Every required file is present.
- [ ] SHA-256 checksums match the manifest.
- [ ] Containers and codecs decode in the approved loader.
- [ ] Frame dimensions, color space, and codec match the specification.
- [ ] Delivered frame count matches timestamp count.
- [ ] No unexpected truncation, corruption, duplicate take, or frozen segment is present.
- [ ] Audio and depth streams follow the same checks when required.

## 2. Metadata integrity

- [ ] The episode validates against the declared schema version.
- [ ] Dataset, release, session, take, episode, contributor, device, task, and site keys use the approved namespaces.
- [ ] Episode boundaries and duration are internally consistent.
- [ ] Required units, clocks, coordinate frames, and controlled values are explicit.
- [ ] Null values follow the documented null policy.
- [ ] Protocol, annotation, ontology, QA, calibration, and release versions are recorded.

## 3. RGB and IMU synchronization

- [ ] Per-frame RGB timestamps and per-sample IMU timestamps are present.
- [ ] RGB and IMU clock identifiers match the synchronization record.
- [ ] Offset sign and direction follow the declared convention.
- [ ] Drift is estimated when independent clocks or episode length make it material.
- [ ] Missing samples follow the approved rejection or bounded-interpolation policy.
- [ ] Residual alignment error is measured over the episode.
- [ ] Maximum alignment error satisfies the project threshold.
- [ ] IMU units, axes, and sensor-to-camera calibration are versioned.

## 4. Task execution and visibility

- [ ] Start and terminal conditions can be identified.
- [ ] Outcome and terminal reason agree with the recording.
- [ ] Every required critical action is visible under the project rubric.
- [ ] Hands, objects, tools, and relevant workspace regions meet coverage requirements.
- [ ] Occlusion, blur, exposure, framing, and motion stay within approved thresholds.
- [ ] Failure, retry, interruption, and recovery states are represented correctly.
- [ ] The contributor did not distort behavior to satisfy camera framing.

## 5. Annotation quality

- [ ] Annotation specification and ontology versions are present.
- [ ] Temporal segments fall within episode bounds.
- [ ] Labels, confidence values, and review status use the approved definitions.
- [ ] Hand-object events, pose, language, and state records are present when required.
- [ ] Agreement, adjudication, and rework rules were applied.
- [ ] Annotations required by the target loss or evaluation are loadable.

## 6. Privacy and sensitive content

- [ ] The recording occurred in an approved environment.
- [ ] Contributor and bystander handling follows the project policy.
- [ ] Screens, documents, faces, voices, addresses, and identifiers were reviewed where relevant.
- [ ] Required redactions were applied and recorded.
- [ ] Sensitive or prohibited content is absent, quarantined, or handled under the incident policy.
- [ ] Metadata does not expose unnecessary direct identifiers or precise locations.

## 7. Rights and permitted use

- [ ] A rights record is linked to the episode.
- [ ] The basis for capture and processing is documented.
- [ ] Media and metadata licenses are explicit.
- [ ] Model-training permission is explicit.
- [ ] Commercial-use, derived-model, redistribution, retention, and third-party access decisions are explicit.
- [ ] Restrictions and approval conditions are recorded.
- [ ] Release eligibility passed before delivery.

## 8. Provenance and release lineage

- [ ] Source session and take are traceable.
- [ ] Ordered transformations record tools, versions, parameters, and times.
- [ ] Original and delivered checksums are available under the project policy.
- [ ] Collection protocol, annotation specification, QA policy, and dataset release versions agree.
- [ ] The release note lists material changes and known limitations.

## 9. Buyer ingest

- [ ] The buyer loader can enumerate episodes and required streams.
- [ ] Media decodes and timestamps preserve episode boundaries.
- [ ] RGB and IMU alignment can be reproduced from delivered fields.
- [ ] Annotations map into the expected ontology and tensor or record structure.
- [ ] Representative batches can be constructed.
- [ ] Failure and null cases are handled as specified.
- [ ] The buyer records pass, fail, open issues, and approval for scale.

## Disposition

Record exactly one state:

- `accepted`: all required gates pass
- `needs_rework`: repair is allowed and specified
- `quarantined`: use is blocked pending investigation or approval
- `rejected`: the episode cannot enter the release

Never convert a warning into acceptance simply because a volume target is at risk.
