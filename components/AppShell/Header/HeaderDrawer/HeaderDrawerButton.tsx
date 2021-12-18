import ButtonBase from '@mui/material/ButtonBase';
import { NextLinkComposed } from '@astralstonk/components/common/Link';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { VFC } from 'react';

type HeaderDrawerButtonProps = {
  label: string;
  icon: JSX.Element;
  href?: string;
  onClick?: () => void;
};

const HeaderDrawerButton: VFC<HeaderDrawerButtonProps> = ({
  label,
  icon,
  href,
  onClick,
}) => {
  const router = useRouter();

  return (
    <ButtonBase
      className={clsx(
        'p-4 flex justify-start items-center transition-colors rounded-[6px]',
        href && router.pathname === href
          ? 'bg-purple-500/60'
          : 'hover:bg-white/30'
      )}
      component={href ? NextLinkComposed : 'button'}
      to={href ? { pathname: href } : undefined}
      onClick={onClick}
      focusRipple
    >
      {icon}
      <div className='ml-4 font-medium'>{label}</div>
    </ButtonBase>
  );
};

export default HeaderDrawerButton;
