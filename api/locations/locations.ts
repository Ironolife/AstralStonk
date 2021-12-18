import { axios } from '@astralstonk/api/axios';
import {
  DockedShipsResponse,
  dockedShipsResponseSchema,
  LocationResponse,
  locationResponseSchema,
  MarketplaceResponse,
  marketplaceResponseSchema,
} from '@astralstonk/api/locations/types';
import { onResponse } from '@astralstonk/api/onResponse';

export const getLocation = (
  locationSymbol: string
): Promise<LocationResponse> =>
  axios
    .get<LocationResponse>(`/locations/${locationSymbol}`)
    .then(onResponse(locationResponseSchema));

export const getLocationMarketplace = (
  locationSymbol: string
): Promise<MarketplaceResponse> =>
  axios
    .get<MarketplaceResponse>(`/locations/${locationSymbol}/marketplace`)
    .then(onResponse(marketplaceResponseSchema));

export const getLocationDockedShips = (
  locationSymbol: string
): Promise<DockedShipsResponse> =>
  axios
    .get<DockedShipsResponse>(`/locations/${locationSymbol}/ships`)
    .then(onResponse(dockedShipsResponseSchema));
