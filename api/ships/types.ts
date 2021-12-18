import { myShipSchema } from '@astralstonk/@types/ship';
import { z } from 'zod';

export const buyMyShipResponseSchema = z
  .object({
    credits: z.number(),
    ship: myShipSchema,
  })
  .strict();

export const myShipResponseSchema = z
  .object({
    ship: myShipSchema,
  })
  .strict();

export const myShipsResponseSchema = z
  .object({
    ships: z.array(myShipSchema),
  })
  .strict();

export const jettisonCargoResponseSchema = z
  .object({
    shipId: z.string(),
    good: z.string(),
    quantityRemaining: z.number(),
  })
  .strict();

export const scrapMyShipResponseSchema = z
  .object({
    success: z.string(),
  })
  .strict();

export const transferMyShipsCargoResponseSchema = z
  .object({
    fromShip: myShipSchema,
    toShip: myShipSchema,
  })
  .strict();

export type BuyMyShipResponse = z.infer<typeof buyMyShipResponseSchema>;

export type MyShipResponse = z.infer<typeof myShipResponseSchema>;

export type MyShipsResponse = z.infer<typeof myShipsResponseSchema>;

export type JettisonCargoResponse = z.infer<typeof jettisonCargoResponseSchema>;

export type ScrapMyShipResponse = z.infer<typeof scrapMyShipResponseSchema>;

export type TransferMyShipsCargoResponse = z.infer<
  typeof transferMyShipsCargoResponseSchema
>;
