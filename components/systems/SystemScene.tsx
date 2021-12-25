import { SystemLocationsResponse } from '@astralstonk/api/systems/types';
import { hashStringToInt } from '@astralstonk/utils/hashStringToInt';
import { seededRandFloatSpread } from '@astralstonk/utils/seededRandFloatSpread';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import debounce from 'lodash/debounce';
import React, { useEffect, useRef, useState, VFC } from 'react';
import * as THREE from 'three';

type SystemSceneProps = SystemLocationsResponse;

const SystemScene: VFC<SystemSceneProps> = ({ locations }) => {
  const sceneRef = useRef<HTMLDivElement>(null);

  const [scene] = useState(new THREE.Scene());
  const [renderer] = useState(new THREE.WebGLRenderer());
  const [camera] = useState(new THREE.PerspectiveCamera(65, 1, 0.1, 1000));

  const [locationObjs, setLocationObjs] = useState<THREE.Mesh[]>([]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedLocationObject = useRef<THREE.Mesh | null>(null);
  const cameraRotation = useRef(camera.rotation.clone());

  const theme = useTheme();

  // Initialize scene
  useEffect(() => {
    // Set camera
    camera.position.z = 150;

    // Set background
    scene.background = new THREE.Color(
      parseInt(theme.palette.background.default.replace('#', ''), 16)
    );

    // Set lighting
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    // Add locations
    const locationObjs = locations.map(({ type, name, x, y, traits }) => {
      const locationObj = new THREE.Mesh(
        new THREE.SphereGeometry(0.5),
        new THREE.MeshStandardMaterial({ color: 0x3b82ff, wireframe: true })
      );

      const z = seededRandFloatSpread(20, hashStringToInt(`${name}_Z`));
      locationObj.position.set(x, y, z);

      return locationObj;
    });
    setLocationObjs(locationObjs);
    scene.add(...locationObjs);

    // Add Stars
    const starObjs = new Array(400).fill(null).map((_, index) => {
      const starObj = new THREE.Mesh(
        new THREE.SphereGeometry(0.1),
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
        })
      );

      const [x, y, z] = ['X', 'Y', 'Z'].map((v) =>
        seededRandFloatSpread(200, hashStringToInt(`OE_STAR_${index}_${v}`))
      );
      starObj.position.set(x, y, z);

      return starObj;
    });

    scene.add(...starObjs);

    // const gridHelper = new THREE.GridHelper(200, 50);
    // scene.add(gridHelper);
  }, []);

  const onResize = (width: number, height: number) => {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const animate = () => {
    requestAnimationFrame(animate);

    if (selectedLocationObject.current) {
      const target = selectedLocationObject.current;

      const d = target.position.distanceTo(camera.position);

      const direction = new THREE.Vector3(
        target.position.x - camera.position.x,
        target.position.y - camera.position.y,
        target.position.z - camera.position.z
      ).normalize();

      if (d > 2.5) {
        camera.position.x += direction.x * d * 0.01;
        camera.position.y += direction.y * d * 0.01;
        camera.position.z += direction.z * d * 0.01;
      }

      const quaternion = new THREE.Quaternion().setFromEuler(
        cameraRotation.current
      );
      camera.quaternion.rotateTowards(quaternion, 0.01);
    }

    renderer.render(scene, camera);
  };

  // Append canvas
  useEffect(() => {
    const sceneDiv = sceneRef.current;

    if (sceneDiv) {
      onResize(sceneDiv.clientWidth, sceneDiv.clientHeight);
      sceneDiv.appendChild(renderer.domElement);

      // Animation Loop
      animate();
    }
  }, [!!sceneRef.current]);

  // Handle canvas resize
  useEffect(() => {
    const sceneDiv = sceneRef.current;

    if (sceneDiv) {
      const resizeObserver = new ResizeObserver(
        debounce((entries) => {
          onResize(entries[0].contentRect.width, entries[0].contentRect.height);
        }, 100)
      );

      resizeObserver.observe(sceneDiv);

      return () => resizeObserver.disconnect();
    }
  }, [!!sceneRef.current]);

  const zoomToLocation = () => {
    selectedLocationObject.current = locationObjs[selectedIndex];
    setSelectedIndex((selectedIndex + 1) % locations.length);

    const dummy = camera.clone();
    dummy.lookAt(locationObjs[selectedIndex].position);

    cameraRotation.current = dummy.rotation;
  };

  return (
    <>
      <div className='absolute inset-0 overflow-hidden' ref={sceneRef} />
      <Button variant='contained' onClick={zoomToLocation}>
        Cycle
      </Button>
    </>
  );
};

export default SystemScene;
