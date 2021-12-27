import AnimatedLeaderboardIcon from '@astralstonk/components/icons/AnimatedLeaderboard';
import AnimatedLocalAtmIcon from '@astralstonk/components/icons/AnimatedLocalAtm';
import AnimatedPublicIcon from '@astralstonk/components/icons/AnimatedPublic';
import AnimatedRocketIcon from '@astralstonk/components/icons/AnimatedRocketLaunch';

export const routes = [
  {
    label: 'Ships',
    icon: <AnimatedRocketIcon />,
    to: {
      pathname: '/ships',
    },
  },
  {
    label: 'Systems',
    icon: <AnimatedPublicIcon />,
    to: {
      pathname: '/systems/[systemSymbol]',
      query: {
        systemSymbol: 'OE',
      },
    },
  },
  {
    label: 'Loans',
    icon: <AnimatedLocalAtmIcon />,
    to: {
      pathname: '/loans',
    },
  },
  {
    label: 'Leaderboard',
    icon: <AnimatedLeaderboardIcon />,
    to: {
      pathname: '/leaderboard',
    },
  },
];
