import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import React, { VFC } from 'react';

type AnimatedLeaderboardProps = SvgIconProps;

const AnimatedLeaderboard: VFC<AnimatedLeaderboardProps> = (props) => {
  return (
    <SvgIcon className='rotate-180' {...props}>
      <rect
        className='transition-all duration-300 w-[5.5px] h-[6px] group-hover:h-[12px]'
        x={2}
        y={3}
        fill='currentColor'
      />
      <rect
        className='transition-all duration-300 w-[5.5px] h-[18px] group-hover:h-[6px]'
        x={9.25}
        y={3}
        fill='currentColor'
      />
      <rect
        className='transition-all duration-300 w-[5.5px] h-[12px] group-hover:h-[18px]'
        x={16.5}
        y={3}
        fill='currentColor'
      />
    </SvgIcon>
  );
};

export default AnimatedLeaderboard;
