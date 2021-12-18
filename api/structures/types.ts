import { myShipSchema } from '@astralstonk/@types/ship';
import {
  myStructureSchema,
  structureInventoryItemSchema,
  structureSchema,
} from '@astralstonk/@types/structure';
import { z } from 'zod';

export const myStructureResponseSchema = z
  .object({
    structure: myStructureSchema,
  })
  .strict();

export const structureResponseSchema = z
  .object({
    structure: structureSchema,
  })
  .strict();

export const depositToMyStructureResponseSchema = z
  .object({
    deposit: structureInventoryItemSchema,
    ship: myShipSchema,
    structure: myStructureSchema,
  })
  .strict();

export const depositToStructureResponseSchema = z
  .object({
    deposit: structureInventoryItemSchema,
    ship: myShipSchema,
    structure: structureSchema,
  })
  .strict();

export const transferFromMyStructureResponseSchema = z
  .object({
    transfer: structureInventoryItemSchema,
    ship: myShipSchema,
    structure: myStructureSchema,
  })
  .strict();

export const myStructuresResponseSchema = z
  .object({
    structures: z.array(myStructureSchema),
  })
  .strict();

export type MyStructureResponse = z.infer<typeof myStructureResponseSchema>;

export type StructureResponse = z.infer<typeof structureResponseSchema>;

export type DepositToMyStructureResponse = z.infer<
  typeof depositToMyStructureResponseSchema
>;

export type DepositToStructureResponse = z.infer<
  typeof depositToStructureResponseSchema
>;

export type TransferFromMyStructureResponse = z.infer<
  typeof transferFromMyStructureResponseSchema
>;

export type MyStructuresResponse = z.infer<typeof myStructuresResponseSchema>;
