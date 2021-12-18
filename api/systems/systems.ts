import { axios } from '@astralstonk/api/axios';
import {
  DockedShipsResponse,
  dockedShipsResponseSchema,
} from '@astralstonk/api/locations/types';
import { onResponse } from '@astralstonk/api/onResponse';
import {
  SystemFlightPlansResponse,
  systemFlightPlansResponseSchema,
  SystemLocationsResponse,
  systemLocationsResponseSchema,
  SystemResponse,
  systemResponseSchema,
  SystemShipListingsResponse,
  systemShipListingsResponseSchema,
} from '@astralstonk/api/systems/types';

export const getSystemShipListings = (
  systemSymbol: string
): Promise<SystemShipListingsResponse> =>
  axios
    .get<SystemShipListingsResponse>(`/systems/${systemSymbol}/ship-listings`)
    .then(onResponse(systemShipListingsResponseSchema));

export const getSystemFlightPlans = (
  systemSymbol: string
): Promise<SystemFlightPlansResponse> =>
  axios
    .get<SystemFlightPlansResponse>(`/systems/${systemSymbol}/flight-plans`)
    .then(onResponse(systemFlightPlansResponseSchema));

export const getSystemDockedShips = (
  systemSymbol: string
): Promise<DockedShipsResponse> =>
  axios
    .get<DockedShipsResponse>(`/systems/${systemSymbol}/ships`)
    .then(onResponse(dockedShipsResponseSchema));

export const getSystemLocations = (
  systemSymbol: string
): Promise<SystemLocationsResponse> =>
  axios
    .get<SystemLocationsResponse>(`/systems/${systemSymbol}/locations`)
    .then(onResponse(systemLocationsResponseSchema));

export const getSystem = (systemSymbol: string): Promise<SystemResponse> =>
  axios
    .get<SystemResponse>(`/systems/${systemSymbol}`)
    .then(onResponse(systemResponseSchema));
