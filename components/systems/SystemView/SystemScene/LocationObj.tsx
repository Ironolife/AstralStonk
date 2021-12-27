import { SystemLocation } from '@astralstonk/@types/location';
import { useSystemViewStore } from '@astralstonk/stores/systemView.store';
import { hashStringToInt } from '@astralstonk/utils/hashStringToInt';
import {
  seededRandom,
  seededRandomFloatSpread,
} from '@astralstonk/utils/seededRandom';
import { Html } from '@react-three/drei/web/Html';
import { useFrame } from '@react-three/fiber';
import clsx from 'clsx';
import startCase from 'lodash/startCase';
import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { Mesh } from 'three';

type LocationObjProps = SystemLocation & {
  z: number;
};

const LocationObj = forwardRef<Mesh, LocationObjProps>(
  ({ symbol, type, name, x, y, z }, ref) => {
    const locationObjRef = useRef<Mesh | null>(null);

    const radius = useMemo(() => {
      const baseMultiplier = 0.5;

      const typeBaseValue =
        { PLANET: 1.0, MOON: 0.5, WORMHOLE: 1.2 }[type] ?? 1.0;

      return (
        baseMultiplier *
        (typeBaseValue +
          seededRandomFloatSpread(0.5, hashStringToInt(`${symbol}_radius`)))
      );
    }, []);

    const rotation = useMemo(
      () => ({
        x: seededRandomFloatSpread(2, hashStringToInt(`${symbol}_rotation_X`)),
        y: seededRandomFloatSpread(2, hashStringToInt(`${symbol}_rotation_Y`)),
        z: seededRandomFloatSpread(2, hashStringToInt(`${symbol}_rotation_Z`)),
      }),
      []
    );

    useFrame(() => {
      const locationobj = locationObjRef.current;

      if (locationobj) {
        locationobj.rotation.x += rotation.x * 0.001;
        locationobj.rotation.y += rotation.y * 0.001;
        locationobj.rotation.z += rotation.z * 0.001;
      }
    });

    const selectedLocation = useSystemViewStore(
      ({ selectedLocation }) => selectedLocation
    );

    const [showLabels, setShowLabels] = useState(false);

    useEffect(() => {
      if (selectedLocation === symbol) {
        const timeout = setTimeout(() => setShowLabels(true), 3000);
        return () => clearTimeout(timeout);
      } else setShowLabels(false);
    }, [selectedLocation]);

    return (
      <mesh
        ref={(el) => {
          locationObjRef.current = el;

          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
        }}
        position={[x, y, z]}
      >
        {type !== 'WORMHOLE' ? (
          <sphereGeometry args={[radius]} />
        ) : (
          <torusGeometry args={[radius, radius / 5, 12, 24]} />
        )}
        <meshStandardMaterial color={0x3b82ff} wireframe />
        <Html center>
          <div
            className={clsx(
              '-translate-y-[28vh] whitespace-nowrap text-center space-y-2 transition-opacity duration-300 ease-out',
              showLabels ? 'opacity-100' : 'opacity-0'
            )}
          >
            <div className='text-3xl font-medium'>{name}</div>
            <div className='text-2xl font-mono opacity-70'>{symbol}</div>
          </div>
        </Html>
        <Html center>
          <div
            className={clsx(
              'translate-y-[28vh] whitespace-nowrap text-center space-y-2 transition-opacity duration-300 ease-out',
              showLabels ? 'opacity-100' : 'opacity-0'
            )}
          >
            <div className='text-3xl font-medium'>
              {startCase(type.toLowerCase())}
            </div>
            <div className='text-2xl font-mono opacity-70'>
              X{x} , Y{y}
            </div>
          </div>
        </Html>
      </mesh>
    );
  }
);

export default LocationObj;
