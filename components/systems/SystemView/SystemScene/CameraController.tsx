import { easeInOutCubic } from '@astralstonk/utils/easing';
import { animated, useSpring } from '@react-spring/three';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef, useState, VFC } from 'react';
import * as THREE from 'three';
import { Mesh } from 'three';

type CameraControllerProps = {
  target: Mesh | null;
};

const INITIAL_POSITION = new THREE.Vector3(0, 0, 150);
const INITIAL_ROTATION = new THREE.Euler();

const CameraController: VFC<CameraControllerProps> = ({ target }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const set = useThree(({ set }) => set);
  const size = useThree(({ size }) => size);

  useEffect(() => {
    if (cameraRef.current) set({ camera: cameraRef.current });
  }, [cameraRef.current]);

  const [finalPosition, setFinalPosition] = useState(INITIAL_POSITION);
  const [finalRotation, setFinalRotation] = useState(INITIAL_ROTATION);

  useEffect(() => {
    if (!cameraRef.current) return;

    if (target) {
      const dummyCamera = cameraRef.current.clone();

      // Calculate final position
      const distance = target.position.distanceTo(dummyCamera.position);

      const direction = new THREE.Vector3(
        target.position.x - dummyCamera.position.x,
        target.position.y - dummyCamera.position.y,
        target.position.z - dummyCamera.position.z
      ).normalize();

      const position = new THREE.Vector3(
        dummyCamera.position.x + direction.x * (distance - 2.5),
        dummyCamera.position.y + direction.y * (distance - 2.5),
        dummyCamera.position.z + direction.z * (distance - 2.5)
      );

      // Calculate final rotation
      dummyCamera.lookAt(target.position);

      const rotation = dummyCamera.rotation.clone();

      setFinalPosition(position);
      setFinalRotation(rotation);
    } else {
      setFinalPosition(INITIAL_POSITION);
      setFinalRotation(INITIAL_ROTATION);
    }
  }, [target]);

  const springProps = useSpring({
    position: [finalPosition.x, finalPosition.y, finalPosition.z],
    rotation: [finalRotation.x, finalRotation.y, finalRotation.z],
    config: {
      easing: easeInOutCubic,
      duration: 3000,
    },
  });

  return (
    <animated.perspectiveCamera
      ref={cameraRef}
      aspect={size.width / size.height}
      {...(springProps as any)}
      onUpdate={(self) => self.updateProjectionMatrix()}
    />
  );
};

export default CameraController;
