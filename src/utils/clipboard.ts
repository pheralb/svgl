const MIMETYPE = 'text/plain';

export const clipboard = async (content: string) => {
  try {
    const clipboardItem = new ClipboardItem({
      [MIMETYPE]: new Blob([content], { type: MIMETYPE })
    });

    setTimeout(async () => {
      await navigator.clipboard.write([clipboardItem]);
    }, 200);
  } catch (error) {
    await navigator.clipboard.writeText(content);
  }
};
