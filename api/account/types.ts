import { userSchema } from '@astralstonk/@types/user';
import { z } from 'zod';

export const myAccountResponseSchema = z
  .object({
    user: userSchema,
  })
  .strict();

export type MyAccountResponse = z.infer<typeof myAccountResponseSchema>;
