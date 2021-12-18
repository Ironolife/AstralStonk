import { cargoSchema } from '@astralstonk/@types/cargo';
import { purchaseLocationSchema } from '@astralstonk/@types/location';
import { z } from 'zod';

export const shipTypeSchema = z
  .object({
    type: z.string(),
    class: z.string(),
    manufacturer: z.string(),
    maxCargo: z.number(),
    loadingSpeed: z.number(),
    speed: z.number(),
    plating: z.number(),
    weapons: z.number(),
    restrictedGoods: z.array(z.string()).optional(),
  })
  .strict();

export const dockedShipSchema = z
  .object({
    shipId: z.string(),
    shipType: z.string(),
    username: z.string(),
  })
  .strict();

export const myShipSchema = shipTypeSchema
  .extend({
    id: z.string(),
    location: z.string(),
    x: z.number(),
    y: z.number(),
    spaceAvailable: z.number(),
    cargo: z.array(cargoSchema),
  })
  .strict();

export const shipListingSchema = shipTypeSchema
  .extend({
    purchaseLocations: z.array(purchaseLocationSchema),
  })
  .strict();

export type ShipType = z.infer<typeof shipTypeSchema>;

export type DockedShip = z.infer<typeof dockedShipSchema>;

export type MyShip = z.infer<typeof myShipSchema>;

export type ShipListing = z.infer<typeof shipListingSchema>;
