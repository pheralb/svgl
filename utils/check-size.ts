import { readdir, stat } from "fs/promises";
import { join } from "path";

// ⚙️ Settings:
const dir = join(process.cwd(), "static", "library");
const sizeLimit = 21 * 1024; // 21 KB

function convertBytes(bytes: number, format: "KB" | "MB" = "KB"): string {
  if (format === "KB") {
    return (bytes / 1024).toFixed(2) + " KB";
  } else if (format === "MB") {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  } else {
    return 'Invalid format. Use "KB" or "MB".';
  }
}

async function checkSize(): Promise<void> {
  const files = await readdir(dir);
  let maxSize = 0;
  const maxFiles: { filename: string; size: string }[] = [];

  try {
    for (const file of files) {
      const filePath = join(dir, file);
      const stats = await stat(filePath);

      if (stats.size >= sizeLimit) {
        maxFiles.push({
          filename: file,
          size: convertBytes(stats.size),
        });

        if (stats.size > maxSize) {
          maxSize = stats.size;
        }
      }
    }

    if (maxFiles.length === 0) {
      console.log(`✅ All files are smaller than ${convertBytes(sizeLimit)}.`);
    } else {
      const message = `❌ There are files bigger than ${convertBytes(sizeLimit)}.`;
      throw new Error(message);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("❌ Unexpected error:", error);
    }
    throw error;
  } finally {
    if (maxFiles.length > 0) {
      console.log("🔎 Files found:");
      console.table(maxFiles);
    }

    console.log("⚙️ Settings:");
    console.log(`- 📁 Directory: ${dir}`);
    console.log(`- 🧱 Size limit: ${convertBytes(sizeLimit)}`);
    if (maxSize > 0) {
      console.log(`- 🔔 Max size found: ${convertBytes(maxSize)}`);
    }
  }
}

// Run the function
checkSize();
