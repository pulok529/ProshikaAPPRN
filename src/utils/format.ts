export function toCurrency(n: number | string) {
  const v = Number(n || 0);
  return v.toLocaleString();
}
