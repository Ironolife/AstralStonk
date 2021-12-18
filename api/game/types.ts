import { z } from 'zod';

export const gameStatusResponseSchema = z
  .object({
    status: z.string(),
  })
  .strict();

export type GameStatusResponse = z.infer<typeof gameStatusResponseSchema>;
