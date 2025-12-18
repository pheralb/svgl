import type { iSVG } from "../src/types/svg";

import fs from "fs";
import path from "path";
import chalk from "chalk";
import { execSync } from "child_process";

import { svgs } from "../src/data/svgs";
import { optimizeSvg } from "../src/utils/optimizeSvg";
import { parseSvgFilename } from "../src/utils/parseSvgFilename";
import { parseReactSvgContent } from "../src/utils/parseReactSvgContent";

// ⚙️ Settings:
const REGENERATE_ALL = true;
const SVGS_DATA = svgs;
const PUBLIC_FOLDER = "static";
const SHADCN_COMMAND = "shadcn build --output ./static/r";
const OUTPUT_DIR = "./static/components-generated";

// 🛠️ Shadcn Schema:
interface RegistryFile {
  path: string;
  type: string;
  target: string;
}

interface RegistryItem {
  name: string;
  type: string;
  title: string;
  files: RegistryFile[];
}

interface ShadcnSchema {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
}

const shadcnSchema: ShadcnSchema = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "svgl",
  homepage: "https://svgl.app",
  items: [],
};

// Logging:
const logTitle = (message: string) => {
  return console.log(chalk.yellow(`\n|- ${message}`));
};

const logSuccess = (message: string) => {
  return console.log(chalk.green(`${message}`));
};

const logError = (message: string) => {
  return console.log(chalk.red(`${message}`));
};

// 🧑‍🚀 Function to prepare registry.json content:
function prepareRegistryJson(): ShadcnSchema {
  const registryItems: RegistryItem[] = [];

  logTitle("Building registry.json...");

  SVGS_DATA.forEach((svg) => {
    if (!REGENERATE_ALL) return;
    const componentName = svg.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const files: RegistryFile[] = [];

    const svgPaths = extractSvgPaths(svg);

    svgPaths.forEach((svgFile) => {
      const tsxComponentName = parseSvgFilename({
        file: svgFile.filename,
        log: false,
      });
      files.push({
        path: `./${OUTPUT_DIR}/${tsxComponentName}.tsx`,
        type: "registry:component",
        target: `components/ui/svgs/${tsxComponentName}.tsx`,
      });
    });

    if (files.length > 0) {
      registryItems.push({
        name: componentName,
        type: "registry:component",
        title: componentName,
        files: files,
      });
    }
  });

  return {
    ...shadcnSchema,
    items: registryItems,
  };
}

// 🧑‍🚀 Function to generate registry.json:
async function generateRegistryJson(): Promise<void> {
  try {
    const registryContent = prepareRegistryJson();
    const registryPath = "./registry.json";

    await fs.promises.writeFile(
      registryPath,
      JSON.stringify(registryContent, null, 2),
      "utf-8",
    );

    logSuccess("[✅] registry.json generated successfully");
  } catch (error) {
    logError(`[❌] Error generating registry.json: ${error}`);
    throw new Error(error as string);
  }
}

// 🧑‍🚀 Utility functions for extracting SVG paths:
function extractSvgPaths(svg: iSVG): { path: string; filename: string }[] {
  const paths: { path: string; filename: string }[] = [];

  if (typeof svg.route === "string") {
    paths.push({
      path: svg.route,
      filename: svg.route.split("/").pop() || "",
    });
  } else if (
    typeof svg.route === "object" &&
    svg.route.light &&
    svg.route.dark
  ) {
    paths.push(
      {
        path: svg.route.light,
        filename: svg.route.light.split("/").pop() || "",
      },
      {
        path: svg.route.dark,
        filename: svg.route.dark.split("/").pop() || "",
      },
    );
  }

  if (svg.wordmark) {
    if (typeof svg.wordmark === "string") {
      paths.push({
        path: svg.wordmark,
        filename: svg.wordmark.split("/").pop() || "",
      });
    } else if (
      typeof svg.wordmark === "object" &&
      svg.wordmark.light &&
      svg.wordmark.dark
    ) {
      paths.push(
        {
          path: svg.wordmark.light,
          filename: svg.wordmark.light.split("/").pop() || "",
        },
        {
          path: svg.wordmark.dark,
          filename: svg.wordmark.dark.split("/").pop() || "",
        },
      );
    }
  }

  return paths;
}

function getAllSvgFiles(): { path: string; filename: string }[] {
  const allPaths: { path: string; filename: string }[] = [];

  SVGS_DATA.forEach((svg) => {
    const paths = extractSvgPaths(svg);
    allPaths.push(...paths);
  });

  const uniquePaths = allPaths.filter(
    (path, index, self) =>
      index === self.findIndex((p) => p.filename === path.filename),
  );

  return uniquePaths;
}

