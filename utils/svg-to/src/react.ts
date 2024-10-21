import { transform } from '@svgr/core';
import svgrJSX from '@svgr/plugin-jsx';

export interface ConvertToReactOptions {
  svgCode: string;
  name: string;
  typescript: boolean;
}

export const convertToReact = async (params: ConvertToReactOptions) => {
  const reactCode = await transform(
    params.svgCode,
    {
      plugins: [svgrJSX],
      icon: true,
      typescript: params.typescript
    },
    { componentName: params.name }
  );
  return reactCode;
};
