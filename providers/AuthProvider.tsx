import { getMyAccount } from '@astralstonk/api/account/account';
import { useLocalStorage } from '@astralstonk/hooks/useLocalStorage';
import { useAuthStore } from '@astralstonk/stores/auth.store';
import { useUserStore } from '@astralstonk/stores/user.store';
import React, { FC, useEffect } from 'react';
import { useMutation } from 'react-query';

const AuthProvider: FC = ({ children }) => {
  const [storedAccessToken, setStoredAccessToken] = useLocalStorage<
    string | undefined
  >('accessToken', undefined);
  const readyAuth = useAuthStore(({ ready }) => ready);
  const setUser = useUserStore(({ set }) => set);

  const getMyAccountMutation = useMutation(getMyAccount);

  useEffect(() => {
    if (storedAccessToken)
      getMyAccountMutation.mutate(storedAccessToken, {
        onSuccess: ({ user }) => {
          readyAuth(storedAccessToken);
          setUser(user);
        },
        onError: () => {
          setStoredAccessToken(undefined);
          readyAuth();
        },
      });
    else readyAuth();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
