import { useState, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import { MAPBOX_API_KEY, toastError } from '../utils';

import axios from 'axios';

import { isEmpty } from 'lodash';

import moment from 'moment';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

const useCustomerChooseVehicle = () => {
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCar, setSelectedCar] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [totalHours, setTotalHours] = useState(null);
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoCodeErrorMessage, setPromoCodeErrorMessage] = useState(null);
  const [promoCode, setPromoCode] = useState(null);

  const [pickupLocationInput, setPickupLocationInput] = useState(null);
  const [pickupSuggestedPlaces, setPickupSuggestedPlaces] = useState(null);

  const [returnLocationInput, setRetunLocationInput] = useState(null);
  const [returnSuggestedPlaces, setReturnSuggestedPlaces] = useState(null);

  const navigate = useNavigate();

  const loggedIn = localStorage.getItem('bossCarToken') 
    && !isEmpty(localStorage.getItem('bossCarToken')) 
    && localStorage.getItem('loggedInAs') === 'Customer';

  const pickupLocation = searchParams.get('pickupLocation');
  const returnLocation = searchParams.get('returnLocation');
  const pickupDate = searchParams.get('pickupDate');
  const returnDate = searchParams.get('returnDate');
  const selectedCarId = searchParams.get('selectedCarId');

  const {
    setValue,
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    setIsEditMode(false);
    fetchCars();
  };
  
  const fetchCars = async () => {
    const config = { 
      params: { 
        pickUpDateTime: moment(pickupDate).format('YYYY-MM-DD HH:mm:ss'),
        returnDateTime: moment(returnDate).format('YYYY-MM-DD HH:mm:ss'),
      } 
    };

    setLoading(true);

    await axios.get('/cars', config)
      .then(({data}) => {
        setCars(data.datas);
        setLoading(false);
      })
      .catch(err => {
        toastError(err);
        setLoading(false);
      })
  };

  const handleInputsBlur = (key, value) => {
    let updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set(key, value);
    setSearchParams(updatedSearchParams.toString());
  };

  const onClickEdit = () => {
    setCars([]);
    setIsEditMode(true);
  };

  const onClickSelectCar = (id) => {
    handleInputsBlur('selectedCarId', id);
  };
  
  const onClickBackToSearch = () => {
    searchParams.delete('selectedCarId');
    setIsEditMode(false);
    setSearchParams(searchParams);
    setSelectedCar({});
  };

  const handlePromoCodeChange = (value) => {
    setPromoCodeInput(value);
  };

  const onClickPromoCode = () => {
    if (promoCodeInput !== '') {
      setLoading(true);

      axios.post('/promo-codes-search', { code: promoCodeInput })
        .then(({data}) => {
          if (data.status === 'success') {
            setPromoCode({
              id: data.data.id,
              code: data.data.code,
              value: data.data.value,
            })
          } else {
            setPromoCodeErrorMessage('Incorrect entered promo code.');
          }

          setLoading(false);
        })
        .catch(err => {
          toastError(err.message);
          setLoading(false);
        });
    } else {
      setPromoCodeErrorMessage('Please enter a promo code.');
    }
  };

  const handlePickupLocationChange = (value) => {
    setPickupLocationInput(value);
  };
  
  const handleReturnLocationChange = (value) => {
    setRetunLocationInput(value);
  };

  const getSuggestedPlaces = async (mode) => {
    const location = mode === 'pickup' ? pickupLocationInput : returnLocationInput;

    const types = ['place','country', 'region', 'district', 'address', 'locality', 'neighborhood', 'postcode'].toString();
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?bbox=116.88,4.65,126.55,20.72&types=${types}&country=ph&access_token=${MAPBOX_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    
    if (mode === 'pickup') {
      setPickupSuggestedPlaces(data.features);
    } else {
      setReturnSuggestedPlaces(data.features);
    }
  };

  const getSuggestedPlacesBySearchParams = async (mode) => {
    const location = mode === 'pickup' ? pickupLocation : returnLocation;

    const types = ['place','country', 'region', 'district', 'address', 'locality', 'neighborhood', 'postcode'].toString();
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?bbox=116.88,4.65,126.55,20.72&types=${types}&country=ph&access_token=${MAPBOX_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    
    if (mode === 'pickup') {
      setPickupSuggestedPlaces(data.features);
    } else {
      setReturnSuggestedPlaces(data.features);
    }
  };

  useEffect(() => {
    if (!isEmpty(pickupLocation) && !isEmpty(returnLocation) 
      && !isEmpty(pickupDate) && !isEmpty(returnDate)) {
      fetchCars();
      setIsEditMode(false);
    } else {
      setIsEditMode(true);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isEditMode) {
      getSuggestedPlacesBySearchParams('pickup');
      getSuggestedPlacesBySearchParams('return');

      setValue('pickupLocation', pickupLocation);
      setValue('returnLocation', returnLocation);
    }
  }, [isEditMode]);

  useEffect(() => {
    if (!isEmpty(cars) && !isEmpty(selectedCarId)) {
      let findCar = cars.find(i => i.id === parseInt(selectedCarId));
      setSelectedCar(findCar);

      const date1 = moment(new Date(pickupDate));
      const date2 = moment(new Date(returnDate));
      setTotalHours(date2.diff(date1, 'hours'));

      setPromoCodeInput('');
      setPromoCodeErrorMessage(null);
      setPromoCode(null);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [cars, selectedCarId]);

  useEffect(() => {
    if (!isEmpty(pickupLocationInput)) {
      getSuggestedPlaces('pickup');
    } else {
      setPickupSuggestedPlaces([]);
    }
  }, [pickupLocationInput]);

  useEffect(() => {
    if (!isEmpty(returnLocationInput)) {
      getSuggestedPlaces('return');
    } else {
      setReturnSuggestedPlaces([]);
    }
  }, [returnLocationInput]);

  const totalRentalFee = totalHours > 1  ? (totalHours * selectedCar.totalPrice) : selectedCar.totalPrice;

  const totalPrice = promoCode
    ? parseFloat(totalRentalFee - promoCode.value).toFixed(2) 
    : parseFloat(totalRentalFee).toFixed(2);

  const onClickConfirmCheckOut = () => {
    navigate('/check-out', { state: {
      selectedCarId,
      selectedCar,
      pickupLocation, 
      returnLocation, 
      pickupDate, 
      returnDate, 
      totalRentalFee,
      totalPrice,
      promoCode,
    }});
  };

  return {
    navigate,
    register,
    fieldErrors: errors,
    handleSubmit,
    getValues,
    onSubmit,
    loading,
    cars,
    handleInputsBlur,
    pickupLocation,
    returnLocation,
    pickupDate,
    returnDate,
    selectedCarId,
    onClickSelectCar,
    onClickBackToSearch,
    loggedIn,
    selectedCar,

    onClickEdit,
    isEditMode,

    totalRentalFee,
    totalPrice,

    onClickConfirmCheckOut,

    promoCodeInput,
    promoCodeErrorMessage,
    promoCode,
    handlePromoCodeChange,
    onClickPromoCode,

    handlePickupLocationChange,
    pickupSuggestedPlaces: pickupSuggestedPlaces ? pickupSuggestedPlaces.map(i => i.place_name) : [],

    handleReturnLocationChange,
    returnSuggestedPlaces: returnSuggestedPlaces ? returnSuggestedPlaces.map(i => i.place_name) : [],
  };
};

export default useCustomerChooseVehicle;