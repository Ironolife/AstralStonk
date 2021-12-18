import WithAuth from '@astralstonk/utils/withAuth';
import Head from 'next/head';
import React, { VFC } from 'react';

const Leaderboard: VFC = () => {
  return (
    <>
      <Head>
        <title>Leaderboard</title>
      </Head>
      <div>Leaderboard</div>
    </>
  );
};

export default WithAuth(Leaderboard);
