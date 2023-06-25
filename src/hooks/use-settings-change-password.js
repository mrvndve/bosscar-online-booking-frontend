import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { 
  getUser, 
  toastSuccess, 
  toastError,
  authFireBase,
} from '../utils';

import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

import axios from 'axios';

import { isEmpty } from 'lodash';

const useSettingsChangePassword = () => {
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [apiData, setApiData] = useState({});

  const [otpErrorMessage, setOtpErrorMessage] = useState(null);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();

  const onCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
        size: "invisible",
        callback: (response) => {
          // onRegisterOtp();
        },
      }, authFireBase);
    }
  };

  const onRegisterOtp = () => {
    onCaptchaVerify();;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(authFireBase, apiData.phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        toastError(error.message)
      });
  };

  const onOtpVerify = (otp) => {
    setOtpLoading(true);

    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        axios.post('users/change-password', apiData)
          .then(({data}) => {
            if (data.status === 'success') {
              setOtpLoading(false);
              toastSuccess('Password successfully updated.');
              handleOtpCloseModal();
              setOtpErrorMessage(null);
              reset();
            } else {
              setOtpLoading(false);
              setApiErrorMessage('Invalid credentials, please input valid old password.');
              handleOtpCloseModal();
            }
          })
          .catch(err => {
            setOtpLoading(false);
            toastError(err.message);
          });
      })
      .catch((error) => {
        setOtpLoading(false);
        setOtpErrorMessage('Verification failed, please try again.');
      });
  };

  const handleOtpCloseModal = () => {
    setOtpModalOpen(false);
    reset();
  }

  const onSubmit = async (data) => {
    setApiData({
      userId: getUser().id,
      ...data,
      phoneNumber: getUser().phoneNumber,
    });
  };

  useEffect(() => {
    if (!isEmpty(apiData)) {
      setOtpModalOpen(true);
      onRegisterOtp();
    }
  }, [apiData])

  return {
    register,
    fieldErrors: errors,
    handleSubmit,
    onSubmit,
    getValues,

    apiErrorMessage,
    otpErrorMessage,
    handleOtpCloseModal,
    otpModalOpen,
    onOtpVerify,
    otpLoading,
  };
};

export default useSettingsChangePassword;