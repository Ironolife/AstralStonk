import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { claimUsername } from '@astralstonk/api/users/users';
import { NextLinkComposed } from '@astralstonk/components/common/Link';
import { useLocalStorage } from '@astralstonk/hooks/useLocalStorage';
import { DefinitionsContext } from '@astralstonk/providers/DefinitionsProvider';
import { useAuthStore } from '@astralstonk/stores/auth.store';
import { useDefinitionsStore } from '@astralstonk/stores/definitions.store';
import { useUserStore } from '@astralstonk/stores/user.store';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useContext, VFC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

type FormValues = {
  username: string;
};

const RegisterForm: VFC = () => {
  const router = useRouter();

  const defaultValues: FormValues = {
    username: '',
  };

  const [, setStoredAccessToken] = useLocalStorage<string | undefined>(
    'accessToken',
    undefined
  );

  const claimUsernameMutation = useMutation(claimUsername);
  const setAuth = useAuthStore(({ set }) => set);
  const setUser = useUserStore(({ set }) => set);

  const isDefinitionsLoaded = useDefinitionsStore(
    ({ updatedAt }) => !!updatedAt
  );
  const { updateDefinitions } = useContext(DefinitionsContext);

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: SubmitHandler<FormValues> = ({ username }) => {
    claimUsernameMutation.mutate(username, {
      onSuccess: ({ token, user }) => {
        setStoredAccessToken(token);
        setAuth(token);

        const { username, credits } = user;
        setUser({
          username,
          credits,
          joinedAt: new Date(),
          shipCount: 0,
          structureCount: 0,
        });

        enqueueSnackbar(
          <div>
            Your Access Token:
            <br />
            {token}
            <br />
            Remember to save it!
          </div>,
          {
            variant: 'success',
            persist: true,
          }
        );

        if (!isDefinitionsLoaded) updateDefinitions();

        router.replace('/');
      },
    });
  };

  const { control, handleSubmit } = useForm<FormValues>({ defaultValues });

  return (
    <form className='flex flex-col space-y-8' onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-4'>
        <Controller
          name='username'
          control={control}
          render={({ field }) => (
            <TextField label='Username' required fullWidth {...field} />
          )}
        />
      </div>
      <div className='flex justify-between items-center'>
        <Button
          component={NextLinkComposed}
          to={{ pathname: '/auth/login' }}
          size='large'
          type='button'
        >
          Existing User?
        </Button>
        <LoadingButton
          variant='contained'
          size='large'
          type='submit'
          loading={claimUsernameMutation.isLoading}
        >
          Claim
        </LoadingButton>
      </div>
    </form>
  );
};

export default RegisterForm;
