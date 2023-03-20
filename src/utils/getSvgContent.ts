export const MIMETYPE = 'text/plain';
export const getSvgContent = async (url: string | undefined, isSupported: boolean) => {
    const response = await fetch(url || '');
    const content = await response.text();
    const blob = new Blob([content], { type: MIMETYPE });
    return isSupported ? blob : content;
};