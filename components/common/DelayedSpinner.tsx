import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import React, { useEffect, useState, VFC } from 'react';

type DelayedSpinnerProps = CircularProgressProps & {
  delay?: number;
};

const DelayedSpinner: VFC<DelayedSpinnerProps> = ({
  delay = 500,
  ...props
}) => {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsHidden(false), delay);

    return () => clearTimeout(timeout);
  }, [delay, setIsHidden]);

  if (isHidden) return null;

  return <CircularProgress {...props} />;
};

export default DelayedSpinner;
