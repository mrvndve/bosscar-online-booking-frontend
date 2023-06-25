import { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { 
  useNavigate, 
  useParams,
  useLocation,
} from 'react-router';

import axios from 'axios';

import { toastError, toastSuccess, priceFormatter } from '../utils';

const useAdminCarsForm = () => {
  const [loading, setLoading] = useState(false);

  const [fileUpload, setFileUpload] = useState(null);

  const [fileName, setFileName] = useState(null);

  const { formMode } = useParams();

  const { state: selectedRow } = useLocation();

  const navigate = useNavigate();

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onUpload = (e) => {
    const file = e.target.files[0];
    const uniqueDate = Date.now();
    setFileUpload(file);
    setFileName(`${uniqueDate}-${file.name}`);
    setValue('image', `${uniqueDate}-${file.name}`);
  };

  const uploadingFile = async () => {
    const formData = new FormData();

    formData.append('file-upload', fileUpload);

    await axios.post(`/files?customFileName=${fileName}`, formData)
      .then(({data}) => {
      })
      .catch(err => {
        toastError(err);
      })
  };

  const onSubmit = async data => {
    data.totalPrice = parseFloat(priceFormatter(data.totalPrice));
    data.capacity = parseInt(data.capacity);
  
    const apiData = { ...data };

    setLoading(true);

    if (formMode === 'create') {
      createData(apiData);
    } else {  
      updateData(apiData);
    }
  };

  const createData = async (apiData) => {
    await axios.post('/cars', apiData)
      .then(({data}) => {
        if (data.status === 'success') {
          uploadingFile();
          toastSuccess('Data successfully saved.');
          reset();
          navigate('/admin/cars');
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
    await axios.patch(`/cars/${selectedRow.id}`, apiData)
      .then(({data}) => {
        if (data.status === 'success') {
          uploadingFile();
          toastSuccess('Data successfully updated.');
          reset();
          navigate('/admin/cars');
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
    onUpload,
  };
};

export default useAdminCarsForm;