import { z } from 'zod';

export const orderSchema = z
  .object({
    good: z.string(),
    pricePerUnit: z.number(),
    quantity: z.number(),
    total: z.number(),
  })
  .strict();

export type Order = z.infer<typeof orderSchema>;
