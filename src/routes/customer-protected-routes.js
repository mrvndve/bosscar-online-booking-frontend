import axios from 'axios';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const CustomerProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();

  const bossCarToken = localStorage.getItem('bossCarToken');

  const loggedInAs = localStorage.getItem('loggedInAs');

  const UNAUTH_ROUTES = [
    '/sign-in',
    '/forgot-password',
    '/register',
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (bossCarToken) {
      if (UNAUTH_ROUTES.includes(window.location.pathname)) {
        navigate('/');
      }

      if (loggedInAs === 'Admin') {
        navigate('/admin');
      }
    }
  }, [bossCarToken, navigate]);

  return <>
    {children}
  </>
};

export default CustomerProtectedRoutes;