import { z } from 'zod';

export const goodTypeSchema = z
  .object({
    name: z.string(),
    symbol: z.string(),
    volumePerUnit: z.number(),
  })
  .strict();

export const marketGoodSchema = z
  .object({
    symbol: z.string(),
    pricePerUnit: z.number(),
    purchasePricePerUnit: z.number(),
    sellPricePerUnit: z.number(),
    quantityAvailable: z.number(),
    volumePerUnit: z.number(),
    spread: z.number(),
  })
  .strict();

export type GoodType = z.infer<typeof goodTypeSchema>;

export type MarketGood = z.infer<typeof marketGoodSchema>;
