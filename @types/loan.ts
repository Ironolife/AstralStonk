import { dateSchema } from '@astralstonk/@types/dateSchema';
import { z } from 'zod';

export const myLoanSchema = z
  .object({
    id: z.string(),
    due: dateSchema,
    repaymentAmount: z.number(),
    status: z.string(),
    type: z.string(),
  })
  .strict();

export const loanTypeSchema = z
  .object({
    type: z.string(),
    amount: z.number(),
    rate: z.number(),
    termInDays: z.number(),
    collateralRequired: z.boolean(),
  })
  .strict();

export type MyLoan = z.infer<typeof myLoanSchema>;

export type LoanType = z.infer<typeof loanTypeSchema>;
