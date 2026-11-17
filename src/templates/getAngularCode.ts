interface AngularComponentParams {
  svgContent: string;
  componentName: string;
}

export function getAngularCode(params: AngularComponentParams): string {
  const updatedSvgContent = params.svgContent.replace(
    /<svg([^>]*)>/,
    `<svg$1 [attr.width]="size.width" [attr.height]="size.height">`,
  );

  let className = params.componentName.replace(/[^a-zA-Z0-9]/g, "");
  if (/^\d/.test(className)) {
    className = `Icon${className}`;
  }

  return `
  import { Component, Input } from '@angular/core';
  
  @Component({
    selector: 'svg-${params.componentName}',
    standalone: true,
    template: \`
      ${updatedSvgContent.trim()}
    \`,
  })
  export class ${className}Component {
    @Input({ required: true }) size: { width: number; height: number };
  }
  `;
}
