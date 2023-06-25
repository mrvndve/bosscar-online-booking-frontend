import { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { 
  useNavigate, 
  useParams,
  useLocation,
} from 'react-router';

import axios from 'axios';

import { 
  toastError, 
  toastSuccess, 
  getCountryCode, 
  countryCodes,
} from '../utils';

import moment from 'moment';

const useAdminDriversForm = () => {
  const [loading, setLoading] = useState(false);

  const [cars, setCars] = useState([]);

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

  const fetchCars = async () => {
    axios.get('/cars')
      .then(({data}) => {
        setCars(data.datas);
      })
      .catch(err => {
        toastError(err);
      })
  };

  const onSubmit = async data => {
    data.carId = parseInt(data.carId);

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
    await axios.post('/drivers', apiData)
      .then(({data}) => {
        if (data.status === 'success') {
          toastSuccess('Data successfully saved.');
          reset();
          navigate('/admin/drivers');
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
    await axios.patch(`/drivers/${selectedRow.id}`, apiData)
      .then(({data}) => {
        if (data.status === 'success') {
          toastSuccess('Data successfully updated.');
          reset();
          navigate('/admin/drivers');
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
    fetchCars();

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
    cars,
  };
};

export default useAdminDriversForm;