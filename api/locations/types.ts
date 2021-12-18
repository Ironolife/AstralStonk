import { marketGoodSchema } from '@astralstonk/@types/good';
import { locationDetailsSchema } from '@astralstonk/@types/location';
import { dockedShipSchema } from '@astralstonk/@types/ship';
import { z } from 'zod';

export const locationResponseSchema = z
  .object({
    location: locationDetailsSchema,
  })
  .strict();

export const marketplaceResponseSchema = z
  .object({
    marketplace: z.array(marketGoodSchema),
  })
  .strict();

export const dockedShipsResponseSchema = z
  .object({
    ships: z.array(dockedShipSchema),
  })
  .strict();

export type LocationResponse = z.infer<typeof locationResponseSchema>;

export type MarketplaceResponse = z.infer<typeof marketplaceResponseSchema>;

export type DockedShipsResponse = z.infer<typeof dockedShipsResponseSchema>;
