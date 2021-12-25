import { seededRandom } from '@astralstonk/utils/seededRandom';

export const seededRandFloatSpread = (range: number, seed: number) => {
  return range * (0.5 - seededRandom(seed));
};
