interface AngularComponentParams {
  svgContent: string;
  componentName: string;
}

export function getAngularCode(params: AngularComponentParams): string {
  const updatedSvgContent = params.svgContent.replace(
    /<svg([^>]*)>/,
    `<svg$1 [attr.width]="size.width" [attr.height]="size.height">`
  );

  return `
  import { Component, Input } from '@angular/core';
  
  @Component({
    selector: 'svg-${params.componentName}',
    standalone: true,
    template: \`
      ${updatedSvgContent.trim()}
    \`,
  })
  export class ${params.componentName}Component {
    @Input({ required: true }) size: { width: number; height: number };
  }
  `;
}
