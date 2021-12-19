import AnimatedLeaderboardIcon from '@astralstonk/components/icons/AnimatedLeaderboard';
import AnimatedLocalAtmIcon from '@astralstonk/components/icons/AnimatedLocalAtm';
import AnimatedPublicIcon from '@astralstonk/components/icons/AnimatedPublic';
import AnimatedRocketIcon from '@astralstonk/components/icons/AnimatedRocketLaunch';
import HomeIcon from '@mui/icons-material/Home';

export const routes = [
  {
    label: 'Home',
    icon: <HomeIcon />,
    href: '/',
  },
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
