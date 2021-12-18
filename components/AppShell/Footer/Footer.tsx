import Toolbar from '@mui/material/Toolbar';
import GameStatus from '@astralstonk/components/AppShell/Footer/GameStatus';
import React, { VFC } from 'react';

const Footer: VFC = () => {
  return (
    <Toolbar className='shrink-0 p-4 min-h-[64px]' component='footer'>
      <GameStatus />
    </Toolbar>
  );
};

export default Footer;
