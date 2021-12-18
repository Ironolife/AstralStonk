import { z } from 'zod';

export const leaderboardItemSchema = z
  .object({
    username: z.string(),
    networkth: z.number(),
    rank: z.number(),
  })
  .strict();

export type LeaderboardItem = z.infer<typeof leaderboardItemSchema>;
