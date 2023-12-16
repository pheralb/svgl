import { readdir, stat } from 'fs/promises';
import { join } from 'path';

// 🔎 Settings:
const dir = '../static/library';
const sizeLimit = 20000; // 20kb;

function convertBytes(bytes, format = 'KB') {
  if (format === 'KB') {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else if (format === 'MB') {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  } else {
    return 'Formato no válido. Utilice "KB" o "MB".';
  }
}

export async function checkSize() {
  const files = await readdir(dir);
  let maxSize = 0;
  let maxFiles = [];

  try {
    for (const file of files) {
      const filePath = join(dir, file);
      const stats = await stat(filePath);

      if (stats.size > maxSize) {
        maxSize = stats.size;
        maxFiles.push(file);
      }
    }

    if (maxFiles.length === 0) {
      console.log(`- ✅ All files are smaller than ${convertBytes(sizeLimit)}`);
    } else {
      throw new Error(
        `The following files are bigger than ${convertBytes(sizeLimit)}: ${maxFiles.join(', ')}`
      );
    }
  } catch (err) {
    console.error(`- ❌ ${err.message}`);
  } finally {
    console.log(`- 📁 Directory: ${dir}`);
    console.log(`- 📏 Size limit: ${convertBytes(sizeLimit)} bytes`);
    console.log(`- 📏 Max size found: ${convertBytes(maxSize, 'MB')}`);
  }
}

// Run the function
checkSize();
