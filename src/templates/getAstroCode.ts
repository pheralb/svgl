interface AstroComponentParams {
  svgContent: string;
}

export function getAstroCode({ svgContent }: AstroComponentParams): string {
  const cleanedSvg = svgContent
    .replace(/\s*(width|height)="[^"]*"/gi, '')
    .replace(/\s*(width|height)='[^']*'/gi, '')
    .replace(/\s*(width|height)=\{[^}]*\}/gi, '')
    .replace(/<svg([^>]*)>/i, (match, attrs) => {
      const cleanedAttrs = attrs.replace(/\s*\{?\.\.\.Astro\.props\}?\s*/i, '');
      return `<svg ${cleanedAttrs} {...Astro.props}>`;
    });

  return cleanedSvg.trim();
}
