# Contributing

Contributions should make the specification clearer, more interoperable, or safer to implement.

## Before opening a pull request

1. Explain the robotics or data-pipeline use case.
2. State whether the change is backward compatible.
3. Update the JSON Schema, synthetic example, metadata dictionary, and changelog together when semantics change.
4. Add or update validation coverage.
5. Do not include participant media, personal data, access credentials, client materials, or data whose redistribution rights are unclear.

## Schema-change rules

- Required fields, field types, and field semantics cannot change in a patch release.
- New optional fields belong in a minor release.
- Breaking changes require a major release and a migration note.
- Units, coordinate frames, timestamp bases, and controlled values must be explicit.
- Rights fields describe permissions; they must never infer permission from file availability.

Run `npm ci && npm run validate` before submitting.
