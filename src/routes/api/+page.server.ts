import { redirect } from "@sveltejs/kit";

export const load = async () => {
  return redirect(307, "/docs/api");
};
