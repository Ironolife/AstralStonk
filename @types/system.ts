import { z } from 'zod';

export const systemSchema = z
  .object({
    symbol: z.string(),
    name: z.string(),
  })
  .strict();

export type System = z.infer<typeof systemSchema>;
