import { axios } from '@astralstonk/api/axios';
import { onResponse } from '@astralstonk/api/onResponse';
import {
  ClaimUsernameResponse,
  claimUsernameResponseSchema,
} from '@astralstonk/api/users/types';

export const claimUsername = (
  username: string
): Promise<ClaimUsernameResponse> =>
  axios
    .post<ClaimUsernameResponse>(`/users/${username}/claim`)
    .then(onResponse(claimUsernameResponseSchema));
