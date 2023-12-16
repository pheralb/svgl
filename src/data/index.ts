import type { iSVG } from '@/types/svg';
import { svgs } from './svgs';

export const svgsData = svgs.map((svg: iSVG, index: number) => {
  return { id: index, ...svg };
});