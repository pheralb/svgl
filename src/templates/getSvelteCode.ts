import { parseSvgContent } from '@/utils/parseSvgContent';

interface SvelteComponentParams {
  lang: string;
  content: string;
}

export const getSvelteCode = (params: SvelteComponentParams) => {
  const { templateContent, componentStyle } = parseSvgContent(params.content, 'Svelte');
  return `<script${params.lang ? ` lang="${params.lang}"` : ''}></script>
  ${templateContent}
   
 ${componentStyle}
     `;
};
