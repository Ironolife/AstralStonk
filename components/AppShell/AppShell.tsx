import Divider from '@mui/material/Divider';
import Footer from '@astralstonk/components/AppShell/Footer/Footer';
import Header from '@astralstonk/components/AppShell/Header/Header';
import Sidebar from '@astralstonk/components/AppShell/Sidebar/Sidebar';
import React, { FC } from 'react';

const AppShell: FC = ({ children }) => {
  return (
    <>
      <Header />
      <div className='flex-grow flex'>
        <Sidebar />
        <Divider className='hidden md:block' orientation='vertical' />
        <div className='relative flex-grow'>
          <div className='absolute inset-0 flex flex-col'>
            <main className='flex-grow p-4 overflow-y-auto'>{children}</main>
            <Divider />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppShell;
