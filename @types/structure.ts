import { z } from 'zod';

export const structureTypeSchema = z
  .object({
    type: z.string(),
    name: z.string(),
    price: z.number(),
    allowedLocationTypes: z.array(z.string()),
    allowedPlanetTraits: z.array(z.string()),
    consumes: z.array(z.string()),
    produces: z.array(z.string()),
  })
  .strict();

export const structureInventoryItemSchema = z
  .object({
    good: z.string(),
    quantity: z.number(),
  })
  .strict();

export const myStructureSchema = z
  .object({
    id: z.string(),
    type: z.string(),
    ownedBy: z
      .object({
        username: z.string(),
      })
      .strict(),
    location: z.string(),
    status: z.string(),
    active: z.boolean(),
    consumes: z.array(z.string()),
    produces: z.array(z.string()),
    inventory: z.array(structureInventoryItemSchema),
  })
  .strict();

export const structureSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    completed: z.boolean(),
    stability: z.number(),
    materials: z.array(
      structureInventoryItemSchema
        .extend({
          targetQuantity: z.number(),
        })
        .strict()
    ),
  })
  .strict();

export type StructureType = z.infer<typeof structureTypeSchema>;

export type StructureInventoryItem = z.infer<
  typeof structureInventoryItemSchema
>;

export type MyStructure = z.infer<typeof myStructureSchema>;

export type Structure = z.infer<typeof structureSchema>;
