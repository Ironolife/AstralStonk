import { axios } from '@astralstonk/api/axios';
import {
  MyLoanActionResponse,
  myLoanActionResponseSchema,
  MyLoansResponse,
  myLoansResponseSchema,
} from '@astralstonk/api/loans/types';
import { onResponse } from '@astralstonk/api/onResponse';

export const getMyLoans = (): Promise<MyLoansResponse> =>
  axios
    .get<MyLoansResponse>('/my/loans')
    .then(onResponse(myLoansResponseSchema));

export const payMyLoan = (loanId: string): Promise<MyLoanActionResponse> =>
  axios
    .put<MyLoanActionResponse>(`/my/loans/${loanId}`)
    .then(onResponse(myLoanActionResponseSchema));

export const takeMyLoan = (type: string): Promise<MyLoanActionResponse> =>
  axios
    .post<MyLoanActionResponse>('/my/loans', {
      type,
    })
    .then(onResponse(myLoanActionResponseSchema));
