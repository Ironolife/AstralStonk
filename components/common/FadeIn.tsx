import clsx from 'clsx';
import React, { FC } from 'react';

type FadeInProps = {
  isIn: boolean;
};

const FadeIn: FC<FadeInProps> = ({ isIn, children }) => {
  return (
    <div
      className={clsx(
        'transition-opacity duration-500',
        isIn ? 'opacity-100' : 'opacity-0'
      )}
    >
      {isIn ? children : null}
    </div>
  );
};

export default FadeIn;
