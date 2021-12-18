import { useAuthStore } from '@astralstonk/stores/auth.store';
import _axios from 'axios';

export const axios = _axios.create({
  baseURL: 'https://api.spacetraders.io/',
});

const onError = (err: any) => {
  if (err.response) throw err.response.data;
  if (err.request) throw new Error('Request failed');
  throw new Error('Unknown error occurred');
};

axios.interceptors.request.use((req) => {
  const accessToken = useAuthStore.getState().auth.accessToken;

  if (accessToken)
    req.headers = {
      ...req.headers,
      Authorization: `Bearer ${accessToken}`,
    };

  return req;
}, onError);

axios.interceptors.response.use(undefined, onError);
