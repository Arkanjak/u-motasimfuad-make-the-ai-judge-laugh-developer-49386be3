// Make the AI Judge Laugh: Developer Excuses
// Writes one funny single-line developer excuse to /output/entry.txt.
// The entry is built from parts joined into a single line, then checked
// against the gate (UTF-8, 1-200 chars, not only whitespace, one line)
// before it is written. Deterministic: same bytes on every run.

import { mkdirSync, writeFileSync } from "node:fs";

// The setup: every check the code went through before production.
const SETUP = "My code passed review, CI, and QA";
// The twist: production is the one reviewer that actually reads code.
const PUNCHLINE = "production is the only reviewer that actually reads it";

function checkEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (!/\S/.test(text)) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  const text = `${SETUP}, but ${PUNCHLINE}.`.trim();
  checkEntry(text);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", text, "utf8");
  console.log(`wrote /output/entry.txt (${text.length} chars)`);
}

main();
