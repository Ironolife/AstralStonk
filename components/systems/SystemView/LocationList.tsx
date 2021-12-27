import { SystemLocationsResponse } from '@astralstonk/api/systems/types';
import { SystemViewContext } from '@astralstonk/components/systems/SystemView/SystemView';
import ButtonBase from '@mui/material/ButtonBase';
import clsx from 'clsx';
import { useContext, VFC } from 'react';

type LocationListProps = SystemLocationsResponse;

const LocationList: VFC<LocationListProps> = ({ locations }) => {
  const { selectedLocationIndex, setSelectedLocationIndex } =
    useContext(SystemViewContext);

  return (
    <div className='absolute w-64 left-4 top-4 flex flex-col space-y-2'>
      {locations.map(({ symbol, name }, index) => (
        <ButtonBase
          key={symbol}
          className={clsx(
            'px-4 py-3 justify-between rounded backdrop-blur-lg transition-colors',
            index === selectedLocationIndex
              ? 'bg-purple-500/60'
              : 'bg-neutral-700/80 hover:bg-neutral-500/80'
          )}
          onClick={() =>
            setSelectedLocationIndex(
              selectedLocationIndex !== index ? index : null
            )
          }
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
