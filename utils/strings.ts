export function computeCaps(n: number) {
  if (typeof n !== 'number') {
    return n;
  }
  n = n / 1000000000000000000;

  if (n <= 1e4) {
    return n.toFixed(4).replace(/([,.][0]+$|[0]+$)/, '');
  }
  if (n <= 1e6) {
    return (n / 1e3).toFixed(3).replace(/([,.][0]+$|[0]+$)/, '') + 'k';
  }
  if (n <= 1e9) {
    return (n / 1e6).toFixed(3).replace(/([,.][0]+$|[0]+$)/, '') + 'M';
  }
  if (n <= 1e12) {
    return (n / 1e9).toFixed(3).replace(/([,.][0]+$|[0]+$)/, '') + 'G';
  }
  if (n <= 1e15) {
    return (n / 1e12).toFixed(3).replace(/([,.][0]+$|[0]+$)/, '') + 'T';
  }
  if (n <= 1e18) {
    return (n / 1e15).toFixed(3).replace(/([,.][0]+$|[0]+$)/, '') + 'P';
  }
  if (n <= 1e21) {
    return (n / 1e18).toFixed(3).replace(/([,.][0]+$|[0]+$)/, '') + 'E';
  }

  return n;
}

export function middleEllipsis(s: string, n: number = 10): string {
  if (s.length < n) return s;
  const start = s.slice(0, n / 2 - 1);
  const end = s.slice(-(n / 2 - 2));
  return start + '...' + end;
}
