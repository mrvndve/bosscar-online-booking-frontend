import {
  Dashboard,
  People,
  Accessible,
  DirectionsCar,
  Paid,
  Add,
  Edit,
  Discount,
  Settings,
  Person,
  Lock,
  Phone,
  EventNote,
} from '@mui/icons-material';

const breadCrumbsbUrl = (pathname) => {
  const isCreate = pathname.split('/').includes('create');

  const links = [
    {
      pathname: '/admin',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          active: true,
        },
      ],
    },
    {
      pathname: '/admin/users',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Users',
          icon: <People fontSize='inherit'/>,
          active: true,
        },
      ],
    },
    {
      pathname: `/admin/users/${isCreate ? 'create' : 'edit'}`,
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Users',
          icon: <People fontSize='inherit'/>,
          to: '/admin/users'
        },
        {
          label: isCreate ? 'Add' : 'Edit',
          icon: isCreate ? <Add fontSize='inherit'/> : <Edit fontSize='inherit'/>,
          active: true,
        }
      ]
    },
    {
      pathname: '/admin/drivers',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Drivers',
          icon: <Accessible fontSize='inherit'/>,
          active: true,
        },
      ],
    },
    {
      pathname: `/admin/drivers/${isCreate ? 'create' : 'edit'}`,
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Drivers',
          icon: <Accessible fontSize='inherit'/>,
          to: '/admin/drivers'
        },
        {
          label: isCreate ? 'Add' : 'Edit',
          icon: isCreate ? <Add fontSize='inherit'/> : <Edit fontSize='inherit'/>,
          active: true,
        }
      ]
    },
    {
      pathname: '/admin/cars',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Cars',
          icon: <DirectionsCar fontSize='inherit'/>,
          active: true,
        },
      ],
    },
    {
      pathname: `/admin/cars/${isCreate ? 'create' : 'edit'}`,
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Cars',
          icon: <DirectionsCar fontSize='inherit'/>,
          to: '/admin/cars'
        },
        {
          label: isCreate ? 'Add' : 'Edit',
          icon: isCreate ? <Add fontSize='inherit'/> : <Edit fontSize='inherit'/>,
          active: true,
        }
      ]
    },
    {
      pathname: '/admin/promo-codes',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Promo Codes',
          icon: <Discount fontSize='inherit'/>,
          active: true,
        },
      ],
    },
    {
      pathname: `/admin/promo-codes/${isCreate ? 'create' : 'edit'}`,
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Promo Codes',
          icon: <Discount fontSize='inherit'/>,
          to: '/admin/promo-codes'
        },
        {
          label: isCreate ? 'Add' : 'Edit',
          icon: isCreate ? <Add fontSize='inherit'/> : <Edit fontSize='inherit'/>,
          active: true,
        }
      ]
    },
    {
      pathname: '/admin/qoutations',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Qoutations',
          icon: <EventNote fontSize='inherit'/>,
          active: true,
        },
      ],
    },
    {
      pathname: '/admin/transactions',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Transactions',
          icon: <Paid fontSize='inherit'/>,
          active: true,
        },
      ],
    },
    {
      pathname: '/admin/settings/profile',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Settings',
          icon: <Settings fontSize='inherit'/>,
          active: true,
        },
        {
          label: 'Profile',
          icon: <Person fontSize='inherit'/>,
          active: true,
        }
      ],
    },
    {
      pathname: '/admin/settings/change-password',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Settings',
          icon: <Settings fontSize='inherit'/>,
          active: true,
        },
        {
          label: 'Change Password',
          icon: <Lock fontSize='inherit'/>,
          active: true,
        }
      ],
    },
    {
      pathname: '/admin/settings/change-phone-number',
      link: [
        {
          label: 'Dashboard',
          icon: <Dashboard fontSize='inherit'/>,
          to: '/admin',
        },
        {
          label: 'Settings',
          icon: <Settings fontSize='inherit'/>,
          active: true,
        },
        {
          label: 'Change Phone Number',
          icon: <Phone fontSize='inherit'/>,
          active: true,
        }
      ],
    },
  ];

  const findLink = links.find(i => i.pathname === pathname);
  return findLink ? findLink.link : [];
};

export default breadCrumbsbUrl;