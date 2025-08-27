import type { LayoutServerLoad } from "./$types";
import { globals } from "@/globals";

export const load: LayoutServerLoad = async ({ fetch, setHeaders }) => {
  try {
    const response = await fetch(globals.apiGithubUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // 1 day cache:
    setHeaders({
      "cache-control": "public, max-age=86400",
    });

    return {
      stars: data.stargazers_count,
    };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return {
      stars: 0,
      error: "Failed to fetch repository data",
    };
  }
};
