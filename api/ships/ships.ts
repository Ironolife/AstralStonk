import { axios } from '@astralstonk/api/axios';
import { onResponse } from '@astralstonk/api/onResponse';
import {
  BuyMyShipResponse,
  buyMyShipResponseSchema,
  JettisonCargoResponse,
  jettisonCargoResponseSchema,
  MyShipResponse,
  myShipResponseSchema,
  MyShipsResponse,
  myShipsResponseSchema,
  ScrapMyShipResponse,
  scrapMyShipResponseSchema,
  TransferMyShipsCargoResponse,
  transferMyShipsCargoResponseSchema,
} from '@astralstonk/api/ships/types';

export const buyShip = (
  location: string,
  type: string
): Promise<BuyMyShipResponse> =>
  axios
    .post<BuyMyShipResponse>('/my/ships', {
      location,
      type,
    })
    .then(onResponse(buyMyShipResponseSchema));

export const getMyShip = (shipId: string): Promise<MyShipResponse> =>
  axios
    .get<MyShipResponse>(`/my/ships/${shipId}`)
    .then(onResponse(myShipResponseSchema));

export const getMyShips = (): Promise<MyShipsResponse> =>
  axios
    .get<MyShipsResponse>('/my/ships')
    .then(onResponse(myShipsResponseSchema));

export const jettisonCargo = (
  shipId: string,
  good: string,
  quantity: number
): Promise<JettisonCargoResponse> =>
  axios
    .post<JettisonCargoResponse>(`/my/ships/${shipId}/jettison`, {
      good,
      quantity,
    })
    .then(onResponse(jettisonCargoResponseSchema));

export const scrapShip = (shipId: string): Promise<ScrapMyShipResponse> =>
  axios
    .delete<ScrapMyShipResponse>(`/my/ships/${shipId}`)
    .then(onResponse(scrapMyShipResponseSchema));

export const transferCargo = (
  fromShipId: string,
  toShipId: string,
  good: string,
  quantity: number
): Promise<TransferMyShipsCargoResponse> =>
  axios
    .post<TransferMyShipsCargoResponse>(`/my/ships/${fromShipId}/transfer`, {
      toShipId,
      good,
      quantity,
    })
    .then(onResponse(transferMyShipsCargoResponseSchema));
