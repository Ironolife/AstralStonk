import HomeIcon from '@mui/icons-material/Home';
import AnimatedLeaderboardIcon from '@astralstonk/components/icons/AnimatedLeaderboard';
import PublicIcon from '@mui/icons-material/Public';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

export const getRoutes = (pathName: string) => [
  {
    label: 'Home',
    icon: <HomeIcon />,
    href: '/',
  },
  {
    label: 'Ships',
    icon: <RocketLaunchIcon />,
    href: '/ships',
  },
  {
    label: 'Systems',
    icon: <PublicIcon />,
    href: '/systems',
  },
  {
    label: 'Loans',
    icon: <LocalAtmIcon />,
    href: '/loans',
  },
  {
    label: 'Leaderboard',
    icon: <AnimatedLeaderboardIcon animate={pathName === '/leaderboard'} />,
    href: '/leaderboard',
  },
];
