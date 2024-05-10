/* eslint-disable @typescript-eslint/no-var-requires */
const { readdir, stat } = require('fs').promises;
const { join } = require('path');

// For GitHub Actions:
const core = require('@actions/core');

// 🔎 Settings:
const dir = '../static/library';
const sizeLimit = 20000; // 20kb;

function convertBytes(bytes, format = 'KB') {
  if (format === 'KB') {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else if (format === 'MB') {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  } else {
    return 'Invalid format. Use "KB" or "MB".';
  }
}

async function checkSize() {
  const files = await readdir(dir);
  let maxSize = 0;
  let maxFiles = [];
  let message = '';

  try {
    for (const file of files) {
      const filePath = join(dir, file);
      const stats = await stat(filePath);

      if (stats.size >= sizeLimit) {
        maxFiles.push({
          filename: file,
          size: stats.size
        });
        if (stats.size > maxSize) {
          maxSize = stats.size;
        }
      }
    }

    if (maxFiles.length === 0) {
      message = `- ✅ All files are smaller than ${convertBytes(sizeLimit)}`;
      core.setOutput('message', message);
    } else {
      message = `- ❌ There are files bigger than ${convertBytes(sizeLimit)}.`;
      throw new Error(message);
    }
  } catch (err) {
    core.setFailed(message);
  } finally {
    if (maxFiles.length > 0) {
      console.log('🔎 Files found:');
      maxFiles.forEach((file) => {
        console.log(`- 📄 ${file.filename} - ${convertBytes(file.size, 'KB')}`);
      });
    }
    console.log('⚙️ Settings:');
    console.log(`- 📁 Directory: ${dir}`);
    console.log(`- 🧱 Size limit: ${convertBytes(sizeLimit)} bytes`);
    if (maxSize > 0) {
      console.log(`- 🔔 Max size found: ${convertBytes(maxSize, 'KB')}`);
    }
  }
}

// Run the function
checkSize();
