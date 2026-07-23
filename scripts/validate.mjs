import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const schema = JSON.parse(
  fs.readFileSync(path.join(root, "schema/egxo-egocentric-episode.schema.json"), "utf8"),
);
const example = JSON.parse(
  fs.readFileSync(path.join(root, "examples/example-episode.json"), "utf8"),
);
const jsonlLines = fs
  .readFileSync(path.join(root, "data/example-episode.jsonl"), "utf8")
  .trim()
  .split("\n")
  .filter(Boolean);

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validate = ajv.compile(schema);

assert.equal(validate(example), true, ajv.errorsText(validate.errors, { separator: "\n" }));
assert.equal(jsonlLines.length, 1, "The public example JSONL must contain exactly one record.");
assert.deepEqual(JSON.parse(jsonlLines[0]), example, "JSON and JSONL examples must match.");
assert.equal(example.schema_version, schema.properties.schema_version.const);
assert.equal(example.release.release_version, example.schema_version);
assert.equal(example.capture.viewpoint, "egocentric");

const startedAt = Date.parse(example.episode.started_at);
const endedAt = Date.parse(example.episode.ended_at);
assert.equal(
  (endedAt - startedAt) * 1_000_000,
  example.episode.duration_ns,
  "Episode wall-clock bounds and duration_ns must agree.",
);

for (const segment of example.annotations.segments) {
  assert(segment.start_ns < segment.end_ns, `${segment.segment_id} has inverted bounds.`);
  assert(segment.end_ns <= example.episode.duration_ns, `${segment.segment_id} exceeds episode duration.`);
}

for (const rgb of example.streams.rgb) {
  assert.equal(rgb.clock_id, example.synchronization.rgb_clock_id);
  assert(rgb.first_timestamp_ns < rgb.last_timestamp_ns);
}

for (const imu of example.streams.imu) {
  assert.equal(imu.clock_id, example.synchronization.imu_clock_id);
}

assert.equal(example.rights.release_eligibility, "eligible");
assert.equal(example.quality.acceptance_status, "accepted");
assert.equal(example.rights.model_training_permission, "not_applicable");
assert.match(example.rights.media_license, /No media is included/);

console.log("Validated schema, synthetic JSON, JSONL mirror, clocks, episode bounds, QA, and rights.");
