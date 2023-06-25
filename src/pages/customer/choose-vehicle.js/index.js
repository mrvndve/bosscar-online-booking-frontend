import { Fragment } from 'react';

import {
  Button, 
  Card, 
  DateTimeField, 
  EmptyBanner, 
  Loading,
  TextField,
  FormError,
} from '../../../components';

import { 
  CheckCircleOutline, 
  PeopleOutline, 
  PinOutlined,
  ArrowBack,
  ErrorOutline,
  Edit,
} from '@mui/icons-material';

import { 
  Autocomplete,
  Box,
} from '@mui/material';

import { apiDomain } from '../../../utils';

import { isEmpty } from 'lodash';

import moment from 'moment';

import useCustomerChooseVehicle from '../../../hooks/use-customer-choose-vehicle';


const MobileViewContainer = ({ children }) => {
  return <>
    <Box sx={{ display: { md: 'none' } }}>
      {children}
    </Box>
  </>
};

const WebViewContainer = ({ children }) => {
  return <>
    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
      {children}
    </Box>
  </>
};

const CustomerChooseVehiclePage = () => {
  const {
    navigate,
    loading,
    register,
    fieldErrors,
    handleSubmit,
    getValues,
    onSubmit,

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
    pickupSuggestedPlaces,

    handleReturnLocationChange,
    returnSuggestedPlaces,
  } = useCustomerChooseVehicle();

  const ChooseComponent = () => (      
    <div className='customer-page-container'>
      <div className='mb-5'>
        <h2>
          <span style={{ fontWeight: 600 }}>
            CHOOSE A VEHICLE
          </span>
        </h2>
      </div>
      
      <div>
        {cars.length > 0 
          ? (
            <div className='row g-4'>
              {cars.map((i, index) => (
                <Fragment key={index}>
                  <Card elevation={0} padding={35}>
                    <div className='row g-4'>
                      <div className='col-sm-12 col-md-6 col-lg-6 col-xl-3'>
                        <img style={{ height: 220, width: '100%' }} src={`${apiDomain}/uploads/${i.image}`}/>
                      </div>

                      <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                        <div className='mb-4'>
                          <span style={{ fontSize: 24, fontWeight: 600 }}>
                            <strong>
                              {i.brand}
                            </strong>
                          </span>
                        </div>

                        <div style={{ fontSize: 16, fontWeight: 400, color: '#484848' }}>
                          <div className='mb-4'>
                            <div className='mb-3 d-flex justify-content-between text-left'>
                              <span>
                                <PeopleOutline className='mx-2'/> Capacity:
                              </span>

                              <span>
                                {`${i.capacity} Seats`}
                              </span>
                            </div>

                            {/* <div className='mb-3 d-flex justify-content-between text-left'>
                              <span>
                                <PinOutlined className='mx-2'/> License Plate:
                              </span>

                              <span>
                                {i.licensePlate}
                              </span>
                            </div> */}

                            <div className='mb-3 d-flex justify-content-between text-left'>
                              <span>
                                <CheckCircleOutline className='mx-2'/> Car Status:
                              </span>

                              <span style={{ color: '#1DA955', fontWeight: 500 }}>
                                Available
                              </span>
                            </div>
                          </div>

                          {/* <div>
                            <span 
                              style={{
                                fontWeight: 500, 
                                color: 'black',
                                cursor: 'pointer',
                              }}>
                              More Details <ArrowForward/>
                            </span>
                          </div> */}
                        </div>
                      </div>

                      <div className='col-sm-12 col-md-12 col-lg-12 col-xl-5' align='right'>
                        <div className='row g-2 mt-5'>
                          <div className='col-12' style={{ fontWeight: 400, fontSize: 16 }} >
                            Total price
                          </div>

                          <div className='col-12' style={{ fontWeight: 500, fontSize: 32 }}>
                            PHP {i.totalPrice}
                          </div>

                          <div className='col-12' style={{ fontWeight: 400, fontSize: 16 }}>
                            per hour
                          </div>

                          <div className='col-12'>
                            <Button
                              style={{ width: 168 }}
                              label='SELECT'
                              onClick={() => onClickSelectCar(i.id)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Fragment>
              ))}
            </div>
          )
          : (
            <>
              <Card padding={30}>
                <EmptyBanner text='Enter Locations and Date Time'/>
              </Card>
            </>
          )
        }
      </div>
    </div>
  );

  const ChooseSummaryComponent = () => (
    <div className='customer-page-container'>
      <div className='mb-3'>
        <span 
          style={{ color: '#777777', cursor: 'pointer' }}
          onClick={() => onClickBackToSearch()}
        >
          <ArrowBack/> Back to Search
        </span>
      </div>

      <div className='mb-5'>
        <h2>
          <span style={{ fontWeight: 600 }}>
            REVIEW & RESERVE
          </span>
        </h2>
      </div>

      <div>
        <div className='row g-4'>
          <div className='col-sm-12 col-md-12 col-lg-12 col-xl-8'>
            {!loggedIn && (
              <div className='mb-4' style={{ padding: 16, backgroundColor: 'black' }}>
                <div className='row g-4'>
                  <div className='col-6'>
                    <span style={{ color: 'white', fontWeight: 400, fontSize: 16 }}>
                      <ErrorOutline style={{ color: 'red' }}/> You need to Sign In before moving to next step
                    </span>
                  </div>

                  <div className='col-6' align='right'>
                    <Button label='SIGN IN' onClick={() => navigate('/sign-in', { state: { fromPath: `${window.location.pathname}${window.location.search}` } })} />
                  </div>
                </div>
              </div>
            )}

            <div className='row g-4'>
              <div className='col-12'>
                <Card>
                  <div className='row g-5'>
                    <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                      <img style={{ height: 220, width: '100%' }} src={`${apiDomain}/uploads/${selectedCar?.image}`}/>
                    </div>

                    <div className='col-sm-12 col-md-6 col-lg-6 col-xl-5'>
                      <div className='mb-4'>
                        <span style={{ fontSize: 24, fontWeight: 600 }}>
                          <strong>
                            {selectedCar?.brand}
                          </strong>
                        </span>
                      </div>

                      <div style={{ fontSize: 16, fontWeight: 400, color: '#484848' }}>
                        <div className='mb-4'>
                          <div className='mb-3 d-flex justify-content-between text-left'>
                            <span>
                              <PeopleOutline className='mx-2'/> Capacity:
                            </span>

                            <span>
                              {`${selectedCar?.capacity} Seats`}
                            </span>
                          </div>

                          {/* <div className='mb-3 d-flex justify-content-between text-left'>
                            <span>
                              <PinOutlined className='mx-2'/> License Plate:
                            </span>

                            <span>
                              {selectedCar?.licensePlate}
                            </span>
                          </div> */}

                          <div className='mb-3 d-flex justify-content-between text-left'>
                            <span>
                              <CheckCircleOutline className='mx-2'/> Car Status:
                            </span>

                            <span style={{ color: '#1DA955', fontWeight: 500 }}>
                              Available
                            </span>
                          </div>
                        </div>

                        {/* <div>
                          <span 
                            style={{
                              fontWeight: 500, 
                              color: 'black',
                              cursor: 'pointer',
                            }}>
                            More Details <ArrowForward/>
                          </span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className='col-12'>
                <Card>
                  <div className='mb-4'>
                    <span style={{ fontWeight: 'bold', fontSize: 18 }}>
                      PICK-UP & RETURN
                    </span>
                  </div>

                  <div className='mb-4'>
                    <div className='mb-1'>
                      <span style={{ color: '#484848', fontSize: 14 }}>
                        {moment(pickupDate).format('ddd MMM DD, YYYY - h:mm A')}
                      </span>
                    </div>

                    <div>
                      <span style={{ fontWeight: 500, fontSize: 16 }}>
                        {pickupLocation}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className='mb-1'>
                      <span style={{ color: '#484848', fontSize: 14 }}>
                        {moment(returnDate).format('ddd MMM DD, YYYY - h:mm A')}
                      </span>
                    </div>

                    <div>
                      <span style={{ fontWeight: 500, fontSize: 16 }}>
                        {returnLocation}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className='col-sm-12 col-md-12 col-lg-12 col-xl-4'>
            <div className='row g-4'>
              <div className='col-12'>
                {!isEmpty(promoCode)
                  ? (
                    <Card>
                      <div className='mb-3'>
                        <span style={{ fontWeight: 'bold', fontSize: 18 }}>
                          PROMO CODE
                        </span>
                      </div>

                      <div align='right'>
                        <span style={{ fontWeight: 'bold', fontSize: 30 }}>
                          {promoCode.code}
                        </span>
                      </div>
                    </Card>
                  )
                  : (
                    <Card>
                      {!isEmpty(promoCodeErrorMessage) && (
                        <div className='mb-2'>
                          <FormError error={promoCodeErrorMessage}/>
                        </div>
                      )}

                      <div className='row g-4'>
                        <div className='col-12'>
                          <TextField
                            autoFocus={true}
                            key='enterPromoCode'
                            label='Enter Promo Code'
                            onChange={(e) => handlePromoCodeChange(e.target.value)}
                            defaultValue={promoCodeInput}
                          />
                        </div>
    
                        <div className='col-12'>
                          <Button
                            style={{ width: '100%' }}
                            label='USE PROMO CODE' 
                            size='large'
                            onClick={() => onClickPromoCode()}
                          />
                        </div>
                      </div>
                    </Card>
                  )
                }
              </div>

              <div className='col-12'>
                <Card>
                  <div className='mb-4'>
                    <span style={{ fontWeight: 'bold', fontSize: 18 }}>
                      PRICE BREAKDOWN
                    </span>
                  </div>

                  {!isEmpty(promoCode) && (
                    <div className='mb-3 row g-2'>
                      <div className='col-12'>
                        <div className="d-flex justify-content-between" style={{ fontSize: 14 }}>
                          <span style={{ color: '#484848' }}>
                            Discount:
                          </span>
  
                          <span style={{ fontWeight: 'bold' }}>
                            {`PHP ${parseFloat(promoCode.value).toFixed(2)}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className='mb-5 row g-2'>
                    <div className='col-12'>
                      <div className="d-flex justify-content-between" style={{ fontSize: 14 }}>
                        <span style={{ color: '#484848' }}>
                          Vehicle Rental Fee:
                        </span>

                        <span style={{ fontWeight: 'bold' }}>
                          {`PHP ${parseFloat(totalRentalFee).toFixed(2)}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="d-flex justify-content-between" style={{ fontSize: 14 }}>
                      <span style={{ color: '#484848' }}>
                        Total Price:
                      </span>

                      <span style={{ fontWeight: 'bold' }}>
                        {`PHP ${totalPrice}`}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>

              <div className='col-12'>
                <Button
                  style={{ width: '100%' }}
                  size='large'
                  label={loading ? 'PROCESSING...' : 'CONFIRM & CHECK OUT'}
                  onClick={() => onClickConfirmCheckOut()}
                  disabled={!loggedIn || loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return <>
    <div>
      {(isEmpty(selectedCarId) && isEditMode)
        ? (
          <div className='custom-header'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row g-4'>
                <div className='col-sm-12 col-md-6 col-lg-6 col-xl-3'>
                  <Autocomplete
                    freeSolo
                    disableClearable
                    options={pickupSuggestedPlaces}
                    renderInput={params => (
                      <TextField
                        {...params}
                        name='pickupLocation'
                        label='Pick-up Location'
                        {...register('pickupLocation', {
                          required: !isEmpty(pickupLocation) ? false : 'Pick-up location field is required.'
                        })}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onBlur={(e) => handleInputsBlur('pickupLocation', e.target.value)}
                        onChange={e => handlePickupLocationChange(e.target.value)}
                        errors={fieldErrors}
                      />
                    )}
                    defaultValue={pickupLocation}
                  />
                </div>
      
                <div className='col-sm-12 col-md-6 col-lg-6 col-xl-3'>
                  <Autocomplete
                    freeSolo
                    disableClearable
                    options={returnSuggestedPlaces}
                    renderInput={params => (
                      <TextField
                        {...params}
                        name='returnLocation'
                        label='Return Location'
                        {...register('returnLocation', {
                          required: !isEmpty(returnLocation) ? false : 'Return location field is required.'
                        })}
                        onBlur={(e) => handleInputsBlur('returnLocation', e.target.value)}
                        InputLabelProps={{ 
                          shrink: true,
                        }}
                        onChange={e => handleReturnLocationChange(e.target.value)}
                        errors={fieldErrors}
                      />
                    )}
                    defaultValue={returnLocation}
                  />
                </div>
      
                <div className='col-sm-12 col-md-6 col-lg-6 col-xl-3'>
                  <DateTimeField
                    label='Pick-up Date'
                    name='pickupDate'
                    {...register('pickupDate', {
                      required: 'Pick-up date field is required',
                      validate: value => moment(value).isBefore(getValues('returnDate')) || 'Pick-up date field must be less than Return date.',
                    })}
                    disablePreviousDates
                    onBlur={(e) => handleInputsBlur('pickupDate', e.target.value)}
                    errors={fieldErrors}
                    defaultValue={pickupDate}
                  />
                </div>
      
                <div className='col-sm-12 col-md-6 col-lg-6 col-xl-3'>
                  <DateTimeField
                    label='Return Date'
                    name='returnDate'
                    {...register('returnDate', {
                      required: 'Return date field is required',
                      validate: value => moment(value).isAfter(getValues('pickupDate')) || 'Return date field must be greater than Pick-up date.',
                    })}
                    disablePreviousDates
                    onBlur={(e) => handleInputsBlur('returnDate', e.target.value)}
                    errors={fieldErrors}
                    defaultValue={returnDate}
                  />
                </div>
      
                <div className='col-12' align='right'>
                  <WebViewContainer>
                    <Button
                      style={{ width: 168 }}
                      type='submit'
                      label='SEARCH'
                    />
                  </WebViewContainer>
      
                  <MobileViewContainer>
                    <Button
                      style={{ width: '100%' }}
                      type='submit'
                      label='SEARCH'
                    />
                  </MobileViewContainer>
                </div>
              </div>
            </form>
          </div>
        )
        : (
          <div className='custom-header'>
            <div className='row g-4'>
              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <div className='mb-2'>
                  <span style={{ fontWeight: 600, fontSize: 25 }}>
                    PICK-UP
                  </span>
                </div>
        
                <div className='mb-2'>
                  <span style={{ fontWeight: 400, fontSize: 20 }}>
                    {pickupLocation}
                  </span>
                </div>
        
                <div>
                  <span style={{ fontWeight: 400, fontSize: 20 }}>
                    {moment(pickupDate).format('ddd MMM DD, YYYY - h:mm A')}
                  </span>
                </div>
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <div className='mb-2'>
                  <span style={{ fontWeight: 600, fontSize: 25 }}>
                    RETURN
                  </span>
                </div>
        
                <div className='mb-2'>
                  <span style={{ fontWeight: 400, fontSize: 20 }}>
                    {returnLocation}
                  </span>
                </div>
        
                <div>
                  <span style={{ fontWeight: 400, fontSize: 20 }}>
                    {moment(returnDate).format('ddd MMM DD, YYYY - h:mm A')}
                  </span>
                </div>
              </div>

              {isEmpty(selectedCarId) && (
                <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                  <Button
                    style={{ backgroundColor: 'white', color: 'black' }}
                    label='Edit'
                    startIcon={<Edit/>}
                    onClick={() => onClickEdit()}
                  />
                </div>
              )}
            </div>
          </div>
        )
      }

      {isEmpty(selectedCarId)
        ? (
          <ChooseComponent/>
        )
        : (
          <ChooseSummaryComponent/>
        )
      }        
    </div>
  </>
};

export default CustomerChooseVehiclePage;