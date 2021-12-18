import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import {
  SnackbarKey,
  SnackbarProvider as _SnackbarProvider,
  useSnackbar,
} from 'notistack';
import React, { FC, VFC } from 'react';

const CloseButton: VFC<{ snackbarKey: SnackbarKey }> = ({ snackbarKey }) => {
  const { closeSnackbar } = useSnackbar();

  const handleClose = () => closeSnackbar(snackbarKey);

  return (
    <IconButton onClick={handleClose} aria-label='close snackbar'>
      <CloseIcon />
    </IconButton>
  );
};

const SnackbarProvider: FC = ({ children }) => {
  return (
    <_SnackbarProvider
      maxSnack={5}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={10000}
      disableWindowBlurListener
      action={(snackbarKey) => <CloseButton snackbarKey={snackbarKey} />}
    >
      {children}
    </_SnackbarProvider>
  );
};

export default SnackbarProvider;
