import { IcosahedronGeometryProps } from '@react-three/fiber';
import React, { VFC } from 'react';

type PlanetGeometryProps = IcosahedronGeometryProps;

const PlanetGeometry: VFC<PlanetGeometryProps> = (props) => {
  return <icosahedronGeometry {...props} />;
};

export default PlanetGeometry;
