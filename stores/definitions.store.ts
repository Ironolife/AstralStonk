import { GoodType } from '@astralstonk/@types/good';
import { LoanType } from '@astralstonk/@types/loan';
import { ShipType } from '@astralstonk/@types/ship';
import { StructureType } from '@astralstonk/@types/structure';
import create from 'zustand';

export type Definitions = {
  goods: GoodType[];
  loans: LoanType[];
  structures: StructureType[];
  ships: ShipType[];
};

type DefinitionsStoreState = {
  updatedAt: Date | undefined;
  definitions: Definitions | undefined;
  set: (updatedAt: Date, definitions: Definitions) => void;
};

export const useDefinitionsStore = create<DefinitionsStoreState>((set) => ({
  updatedAt: undefined,
  definitions: undefined,
  set: (updatedAt, definitions) => set({ updatedAt, definitions }),
}));
