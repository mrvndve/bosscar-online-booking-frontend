import { useState, useEffect, useRef } from 'react';

import { useLocation } from 'react-router-dom';

import { 
  getUser, 
  toastError, 
  PAYMENT_METHODS,
} from '../utils';

import axios from 'axios';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom'; 

import { Convert } from 'easy-currencies';

import { isEmpty } from 'lodash';

const useCustomerCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [selectedMop, setSelectedMop] = useState(PAYMENT_METHODS.CASH_ON_PICKUP);
  const [leavingPage, setLeavingPage] = useState(false);
  const [transaction, setTransaction] = useState(null);
  const [isPaymentProcessed, setIsPaymentProcessed] = useState(false);

  const navigate = useNavigate();

  const { 
    state: {
      selectedCarId,
      selectedCar,
      pickupLocation, 
      returnLocation, 
      pickupDate, 
      returnDate, 
      totalRentalFee,
      totalPrice,
      promoCode,
    },
    state: pageCurrentStates,
  } = useLocation();

  const {
    register,
    formState: { errors },
    getValues,
  } = useForm();

  const onMopChange = (value) => {
    setSelectedMop(value);
  }

  const onClickCancelBooking = () => {
    setLeavingPage(true);
  };

  const onCloseLeavePageDialog = () => {
    setLeavingPage(false);
  };

  const onConfirmLeavePage = () => {
    navigate('/');
  };

  const processTransactionPayment = async () => {
    setLoading(true);
    setIsPaymentProcessed(false);

    const paymentPayload = {
      transactionId: transaction.id,
      mopId: selectedMop,
      countryCode: getValues('countryCode'),
      phoneNumber: getValues('phoneNumber'),
      firstName: getValues('firstName'),
      lastName: getValues('lastName'),
    };

    await axios.post('/payments', paymentPayload)
      .then(({data}) => {
        if (data.status === 'success') {
          setIsPaymentProcessed(true);

          if (selectedMop === PAYMENT_METHODS.CASH_ON_PICKUP) {
            navigate(`/bookings/${transaction.id}`);
          }
        } else {
          toastError('Payment Failed, please try again.');
          setIsPaymentProcessed(false);
        }

        setLoading(false);
      })
      .catch(err => {
        toastError(err.message);
        setLoading(false);
        setIsPaymentProcessed(false);
      })
  };

  const processTransaction = async () => {
    setLoading(true);

    const transactionPayload = {
      userId: getUser().id,
      carId: parseFloat(selectedCarId),
      pickUpLocation: pickupLocation,
      destinationLocation: returnLocation,
      pickUpDatetime: new Date(pickupDate),
      returnDatetime: new Date(returnDate),
      totalPrice: parseFloat(totalPrice),
    }

    if (!isEmpty(promoCode)) {
      transactionPayload.promoCodeId = parseFloat(promoCode.id);
    }

    await axios.post('/transactions', transactionPayload)
      .then(({data}) => {
        if (data.status === 'success') {
          setTransaction(data.data);
        } else {
          toastError('Process Transaction Failed, please try again.');
        }

        setLoading(false);
      })
      .catch(err => {
        toastError(err.message);
        setLoading(false);
      });
  };

  const processTransactionFinish = async () => {
    setLoading(true);

    await axios.patch(`/transactions-finish/${transaction.id}`)
      .then(({data}) => {
        if (data.status === 'success') {
          navigate(`/bookings/${transaction.id}`);
        } else {
          toastError('Finish Transaction Failed, please try again.');
        }

        setLoading(false);
      })
      .catch(err => {
        toastError(err.message);
        setLoading(false);
      })
  };

  // For Cash on Pickup
  const onCashPickUp = () => {
    const isBillinInfoIncomplete = isEmpty(getValues('countryCode')) || isEmpty(getValues('phoneNumber'))
      || isEmpty(getValues('firstName')) || isEmpty(getValues('lastName'));
    
    if (!isBillinInfoIncomplete) {
      processTransaction();
    } else {
      toastError('Billing information is incomplete.')
    }
  };

  // For Paypal
  const paypalCreateOrder = async (data, actions) => {
    const isBillinInfoIncomplete = isEmpty(getValues('countryCode')) || isEmpty(getValues('phoneNumber'))
      || isEmpty(getValues('firstName')) || isEmpty(getValues('lastName'));
  
    if (!isBillinInfoIncomplete) {
      const value = await Convert(totalPrice).from('PHP').to('USD');
      return actions.order.create({
        purchase_units: [{ currency_ocde: 'USD', amount: { value: parseFloat(value).toFixed(2) } }],
      });
    } else {
      toastError('Billing information is incomplete.')
    }
  };

  const paypalOnApprove = (data, actions) => {
    return actions.order.capture().then(response => {
      if (response.status === 'COMPLETED') {
        processTransaction();
      } else {
        toastError('Transaction Failed, please try again.');
      }
    })
  };

  const paypalOnCancel = (data) => {
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (transaction) {
      processTransactionPayment();
    }
  }, [transaction]);

  useEffect(() => {
    if (isPaymentProcessed && selectedMop === PAYMENT_METHODS.PAYPAL) {
      processTransactionFinish();
    }
  }, [isPaymentProcessed]);

  return {
    register,
    fieldErrors: errors,
    getValues,

    loading,
    pickupLocation,
    returnLocation,
    pickupDate,
    returnDate,
    selectedCar,
    totalRentalFee,
    totalPrice,
    promoCode,

    selectedMop,
    onMopChange,

    paypalCreateOrder,
    paypalOnApprove,
    paypalOnCancel,

    onClickCancelBooking,

    onCloseLeavePageDialog,
    onConfirmLeavePage,
    leavingPage,

    onCashPickUp,
  }
};

export default useCustomerCheckout;