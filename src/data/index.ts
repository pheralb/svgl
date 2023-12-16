import type { iSVG } from '@/types/svg';
import { svgs } from './svgs';
import { getBaseUrl } from '@/utils/getBaseUrl';

export const svgsData = svgs.map((svg: iSVG, index: number) => {
  return { id: index, ...svg };
});

export const fullRouteSvgsData: iSVG[] = svgsData.map((svg) => {
  const url = getBaseUrl();
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
