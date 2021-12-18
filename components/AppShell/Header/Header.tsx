import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HeaderDrawer from '@astralstonk/components/AppShell/Header/HeaderDrawer/HeaderDrawer';
import { NextLinkComposed } from '@astralstonk/components/common/Link';
import { useLocalStorage } from '@astralstonk/hooks/useLocalStorage';
import { useToggle } from '@astralstonk/hooks/useToggle';
import { useAuthStore } from '@astralstonk/stores/auth.store';
import { useUserStore } from '@astralstonk/stores/user.store';
import { useRouter } from 'next/router';
import React, { createContext, VFC } from 'react';

export const HeaderContext = createContext({
  authAction: undefined as 'login' | 'logout' | undefined,
  handleLogout: () => {},
  isDrawerOpen: false,
  toggleIsDrawerOpen: () => {},
});

const Header: VFC = () => {
  const router = useRouter();

  const [, setStoredAccessToken] = useLocalStorage<string | undefined>(
    'accessToken',
    undefined
  );
  const {
    auth: { isReady },
    clearAuth,
  } = useAuthStore(({ auth, clear }) => ({ auth, clearAuth: clear }));
  const { user, clearUser } = useUserStore(({ user, clear }) => ({
    user,
    clearUser: clear,
  }));

  const authAction = isReady ? (user ? 'logout' : 'login') : undefined;

  const handleLogout = () => {
    setStoredAccessToken(undefined);
    clearAuth();
    clearUser();

    router.replace('/auth/login');
  };

  const [isDrawerOpen, toggleIsDrawerOpen] = useToggle(false);

  return (
    <HeaderContext.Provider
      value={{ authAction, handleLogout, isDrawerOpen, toggleIsDrawerOpen }}
    >
      <AppBar className='shrink-0' position='static'>
        <Toolbar className='p-4 h-[72px]'>
          <Typography className='flex-grow' variant='h6' component='div'>
            AstralStonk
          </Typography>
          {authAction === 'login' && (
            <Button
              className='hidden md:flex ml-4 py-[6px] px-[16px] h-10'
              color='inherit'
              component={NextLinkComposed}
              to={{ pathname: '/auth/login' }}
              endIcon={<LoginIcon />}
            >
              Login
            </Button>
          )}
          {authAction === 'logout' && (
            <Button
              className='hidden md:flex ml-4 py-[6px] px-[16px] h-10'
              color='inherit'
              onClick={handleLogout}
              endIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          )}
          <IconButton
            className='md:hidden ml-4'
            onClick={toggleIsDrawerOpen}
            aria-label='open menu'
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <HeaderDrawer />
    </HeaderContext.Provider>
  );
};

export default Header;
