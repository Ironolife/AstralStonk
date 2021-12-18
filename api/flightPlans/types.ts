import { myFlightPlanSchema } from '@astralstonk/@types/flightPlan';
import { z } from 'zod';

export const myFlightPlanResponseSchema = z
  .object({
    flightPlan: myFlightPlanSchema,
  })
  .strict();

export type MyFlightPlanResponse = z.infer<typeof myFlightPlanResponseSchema>;
