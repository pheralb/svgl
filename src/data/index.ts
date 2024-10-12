import type { iSVG } from '@/types/svg';
import { svgs } from './svgs';

export const svgsData = svgs.map((svg: iSVG, index: number) => {
  return { id: index, ...svg };
});

export const getCategories = () => {
  const categories = svgs
    .flatMap((svg) => (Array.isArray(svg.category) ? svg.category : [svg.category]))
    .filter((category, index, array) => array.indexOf(category) === index);
  return categories;
};

export const getCategoriesForDirectory = () => {
  const categories = svgs
    .flatMap((svg) => (Array.isArray(svg.category) ? svg.category : [svg.category]))
    .filter((category, index, array) => array.indexOf(category) === index)
    .map((category) => ({
      slug: category.toLowerCase()
    }));
  return categories;
};
