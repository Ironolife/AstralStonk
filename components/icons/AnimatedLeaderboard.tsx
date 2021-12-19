import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import clsx from 'clsx';
import React, { VFC } from 'react';

type AnimatedLeaderboardProps = SvgIconProps & {
  animate?: boolean;
};

const AnimatedLeaderboard: VFC<AnimatedLeaderboardProps> = ({
  animate,
  ...rest
}) => {
  return (
    <SvgIcon {...rest}>
      <path
        className={clsx(
          animate && 'animate-[0.7s_linear_0s_leaderboard-icon-path-1]'
        )}
        stroke='currentColor'
        strokeWidth={5.5}
        strokeDasharray={18}
        strokeDashoffset={12}
        d='M4.75,21L4.75,3'
      />
      <path
        className={clsx(
          animate && 'animate-[0.7s_linear_0.1s_leaderboard-icon-path-2]'
        )}
        stroke='currentColor'
        strokeWidth={5.5}
        strokeDasharray={18}
        strokeDashoffset={0}
        d='M12,21L12,3'
      />
      <path
        className={clsx(
          animate && 'animate-[0.7s_linear_0.2s_leaderboard-icon-path-3]'
        )}
        stroke='currentColor'
        strokeWidth={5.5}
        strokeDasharray={18}
        strokeDashoffset={6}
        d='M19.25,21L19.25,3'
      />
    </SvgIcon>
  );
};

export default AnimatedLeaderboard;
