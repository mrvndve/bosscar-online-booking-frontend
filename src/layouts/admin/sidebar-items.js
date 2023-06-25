import { 
  Dashboard,
  People,
  Accessible,
  DirectionsCar,
  Discount,
  Paid,
  Settings,
  Person,
  Lock,
  Phone,
  EventNote,
} from '@mui/icons-material';

const sidebarItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Dashboard />,
    path: '/admin',
  },
  {
    id: 'users',
    label: 'Users',
    icon: <People />,
    path: '/admin/users',
  },
  {
    id: 'cars',
    label: 'Cars',
    icon: <DirectionsCar />,
    path: '/admin/cars',
  },
  {
    id: 'drivers',
    label: 'Drivers',
    icon: <Accessible />,
    path: '/admin/drivers',
  },
  {
    id: 'promo-codes',
    label: 'Promo Codes',
    icon: <Discount />,
    path: '/admin/promo-codes',
  },
  {
    id: 'qoutations',
    label: 'Qoutations',
    icon: <EventNote />,
    path: '/admin/qoutations',
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: <Paid />,
    path: '/admin/transactions',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings />,
    path: '/admin/settings',
    subItem: [
      {
        id: 'settings-profile',
        label: 'Profile',
        icon: <Person />,
        path: '/admin/settings/profile',
      },
      {
        id: 'settings-change-password',
        label: 'Change Password',
        icon: <Lock />,
        path: '/admin/settings/change-password',
      },
      {
        id: 'settings-change-phone-number',
        label: 'Change Phone Number',
        icon: <Phone />,
        path: '/admin/settings/change-phone-number',
      },
    ]
  },
];

export default sidebarItems;