import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
export const SidebarDataEst = [
  {
    title: 'Perfil',
    icon: <AccountCircleIcon />,
    link: '/Perfil',
  },
  {
    title: 'Main',
    icon: <HomeIcon />,
    link: '/Main',
  },
  {
    title: 'Tareas',
    icon: <LibraryBooksIcon />,
    link: '/Tareas',
  },
  {
    title: 'Cursos',
    icon: <HomeWorkIcon />,
    link: '/Cursos',
  },
  {
    title: 'Calendario',
    icon: <CalendarMonthIcon />,
    link: '/Calendario',
  }
];
