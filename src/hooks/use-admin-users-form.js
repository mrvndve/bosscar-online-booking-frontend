import { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { 
  useNavigate, 
  useParams,
  useLocation,
} from 'react-router';

import axios from 'axios';

import { toastError, toastSuccess, getCountryCode, countryCodes } from '../utils';

import moment from 'moment';

const useAdminUsersForm = () => {
  const [loading, setLoading] = useState(false);

  const { formMode } = useParams();

  const { state: selectedRow } = useLocation();

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm();

  const onSubmit = async data => {
    if (typeof data.countryCode === 'object') {
      data.countryCode = `${data.countryCode.name} ${data.countryCode.dial_code}`;
    }
    const countryCode = data.countryCode.substring(0, data.countryCode.indexOf('+')).trim();
    data.phoneNumber = `${getCountryCode(countryCode)}${data.phoneNumber}`;

    data.birthday = new Date(data.birthday);
    const apiData = { ...data };

    setLoading(true);

    if (formMode === 'create') {
      createData(apiData);
    } else {
      updateData(apiData);
    }
  };

  const createData = async (apiData) => {
    await axios.post('/users', apiData)
      .then(({data}) => {
        if (data.status === 'success') {
          toastSuccess(data.message);
          reset();
          navigate('/admin/users');
        } else {
          toastError(data.message);
        }

        setLoading(false);
      })
      .catch(err => {
        toastError(err);
        setLoading(false);
      });
  }

  const updateData = async (apiData) => {
    await axios.patch(`/users/${selectedRow.id}`, apiData)
      .then(({data}) => {
        if (data.status === 'success') {
          toastSuccess('Data successfully updated.');
          reset();
          navigate('/admin/users');
        } else {
          toastError(data.message);
        }

        setLoading(false);
      })
      .catch(err => {
        toastError(err);
        setLoading(false);
      });
  }

  // Did Mount
  useEffect(() => {
    if (formMode === 'edit') {
      setValue('birthday', moment(selectedRow.birthday).format('YYYY-MM-DD'));

      const country = selectedRow.countryCode.substring(0, selectedRow.countryCode.indexOf('+')).trim();
      setValue('countryCode', countryCodes[countryCodes.findIndex(i => i.name === country)]);
      setValue('phoneNumber', selectedRow.phoneNumber.replace(getCountryCode(country), ''));
    }
  }, []);

  return {
    navigate,
    formMode,
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    loading,
    selectedRow,
  };
};

export default useAdminUsersForm;