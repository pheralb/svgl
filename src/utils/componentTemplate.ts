import { parseSvgContent } from './parseSvgContent';

export const componentTemplate = (lang: string, content: string, framework: 'Vue' | 'Svelte') => {
  const { templateContent, componentStyle } = parseSvgContent(content, framework);

  if (framework === 'Vue') {
    return `<script setup${lang ? ` lang="${lang}"` : ''}></script>
<template>
 ${templateContent}
</template>
  
    ${componentStyle}
    `;
  } else {
    return `<script${lang ? ` lang="${lang}"` : ''}></script>
 ${templateContent}
  
${componentStyle}
    `;
  }
};