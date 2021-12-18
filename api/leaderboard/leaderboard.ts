import { axios } from '@astralstonk/api/axios';
import {
  LeaderboardResponse,
  leaderboardResponseSchema,
} from '@astralstonk/api/leaderboard/types';
import { onResponse } from '@astralstonk/api/onResponse';

export const getLeaderboard = (): Promise<LeaderboardResponse> =>
  axios
    .get<LeaderboardResponse>('/game/leaderboard/net-worth')
    .then(onResponse(leaderboardResponseSchema));
