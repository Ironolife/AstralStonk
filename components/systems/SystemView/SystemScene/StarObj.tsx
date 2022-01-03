import { hashStringToInt } from '@astralstonk/utils/hashStringToInt';
import { seededRandomFloatSpread } from '@astralstonk/utils/seededRandom';
import React, { forwardRef, useMemo, useRef, VFC } from 'react';
import { Mesh } from 'three';

type StarObjProps = {
  symbol: string;
};

const StarObj = forwardRef<Mesh, StarObjProps>(({ symbol }, ref) => {
  const starObjRef = useRef<Mesh | null>(null);

  const { x, y, z } = useMemo(
    () => ({
      x: seededRandomFloatSpread(400, hashStringToInt(`${symbol}_x`)),
      y: seededRandomFloatSpread(400, hashStringToInt(`${symbol}_y`)),
      z: seededRandomFloatSpread(400, hashStringToInt(`${symbol}_z`)),
    }),
    []
  );

  return (
    <mesh
      ref={(el) => {
        starObjRef.current = el;

        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
      }}
      position={[x, y, z]}
    >
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial color={0xffffff} />
    </mesh>
  );
});

export default StarObj;
