export function getBaseUrl() {
  if (import.meta.env.MODE === 'development') {
    return '';
  } else {
    return import.meta.env.PUBLIC_SVGL_BASE_URL;
  }
}
