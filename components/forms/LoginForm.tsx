import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { getMyAccount } from '@astralstonk/api/account/account';
import { NextLinkComposed } from '@astralstonk/components/common/Link';
import { useLocalStorage } from '@astralstonk/hooks/useLocalStorage';
import { DefinitionsContext } from '@astralstonk/providers/DefinitionsProvider';
import { useAuthStore } from '@astralstonk/stores/auth.store';
import { useDefinitionsStore } from '@astralstonk/stores/definitions.store';
import { useUserStore } from '@astralstonk/stores/user.store';
import { useRouter } from 'next/router';
import React, { useContext, VFC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

type FormValues = {
  accessToken: string;
};

const LoginForm: VFC = () => {
  const router = useRouter();

  const defaultValues: FormValues = {
    accessToken: '',
  };

  const [, setStoredAccessToken] = useLocalStorage<string | undefined>(
    'accessToken',
    undefined
  );

  const getMyAccountMutation = useMutation(getMyAccount);
  const setAuth = useAuthStore(({ set }) => set);
  const setUser = useUserStore(({ set }) => set);

  const isDefinitionsLoaded = useDefinitionsStore(
    ({ updatedAt }) => !!updatedAt
  );
  const { updateDefinitions } = useContext(DefinitionsContext);

  const onSubmit: SubmitHandler<FormValues> = ({ accessToken }) => {
    getMyAccountMutation.mutate(accessToken, {
      onSuccess: ({ user }) => {
        setStoredAccessToken(accessToken);
        setAuth(accessToken);
        setUser(user);

        if (!isDefinitionsLoaded) updateDefinitions();

        router.replace('/ships');
      },
    });
  };

  const { control, handleSubmit } = useForm<FormValues>({ defaultValues });

  return (
    <form className='flex flex-col space-y-8' onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-4'>
        <Controller
          name='accessToken'
          control={control}
          render={({ field }) => (
            <TextField
              label='Access Token'
              required
              type='password'
              autoComplete='current-password'
              fullWidth
              {...field}
            />
          )}
        />
      </div>
      <div className='flex justify-between items-center'>
        <Button
          component={NextLinkComposed}
          to={{ pathname: '/auth/register' }}
          size='large'
          type='button'
        >
          New User?
        </Button>
        <LoadingButton
          variant='contained'
          size='large'
          type='submit'
          loading={getMyAccountMutation.isLoading}
        >
          Login
        </LoadingButton>
      </div>
    </form>
  );
};

export default LoginForm;
