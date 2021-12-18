import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { HeaderContext } from '@astralstonk/components/AppShell/Header/Header';
import HeaderDrawerButton from '@astralstonk/components/AppShell/Header/HeaderDrawer/HeaderDrawerButton';
import { routes } from '@astralstonk/components/AppShell/routes';
import React, { useContext, VFC } from 'react';

const HeaderDrawer: VFC = () => {
  const { authAction, handleLogout, isDrawerOpen, toggleIsDrawerOpen } =
    useContext(HeaderContext);

  return (
    <Drawer open={isDrawerOpen} anchor='right' onClose={toggleIsDrawerOpen}>
      <div className='w-64 p-2 flex flex-col space-y-4'>
        <IconButton
          className='self-end'
          onClick={toggleIsDrawerOpen}
          size='large'
          aria-label='close menu'
        >
          <CloseIcon />
        </IconButton>
        <div className='flex flex-col space-y-2'>
          {routes.map((route) => (
            <HeaderDrawerButton
              key={route.href}
              onClick={toggleIsDrawerOpen}
              {...route}
            />
          ))}
        </div>
        <Divider />
        <div className='flex flex-col space-y-2'>
          <HeaderDrawerButton
            label='Settings'
            icon={<SettingsIcon />}
            href='/settings'
            onClick={toggleIsDrawerOpen}
          />
          {authAction === 'login' && (
            <HeaderDrawerButton
              label='Login'
              icon={<LoginIcon />}
              href='/auth/login'
              onClick={toggleIsDrawerOpen}
            />
          )}
          {authAction === 'logout' && (
            <HeaderDrawerButton
              label='Logout'
              icon={<LogoutIcon />}
              onClick={() => {
                handleLogout();
                toggleIsDrawerOpen();
              }}
            />
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default HeaderDrawer;
