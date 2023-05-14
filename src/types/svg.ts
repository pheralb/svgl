import type { tCategory } from './categories';

export interface iSVG {
  id: number;
  title: string;
  category: tCategory;
  route: string;
  url: string;
}
