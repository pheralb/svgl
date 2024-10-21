import { optimize, type Config } from 'svgo';

export function optimizeSvg(svg: string): string {
  const result = optimize(svg, {
    path: 'path-to.svg',
    multipass: true,
    plugins: [],
  });
  return result.data;
}
