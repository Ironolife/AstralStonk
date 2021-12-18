import WithAuth from '@astralstonk/utils/withAuth';
import Head from 'next/head';
import React, { VFC } from 'react';

const Systems: VFC = () => {
  return (
    <>
      <Head>
        <title>Systems</title>
      </Head>
      <div>Systems</div>
    </>
  );
};

export default WithAuth(Systems);
