import GithubSlugger from "github-slugger";

type ToCItem = {
  id: number;
  level: number;
  text: string;
  slug: string;
};

const getTableOfContents = (markdown: string): ToCItem[] => {
  const slugger = new GithubSlugger();
  const regXHeader = /(?:^|\n)(?<flag>#+)\s+(?<content>.+)/g;

  // Delete # from code blocks and inline code:
  let clean = markdown.replace(/<pre[\s\S]*?<\/pre>/gi, "");
  clean = clean.replace(/<code[\s\S]*?<\/code>/gi, "");

  return Array.from(clean.matchAll(regXHeader))
    .map((match, idx): ToCItem | null => {
      const groups = match.groups;
      if (
        groups &&
        typeof groups.flag === "string" &&
        typeof groups.content === "string" &&
        groups.flag.length > 1
      ) {
        return {
          id: idx,
          level: groups.flag.length,
          text: groups.content,
          slug: slugger.slug(groups.content),
        };
      }
      return null;
    })
    .filter((x): x is ToCItem => x !== null);
};

export { getTableOfContents, type ToCItem };
