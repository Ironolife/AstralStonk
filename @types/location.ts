import { z } from 'zod';

export const systemLocationSchema = z
  .object({
    symbol: z.string(),
    type: z.string(),
    name: z.string(),
    x: z.number(),
    y: z.number(),
    allowsConstruction: z.boolean(),
    traits: z.array(z.string()),
  })
  .strict();

export const locationDetailsSchema = systemLocationSchema
  .extend({
    dockedShips: z.number(),
  })
  .strict();

export const purchaseLocationSchema = z
  .object({
    location: z.string(),
    system: z.string(),
    price: z.number(),
  })
  .strict();

export type SystemLocation = z.infer<typeof systemLocationSchema>;

export type LocationDetails = z.infer<typeof locationDetailsSchema>;

export type PurchaseLocation = z.infer<typeof purchaseLocationSchema>;
