import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { isEmpty } from 'lodash';

const useCustomerHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [anchor, setAnchor] = useState(null);

  const openAccMenu = Boolean(anchor);

  const navigate = useNavigate();

  const loggedIn = localStorage.getItem('bossCarToken') 
    && !isEmpty(localStorage.getItem('bossCarToken')) 
    && localStorage.getItem('loggedInAs') === 'Customer';

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenAccMenu = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleCloseAccMenu = () => {
    setAnchor(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const scrollIntoView = (id) => {
    navigate('/')
    
    setTimeout(() => {
      document.getElementById(id).scrollIntoView();
    }, 10);
  };

  return {
    handleDrawerToggle,
    handleOpenAccMenu,
    handleCloseAccMenu,
    handleLogout,
    scrollIntoView,

    loggedIn,
    mobileOpen,
    openAccMenu,
    anchor,
    navigate,
  };
};

export default useCustomerHeader;