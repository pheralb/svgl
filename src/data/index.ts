import type { iSVG } from '@/types/svg';
import { svgs } from './svgs';

// Add id on top of each svg:
export const svgsData = svgs.map((svg: iSVG, index: number) => {
  return { id: index, ...svg };
});

// Add full route of each svg, checking if theme support is added:
export const fullRouteSvgsData: iSVG[] = svgsData.map((svg) => {
  const url = 'https://svgl.vercel.app';
  if (typeof svg.route === 'object' && svg.route !== null) {
    return {
      ...svg,
      route: {
        light: `${url}${svg.route.light}`,
        dark: `${url}${svg.route.dark}`
      }
    };
  } else if (typeof svg.route === 'string') {
    return {
      ...svg,
      route: `${url}${svg.route}`
    };
  }
  return svg;
});
