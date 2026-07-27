import type { Snippet } from "svelte";

export interface LinkProps {
  href: string;
  label?: string;
  title?: string;
  className?: string;
  children: Snippet;
}
