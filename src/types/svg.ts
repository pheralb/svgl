import type { tCategory } from './categories';

type CategoryPair = [tCategory, tCategory];
type CategoryTriple = [tCategory, tCategory, tCategory];

export type ThemeOptions = {
  dark: string;
  light: string;
};

export interface iSVG {
  id?: number;
  title: string;
  category: tCategory | CategoryPair | CategoryTriple;
  route: string | ThemeOptions;
  wordmark?: string | ThemeOptions;
  url: string;
}
