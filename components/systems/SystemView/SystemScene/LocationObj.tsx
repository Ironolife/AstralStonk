import { SystemLocation } from '@astralstonk/@types/location';
import { hashStringToInt } from '@astralstonk/utils/hashStringToInt';
import { seededRandomFloatSpread } from '@astralstonk/utils/seededRandom';
import { useFrame } from '@react-three/fiber';
import React, { forwardRef, useMemo, useRef } from 'react';
import { Mesh } from 'three';

type LocationObjProps = SystemLocation & {
  z: number;
};

const LocationObj = forwardRef<Mesh, LocationObjProps>(
  ({ symbol, x, y, z }, ref) => {
    const locationObjRef = useRef<Mesh | null>(null);

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

    return (
      <mesh
        ref={(el) => {
          locationObjRef.current = el;

          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
        }}
        position={[x, y, z]}
      >
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial color={0x3b82ff} wireframe />
      </mesh>
    );
  }
);

export default LocationObj;
