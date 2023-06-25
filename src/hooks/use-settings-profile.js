import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { 
  countryCodes, 
  getUser, 
  toastSuccess, 
  toastError,
} from '../utils';

import axios from 'axios';

const useSettingsProfile = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    data.birthday = new Date(data.birthday);

    axios.patch(`users/${getUser().id}`, data)
      .then(() => {
        const newUserData = Object.assign(getUser(), data);
        localStorage.setItem('user', JSON.stringify(newUserData));

        setLoading(false);
        toastSuccess('Profile successfully updated.');
      })
      .catch(err => {
        setLoading(false);
        toastError(err.message);
      });
  };

  return {
    countryCodes,
    register,
    setValue,
    fieldErrors: errors,
    handleSubmit,
    getUser,
    onSubmit,
    loading,
  };
};

export default useSettingsProfile;