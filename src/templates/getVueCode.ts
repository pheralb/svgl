import { parseSvgContent } from '@/utils/parseSvgContent';

interface VueComponentParams {
  lang: string;
  content: string;
}

export const getVueCode = (params: VueComponentParams) => {
  const { templateContent, componentStyle } = parseSvgContent(params.content, 'Vue');
  return `<script setup${params.lang ? ` lang="${params.lang}"` : ''}></script>
<template>
 ${templateContent}
</template>
  
    ${componentStyle}
    `;
};
