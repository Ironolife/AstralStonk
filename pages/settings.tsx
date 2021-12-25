import DefinitionsSettings from '@astralstonk/components/settings/DefinitionsSettings';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import React, { VFC } from 'react';

const Settings: VFC = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <div className='max-w-2xl mx-auto py-8 px-4 space-y-16'>
        <Typography variant='h4' component='h1'>
          Settings
        </Typography>
        <DefinitionsSettings />
      </div>
    </>
  );
};

export default Settings;
