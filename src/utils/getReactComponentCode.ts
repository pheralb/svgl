interface iComponentCode {
  code: string;
  name: string;
  typescript: boolean;
}

export const getReactComponentCode = async (
  params: iComponentCode
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
    return { error: 'An error has ocurred. Try again.' };
  }
};
