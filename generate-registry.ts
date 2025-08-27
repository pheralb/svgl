import type { iSVG } from "./src/types/svg";

import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

import { svgs } from "./src/data/svgs";
import { optimizeSvg } from "./src/utils/optimizeSvg";
import { parseReactSvgContent } from "./src/utils/parseReactSvgContent";

const execAsync = promisify(exec);

// ⚙️ Settings:
const MINIFY_TSX = false;
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
  registryDependencies: string[];
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

// 🧑‍🚀 Function to prepare registry.json content:
function prepareRegistryJson(): ShadcnSchema {
  const registryItems: RegistryItem[] = [];

  SVGS_DATA.forEach((svg) => {
    if (!REGENERATE_ALL) return;
    const componentName = svg.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const files: RegistryFile[] = [];

    const svgPaths = extractSvgPaths(svg);

    svgPaths.forEach((svgFile) => {
      const tsxComponentName = toComponentName(svgFile.filename);
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
        registryDependencies: [""],
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

    console.log(
      `[📄] File registry.json generated with ${registryContent.items.length} TSX components`,
    );
  } catch (error) {
    console.error("[❌] Error generating registry.json:", error);
    throw new Error(error);
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

function createSpinner() {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let current = 0;
  let interval;

  return {
    start(getMessage) {
      interval = setInterval(() => {
        const message =
          typeof getMessage === "function" ? getMessage() : getMessage;
        process.stdout.write(`\r${frames[current]} ${message}`);
        current = (current + 1) % frames.length;
      }, 100);
    },
    stop() {
      if (interval) {
        clearInterval(interval);
        process.stdout.write("\r");
      }
    },
  };
}

async function convertSvgToReact(svgPath: string): Promise<string> {
  const rawSvg = await fs.promises.readFile(svgPath, "utf-8");
  const optimizedSvg = optimizeSvg({ svgCode: rawSvg });
  const componentName = toComponentName(path.basename(svgPath, ".svg"));
  const code = await parseReactSvgContent({
    componentName,
    svgCode: optimizedSvg,
    typescript: true,
    minify: MINIFY_TSX,
  });
  return code;
}

function toComponentName(file: string): string {
  const name = file.replace(/\.svg$/i, "");

  let component = name.replace(/(^\w|[-_]\w)/g, (m) =>
    m.replace(/[-_]/, "").toUpperCase(),
  );

  if (/^\d/.test(component)) {
    component = "Icon" + component;
  }

  const reserved = new Set([
    "default",
    "class",
    "function",
    "var",
    "export",
    "import",
    "extends",
    "new",
    "delete",
    "enum",
    "package",
  ]);
  if (reserved.has(component)) {
    component = "Icon" + component[0].toUpperCase() + component.slice(1);
  }

  return component;
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
      console.log(`[🗑️] Folder ${dirPath} deleted successfully`);
    }
  } catch (error) {
    console.warn(`[⚠️] Could not delete folder ${dirPath}: ${error.message}`);
  }
}

async function runShadcnBuild() {
  try {
    console.log("[🔨] Running shadcn build...");
    const { stdout, stderr } = await execAsync(SHADCN_COMMAND);

    if (stdout) {
      console.log("[✅] shadcn build completed:");
      console.log(stdout);
    }

    if (stderr && !stderr.includes("warning")) {
      console.error("[❌] Errors in shadcn build:");
      console.error(stderr);
    }
  } catch (error) {
    console.error("[❌] Error running shadcn build:", error);
    throw new Error(error);
  }
}

async function run() {
  const spinner = createSpinner();
  let convertedCount = 0;
  let totalCount = 0;

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
      console.log("[❌] No SVG files found in SVGS_DATA.");
      return;
    }

    spinner.start(
      () => `[📦] ${convertedCount}/${totalCount} SVGs converted to TSX`,
    );

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
          toComponentName(svgFile.filename) + ".tsx",
        );
        await fs.promises.writeFile(outPath, tsx, "utf-8");
        convertedCount++;
      } catch (error) {
        console.error(`\n[❌] Error processing ${svgFile.filename}:`, error);
        throw new Error(error);
      }
    }

    spinner.stop();

    console.log(
      `\n[✅] Conversion completed: ${convertedCount}/${totalCount} SVGs processed`,
    );

    if (convertedCount < totalCount) {
      console.log(`[⚠️] ${totalCount - convertedCount} SVGs had errors.`);
    }

    if (convertedCount > 0) {
      await generateRegistryJson();
      await runShadcnBuild();
    }
  } catch (error) {
    spinner.stop();
    console.error("[❌] Error:", error);
    throw new Error(error);
  } finally {
    await cleanupDirectory(OUTPUT_DIR);
    console.log("[🎉] Process completed");
  }
}

run();
