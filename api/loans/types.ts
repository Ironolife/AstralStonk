import { myLoanSchema } from '@astralstonk/@types/loan';
import { z } from 'zod';

export const myLoansResponseSchema = z
  .object({
    loans: z.array(myLoanSchema),
  })
  .strict();

export const myLoanActionResponseSchema = z
  .object({
    credits: z.number(),
    loans: z.array(myLoanSchema),
  })
  .strict();

export type MyLoansResponse = z.infer<typeof myLoansResponseSchema>;

export type MyLoanActionResponse = z.infer<typeof myLoanActionResponseSchema>;
