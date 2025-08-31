interface ParseSvgFilename {
  file: string;
  log?: boolean;
  firstUpperCase?: boolean;
}

export const parseSvgFilename = (params: ParseSvgFilename): string => {
  const { file, log, firstUpperCase = false } = params;
  const name = file.replace(/\.svg$/i, "");

  let component = name
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ""))
    .replace(/^(.)/, (char) =>
      firstUpperCase ? char.toUpperCase() : char.toLowerCase(),
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
