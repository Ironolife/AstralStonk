import {
  SystemLocationsResponse,
  SystemResponse,
} from '@astralstonk/api/systems/types';
import LocationList from '@astralstonk/components/systems/SystemView/LocationList';
import SystemScene from '@astralstonk/components/systems/SystemView/SystemScene/SystemScene';
import { useSystemViewStore } from '@astralstonk/stores/systemView.store';
import React, { useEffect, VFC } from 'react';

type SystemViewProps = SystemResponse & SystemLocationsResponse;

const SystemView: VFC<SystemViewProps> = ({ system, locations }) => {
  const setSelectedLocation = useSystemViewStore(
    ({ setSelectedLocation }) => setSelectedLocation
  );

  useEffect(() => {
    return () => setSelectedLocation(null);
  }, []);

  return (
    <>
      <SystemScene system={system} locations={locations} />
      <LocationList locations={locations} />
    </>
  );
};

export default SystemView;
