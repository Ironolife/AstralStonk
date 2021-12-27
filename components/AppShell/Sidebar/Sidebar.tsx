import { routes } from '@astralstonk/components/AppShell/routes';
import SidebarButton from '@astralstonk/components/AppShell/Sidebar/SidebarButton';
import AnimatedSettingsIcon from '@astralstonk/components/icons/AnimatedSettings';
import { useToggle } from '@astralstonk/hooks/useToggle';
import StartIcon from '@mui/icons-material/Start';
import clsx from 'clsx';
import React, { createContext, VFC } from 'react';

export const SidebarContext = createContext({
  isExpanded: false,
  toggleIsExpanded: () => {},
});

const Sidebar: VFC = () => {
  const [isExpanded, toggleIsExpanded] = useToggle(false);

  return (
    <SidebarContext.Provider value={{ isExpanded, toggleIsExpanded }}>
      <nav
        className={clsx(
          'hidden md:flex flex-col justify-between space-y-2 p-2 overflow-x-hidden transition-all w-full',
          isExpanded ? 'max-w-[256px]' : 'max-w-[72px]'
        )}
      >
        <div className='flex flex-col space-y-2'>
          {routes.map((route) => (
            <SidebarButton key={route.to.pathname} {...route} />
          ))}
        </div>
        <div className='flex flex-col space-y-2'>
          <SidebarButton
            label='Settings'
            icon={<AnimatedSettingsIcon />}
            to={{ pathname: '/settings' }}
          />
          <SidebarButton
            label={isExpanded ? 'Collapse' : 'Expand'}
            icon={
              <StartIcon
                className={clsx(
                  'transition-transform',
                  isExpanded ? 'rotate-180' : 'rotate-0'
                )}
              />
            }
            onClick={toggleIsExpanded}
          />
        </div>
      </nav>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
