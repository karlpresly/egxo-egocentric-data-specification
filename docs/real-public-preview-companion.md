# Real Public-Preview Companion Record

The companion record ties this specification to one real EGXO public preview without pretending that the preview contains modalities, permissions, or production records that were not supplied.

Record: [`examples/real-public-preview-companion.json`](../examples/real-public-preview-companion.json)

Canonical evidence JSON: https://egxodata.com/samples/evidence-dishwashing-object-cleaning.json

Public video preview: https://egxodata.com/samples/egxo-dishwashing-object-cleaning.mp4

Buyer-facing evidence panel: https://egxodata.com/#sample-evidence

## What is measured

The record is a byte-for-byte copy of the public evidence JSON published by EGXO Data. It carries:

- a 10.0-second egocentric dishwashing excerpt
- 960 by 540 encoded dimensions
- 24 frames per second
- H.264 video in an MP4 container
- YUV420p pixel format
- real video and poster byte sizes
- real SHA-256 checksums
- four reviewed temporal action phases
- technical-integrity, visual-selection, sanitization, and publication-approval records

The repository validator locks those facts and the source-record checksum so later changes require an explicit versioned release.

## What is not supplied

The GitHub repository does not include the media file. The `video_path` and `poster_path` values resolve on `egxodata.com`, not relative to this repository.

The public preview does not publish:

- IMU
- depth
- gaze
- audio
- per-frame timestamps
- camera intrinsics or distortion calibration
- sensor-to-camera transforms
- a complete training ontology
- a production consent artifact or buyer license

For that reason, the companion is not passed off as a complete instance of the EGXO episode schema. The fully synthetic example remains the schema-complete demonstration of RGB and IMU fields, synchronization, calibration, rights, provenance, and buyer-ingest states.

## Rights boundary

The metadata file is part of this repository and is covered by its CC BY 4.0 license.

The linked media is a public website preview. Public marketing and buyer distribution of the excerpt are approved. Model training and redistribution require a separate written license. The repository license does not expand those media permissions.

## Why both records exist

- The synthetic record demonstrates the complete machine contract without making unsupported claims.
- The real companion proves that the public package is connected to a measured EGXO sample.

Together they keep technical completeness and evidence provenance separate.
