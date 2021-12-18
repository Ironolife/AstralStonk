import { orderSchema } from '@astralstonk/@types/order';
import { myShipSchema } from '@astralstonk/@types/ship';
import { z } from 'zod';

export const orderResponseSchema = z
  .object({
    credits: z.number(),
    order: orderSchema,
    ship: myShipSchema,
  })
  .strict();

export type OrderResponse = z.infer<typeof orderResponseSchema>;
