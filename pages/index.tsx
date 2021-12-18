import WithAuth from '@astralstonk/utils/withAuth';
import Head from 'next/head';
import React, { VFC } from 'react';

const Home: VFC = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>Home</div>
    </>
  );
};

export default WithAuth(Home);
