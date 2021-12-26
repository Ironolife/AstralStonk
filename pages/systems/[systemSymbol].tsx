import { getSystemLocations } from '@astralstonk/api/systems/systems';
import QueryWrapper from '@astralstonk/components/common/QueryWrapper';
import SystemView from '@astralstonk/components/systems/SystemView/SystemView';
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
        {(data) => <SystemView {...data} />}
      </QueryWrapper>
    </>
  );
};

export default WithAuth(System);
