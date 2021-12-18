import { axios } from '@astralstonk/api/axios';
import {
  MyFlightPlanResponse,
  myFlightPlanResponseSchema,
} from '@astralstonk/api/flightPlans/types';
import { onResponse } from '@astralstonk/api/onResponse';

export const getMyFlightPlan = (
  flightPlanId: string
): Promise<MyFlightPlanResponse> =>
  axios
    .get<MyFlightPlanResponse>(`/my/flight-plans/${flightPlanId}`)
    .then(onResponse(myFlightPlanResponseSchema));

export const postMyFlightPlan = (
  shipId: string,
  destination: string
): Promise<MyFlightPlanResponse> =>
  axios
    .post<MyFlightPlanResponse>('/my/flight-plans', {
      shipId,
      destination,
    })
    .then(onResponse(myFlightPlanResponseSchema));
