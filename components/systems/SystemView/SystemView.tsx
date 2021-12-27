import { SystemLocationsResponse } from '@astralstonk/api/systems/types';
import LocationList from '@astralstonk/components/systems/SystemView/LocationList';
import SystemScene from '@astralstonk/components/systems/SystemView/SystemScene/SystemScene';
import { useSystemViewStore } from '@astralstonk/stores/systemView.store';
import React, { useEffect, VFC } from 'react';

type SystemViewProps = SystemLocationsResponse;

const SystemView: VFC<SystemViewProps> = ({ locations }) => {
  const setSelectedLocation = useSystemViewStore(
    ({ setSelectedLocation }) => setSelectedLocation
  );

  useEffect(() => {
    return () => setSelectedLocation(null);
  }, []);

  return (
    <>
      <SystemScene locations={locations} />
      <LocationList locations={locations} />
    </>
  );
};

export default SystemView;
