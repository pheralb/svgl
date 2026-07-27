interface AstroComponentParams {
  svgContent: string;
}

export function getAstroCode(params: AstroComponentParams): string {
  const cleanedSvg = params.svgContent
    .replace(/\s*(width|height)="[^"]*"/gi, "")
    .replace(/\s*(width|height)='[^']*'/gi, "")
    .replace(/\s*(width|height)=\{[^}]*\}/gi, "")
    .replace(/<svg([^>]*)>/i, (_, attrs) => {
      const cleanedAttrs = attrs.replace(/\s*\{?\.\.\.Astro\.props\}?\s*/i, "");
      return `<svg ${cleanedAttrs} {...Astro.props}>`;
    });

  return cleanedSvg.trim();
}
