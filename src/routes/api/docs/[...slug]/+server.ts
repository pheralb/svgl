import type { RequestEvent } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";
import { allDocs } from "content-collections";

export const GET = async ({ params }: RequestEvent) => {
  const document = allDocs.find((doc) => doc._meta.path === params.slug);
  if (!document) {
    throw error(404, `Could not find ${params.slug}`);
  }
  return new Response(document.content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
};
