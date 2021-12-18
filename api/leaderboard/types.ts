import { leaderboardItemSchema } from '@astralstonk/@types/leaderboard';
import { z } from 'zod';

export const leaderboardResponseSchema = z
  .object({
    netWorth: leaderboardItemSchema,
    userNetWorth: leaderboardItemSchema.optional(),
  })
  .strict();

export type LeaderboardResponse = z.infer<typeof leaderboardResponseSchema>;
