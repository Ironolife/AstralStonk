import { getSystemLocations } from '@astralstonk/api/systems/systems';
import QueryWrapper from '@astralstonk/components/common/QueryWrapper';
import SystemScene from '@astralstonk/components/systems/SystemScene';
import WithAuth from '@astralstonk/utils/withAuth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { VFC } from 'react';
import { useQuery } from 'react-query';

const System: VFC = () => {
  const router = useRouter();
  const { data, status } = useQuery(
    ['systemLocations', router.query.systemSymbol as string] as const,
    ({ queryKey: [, systemSymbol] }) => getSystemLocations(systemSymbol)
  );

  return (
    <>
      <Head>
        <title>Systems</title>
      </Head>
      <QueryWrapper data={data} status={status}>
        {(data) => <SystemScene {...data} />}
      </QueryWrapper>
    </>
  );
};

export default WithAuth(System);
