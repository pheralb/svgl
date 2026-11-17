export function getScrollParent(node: HTMLElement | null): HTMLElement | null {
  if (!node) return null;
  const { overflow, overflowY } = getComputedStyle(node);
  if (
    overflow.includes("scroll") ||
    overflow.includes("auto") ||
    overflowY.includes("scroll") ||
    overflowY.includes("auto")
  ) {
    return node;
  }
  return getScrollParent(node.parentElement);
}
