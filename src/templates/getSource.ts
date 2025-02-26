interface SourceParams {
  url: string | undefined;
}

export const getSource = async (params: SourceParams) => {
  const response = await fetch(params.url || '');
  const content = await response.text();
  return content;
};
