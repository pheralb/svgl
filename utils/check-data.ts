import { readdir, unlink } from "fs/promises";
import { join } from "path";
import { readFileSync } from "fs";

// ⚙️ Settings:
const svgDir = join(process.cwd(), "static", "library");
const dataFile = join(process.cwd(), "src", "data", "svgs.ts");
const DELETE_UNUSED = false;

async function checkUnusedSVGs(): Promise<void> {
  try {
    const files = await readdir(svgDir);
    const svgFiles = files.filter((file) => file.endsWith(".svg"));
    const dataContent = readFileSync(dataFile, "utf-8");
    const unusedFiles: { filename: string; path: string }[] = [];

    for (const file of svgFiles) {
      if (!dataContent.includes(file)) {
        unusedFiles.push({
          filename: file,
          path: `/library/${file}`,
        });
      }
    }

    if (unusedFiles.length === 0) {
      console.log("✅ All SVG files are being used in data/svgs.ts");
    } else {
      console.log(
        `⚠️  Found ${unusedFiles.length}/${svgFiles.length} unused SVG file(s) in /static/library:`,
      );
      console.table(unusedFiles);

      if (DELETE_UNUSED) {
        console.log("\n🗑️  Deleting unused files...");
        let deletedCount = 0;

        for (const file of unusedFiles) {
          try {
            const filePath = join(svgDir, file.filename);
            await unlink(filePath);
            deletedCount++;
            console.log(`- Deleted: ${file.filename}`);
          } catch (error) {
            console.error(`- Error: failed to delete ${file.filename}:`, error);
          }
        }

        console.log(`\n✅ Successfully deleted ${deletedCount} file(s).`);
      } else {
        console.log(
          "\n💡 To delete these files, set DELETE_UNUSED = true in the script.",
        );
        throw new Error(
          `❌ Error: Found ${unusedFiles.length} unused SVG file(s). Please check the list above.`,
        );
      }
    }
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  }
}

checkUnusedSVGs();
