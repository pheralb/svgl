import { readdir, stat, readFile, writeFile } from "fs/promises";
import { join } from "path";

// ⚙️ Settings:
const dir = join(process.cwd(), "static", "library");
const fileType = ".svg";

async function fixViewbox(): Promise<void> {
  try {
    const files = await readdir(dir);

    let totalSVGs = 0;
    let fixedCount = 0;
    const fixedFiles: string[] = [];

    for (const file of files) {
      const filePath = join(dir, file);
      const fileStat = await stat(filePath);

      if (!fileStat.isFile() || !file.endsWith(fileType)) continue;

      totalSVGs++;

      const fileContent = await readFile(filePath, "utf-8");
      const viewBox = getViewBox(fileContent);
      const width = getWidth(fileContent);
      const height = getHeight(fileContent);

      if (!width || !height) {
        continue; // saltar archivos inválidos
      }

      if (!viewBox) {
        const newFileContent = fileContent.replace(
          "<svg",
          `<svg viewBox="0 0 ${width} ${height}"`,
        );
        await writeFile(filePath, newFileContent, "utf-8");
        fixedCount++;
        fixedFiles.push(file);
      }
    }

    console.table([{ "Total SVGs": totalSVGs, "Fixed SVGs:": fixedCount }]);

    if (fixedFiles.length > 0) {
      console.table(fixedFiles.map((f) => ({ "Fixed SVG:": f })));
    }

    console.log("🚀 Done.");
  } catch (error) {
    console.error("❌ Error while processing files:", error);
  }
}

function getViewBox(content: string): string | null {
  const viewBoxRegex = /viewBox="([^"]+)"/;
  return viewBoxRegex.exec(content)?.[1] ?? null;
}

function getWidth(content: string): string | null {
  const widthRegex = /width="([^"]+)"/;
  return widthRegex.exec(content)?.[1] ?? null;
}

function getHeight(content: string): string | null {
  const heightRegex = /height="([^"]+)"/;
  return heightRegex.exec(content)?.[1] ?? null;
}

fixViewbox();
