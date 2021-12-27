export const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

export const seededRandomFloatSpread = (range: number, seed: number) => {
  return range * (0.5 - seededRandom(seed));
};
