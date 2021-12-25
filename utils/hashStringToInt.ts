export const hashStringToInt = (value: string) => {
  let hash = 0;

  if (value.length === 0) return hash;

  for (let i = 0; i < value.length; i++) {
    const charCode = value.charCodeAt(i);
    hash = (hash << 5) - hash + charCode;
    hash = hash & hash;
  }

  return hash;
};
