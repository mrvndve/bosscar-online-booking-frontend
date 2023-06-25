import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router';

import { toastError, countryCodes, getCountryCode } from '../utils';

import { useForm } from 'react-hook-form';

import axios from 'axios';

const useAdminLogin = () => {
  const [bossCarToken, setBossCarToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);

    if (typeof data.countryCode === 'object') {
      data.countryCode = `${data.countryCode.name} ${data.countryCode.dial_code}`;
    }
    const countryCode = data.countryCode.substring(0, data.countryCode.indexOf('+')).trim();
    data.phoneNumber = `${getCountryCode(countryCode)}${data.phoneNumber}`;

    const apiData = {
      ...data,
      adminLogin: true,
    };

    await axios.post('/users/login', apiData)
      .then(({data}) => {
        if (data.status !== 'error') {
          setBossCarToken(data.token);

          localStorage.clear();
          localStorage.setItem('bossCarToken', data.token);
          localStorage.setItem('user', JSON.stringify(data.data));
          localStorage.setItem('loggedInAs', 'Admin');
        } else {
          setApiErrorMessage('Incorrect credentials, please try again.');
        }

        setLoading(false);
      })
      .catch(err => {
        toastError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setValue('countryCode', countryCodes[countryCodes.findIndex(i => i.name === 'Philippines')]);
  }, []);

  useEffect(() => {
    if (bossCarToken) {
      navigate('/admin');
      window.location.reload();
    }
  }, [bossCarToken]);

  return {
    navigate,
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    loading,
    apiErrorMessage,
  };
};

export default useAdminLogin;