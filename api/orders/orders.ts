import { axios } from '@astralstonk/api/axios';
import { onResponse } from '@astralstonk/api/onResponse';
import {
  OrderResponse,
  orderResponseSchema,
} from '@astralstonk/api/orders/types';

export const postPurchaseOrder = (
  shipId: string,
  good: string,
  quantity: number
): Promise<OrderResponse> =>
  axios
    .post<OrderResponse>('/my/purchase-orders', {
      shipId,
      good,
      quantity,
    })
    .then(onResponse(orderResponseSchema));

export const postSellOrder = (
  shipId: string,
  good: string,
  quantity: number
): Promise<OrderResponse> =>
  axios
    .post<OrderResponse>('/my/sell-orders', {
      shipId,
      good,
      quantity,
    })
    .then(onResponse(orderResponseSchema));
