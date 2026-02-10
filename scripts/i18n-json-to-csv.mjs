import fs from "node:fs";
import path from "node:path";

function flattenJson(value, prefix = "", out = {}) {
  if (value === null || value === undefined) {
    if (prefix) out[prefix] = "";
    return out;
  }

  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean") {
    if (prefix) out[prefix] = String(value);
    return out;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      const nextPrefix = prefix ? `${prefix}.${index}` : String(index);
      flattenJson(item, nextPrefix, out);
    });
    return out;
  }

  if (t === "object") {
    for (const [k, v] of Object.entries(value)) {
      const nextPrefix = prefix ? `${prefix}.${k}` : k;
      flattenJson(v, nextPrefix, out);
    }
    return out;
  }

  if (prefix) out[prefix] = String(value);
  return out;
}

function csvEscape(text) {
  const s = String(text ?? "");
  // Always quote to keep Excel happy (commas/newlines/leading spaces)
  return `"${s.replace(/"/g, '""')}"`;
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function main() {
  const [inputPath, outputPath, langHeader = "ar"] = process.argv.slice(2);

  if (!inputPath || !outputPath) {
    console.error(
      "Usage: node scripts/i18n-json-to-csv.mjs <input.json> <output.csv> [langHeader]",
    );
    process.exit(1);
  }

  const raw = fs.readFileSync(inputPath, "utf8");
  const json = JSON.parse(raw);

  const flat = flattenJson(json);
  const keys = Object.keys(flat).sort((a, b) => a.localeCompare(b, "en"));

  const lines = [];
  lines.push(["key", langHeader].map(csvEscape).join(","));
  for (const key of keys) {
    lines.push([key, flat[key]].map(csvEscape).join(","));
  }

  // Add UTF-8 BOM for better Excel compatibility with Arabic.
  const bom = "\ufeff";
  const content = bom + lines.join("\n") + "\n";

  ensureDir(outputPath);
  fs.writeFileSync(outputPath, content, "utf8");

  console.log(`Wrote ${keys.length} rows to ${outputPath}`);
}

main();
