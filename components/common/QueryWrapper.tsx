import DelayedSpinner from '@astralstonk/components/common/DelayedSpinner';
import FadeIn from '@astralstonk/components/common/FadeIn';
import React, { PropsWithChildren, ReactNode, VFC } from 'react';
import { UseQueryResult } from 'react-query';

const DefaultError: VFC = () => (
  <div className='text-center py-4'>Failed To load</div>
);

const DefaultLoading: VFC = () => (
  <div className='text-center py-4'>
    <DelayedSpinner color='inherit' />
  </div>
);

type QueryWrapperProps<T> = {
  data?: T;
  status: UseQueryResult['status'];
  renderIdle?: ReactNode;
  renderError?: ReactNode;
  renderLoading?: ReactNode;
  children: (data: T) => JSX.Element;
};

const QueryWrapper = <T extends any>({
  data,
  status,
  renderIdle,
  renderError,
  renderLoading,
  children,
}: PropsWithChildren<QueryWrapperProps<T>>) => {
  if (status === 'idle') return <>{renderIdle}</> ?? null;

  return (
    <>
      {status === 'error' && (renderError ?? <DefaultError />)}
      {status === 'loading' && (renderLoading ?? <DefaultLoading />)}
      <FadeIn isIn={status === 'success'}>{children(data!)}</FadeIn>
    </>
  );
};

export default QueryWrapper;
