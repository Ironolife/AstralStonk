import { useSnackbar } from 'notistack';
import React, { FC, useMemo } from 'react';
import {
  QueryClient,
  QueryClientProvider as _QueryClientProvider,
} from 'react-query';

const QueryClientProvider: FC = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const onError = (err: any) => {
    const message = err?.error?.message ?? err?.message ?? err;

    if (message) enqueueSnackbar(message, { variant: 'error' });
  };

  const client = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            onError,
          },
          mutations: {
            onError,
          },
        },
      }),
    [onError]
  );

  return (
    <_QueryClientProvider client={client}>{children}</_QueryClientProvider>
  );
};

export default QueryClientProvider;
