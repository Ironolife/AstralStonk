import { axios } from '@astralstonk/api/axios';
import {
  GameStatusResponse,
  gameStatusResponseSchema,
} from '@astralstonk/api/game/types';
import { onResponse } from '@astralstonk/api/onResponse';

export const getGameStatus = (): Promise<GameStatusResponse> =>
  axios
    .get<GameStatusResponse>('/game/status')
    .then(onResponse(gameStatusResponseSchema));
