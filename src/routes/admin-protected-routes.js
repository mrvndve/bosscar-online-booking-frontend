import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

const AdminProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();

  const bossCarToken = localStorage.getItem('bossCarToken');

  const loggedInAs = localStorage.getItem('loggedInAs');

  const UNAUTH_ROUTES = [
    '/admin/login',
    '/admin/forgot-password',
  ];

  useEffect(() => {
    if (!bossCarToken) {
      if (!UNAUTH_ROUTES.includes(window.location.pathname)) {
        navigate('/admin/login');
      }
    } else {
      if (UNAUTH_ROUTES.includes(window.location.pathname)) {
        navigate('/admin');
      }
      
      if (loggedInAs === 'Customer') {
        navigate('/');
      }
    }
  }, [bossCarToken, navigate]);

  return <>
    {children}
  </>
};

export default AdminProtectedRoutes;