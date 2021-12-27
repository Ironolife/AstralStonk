import React, { createContext, useState, VFC } from 'react';
import { SystemLocationsResponse } from '@astralstonk/api/systems/types';
import SystemScene from '@astralstonk/components/systems/SystemView/SystemScene/SystemScene';
import LocationList from '@astralstonk/components/systems/SystemView/LocationList';

export const SystemViewContext = createContext({
  selectedLocationIndex: null as number | null,
  setSelectedLocationIndex: (index: number | null) => {},
});

type SystemViewProps = SystemLocationsResponse;

const SystemView: VFC<SystemViewProps> = ({ locations }) => {
  const [selectedLocationIndex, setSelectedLocationIndex] = useState<
    number | null
  >(null);

  return (
    <SystemViewContext.Provider
      value={{ selectedLocationIndex, setSelectedLocationIndex }}
    >
      <SystemScene locations={locations} />
      <LocationList locations={locations} />
    </SystemViewContext.Provider>
  );
};

export default SystemView;
