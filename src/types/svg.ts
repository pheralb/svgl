import type { tCategory } from './categories';

type tCategoryPair = [tCategory, tCategory];
type CategoryTriple = [tCategory, tCategory, tCategory];

export interface iSVG {
  id?: number;
  title: string;
  category: tCategory | tCategoryPair | CategoryTriple;
  route:
    | string // for backwards compat of when theme support was not added
    | {
        dark: string;
        light: string;
      };
  wordmark?: 
    | string // for backwards compat of when theme support was not added
    | {
        dark: string;
        light: string;
      };
  url: string;
}
