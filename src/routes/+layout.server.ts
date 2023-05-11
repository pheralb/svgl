import type { LayoutServerLoad } from './$types';
import { fetchGitHubStars } from '@/utils/getStarsRepository';

export const load: LayoutServerLoad = async ({ url: { pathname } }) => {
  const stars = await fetchGitHubStars();
  return { pathname, stars };
};
