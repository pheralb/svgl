export const clipboard = (content: string) => {
  navigator.clipboard.writeText(content);
};
