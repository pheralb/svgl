/* eslint-disable @typescript-eslint/no-var-requires */
const { readdir, stat } = require('fs').promises;
const { readFile, writeFile } = require('fs/promises');
const { join } = require('path');

// 🔎 Settings:
const dir = '../static/library';

async function fixViewbox() {
  const files = await readdir(dir);
  const fileType = 'svg';
  let message = '';

  for (const file of files) {
    const filePath = join(dir, file);
    const fileStat = await stat(filePath);
    if (fileStat.isFile() && file.endsWith(fileType)) {
      const fileContent = await readFile(filePath);
      const viewBox = getViewBox(fileContent);
      const width = getWidth(fileContent);
      const height = getHeight(fileContent);
      if (!viewBox) {
        const newFileContent = fileContent
          .toString()
          .replace('<svg', `<svg viewBox="0 0 ${width} ${height}"`);
        await writeFile(filePath, newFileContent);
        message = `🔔 File ${file} has been fixed.`;
        console.log(message);
      } else {
        message = `✅ File ${file} has already a viewBox.`;
        console.log(message);
      }
    } else {
      message = `❌ File ${file} is not a ${fileType} file.`;
      console.log(message);
    }
  }

  // Log the result:
  console.log('🚀 Done.');
}

function getViewBox(fileContent) {
  const viewBoxRegex = /viewBox="(.+?)"/;
  const viewBox = viewBoxRegex.exec(fileContent);
  return viewBox ? viewBox[1] : null;
}

function getWidth(fileContent) {
  const widthRegex = /width="(.+?)"/;
  const width = widthRegex.exec(fileContent);
  return width ? width[1] : null;
}

function getHeight(fileContent) {
  const heightRegex = /height="(.+?)"/;
  const height = heightRegex.exec(fileContent);
  return height ? height[1] : null;
}

// Run the function
fixViewbox();
