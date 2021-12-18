import Typography from '@mui/material/Typography';
import LoginForm from '@astralstonk/components/forms/LoginForm';
import { useAuthStore } from '@astralstonk/stores/auth.store';
import { useRouter } from 'next/router';
import React, { useEffect, VFC } from 'react';

const Login: VFC = () => {
  const router = useRouter();

  const { isReady, accessToken } = useAuthStore(({ auth }) => auth);

  useEffect(() => {
    if (isReady && accessToken) router.replace('/');
  }, [isReady]);

  if (!isReady || (isReady && accessToken)) return null;

  return (
    <div className='max-w-lg mx-auto h-full flex flex-col pb-[10vh] justify-center space-y-8'>
      <Typography variant='h5' component='h1'>
        Welcome Back!
      </Typography>
      <LoginForm />
    </div>
  );
};

export default Login;
