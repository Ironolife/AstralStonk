import { getGameStatus } from '@astralstonk/api/game/game';
import clsx from 'clsx';
import capitalize from 'lodash/capitalize';
import React, { VFC } from 'react';
import { useQuery } from 'react-query';

const GameStatus: VFC = () => {
  const { data, status } = useQuery('gameStatus', getGameStatus);

  if (status === 'idle') return null;

  return (
    <div className='flex items-center space-x-4'>
      <div
        className={clsx(
          'w-3 h-3 shrink-0 rounded-full transition-colors duration-500',
          {
            'bg-red-500': status === 'error',
            'bg-gray-500': status === 'loading',
            'bg-green-500': status === 'success',
          }
        )}
      />
      <div>
        {status === 'error' && 'Failed to retrieve server status'}
        {status === 'loading' && 'Loading...'}
        {status === 'success' && capitalize(data!.status)}
      </div>
    </div>
  );
};

export default GameStatus;
