
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router';

import { 
  toastError, 
  authFireBase, 
  countryCodes, 
  getCountryCode,
} from '../utils';

import { useForm } from 'react-hook-form';

import axios from 'axios';

import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

import { isEmpty } from 'lodash';

const useAdminForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formMode, setFormMode] = useState('forgot-password');
  const [otpErrorMessage, setOTPErrorMessage] = useState('');
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');

  const {
    setValue,
    register,
    unregister,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

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
    onCaptchaVerify();
    setLoading(true);
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(authFireBase, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setLoading(false);
        setFormMode('otp');
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        toastError(error.message)
        setLoading(false);
      });
  };

  const onOtpVerify = (otp) => {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        await axios.post('/users/forgot-password', { phoneNumber })
          .then(({data}) => {
            if (data.status === 'success') {
              setForgotPasswordMessage(`Your password has been changed successfully, here is your ${data.message}`);
            } else {
              setForgotPasswordMessage('Password changed failed, please try again.');
            }

            setFormMode('password-changed');
            setLoading(false);
          })
          .catch(err => {
            toastError(err.message);
          });
      })
      .catch((error) => {
        setOTPErrorMessage('Verification failed, please try again.');
        setLoading(false);
      });
  };

  const onSubmit = async (data) => {
    if (formMode === 'forgot-password') {
      if (typeof data.countryCode === 'object') {
        data.countryCode = `${data.countryCode.name} ${data.countryCode.dial_code}`;
      }
      const countryCode = data.countryCode.substring(0, data.countryCode.indexOf('+')).trim();
      data.phoneNumber = `${getCountryCode(countryCode)}${data.phoneNumber}`;
      setPhoneNumber(data.phoneNumber);
    } else {
      onOtpVerify(data.otp);
    }
  };

  useEffect(() => {
    if (!isEmpty(phoneNumber)) {
      onRegisterOtp();
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (formMode === 'forgot-password') {
      unregister('otp');
      setValue('countryCode', countryCodes[countryCodes.findIndex(i => i.name === 'Philippines')]);
    } else if (formMode === 'otp') {
      unregister('countryCode');
      unregister('phoneNumber');
    }
  }, [formMode]);

  return {
    navigate,
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    loading,
    formMode,
    otpErrorMessage,
    forgotPasswordMessage,
  };
};

export default useAdminForgotPassword;