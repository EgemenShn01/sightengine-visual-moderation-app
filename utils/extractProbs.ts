export const extractProbs = (obj: any, prefix = ''): { label: string; prob: number }[] => {
  let arr: { label: string; prob: number }[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'number') {
      arr.push({ label: fullKey, prob: value });
    } else if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          arr = arr.concat(extractProbs(item, `${fullKey}.${index}`));
        });
      } else {
        arr = arr.concat(extractProbs(value, fullKey));
      }
    }
  }

  return arr;
};
