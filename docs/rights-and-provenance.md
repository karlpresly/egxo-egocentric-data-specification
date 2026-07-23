# Rights and Provenance

Rights and provenance answer different questions.

- Rights state what collection, processing, training, commercial use, retention, redistribution, and display are permitted.
- Provenance states where an episode came from, which rules produced it, how it changed, who or what reviewed it, and which release contains it.

A production dataset needs both. Traceability does not create permission, and permission without traceability is difficult to audit.

## Permission is not one boolean

Keep these decisions separate:

1. Permission to record or generate the source material
2. Permission to process and annotate it
3. Permission to deliver it to a named buyer or class of buyers
4. Permission to use it for model training
5. Permission for commercial use
6. Permission to retain trained or derived models
7. Permission to let vendors or affiliates access it
8. Permission to redistribute the source data or metadata
9. Permission to display examples publicly
10. Requirements for deletion, withdrawal, geography, or purpose limitation

The schema records these as explicit states. `requires_separate_approval` is preferable to guessing.

## Availability is not a license

A file being downloadable, viewable, indexed, or technically ingestible is not evidence that it can be used for model training or redistributed. Store the governing license or contract record next to each release and make the release process fail closed when permission is absent, pending, or incompatible.

## Minimize personal data

Use pseudonymous contributor, reviewer, site, and device identifiers in delivery metadata. Direct contact details, identity documents, payment records, consent artifacts, and precise locations belong in access-controlled systems with retention and audit policies. The dataset manifest should link to rights records without reproducing unnecessary personal data.

## Record transformations

Every material transformation should record:

- sequence
- transformation name
- tool and version
- parameters or configuration hash
- time
- input and output identifiers or checksums
- reviewer or automated policy where applicable

Examples include trimming, transcoding, timestamp correction, redaction, de-identification, annotation, adjudication, filtering, split assignment, and export conversion.

## Version the rules, not just the files

An episode is interpreted through several contracts:

- collection protocol
- sensor and calibration specification
- annotation specification and ontology
- QA and acceptance policy
- rights policy
- delivery schema
- dataset release

Store the exact version of each. A changed definition of success, visibility, or permitted use is a material change even when the media bytes are identical.

## Recommended release gate

Before an episode enters an external delivery:

1. Verify media and metadata checksums.
2. Resolve the source session, contributor record, protocol, and transformations.
3. Confirm privacy review and required redactions.
4. Read the explicit training, commercial, derived-model, vendor-access, retention, and redistribution decisions.
5. Confirm restrictions are compatible with the proposed buyer and use.
6. Record release eligibility.
7. Run the buyer-facing ingest test.
8. Freeze the manifest, dataset card, rights summary, and release notes.

## Scope of this repository

The public CC BY 4.0 license applies to the EGXO specification, documentation, Croissant metadata, and synthetic example in this repository.

It does not grant rights to:

- EGXO capture media
- client datasets
- contributor recordings
- separate annotation corpora
- future dataset releases
- materials linked only as references

Those assets require their own auditable rights record and release decision.
