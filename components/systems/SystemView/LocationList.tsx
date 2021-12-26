import { SystemLocationsResponse } from '@astralstonk/api/systems/types';
import { SystemViewContext } from '@astralstonk/components/systems/SystemView/SystemView';
import { useContext, VFC } from 'react';

type LocationListProps = SystemLocationsResponse;

const LocationList: VFC<LocationListProps> = ({ locations }) => {
  const { selectedLocationIndex, setSelectedLocationIndex } =
    useContext(SystemViewContext);

  return null;
};

export default LocationList;
