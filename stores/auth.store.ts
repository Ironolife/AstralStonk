import create from 'zustand';

type AuthStoreState = {
  auth: { isReady: boolean; accessToken?: string };
  ready: (accessToken?: string) => void;
  set: (accessToken: string) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthStoreState>((set) => ({
  auth: { isReady: false },
  ready: (accessToken) => set({ auth: { isReady: true, accessToken } }),
  set: (accessToken) => set(({ auth }) => ({ auth: { ...auth, accessToken } })),
  clear: () =>
    set(({ auth }) => ({ auth: { ...auth, accessToken: undefined } })),
}));
