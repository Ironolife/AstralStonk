import WithAuth from '@astralstonk/utils/withAuth';
import Head from 'next/head';
import React, { VFC } from 'react';

const Loans: VFC = () => {
  return (
    <>
      <Head>
        <title>Loans</title>
      </Head>
      <div>Loans</div>
    </>
  );
};

export default WithAuth(Loans);
