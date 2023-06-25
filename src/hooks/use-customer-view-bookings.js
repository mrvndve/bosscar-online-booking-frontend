import { useState, useEffect } from 'react';

import axios from 'axios';

import { toastError } from '../utils';

import { useParams, useNavigate } from 'react-router';

import QRCode from 'qrcode';

const useCustomerViewBookings = () => {
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState({});
  const [qrCode, setQrCode] = useState(null);

  const navigate = useNavigate();

  const { transactionId } = useParams();

  const fetchBooking = async () => {
    setLoading(true);
    axios.get(`/transactions/${transactionId}`)
      .then(({data}) => {
        setBooking(data.data);
        setLoading(false);
      })
      .catch(err => {
        toastError(err);
        setLoading(false);
      });
  };

  const generateQRCode = async () => {
    try {
      setQrCode(await QRCode.toDataURL(`${process.env.REACT_APP_HOST}/bookings/${transactionId}`));
    } catch (err) {
      toastError(err.message);
    }
  };

  const onClickBackToBookings = () => {
    navigate('/bookings');
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  useEffect(() => {
    generateQRCode();
  }, [booking]);

  return {
    loading,
    booking,
    qrCode,
    onClickBackToBookings,
  }
};

export default useCustomerViewBookings;