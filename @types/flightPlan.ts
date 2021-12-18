import { dateSchema } from '@astralstonk/@types/dateSchema';
import { string, z } from 'zod';

const baseFlightPlanSchema = z
  .object({
    id: string(),
    shipId: string(),
    createdAt: dateSchema,
    arrivesAt: dateSchema,
    destination: z.string(),
    departure: z.string(),
  })
  .strict();

export const myFlightPlanSchema = baseFlightPlanSchema
  .extend({
    distance: z.number(),
    fuelConsumed: z.number(),
    fuelRemaining: z.number(),
    terminatedAt: dateSchema.nullable(),
    timeRemainingInSeconds: z.number(),
  })
  .strict();

export const systemFlightPlanSchema = baseFlightPlanSchema
  .extend({
    username: z.string(),
    shipType: z.string(),
  })
  .strict();

export type MyFlightPlan = z.infer<typeof myFlightPlanSchema>;

export type SystemFlightPlan = z.infer<typeof systemFlightPlanSchema>;
