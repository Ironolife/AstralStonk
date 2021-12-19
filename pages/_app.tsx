import AppShell from '@astralstonk/components/AppShell/AppShell';
import AuthProvider from '@astralstonk/providers/AuthProvider';
import DefinitionsProvider from '@astralstonk/providers/DefinitionsProvider';
import MuiThemeProvider from '@astralstonk/providers/MuiThemeProvider';
import QueryClientProvider from '@astralstonk/providers/QueryClientProvider';
import SnackbarProvider from '@astralstonk/providers/SnackbarProvider';
import '@astralstonk/styles/globals.css';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MuiThemeProvider>
      <CssBaseline />
      <SnackbarProvider>
        <QueryClientProvider>
          <AuthProvider>
            <DefinitionsProvider>
              <AppShell>
                <Component {...pageProps} />
              </AppShell>
            </DefinitionsProvider>
          </AuthProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
}

export default MyApp;
