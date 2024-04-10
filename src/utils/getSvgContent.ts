export const getSvgContent = async (url: string | undefined) => {
  const response = await fetch(url || '');
  const content = await response.text();
  return content;
};
