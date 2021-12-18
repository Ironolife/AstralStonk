import { axios } from '@astralstonk/api/axios';
import { onResponse } from '@astralstonk/api/onResponse';
import {
  DepositToMyStructureResponse,
  depositToMyStructureResponseSchema,
  DepositToStructureResponse,
  depositToStructureResponseSchema,
  MyStructureResponse,
  myStructureResponseSchema,
  MyStructuresResponse,
  myStructuresResponseSchema,
  StructureResponse,
  structureResponseSchema,
  TransferFromMyStructureResponse,
  transferFromMyStructureResponseSchema,
} from '@astralstonk/api/structures/types';

export const createMyStructure = (
  location: string,
  type: string
): Promise<MyStructureResponse> =>
  axios
    .post<MyStructureResponse>('/my/structures', {
      location,
      type,
    })
    .then(onResponse(myStructureResponseSchema));

export const depositToMyStructure = (
  structureId: string,
  shipId: string,
  good: string,
  quantity: number
): Promise<DepositToMyStructureResponse> =>
  axios
    .post<DepositToMyStructureResponse>(
      `/my/structures/${structureId}/deposit`,
      {
        shipId,
        good,
        quantity,
      }
    )
    .then(onResponse(depositToMyStructureResponseSchema));

export const depositToStructure = (
  structureId: string,
  shipId: string,
  good: string,
  quantity: number
): Promise<DepositToStructureResponse> =>
  axios
    .post<DepositToStructureResponse>(`/structures/${structureId}/deposit`, {
      shipId,
      good,
      quantity,
    })
    .then(onResponse(depositToStructureResponseSchema));

export const getStructure = (structureId: string): Promise<StructureResponse> =>
  axios
    .get<StructureResponse>(`/structures/${structureId}`)
    .then(onResponse(structureResponseSchema));

export const transferFromMyStructure = (
  structureId: string,
  shipId: string,
  good: string,
  quantity: number
): Promise<TransferFromMyStructureResponse> =>
  axios
    .post<TransferFromMyStructureResponse>(
      `/my/structures/${structureId}/transfer`,
      {
        shipId,
        good,
        quantity,
      }
    )
    .then(onResponse(transferFromMyStructureResponseSchema));

export const getMyStructure = (
  structureId: string
): Promise<MyStructureResponse> =>
  axios
    .get<MyStructureResponse>(`/my/structures/${structureId}`)
    .then(onResponse(myStructureResponseSchema));

export const getMyStructures = (): Promise<MyStructuresResponse> =>
  axios
    .get<MyStructuresResponse>('/my/structures')
    .then(onResponse(myStructuresResponseSchema));
