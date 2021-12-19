import AnimatedLeaderboardIcon from '@astralstonk/components/icons/AnimatedLeaderboard';
import AnimatedLocalAtmIcon from '@astralstonk/components/icons/AnimatedLocalAtm';
import AnimatedPublicIcon from '@astralstonk/components/icons/AnimatedPublic';
import AnimatedRocketIcon from '@astralstonk/components/icons/AnimatedRocketLaunch';

export const routes = [
  {
    label: 'Ships',
    icon: <AnimatedRocketIcon />,
    href: '/ships',
  },
  {
    label: 'Systems',
    icon: <AnimatedPublicIcon />,
    href: '/systems',
  },
  {
    label: 'Loans',
    icon: <AnimatedLocalAtmIcon />,
    href: '/loans',
  },
  {
    label: 'Leaderboard',
    icon: <AnimatedLeaderboardIcon />,
    href: '/leaderboard',
  },
];
