export function clampQty(next: number) {
  return Math.max(0, Math.min(99, next));
}
