import { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { 
  useNavigate, 
  useParams,
  useLocation,
} from 'react-router';

import axios from 'axios';

import { toastError, toastSuccess, priceFormatter } from '../utils';

import moment from 'moment';

const useAdminPromoCodesForm = () => {
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]);

  const { formMode } = useParams();

  const { state: selectedRow } = useLocation();

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm();

  const onSubmit = async data => {
    const apiData = { ...data };
    apiData.userId = parseInt(apiData.userId);
    apiData.value = parseFloat(priceFormatter(apiData.value));
    apiData.startDate = new Date(apiData.startDate);
    apiData.endDate = new Date(apiData.endDate);

    setLoading(true);

    if (formMode === 'create') {
      createData(apiData);
    } else {  
      updateData(apiData);
    }
  };

  const fetchUsers = async () => {
    axios.get('/users')
      .then(({data}) => {
        setUsers(data.datas);
      })
      .catch(err => {
        toastError(err);
      });
  };

  const createData = async (apiData) => {
    await axios.post('/promo-codes', apiData)
      .then(({data}) => {
        if (data.status === 'success') {
          toastSuccess('Data successfully saved.');
          reset();
          navigate('/admin/promo-codes');
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
    await axios.patch(`/promo-codes/${selectedRow.id}`, apiData)
      .then(({data}) => {
        if (data.status === 'success') {
          toastSuccess('Data successfully updated.');
          reset();
          navigate('/admin/promo-codes');
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
    fetchUsers();

    if (formMode === 'edit') {
      setValue('startDate', moment(selectedRow.startDate).format('YYYY-MM-DD'));
      setValue('endDate', moment(selectedRow.endDate).format('YYYY-MM-DD'));
    } else {
      setValue('code', `${Math.random().toString(36).slice(2, 7)}-${Math.random().toString(36).slice(2, 7)}-${Math.random().toString(36).slice(2, 7)}`);
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
    users,
  };
};

export default useAdminPromoCodesForm;