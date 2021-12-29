import { SystemLocationsResponse } from '@astralstonk/api/systems/types';
import { useSystemViewStore } from '@astralstonk/stores/systemView.store';
import ButtonBase from '@mui/material/ButtonBase';
import clsx from 'clsx';
import { VFC } from 'react';

type LocationListProps = SystemLocationsResponse;

const LocationList: VFC<LocationListProps> = ({ locations }) => {
  const { selectedLocation, setSelectedLocation } = useSystemViewStore();

  return (
    <div className='absolute w-64 left-4 top-4 hidden md:flex flex-col space-y-2'>
      {locations.map(({ symbol, name }) => (
        <ButtonBase
          key={symbol}
          className={clsx(
            'px-4 py-3 justify-between rounded backdrop-blur-lg transition-colors',
            symbol === selectedLocation
              ? 'bg-purple-500/60'
              : 'bg-neutral-700/80 hover:bg-neutral-500/80'
          )}
          onClick={() => {
            if (selectedLocation !== symbol) setSelectedLocation(symbol);
            else setSelectedLocation(null);
          }}
          focusRipple
        >
          <span className='font-medium'>{name}</span>
          <span className='font-mono text-sm'>{symbol}</span>
        </ButtonBase>
      ))}
    </div>
  );
};

export default LocationList;
