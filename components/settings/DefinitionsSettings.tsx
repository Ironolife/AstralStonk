import CachedIcon from '@mui/icons-material/Cached';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import { DefinitionsContext } from '@astralstonk/providers/DefinitionsProvider';
import { useDefinitionsStore } from '@astralstonk/stores/definitions.store';
import { formatDateTime } from '@astralstonk/utils/formatDate';
import React, { useContext, VFC } from 'react';

const DefinitionsSettings: VFC = () => {
  const updatedAt = useDefinitionsStore(({ updatedAt }) => updatedAt);
  const { updateDefinitions, isUpdating } = useContext(DefinitionsContext);

  return (
    <section className='space-y-8'>
      <Typography variant='h5' component='h2'>
        Definitions
      </Typography>
      <div className='opacity-70'>
        {updatedAt ? `Updated at ${formatDateTime(updatedAt)}.` : 'Not loaded.'}
      </div>
      <LoadingButton
        variant='contained'
        startIcon={<CachedIcon />}
        onClick={updateDefinitions}
        loading={isUpdating}
        loadingPosition='start'
      >
        Update
      </LoadingButton>
    </section>
  );
};

export default DefinitionsSettings;
