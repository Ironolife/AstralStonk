import { axios } from '@astralstonk/api/axios';
import {
  MyFlightPlanResponse,
  myFlightPlanResponseSchema,
} from '@astralstonk/api/flightPlans/types';
import { onResponse } from '@astralstonk/api/onResponse';

export const wrapJump = (shipId: string): Promise<MyFlightPlanResponse> =>
  axios
    .post('/my/warp-jumps', { shipId })
    .then(onResponse(myFlightPlanResponseSchema));
