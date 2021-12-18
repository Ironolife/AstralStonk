import { newUserSchema } from '@astralstonk/@types/user';
import { z } from 'zod';

export const claimUsernameResponseSchema = z
  .object({
    token: z.string(),
    user: newUserSchema,
  })
  .strict();

export type ClaimUsernameResponse = z.infer<typeof claimUsernameResponseSchema>;
