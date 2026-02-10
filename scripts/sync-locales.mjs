import fs from "node:fs/promises";
import path from "node:path";

const LOCALES_DIR = path.join(process.cwd(), "locales");
const SOURCE_LOCALE = "ar.json";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function typeTag(value) {
  if (Array.isArray(value)) return "array";
  if (isPlainObject(value)) return "object";
  if (value === null) return "null";
  return typeof value;
}

function mergeArIntoTarget(source, target) {
  const sourceTag = typeTag(source);
  const targetTag = typeTag(target);

  if (sourceTag === "object") {
    const targetObj = targetTag === "object" ? target : {};
    const out = {};

    for (const key of Object.keys(source)) {
      if (Object.prototype.hasOwnProperty.call(targetObj, key)) {
        out[key] = mergeArIntoTarget(source[key], targetObj[key]);
      } else {
        out[key] = source[key];
      }
    }

    for (const key of Object.keys(targetObj)) {
      if (!Object.prototype.hasOwnProperty.call(source, key)) {
        out[key] = targetObj[key];
      }
    }

    return out;
  }

  if (sourceTag === "array") {
    return targetTag === "array" ? target : source;
  }

  if (target === undefined) return source;
  if (sourceTag !== targetTag) return source;
  return target;
}

function countMissingKeys(source, target) {
  if (!isPlainObject(source)) return 0;
  const targetObj = isPlainObject(target) ? target : {};
  let missing = 0;
  for (const key of Object.keys(source)) {
    if (!Object.prototype.hasOwnProperty.call(targetObj, key)) {
      missing += 1;
      continue;
    }
    missing += countMissingKeys(source[key], targetObj[key]);
  }
  return missing;
}

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function main() {
  const sourcePath = path.join(LOCALES_DIR, SOURCE_LOCALE);
  const source = await readJson(sourcePath);

  const entries = await fs.readdir(LOCALES_DIR);
  const targets = entries.filter(
    (f) => f.endsWith(".json") && f !== SOURCE_LOCALE,
  );

  let updated = 0;
  for (const filename of targets) {
    const filePath = path.join(LOCALES_DIR, filename);
    const beforeRaw = await fs.readFile(filePath, "utf8");
    const beforeJson = JSON.parse(beforeRaw);

    const missingBefore = countMissingKeys(source, beforeJson);
    const afterJson = mergeArIntoTarget(source, beforeJson);
    const afterRaw = `${JSON.stringify(afterJson, null, 2)}\n`;

    if (afterRaw !== beforeRaw) {
      await fs.writeFile(filePath, afterRaw, "utf8");
      updated += 1;
    }

    // eslint-disable-next-line no-console
    console.log(
      `${filename}: missingKeysBefore=${missingBefore}, rewritten=${afterRaw !== beforeRaw}`,
    );
  }

  // eslint-disable-next-line no-console
  console.log(
    `Done. Updated ${updated}/${targets.length} locale files based on ${SOURCE_LOCALE}.`,
  );
}

await main();
