import type { PageLoad } from "./$types";

import { error } from "@sveltejs/kit";
import { allDocs } from "content-collections";

export const load: PageLoad = async ({ params }) => {
  const document = allDocs.find((doc) => doc._meta.path == params.slug);
  if (!document) {
    error(404, `Could not find ${params.slug}`);
  }
  return {
    document,
  };
};
