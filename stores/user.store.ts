import { User } from '@astralstonk/@types/user';
import create from 'zustand';

type UserStoreState = {
  user?: User;
  set: (user: User) => void;
  clear: () => void;
};

export const useUserStore = create<UserStoreState>((set) => ({
  user: undefined,
  set: (user) => set(() => ({ user })),
  clear: () => set({ user: undefined }),
}));
