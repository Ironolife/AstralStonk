import { dateSchema } from '@astralstonk/@types/dateSchema';
import { myLoanSchema } from '@astralstonk/@types/loan';
import { myShipSchema } from '@astralstonk/@types/ship';
import { z } from 'zod';

export const userSchema = z
  .object({
    username: z.string(),
    credits: z.number(),
    joinedAt: dateSchema,
    shipCount: z.number(),
    structureCount: z.number(),
  })
  .strict();

export const newUserSchema = z
  .object({
    username: z.string(),
    credits: z.number(),
    ships: z.array(myShipSchema),
    loans: z.array(myLoanSchema),
  })
  .strict();

export type User = z.infer<typeof userSchema>;

export type NewUser = z.infer<typeof newUserSchema>;
