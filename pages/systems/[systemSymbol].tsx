import {
  getSystem,
  getSystemLocations,
} from '@astralstonk/api/systems/systems';
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
    ['systemView', router.query.systemSymbol as string] as const,
    async ({ queryKey: [, systemSymbol] }) => {
      const p1 = getSystem(systemSymbol);
      const p2 = getSystemLocations(systemSymbol);

      const [{ system }, { locations }] = await Promise.all([p1, p2]);
      return { system, locations };
    }
  );

  return (
    <>
      <Head>
        <title>Systems / {router.query.systemSymbol}</title>
      </Head>
      <QueryWrapper data={data} status={status}>
        {(data) => <SystemView {...data} />}
      </QueryWrapper>
    </>
  );
};

export default WithAuth(System);
