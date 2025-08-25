export const parseSvgContent = (
  content: string,
  framework: "Vue" | "Svelte",
) => {
  if (content.includes("<?xml")) {
    content = content.replace(/<\?xml[^>]*\?>/i, "");
  }

  const styleTagRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;

  const styles = [];
  let matched;
  while ((matched = styleTagRegex.exec(content)) !== null) {
    styles.push(matched[1]);
  }

  const templateContent = content.replace(styleTagRegex, "");

  const componentStyle = styles.length
    ? `<style${framework === "Vue" ? " scoped" : ""}>\n${styles.join("\n")}\n</style>`
    : "";

  return {
    componentStyle,
    templateContent,
  };
};
