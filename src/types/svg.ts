import type { tCategory } from './categories';

export interface iSVG {
  id?: number;
  title: string;
  category: tCategory;
  route:
    | string // for backwards compat of when theme support was not added
    | {
        dark: string;
        light: string;
      };
  url: string;
}
