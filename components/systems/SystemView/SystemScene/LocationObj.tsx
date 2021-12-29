import { SystemLocation } from '@astralstonk/@types/location';
import PlanetGeometry from '@astralstonk/components/systems/SystemView/SystemScene/PlanetGeometry';
import { useSystemViewStore } from '@astralstonk/stores/systemView.store';
import { hashStringToInt } from '@astralstonk/utils/hashStringToInt';
import { seededRandomFloatSpread } from '@astralstonk/utils/seededRandom';
import { Html } from '@react-three/drei/web/Html';
import { useFrame } from '@react-three/fiber';
import clsx from 'clsx';
import startCase from 'lodash/startCase';
import React, { forwardRef, useMemo, useRef } from 'react';
import { Mesh } from 'three';

type LocationObjProps = SystemLocation & {
  z: number;
};

const LocationObj = forwardRef<Mesh, LocationObjProps>(
  ({ symbol, type, name, x, y, z }, ref) => {
    const locationObjRef = useRef<Mesh | null>(null);

    const radius = useMemo(() => 0.5, []);

    const rotation = useMemo(
      () => ({
        x: seededRandomFloatSpread(2, hashStringToInt(`${symbol}_rotation_x`)),
        y: seededRandomFloatSpread(2, hashStringToInt(`${symbol}_rotation_y`)),
        z: seededRandomFloatSpread(2, hashStringToInt(`${symbol}_rotation_z`)),
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

    return (
      <mesh
        ref={(el) => {
          locationObjRef.current = el;

          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
        }}
        position={[x, y, z]}
      >
        {type === 'PLANET' && <PlanetGeometry args={[radius, 8]} />}
        {type === 'MOON' && <icosahedronGeometry args={[radius, 8]} />}
        {type === 'WORMHOLE' && (
          <torusGeometry args={[radius, radius / 5, 12, 24]} />
        )}
        <meshStandardMaterial
          color='grey'
          roughness={0.8}
          metalness={0.5}
          wireframe
        />
        <group>
          <Html center>
            <div
              className={clsx(
                '-translate-y-[28vh] whitespace-nowrap text-center space-y-2 transition-opacity duration-300',
                selectedLocation === symbol
                  ? 'opacity-100 delay-[3s]'
                  : 'opacity-0'
              )}
            >
              <div className='text-xl font-medium'>{name}</div>
              <div className='text-lg font-mono opacity-70'>{symbol}</div>
            </div>
          </Html>
          <Html center>
            <div
              className={clsx(
                'translate-y-[28vh] whitespace-nowrap text-center space-y-2 transition-opacity duration-300',
                selectedLocation === symbol
                  ? 'opacity-100 delay-[3s]'
                  : 'opacity-0'
              )}
            >
              <div className='text-xl font-medium'>
                {startCase(type.toLowerCase())}
              </div>
              <div className='text-lg font-mono opacity-70'>
                X{x} , Y{y}
              </div>
            </div>
          </Html>
        </group>
      </mesh>
    );
  }
);

export default LocationObj;
