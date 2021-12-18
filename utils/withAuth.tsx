import { useAuthStore } from '@astralstonk/stores/auth.store';
import { useRouter } from 'next/router';
import React, { useEffect, VFC } from 'react';

const WithAuth =
  (Component: VFC): VFC =>
  () => {
    const router = useRouter();

    const { isReady, accessToken } = useAuthStore(({ auth }) => auth);

    useEffect(() => {
      if (isReady && !accessToken) router.replace('/auth/login');
    }, [isReady, accessToken]);

    if (!accessToken) return null;

    return <Component />;
  };

export default WithAuth;
