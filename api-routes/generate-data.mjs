import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = resolve(__dirname, "src/data");

/** @type {Record<string, string>} output filename → source path */
const FILES = {
  "extensions.ts": "../src/data/extensions.ts",
  "index.ts": "../src/data/index.ts",
  "svgs.ts": "../src/data/svgs.ts",
  "types/categories.ts": "../src/types/categories.ts",
  "types/svg.ts": "../src/types/svg.ts",
  "types/extensions.ts": "../src/types/extensions.ts",
};

const formatDate = (date) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

async function generate() {
  await rm(OUTPUT_DIR, { recursive: true, force: true });
  await mkdir(OUTPUT_DIR, { recursive: true });

  for (const [outFile, srcFile] of Object.entries(FILES)) {
    const srcPath = resolve(__dirname, srcFile);
    const outPath = resolve(OUTPUT_DIR, outFile);

    await mkdir(dirname(outPath), { recursive: true });
    const content = await readFile(srcPath, "utf-8");
    const updated = content
      .replaceAll("@/data/", "../data/")
      .replaceAll("@/", "../data/");
    await writeFile(outPath, updated, "utf-8");
    const currentTime = formatDate(new Date());
    console.log(`✓ ${outFile} (updated at ${currentTime})`);
  }
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
