import { goodTypeSchema } from '@astralstonk/@types/good';
import { loanTypeSchema } from '@astralstonk/@types/loan';
import { shipTypeSchema } from '@astralstonk/@types/ship';
import { structureTypeSchema } from '@astralstonk/@types/structure';
import { z } from 'zod';

export const goodTypesResponseSchema = z
  .object({
    goods: z.array(goodTypeSchema),
  })
  .strict();

export const loanTypesResponseSchema = z
  .object({
    loans: z.array(loanTypeSchema),
  })
  .strict();

export const structureTypesResponseSchema = z
  .object({
    structures: z.array(structureTypeSchema),
  })
  .strict();

export const shipTypesResponseSchema = z
  .object({
    ships: z.array(shipTypeSchema),
  })
  .strict();

export type GoodTypesResponse = z.infer<typeof goodTypesResponseSchema>;

export type LoanTypesResponse = z.infer<typeof loanTypesResponseSchema>;

export type StructureTypesResponse = z.infer<
  typeof structureTypesResponseSchema
>;

export type ShipTypesResponse = z.infer<typeof shipTypesResponseSchema>;
