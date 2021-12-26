import { SystemLocationsResponse } from '@astralstonk/api/systems/types';
import CameraController from '@astralstonk/components/systems/SystemView/SystemScene/CameraController';
import { SystemViewContext } from '@astralstonk/components/systems/SystemView/SystemView';
import { hashStringToInt } from '@astralstonk/utils/hashStringToInt';
import { seededRandFloatSpread } from '@astralstonk/utils/seededRandFloatSpread';
import { Canvas } from '@react-three/fiber';
import clsx from 'clsx';
import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  VFC,
} from 'react';
import { Mesh } from 'three';

type SystemSceneProps = SystemLocationsResponse;

const SystemScene: VFC<SystemSceneProps> = ({ locations }) => {
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

  const [isCanvasReady, setIsCanvasReady] = useState(false);

  const locationObjsRef = useRef<(Mesh | null)[]>([]);

  const { selectedLocationIndex } = useContext(SystemViewContext);
  const selectedLocationObjRef = useRef<Mesh | null>(null);

  useEffect(() => {
    if (selectedLocationIndex !== null)
      selectedLocationObjRef.current =
        locationObjsRef.current[selectedLocationIndex];
  }, [selectedLocationIndex]);

  return (
    <div className='absolute inset-0'>
      <Canvas
        className={clsx(
          'transition-opacity duration-500',
          isCanvasReady ? 'opacity-100' : 'opacity-0'
        )}
        gl={{ antialias: false }}
        camera={{ position: [0, 0, 150] }}
        onCreated={() => setIsCanvasReady(true)}
      >
        <CameraController selectedLocationObjRef={selectedLocationObjRef} />
        <ambientLight color={0xffffff} />
        {locationsData.map(({ symbol, x, y, z }, index) => (
          <mesh
            ref={(el) => (locationObjsRef.current[index] = el)}
            key={symbol}
            position={[x, y, z]}
          >
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

export default SystemScene;
