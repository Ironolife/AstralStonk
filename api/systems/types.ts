import { systemFlightPlanSchema } from '@astralstonk/@types/flightPlan';
import { systemLocationSchema } from '@astralstonk/@types/location';
import { shipListingSchema } from '@astralstonk/@types/ship';
import { systemSchema } from '@astralstonk/@types/system';
import { z } from 'zod';

export const systemShipListingsResponseSchema = z
  .object({
    shipListings: z.array(shipListingSchema),
  })
  .strict();

export const systemFlightPlansResponseSchema = z
  .object({
    flightPlans: z.array(systemFlightPlanSchema),
  })
  .strict();

export const systemLocationsResponseSchema = z
  .object({
    locations: z.array(systemLocationSchema),
  })
  .strict();

export const systemResponseSchema = z
  .object({
    system: systemSchema,
  })
  .strict();

export type SystemShipListingsResponse = z.infer<
  typeof systemShipListingsResponseSchema
>;

export type SystemFlightPlansResponse = z.infer<
  typeof systemFlightPlansResponseSchema
>;

export type SystemLocationsResponse = z.infer<
  typeof systemLocationsResponseSchema
>;

export type SystemResponse = z.infer<typeof systemResponseSchema>;
