import type { Category } from "./categories";

export type ThemeOptions = {
  dark: string;
  light: string;
};

export interface iSVG {
  id?: number;
  title: string;
  subTitle?: string;
  category: Category | Category[];
  route: string | ThemeOptions;
  wordmark?: string | ThemeOptions;
  brandUrl?: string;
  loftlyyUrl?: string;
  shadcnCommand?: string;
  url: string;
}
