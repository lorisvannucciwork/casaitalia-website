
export function formatTitleCase(str: string): string {
  if (!str) return '';
  if (str !== str.toUpperCase()) return str;

  const words = str.trim().split(/\s+/);
  const lowers = new Set([
    'di', 'del', 'della', 'dello', 'degli', 'dei', "d'", "all'", 'alla', 'allo',
    'agli', 'ai', 'al', 'con', 'e', 'in', 'su', 'a', 'da', 'per', 'tra', 'fra', 'o', 'ed'
  ]);

  const cased = words.map((w: string, idx: number) => {
    const lower = w.toLowerCase();
    if (idx > 0 && lowers.has(lower)) {
      return lower;
    }
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  });

  let result = cased.join(' ');
  result = result.replace(
    /\b(all|d|dell|un|l)'([a-z])/gi,
    (_match: string, p1: string, p2: string) => p1.toLowerCase() + "'" + p2.toUpperCase()
  );
  return result;
}

export function normalizeKey(str: string): string {
  return (str || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}
