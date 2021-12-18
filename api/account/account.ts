import {
  MyAccountResponse,
  myAccountResponseSchema,
} from '@astralstonk/api/account/types';
import { axios } from '@astralstonk/api/axios';
import { onResponse } from '@astralstonk/api/onResponse';

export const getMyAccount = (accessToken: string): Promise<MyAccountResponse> =>
  axios
    .get<MyAccountResponse>(`/my/account`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(onResponse(myAccountResponseSchema));
