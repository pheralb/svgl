import type { tCategory } from './categories';

export interface iSVG {
  id: number | string;
  title: string;
  category: tCategory;
  route: string;
  url: string;
}
