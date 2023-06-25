import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router';

import { 
  toastError, 
  authFireBase, 
  getCountryCode, 
  countryCodes,
} from '../utils';

import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

import { useForm } from 'react-hook-form';

import axios from 'axios';

import { isEmpty } from 'lodash';

const useCustomerSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [formMode, setFormMode] = useState('REGISTER');
  const [registeredMessage, setRegisteredMessage] = useState('');
  const [userToRegister, setUserToRegister] = useState({});

  const {
    setValue,
    register,
    unregister,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
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
    signInWithPhoneNumber(authFireBase, userToRegister.phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setLoading(false);
        setFormMode('VERIFY_OTP');
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
        delete userToRegister.confirmPassword;
        await axios.post('/users/register', userToRegister)
          .then(({data}) => {
            if (data.status === 'success') {
              setRegisteredMessage(`Your account are now registered, you can now login your new account.`);
            } else {
              setRegisteredMessage('Register account failed, please try again.');
            }

            setFormMode('REGISTER_ACCOUNT_STATUS');
            setLoading(false);
          })
          .catch(err => {
            toastError(err.message);
          });
      })
      .catch((error) => {
        setApiErrorMessage('Verification failed, please try again.');
        setLoading(false);
      });
  };

  const onSubmit = async (data) => {
    if (formMode === 'REGISTER') {
      if (typeof data.countryCode === 'object') {
        data.countryCode = `${data.countryCode.name} ${data.countryCode.dial_code}`;
      }
      const countryCode = data.countryCode.substring(0, data.countryCode.indexOf('+')).trim();
      data.phoneNumber = `${getCountryCode(countryCode)}${data.phoneNumber}`;
  
      data.role = 'client';
      data.status = 'active';

      setUserToRegister(data);
      setFormMode('VERIFY_OTP')
    } else if (formMode === 'VERIFY_OTP') {
      onOtpVerify(data.verifyOtp);
    }
  };

  useEffect(() => {
    setApiErrorMessage('');

    if (formMode === 'REGISTER') {
      reset();
      setValue('countryCode', countryCodes[countryCodes.findIndex(i => i.name === 'Philippines')]);
      unregister('verifyOtp');
    } else if (formMode === 'VERIFY_OTP') {
      reset();
      unregister('phoneNumber');
      unregister('email');
      unregister('firstName');
      unregister('middleName');
      unregister('lastName');
      unregister('birthday');
      unregister('address');
    }
  }, [formMode]);

  useEffect(() => {
    if (!isEmpty(userToRegister)) {
      onRegisterOtp();
    }
  }, [userToRegister])

  return {
    navigate,
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    loading,
    apiErrorMessage,
    formMode,
    setFormMode,
    registeredMessage,
    getValues,
  };
};

export default useCustomerSignUp;