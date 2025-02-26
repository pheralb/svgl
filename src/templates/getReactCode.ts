interface ReactComponentParams {
  code: string;
  name: string;
  typescript: boolean;
}

export const getReactCode = async (
  params: ReactComponentParams
): Promise<{ data?: string; error?: string }> => {
  try {
    const getCode = await fetch('/api/svgs/svgr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
    const data = await getCode.json();
    return data;
  } catch (error) {
    return { error: `⚠️ getReactCode: An error has ocurred - ${error}` };
  }
};
