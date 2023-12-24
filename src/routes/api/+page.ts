import { error } from '@sveltejs/kit';

export async function load() {
  try {
    const documentTitle = 'api';
    const post = await import(`../../docs/${documentTitle}.md`);
    return {
      content: post.default,
      meta: post.metadata
    };
  } catch (e) {
    throw error(404, `Could not find this page`);
  }
}
