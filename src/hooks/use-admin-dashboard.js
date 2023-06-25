import { useState, useEffect } from 'react';

import { toastError, toastSuccess } from '../utils'; 

import axios from 'axios';

const useAdminDashboard = () => {
  const [usersCount, setUsersCount] = useState(0);

  const [driversCount, setDriversCount] = useState(0);

  const [carsCount, setCarsCount] = useState(0);

  const [promoCodesCount, setPromoCodesCount] = useState(0);

  const fetchUsersCount = async () => {
    axios.get('/users/count')
      .then(({data}) => {
        setUsersCount(data.data.count);
      }) 
      .catch(err => {
        toastError(err);
      })
  };

  const fetchDriversCount = async () => {
    axios.get('/drivers/count')
      .then(({data}) => {
        setDriversCount(data.data.count);
      }) 
      .catch(err => {
        toastError(err);
      })
  };

  const fetchCarsCount = async () => {
    axios.get('/cars/count')
      .then(({data}) => {
        setCarsCount(data.data.count);
      }) 
      .catch(err => {
        toastError(err);
      })
  };

  const fetchPromoCodesCount = async () => {
    axios.get('/promo-codes/count')
      .then(({data}) => {
        setPromoCodesCount(data.data.count);
      }) 
      .catch(err => {
        toastError(err);
      })
  };

  useEffect(() => {
    fetchUsersCount();
    fetchDriversCount();
    fetchCarsCount();
    fetchPromoCodesCount();
  }, []);

  return {
    usersCount,
    driversCount,
    carsCount,
    promoCodesCount,
  };
};

export default useAdminDashboard;