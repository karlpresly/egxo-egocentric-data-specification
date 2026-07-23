---
license: cc-by-4.0
pretty_name: EGXO Egocentric Data Specification and Metadata Schema
language:
  - en
tags:
  - robotics
  - egocentric-data
  - embodied-ai
  - physical-ai
  - imu
  - dataset-metadata
configs:
  - config_name: default
    data_files:
      - split: reference
        path: data/example-episode.jsonl
---

# EGXO Egocentric Data Specification and Metadata Schema

Version 1.0.3 is a machine-readable starting point for specifying egocentric robotics data before collection, annotation, or delivery begins.

The package turns a model-facing requirement into explicit fields for episodes, RGB and IMU streams, synchronization, annotations, quality gates, rights, provenance, and release lineage. It is designed for robotics teams, ML engineers, data operations, and procurement teams that need a shared data contract.

Canonical guide: [Egocentric Dataset Specification Template](https://egxodata.com/resources/egocentric-dataset-specification-template)

Commercial context: [Egocentric Data for Robotics and Physical AI](https://egxodata.com/egocentric-data)

## What is included

- [`schema/egxo-egocentric-episode.schema.json`](schema/egxo-egocentric-episode.schema.json): JSON Schema Draft 2020-12 episode contract
- [`examples/example-episode.json`](examples/example-episode.json): a fully synthetic example record
- [`data/example-episode.jsonl`](data/example-episode.jsonl): the same synthetic record in dataset-friendly JSONL
- [`examples/real-public-preview-companion.json`](examples/real-public-preview-companion.json): measured metadata, annotations, QA, and rights boundaries for one real RGB-only public preview
- [`docs/real-public-preview-companion.md`](docs/real-public-preview-companion.md): the companion record's evidence, modality, and licensing boundaries
- [`docs/metadata-dictionary.md`](docs/metadata-dictionary.md): field definitions, units, null behavior, and producer guidance
- [`docs/rgb-imu-synchronization.md`](docs/rgb-imu-synchronization.md): clocks, offsets, drift, interpolation, and validation
- [`docs/qa-checklist.md`](docs/qa-checklist.md): automated, human-review, rights, and ingest acceptance gates
- [`docs/rights-and-provenance.md`](docs/rights-and-provenance.md): permission boundaries and release lineage
- [`metadata/croissant.json`](metadata/croissant.json): MLCommons Croissant metadata for dataset discovery
- [`CITATION.cff`](CITATION.cff): citation metadata
- [`CHANGELOG.md`](CHANGELOG.md): versioned release notes

## Important scope boundary

This repository contains a specification, documentation, a synthetic schema-complete example, and a real public-preview companion metadata record. It contains no captured participant media and is not an off-the-shelf training dataset.

The CC BY 4.0 license applies to the contents of this repository. It does not grant rights to any EGXO media, client dataset, contributor recording, annotation corpus, or future dataset release. Collection consent, model-training permission, commercial use, redistribution, retention, and public display remain separate decisions for each dataset.

## Validate the example

Requirements:

- Node.js 20 or newer
- npm

```bash
npm ci
npm run validate
```

The validator checks the synthetic example against the JSON Schema, confirms the JSONL mirror matches it, and verifies the schema version carried by each record.

## Core record structure

```text
release
episode
task
capture
streams
  rgb
  imu
synchronization
annotations
quality
rights
provenance
```

The schema is intentionally explicit about four distinctions:

1. A file existing is not evidence that it is synchronized.
2. A recording being collected lawfully is not automatically permission for model training or redistribution.
3. A task label is not enough to define episode boundaries, outcomes, or failure handling.
4. A technically valid file is not accepted until visibility, privacy, annotation, and buyer-ingest checks pass.

## Versioning

The package follows semantic versioning:

- Patch: clarifications or non-breaking examples
- Minor: backward-compatible fields or controlled vocabularies
- Major: breaking field, type, required-property, or semantic changes

Every dataset release should store the exact `schema_version`, collection protocol version, annotation specification version, and QA policy version used to produce it.

## Use in a project

Start with the [canonical buyer guide](https://egxodata.com/resources/egocentric-dataset-specification-template), copy the schema into the proposed delivery package, and resolve each optional field against the target model and loader. A pilot should validate the hardest tasks, synchronization risk, privacy conditions, annotation choices, and end-to-end ingest before scale.

For a custom collection or data-pilot discussion, use the [EGXO project brief](https://egxodata.com/contact?source=public-specification).

## Citation

Use the repository citation control or copy the metadata in [`CITATION.cff`](CITATION.cff). A DOI will be added to the citation file and canonical guide after the first Zenodo archive is published.

## Contributing

Issues and pull requests are welcome for:

- unclear field semantics
- missing robotics-relevant metadata
- synchronization edge cases
- interoperability improvements
- rights and provenance ambiguities
- validation defects

See [`CONTRIBUTING.md`](CONTRIBUTING.md) before proposing a breaking schema change.
