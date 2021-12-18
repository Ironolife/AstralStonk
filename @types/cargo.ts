import { z } from 'zod';

export const cargoSchema = z
  .object({
    good: z.string(),
    quantity: z.number(),
    totalVolume: z.number(),
  })
  .strict();

export type Cargo = z.infer<typeof cargoSchema>;
