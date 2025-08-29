interface ParseSvgFilename {
  file: string;
  log?: boolean;
}

export const parseSvgFilename = (params: ParseSvgFilename): string => {
  const { file, log } = params;
  const name = file.replace(/\.svg$/i, "");

  let component = name.replace(/(^\w|[-_]\w)/g, (m) =>
    m.replace(/[-_]/, "").toUpperCase(),
  );

  if (/^\d/.test(component)) {
    if (log) {
      console.log(
        `\n - [⚠️] Component name starts with a number: ${component}`,
      );
    }
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
    if (log) {
      console.log(
        `\n - [⚠️] Component name is a reserved keyword: ${component}`,
      );
    }
    component = "Icon" + component[0].toUpperCase() + component.slice(1);
  }

  return component;
};
