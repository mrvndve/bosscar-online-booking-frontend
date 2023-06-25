import { useEffect, useState } from 'react';

import axios from 'axios';

import { 
  MAPBOX_API_KEY, 
  ONLINE_RENTAL_TOGGLE_ENABLED, 
  toastError, 
  getCountryCode,
} from '../utils';

import { isEmpty, uniqBy } from 'lodash';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router';

const useCustomerHome = () => {
  const [cars, setCars] = useState([]);

  const [pickupLocation, setPickupLocation] = useState(null);
  const [pickupSuggestedPlaces, setPickupSuggestedPlaces] = useState(null);

  const [returnLocation, setRetunLocation] = useState(null);
  const [returnSuggestedPlaces, setReturnSuggestedPlaces] = useState(null);

  const [isReserveVehicleModalOpen, setIsReserveVehicleModalOpen] = useState(false);
  const [reservationFormLoading, setReservationFormLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
    setValue,
  } = useForm();

  const navigate = useNavigate();

  const handlePickupLocationChange = (value) => {
    setPickupLocation(value);
  };
  
  const handleReturnLocationChange = (value) => {
    setRetunLocation(value);
  };

  const getSuggestedPlaces = async (mode) => {
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

  const fetchCars = () => {
    axios.get('/cars')
      .then(({data}) => {
        let filter = data.datas.filter(i => i.status === 'active');
        filter = uniqBy(filter, 'brand');
        setCars(filter);
      })
      .catch(err => {
        toastError(err);
      })
  };

  const onSubmit = async (data) => {
    const {
      pickupLocation,
      returnLocation,
      pickupDate,
      returnDate,
    } = data;

    if (ONLINE_RENTAL_TOGGLE_ENABLED) {
      navigate(`/choose-vehicle?pickupLocation=${pickupLocation}&returnLocation=${returnLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`);
    } else {
      if (typeof data.countryCode === 'object') {
        data.countryCode = `${data.countryCode.name} ${data.countryCode.dial_code}`;
      }
      const countryCode = data.countryCode.substring(0, data.countryCode.indexOf('+')).trim();
      data.phoneNumber = `${getCountryCode(countryCode)}${data.phoneNumber}`;

      data.name = `${data.suffix} ${data.name}`;
      delete data.suffix;

      const apiData = {
        fullName: data.name,
        countryCode: data.countryCode,
        phoneNumber: data.phoneNumber,
        email: data.email,
        pickUpLocation: data.pickupLocation,
        returnLocation: data.returnLocation,
        pickUpDatetime: data.pickupDate,
        returnDatetime: data.returnDate,
      };

      setReservationFormLoading(true);

      axios.post('/reservations', apiData)
        .then(({data}) => {
          reset();
          setValue('pickupLocation', null);
          setValue('returnLocation', null);
          setValue('countryCode', null);
          setValue('suffix', null);
          setReservationFormLoading(false);
          setIsReserveVehicleModalOpen(true);
        })
        .catch(err => {
          toastError(err.message);
          setReservationFormLoading(false);
        })
    }
  };

  const handleReserveVehicleClick = () => {
    if (ONLINE_RENTAL_TOGGLE_ENABLED) {
      navigate('/choose-vehicle');
    } else {
      setTimeout(() => {
        document.getElementById('reserve-vehicle').scrollIntoView();
      }, 10);
    }
  };
  
  const handleReserveVehicleClose = () => {
    setIsReserveVehicleModalOpen(false);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    if (!isEmpty(pickupLocation)) {
      getSuggestedPlaces('pickup');
    } else {
      setPickupSuggestedPlaces([]);
    }
  }, [pickupLocation]);

  useEffect(() => {
    if (!isEmpty(returnLocation)) {
      getSuggestedPlaces('return');
    } else {
      setReturnSuggestedPlaces([]);
    }
  }, [returnLocation]);

  return { 
    cars,
    register,
    handleSubmit,
    fieldErrors: errors,
    onSubmit,
    navigate,
    getValues,

    handlePickupLocationChange,
    pickupSuggestedPlaces,

    handleReturnLocationChange,
    returnSuggestedPlaces,

    isReserveVehicleModalOpen,
    handleReserveVehicleClick,
    handleReserveVehicleClose,
    reservationFormLoading,
  }
};

export default useCustomerHome;