import { SystemLocationsResponse } from '@astralstonk/api/systems/types';
import { hashStringToInt } from '@astralstonk/utils/hashStringToInt';
import { seededRandFloatSpread } from '@astralstonk/utils/seededRandFloatSpread';
import { Canvas } from '@react-three/fiber';
import React, { useMemo, VFC } from 'react';

type _SystemSceneProps = SystemLocationsResponse;

const _SystemScene: VFC<_SystemSceneProps> = ({ locations }) => {
  const locationsData = useMemo(
    () =>
      locations.map((location) => ({
        ...location,
        z: seededRandFloatSpread(20, hashStringToInt(`${location.name}_Z`)),
      })),
    [locations]
  );

  const starData = useMemo(
    () =>
      new Array(400).fill(null).map((_, index) => ({
        x: seededRandFloatSpread(200, hashStringToInt(`OE_STAR_${index}_X`)),
        y: seededRandFloatSpread(200, hashStringToInt(`OE_STAR_${index}_Y`)),
        z: seededRandFloatSpread(200, hashStringToInt(`OE_STAR_${index}_Z`)),
      })),
    []
  );

  return (
    <div className='absolute inset-0'>
      <Canvas camera={{ fov: 65, position: [0, 0, 150] }}>
        <ambientLight color={0xffffff} />
        {locationsData.map(({ symbol, x, y, z }) => (
          <mesh key={symbol} position={[x, y, z]}>
            <sphereGeometry args={[0.5]} />
            <meshStandardMaterial color={0x3b82ff} wireframe />
          </mesh>
        ))}
        {starData.map(({ x, y, z }, index) => (
          <mesh key={index} position={[x, y, z]}>
            <sphereGeometry args={[0.1]} />
            <meshStandardMaterial color={0xffffff} />
          </mesh>
        ))}
      </Canvas>
    </div>
  );
};

export default _SystemScene;
