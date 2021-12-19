import React, { useContext, VFC } from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { NextLinkComposed } from '@astralstonk/components/common/Link';
import FadeIn from '@astralstonk/components/common/FadeIn';
import { SidebarContext } from '@astralstonk/components/AppShell/Sidebar/Sidebar';

type SidebarButtonProps = {
  label: string;
  icon: JSX.Element;
  href?: string;
  onClick?: () => void;
};

const SidebarButton: VFC<SidebarButtonProps> = ({
  label,
  icon,
  href,
  onClick,
}) => {
  const router = useRouter();
  const { isExpanded } = useContext(SidebarContext);

  return (
    <ButtonBase
      className={clsx(
        'p-4 flex justify-start items-center transition-all overflow-hidden group',
        isExpanded ? 'rounded-[6px]' : 'rounded-[28px]',
        href && router.pathname === href
          ? 'bg-purple-500/60'
          : 'bg-white/10 hover:bg-white/30'
      )}
      component={href ? NextLinkComposed : 'button'}
      to={href ? { pathname: href } : undefined}
      onClick={onClick}
      focusRipple
      aria-label={label.toLowerCase()}
    >
      {icon}
      <FadeIn isIn={isExpanded}>
        <div className='ml-4 font-medium'>{label}</div>
      </FadeIn>
    </ButtonBase>
  );
};

export default SidebarButton;
