import React, { createContext, useState, VFC } from 'react';
import { SystemLocationsResponse } from '@astralstonk/api/systems/types';
import SystemScene from '@astralstonk/components/systems/SystemView/SystemScene/SystemScene';
import LocationList from '@astralstonk/components/systems/SystemView/LocationList';

export const SystemViewContext = createContext({
  selectedLocation: null as string | null,
  setSelectedLocation: (symbol: string | null) => {},
});

type SystemViewProps = SystemLocationsResponse;

const SystemView: VFC<SystemViewProps> = ({ locations }) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  return (
    <SystemViewContext.Provider
      value={{ selectedLocation, setSelectedLocation }}
    >
      <SystemScene locations={locations} />
      <LocationList locations={locations} />
    </SystemViewContext.Provider>
  );
};

export default SystemView;
