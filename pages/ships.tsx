import WithAuth from '@astralstonk/utils/withAuth';
import Head from 'next/head';
import React, { VFC } from 'react';

const Ships: VFC = () => {
  return (
    <>
      <Head>
        <title>Ships</title>
      </Head>
      <div>Ships</div>
    </>
  );
};

export default WithAuth(Ships);
