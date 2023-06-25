import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { 
  countryCodes, 
  getUser, 
  toastSuccess, 
  toastError,
  authFireBase,
  getCountryCode,
} from '../utils';

import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

import { isEmpty } from 'lodash';

import axios from 'axios';

const useSettingsChangePhoneNumber = () => {
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const [otpErrorMessage, setOtpErrorMessage] = useState(null);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleOtpOpenModal = () => {
    setOtpModalOpen(true);
    onRegisterOtp();
  };

  const handleOtpCloseModal = () => {
    setOtpModalOpen(false)
  }

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
    signInWithPhoneNumber(authFireBase, phoneNumber, appVerifier)
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
        axios.patch(`users/${getUser().id}`, { countryCode, phoneNumber })
          .then(() => {
            setOtpLoading(false);
            toastSuccess('Phone number successfully updated.');

            const tempUser = getUser();
            tempUser.phoneNumber = phoneNumber;
            tempUser.countryCode = countryCode;
            localStorage.setItem('user', JSON.stringify(tempUser));

            setOtpErrorMessage(null);
            handleOtpCloseModal();
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

  const onSubmit = async (data) => {
    if (typeof data.countryCode === 'object') {
      data.countryCode = `${data.countryCode.name} ${data.countryCode.dial_code}`;
    }

    const countryCode = data.countryCode.substring(0, data.countryCode.indexOf('+')).trim();
    setCountryCode(data.countryCode);
    setPhoneNumber(`${getCountryCode(countryCode)}${data.phoneNumber}`);
  };

  useEffect(() => {
    const country = getUser().countryCode.substring(0, getUser().countryCode.indexOf('+')).trim();
    setValue('countryCode', countryCodes[countryCodes.findIndex(i => i.name === country)]);
    setValue('phoneNumber', getUser().phoneNumber.replace(getCountryCode(country), ''));
  }, []);

  useEffect(() => {
    if (!isEmpty(phoneNumber)) {
      handleOtpOpenModal();
    }
  }, [countryCode, phoneNumber]);

  return {
    countryCodes,
    register,
    setValue,
    fieldErrors: errors,
    handleSubmit,
    getUser,
    onSubmit,
    apiErrorMessage,
    otpModalOpen,
    handleOtpCloseModal,
    onOtpVerify,
    otpErrorMessage,
    otpLoading,
  };
};

export default useSettingsChangePhoneNumber;