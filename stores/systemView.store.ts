import create from 'zustand';

type SystemViewState = {
  selectedLocation: string | null;
  setSelectedLocation: (systemSymbol: string | null) => void;
};

export const useSystemViewStore = create<SystemViewState>((set) => ({
  selectedLocation: null,
  setSelectedLocation: (systemSymbol) =>
    set({ selectedLocation: systemSymbol }),
}));
