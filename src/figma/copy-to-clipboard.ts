export function copyToClipboard(value: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.copy) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.copy(value);
    } else {
      const area = document.createElement('textarea');
      document.body.appendChild(area);
      area.value = value;
      // area.focus();
      area.select();
      const result = document.execCommand('copy');
      document.body.removeChild(area);
      if (!result) {
        throw new Error();
      }
    }
  } catch (e) {
    console.error(`Unable to copy the value: ${value}`);
    return false;
  }
  return true;
}