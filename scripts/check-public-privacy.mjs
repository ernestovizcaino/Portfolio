import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

// Check both filenames and bytes, including client bundles, RSC payloads,
// metadata, source maps, and raw public assets. Do not scan private documents.
const forbidden = /pasa[\W_]*egel|pasa[\W_]*%65gel/i;
const roots = ["app", "components", "data", "lib", "public", ".next/static", ".next/server"];
const failures = [];
let checked = 0;

async function scan(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await scan(filename);
    } else if (entry.isFile()) {
      checked += 1;
      if (forbidden.test(filename) || forbidden.test((await readFile(filename)).toString("utf8"))) {
        failures.push(filename);
      }
    }
  }
}

for (const root of roots) await scan(root);
if (failures.length) {
  console.error("Privacy check failed in:", failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Privacy check passed: ${checked} source, public, and generated files checked.`);
}
