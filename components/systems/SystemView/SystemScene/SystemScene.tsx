import {
  SystemLocationsResponse,
  SystemResponse,
} from '@astralstonk/api/systems/types';
import CameraController from '@astralstonk/components/systems/SystemView/SystemScene/CameraController';
import LocationObj from '@astralstonk/components/systems/SystemView/SystemScene/LocationObj';
import StarObj from '@astralstonk/components/systems/SystemView/SystemScene/StarObj';
import { useSystemViewStore } from '@astralstonk/stores/systemView.store';
import { hashStringToInt } from '@astralstonk/utils/hashStringToInt';
import { seededRandomFloatSpread } from '@astralstonk/utils/seededRandom';
import { Canvas } from '@react-three/fiber';
import clsx from 'clsx';
import React, { useMemo, useRef, useState, VFC } from 'react';
import { Mesh } from 'three';

type SystemSceneProps = SystemResponse & SystemLocationsResponse;

const SystemScene: VFC<SystemSceneProps> = ({ system, locations }) => {
  const locationObjsRef = useRef<{ [key: string]: Mesh }>({});

  const stars = useMemo(
    () =>
      new Array(600).fill(null).map((_, index) => ({
        symbol: `${system.symbol}_STAR_${index}`,
      })),
    []
  );

  const [isCanvasReady, setIsCanvasReady] = useState(false);

  const selectedLocation = useSystemViewStore(
    ({ selectedLocation }) => selectedLocation
  );

  return (
    <div className='absolute inset-0'>
      <Canvas
        className={clsx(
          'transition-opacity duration-500',
          isCanvasReady ? 'opacity-100' : 'opacity-0'
        )}
        gl={{ antialias: false }}
        onCreated={() => setIsCanvasReady(true)}
      >
        <CameraController
          target={
            selectedLocation ? locationObjsRef.current[selectedLocation] : null
          }
        />
        <pointLight color={0xffffff} intensity={1} position={[0, 0, 0]} />
        <ambientLight color={0xffffff} />
        {locations.map((location) => (
          <LocationObj
            key={location.symbol}
            ref={(el) => (locationObjsRef.current[location.symbol] = el!)}
            {...location}
          />
        ))}
        {stars.map((star) => (
          <StarObj key={star.symbol} {...star} />
        ))}
      </Canvas>
    </div>
  );
};

export default SystemScene;
