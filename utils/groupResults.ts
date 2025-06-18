export function groupResults(results: { label: string; prob: number }[]) {
  const groups: Record<string, { label: string; prob: number }[]> = {};

  results.forEach((item) => {
    const key = item.label.split('.')[0];
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });

  return groups;
}
