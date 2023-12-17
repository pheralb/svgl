import { json } from '@sveltejs/kit';

// Data:
import { svgs } from '@/data/svgs';

export const GET = () => {
  const categories = svgs
    .map((svg) => svg.category)
    .filter((category, index, array) => array.indexOf(category) === index);

  // Status 200 | If limit is a number:
  return json(
    categories.map((category) => {
      return {
        category,
        total: svgs.filter((svg) => svg.category === category).length
      };
    }),
    { status: 200 }
  );
};