function convertToFilesystemPath(svgPath: string): string {
  const cleanPath = svgPath.startsWith("/") ? svgPath.slice(1) : svgPath;
  return `./${PUBLIC_FOLDER}/${cleanPath}`;
}

async function convertSvgToReact(svgPath: string): Promise<string> {
  const rawSvg = await fs.promises.readFile(svgPath, "utf-8");
  const optimizedSvg = optimizeSvg({ svgCode: rawSvg });
  const componentName = parseSvgFilename({
    file: path.basename(svgPath, ".svg"),
    log: true,
    firstUpperCase: true,
  });
  const code = await parseReactSvgContent({
    componentName,
    svgCode: optimizedSvg,
    typescript: true,
  });
  return code;
}

async function cleanupDirectory(dirPath: string) {
  try {
    if (
      await fs.promises
        .access(dirPath)
        .then(() => true)
        .catch(() => false)
    ) {
      await fs.promises.rm(dirPath, { recursive: true, force: true });
      logSuccess(`[✅] Folder ${dirPath} deleted successfully`);
    }
  } catch (error) {
    logError(`[❌] Could not delete folder ${dirPath}: ${error}`);
  }
}

async function runShadcnBuild() {
  try {
    logTitle("Running shadcn build command...");
    execSync(SHADCN_COMMAND, { stdio: "inherit" });
  } catch (error) {
    logError(`Error running shadcn build: ${error}`);
    throw new Error(error as string);
  }
}

const checkFinallyDirs = async () => {
  logTitle("Checking final directories and files...");

  const rDirExists = await fs.promises
    .access(`./${PUBLIC_FOLDER}/r`)
    .then(() => true)
    .catch(() => false);

  if (!rDirExists) {
    logError("[❌] Error - Directory ./static/r does not exist");
    return;
  } else {
    logSuccess("[✅] Directory ./static/r exists");
  }

  // Check if registry.json exists
  const registryExists = await fs.promises
    .access("./registry.json")
    .then(() => true)
    .catch(() => false);

  if (!registryExists) {
    logError("[❌] Error - File registry.json does not exist");
    return;
  } else {
    logSuccess("[✅] File registry.json exists");
  }
};

async function run() {
  let convertedCount = 0;
  let totalCount = 0;

  console.log(chalk.blueBright("\n🚀 Generating shadcn/ui Registry"));

  try {
    await fs.promises.mkdir(OUTPUT_DIR, { recursive: true });

    const svgFiles = REGENERATE_ALL
      ? getAllSvgFiles()
      : getAllSvgFiles().filter((svgFile) => {
          const svgObj = SVGS_DATA.find((svg) => {
            const paths = extractSvgPaths(svg);
            return paths.some((p) => p.filename === svgFile.filename);
          });
          return svgObj && !svgObj.shadcnCommand;
        });
    totalCount = svgFiles.length;

    if (totalCount === 0) {
      logError("[❌] No SVG files found in SVGS_DATA.");
      return;
    }

    logTitle("Converting SVGs to React components...");

    // Process files
    for (const svgFile of svgFiles) {
      try {
        const filesystemPath = convertToFilesystemPath(svgFile.path);

        // Check if file exists before processing
        const fileExists = await fs.promises
          .access(filesystemPath)
          .then(() => true)
          .catch(() => false);

        if (!fileExists) {
          console.error(`\n[⚠️] File not found: ${filesystemPath}`);
          continue;
        }

        const tsx = await convertSvgToReact(filesystemPath);
        const outPath = path.join(
          OUTPUT_DIR,
          parseSvgFilename({ file: svgFile.filename, log: false }) + ".tsx",
        );
        await fs.promises.writeFile(outPath, tsx, "utf-8");
        convertedCount++;
      } catch (error) {
        logError(`\n[❌] Error processing ${svgFile.filename}: ${error}`);
        throw new Error(error as string);
      }
    }
    logSuccess(
      `[✅] ${convertedCount}/${totalCount} SVGs converted successfully.`,
    );

    if (convertedCount < totalCount) {
      console.log(`[⚠️] ${totalCount - convertedCount} SVGs had errors.`);
    }

    if (convertedCount > 0) {
      await generateRegistryJson();
      await runShadcnBuild();
    }
  } catch (error) {
    logError(`❌ Process failed: ${error}`);
    throw new Error(error as string);
  } finally {
    await checkFinallyDirs();
    await cleanupDirectory(OUTPUT_DIR);
    logSuccess("\n 🎉 Process completed.");
  }
}

run();
