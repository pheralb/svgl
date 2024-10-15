/* eslint-disable @typescript-eslint/no-unused-vars */

import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import core from '@actions/core';

// 🔎 Settings:
const dir = '../../static/library';
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
          size: convertBytes(stats.size)
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
  } catch (error) {
    core.setFailed(message);
  } finally {
    if (maxFiles.length > 0) {
      console.log('🔎 Files found:');
      console.table(maxFiles);
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
