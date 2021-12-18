import Typography from '@mui/material/Typography';
import DefinitionsSettings from '@astralstonk/components/settings/DefinitionsSettings';
import React, { VFC } from 'react';

const Settings: VFC = () => {
  return (
    <div className='max-w-2xl mx-auto py-4 space-y-16'>
      <Typography variant='h4' component='h1'>
        Settings
      </Typography>
      <DefinitionsSettings />
    </div>
  );
};

export default Settings;
