import { useFrame, useThree } from '@react-three/fiber';
import { MutableRefObject, useEffect, useRef, VFC } from 'react';
import * as THREE from 'three';
import { Mesh } from 'three';

type CameraControllerProps = {
  selectedLocationObjRef: MutableRefObject<Mesh | null>;
};

const CameraController: VFC<CameraControllerProps> = ({
  selectedLocationObjRef,
}) => {
  const get = useThree((state) => state.get);
  const finalRotation = useRef(new THREE.Euler());

  useEffect(() => {
    if (selectedLocationObjRef.current) {
      const dummyCamera = get().camera.clone();
      dummyCamera.lookAt(selectedLocationObjRef.current.position);
      finalRotation.current = dummyCamera.rotation;
    }
  }, [selectedLocationObjRef.current]);

  useFrame(({ camera }) => {
    if (selectedLocationObjRef.current) {
      const target = selectedLocationObjRef.current;

      const distance = target.position.distanceTo(camera.position);

      const direction = new THREE.Vector3(
        target.position.x - camera.position.x,
        target.position.y - camera.position.y,
        target.position.z - camera.position.z
      ).normalize();

      // Zoom in
      if (distance > 2.5) {
        camera.position.x += direction.x * distance * 0.01;
        camera.position.y += direction.y * distance * 0.01;
        camera.position.z += direction.z * distance * 0.01;
      }

      // Zoom out
      if (distance < 2) {
        camera.position.x -= direction.x * distance * 0.01;
        camera.position.y -= direction.y * distance * 0.01;
        camera.position.z -= direction.z * distance * 0.01;
      }

      camera.quaternion.rotateTowards(
        new THREE.Quaternion().setFromEuler(finalRotation.current),
        0.01
      );
    }
  });

  return null;
};

export default CameraController;
