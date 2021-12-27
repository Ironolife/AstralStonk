import { SystemLocationsResponse } from '@astralstonk/api/systems/types';
import CameraController from '@astralstonk/components/systems/SystemView/SystemScene/CameraController';
import LocationObj from '@astralstonk/components/systems/SystemView/SystemScene/LocationObj';
import { useSystemViewStore } from '@astralstonk/stores/systemView.store';
import { hashStringToInt } from '@astralstonk/utils/hashStringToInt';
import { seededRandomFloatSpread } from '@astralstonk/utils/seededRandom';
import { Canvas } from '@react-three/fiber';
import clsx from 'clsx';
import React, { useMemo, useRef, useState, VFC } from 'react';
import { Mesh } from 'three';

type SystemSceneProps = SystemLocationsResponse;

const SystemScene: VFC<SystemSceneProps> = ({ locations }) => {
  const locationsData = useMemo(
    () =>
      locations.map((location) => ({
        ...location,
        z: seededRandomFloatSpread(20, hashStringToInt(`${location.symbol}_Z`)),
      })),
    [locations]
  );

  const locationObjsRef = useRef<{ [key: string]: Mesh }>({});

  const starData = useMemo(
    () =>
      new Array(600).fill(null).map((_, index) => ({
        x: seededRandomFloatSpread(400, hashStringToInt(`OE_STAR_${index}_X`)),
        y: seededRandomFloatSpread(400, hashStringToInt(`OE_STAR_${index}_Y`)),
        z: seededRandomFloatSpread(400, hashStringToInt(`OE_STAR_${index}_Z`)),
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
            selectedLocation !== null
              ? locationObjsRef.current[selectedLocation]
              : null
          }
        />
        <ambientLight color={0xffffff} />
        {locationsData.map((locationData) => (
          <LocationObj
            key={locationData.symbol}
            ref={(el) => (locationObjsRef.current[locationData.symbol] = el!)}
            {...locationData}
          />
        ))}
        {starData.map(({ x, y, z }, index) => (
          <mesh key={index} position={[x, y, z]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color={0xffffff} />
          </mesh>
        ))}
      </Canvas>
    </div>
  );
};

export default SystemScene;
