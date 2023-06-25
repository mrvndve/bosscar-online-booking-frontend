import { useState, useEffect } from 'react';

import axios from 'axios';

import { getUser, toastError } from '../utils';

import { useNavigate } from 'react-router';

const useCustomerBookings = () => {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  const navigate = useNavigate();

  const fetchBookings = async () => {
    setLoading(true);
    axios.get('/transactions', { params: { where: { user: getUser().id } } })
      .then(({data}) => {
        setBookings(data.datas);
        setLoading(false);
      })
      .catch(err => {
        toastError(err);
        setLoading(false);
      });
  };

  const onClickViewBooking = (transId) => {
    navigate(`/bookings/${transId}`)
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return {
    loading,
    bookings,
    onClickViewBooking,
  }
};

export default useCustomerBookings;