import { axios } from '@astralstonk/api/axios';
import {
  GoodTypesResponse,
  goodTypesResponseSchema,
  LoanTypesResponse,
  loanTypesResponseSchema,
  ShipTypesResponse,
  shipTypesResponseSchema,
  StructureTypesResponse,
  structureTypesResponseSchema,
} from '@astralstonk/api/definitions/types';
import { onResponse } from '@astralstonk/api/onResponse';
import { useAuthStore } from '@astralstonk/stores/auth.store';
import { Definitions } from '@astralstonk/stores/definitions.store';
import merge from 'lodash/merge';

export const getGoodTypes = (): Promise<GoodTypesResponse> =>
  axios
    .get<GoodTypesResponse>('types/goods')
    .then(onResponse(goodTypesResponseSchema));

export const getLoanTypes = (): Promise<LoanTypesResponse> =>
  axios
    .get<LoanTypesResponse>('types/loans')
    .then(onResponse(loanTypesResponseSchema));

export const getStructureTypes = (): Promise<StructureTypesResponse> =>
  axios
    .get<StructureTypesResponse>('types/structures')
    .then(onResponse(structureTypesResponseSchema));

export const getShipTypes = (_class?: string): Promise<ShipTypesResponse> =>
  axios
    .get<ShipTypesResponse>('types/ships', {
      params: {
        class: _class,
      },
    })
    .then(onResponse(shipTypesResponseSchema));

export const getDefinitions = async (): Promise<Definitions> => {
  const accessToken = useAuthStore.getState().auth.accessToken;

  if (!accessToken)
    throw new Error('You must be logged in to update definitions');

  const res = await Promise.all([
    getGoodTypes(),
    getLoanTypes(),
    getStructureTypes(),
    getShipTypes(),
  ]);

  return merge(...res);
};
