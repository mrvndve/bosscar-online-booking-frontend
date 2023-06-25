import { Fragment } from 'react';

import { Autocomplete, Box } from '@mui/material';

import {
  Button, 
  Card, 
  DateTimeField, 
  EmptyBanner, 
  SlickSlider,
  TextField,
} from '../../../components';

import { 
  CUSTOMER_SECONDARY_COLOR, 
  ONLINE_RENTAL_TOGGLE_ENABLED, 
  apiDomain,
  countryCodes,
  emailOnly,
  numbersOnlyKeyPress,
} from '../../../utils';

import useCustomerHome from '../../../hooks/use-customer-home';

import moment from 'moment';

import { Carousel } from 'react-responsive-carousel';

import ReserveVehicleModal from '../../reserve-vehicle-modal';


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

const BillBoard = () => {
  const contents = [
    // 'banner1.jpg',
    // 'banner2.jpg',
    // 'banner3.jpg',
    // 'banner4.jpg',
    // 'banner5.jpg'
  ];

  return <>
    <div id='home'>
      <Carousel
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        infiniteLoop
        autoPlay
        swipeable
        emulateTouch
      >
        <div>
          <img className='banner-carousel' src={`${process.env.PUBLIC_URL}/images/banner.gif`}/>
        </div>

        {contents && contents.map((i, index) => (
          <Fragment key={index}>
            <div>
              <img className='banner-carousel' src={`${process.env.PUBLIC_URL}/images/${i}`}/>
            </div>
          </Fragment>
        ))}
      </Carousel>
    </div>
  </>
};

const ReserveVehicleForm = ({
  register,
  handleSubmit,
  fieldErrors,
  onSubmit,
  getValues,

  handlePickupLocationChange,
  pickupSuggestedPlaces,

  handleReturnLocationChange,
  returnSuggestedPlaces,
  reservationFormLoading,
}) => {
  return <>
    <div id='reserve-vehicle' className='customer-page-container'>
      <div className='row g-4'>
        <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6'>
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row g-4'>
                <div className='col-12'>
                  <h4>
                    RESERVE A VEHICLE
                  </h4>
                </div>

                {!ONLINE_RENTAL_TOGGLE_ENABLED && (
                  <>
                    <div className='col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                      <Autocomplete
                        key={reservationFormLoading}
                        disableClearable
                        options={['Mr.', 'Ms.', 'Mrs.']}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label='Suffix'
                            name='suffix'
                            {...register('suffix', {
                              required: 'Suffix field is required.'
                            })}
                            InputLabelProps={{ 
                              shrink: true,
                            }}
                            errors={fieldErrors}
                            disabled={reservationFormLoading}
                          />
                        )}
                      />
                    </div>

                    <div className='col-sm-12 col-md-9 col-lg-9 col-xl-9'>
                      <TextField
                        name='name'
                        label='Name'
                        {...register('name', {
                          required: 'Name field is required.'
                        })}
                        errors={fieldErrors}
                        disabled={reservationFormLoading}
                      />
                    </div>

                    <div className='col-12'>
                      <Autocomplete
                        key={reservationFormLoading}
                        disableClearable
                        autoHighlight
                        options={countryCodes}
                        getOptionLabel={(option) => `${option.name} ${option.dial_code}`}
                        renderOption={(props, option) => (
                          <Fragment key={option.name}>
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                              <img
                                loading="lazy"
                                width="20"
                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                alt=""
                              />
                              {option.name} ({option.code}) {option.dial_code}
                            </Box>
                          </Fragment>
                        )}
                        renderInput={params => (
                          <TextField
                            {...params}
                            name='countryCode'
                            label='Country Code'
                            {...register('countryCode', {
                              required: 'Country code field is required.'
                            })}
                            InputLabelProps={{ 
                              shrink: true,
                            }}
                            errors={fieldErrors}
                            disabled={reservationFormLoading}
                          />
                        )}
                      />
                    </div>

                    <div className='col-12'>
                      <TextField
                        name='phoneNumber'
                        label='Phone Number'
                        {...register('phoneNumber', {
                          required: 'Phone number field is required.'
                        })}
                        onKeyPress={numbersOnlyKeyPress}
                        errors={fieldErrors}
                        disabled={reservationFormLoading}
                      />
                    </div>

                    <div className='col-12'>
                      <TextField
                        name='email'
                        label='Email'
                        {...register('email', {
                          required: 'Email field is required.',
                          pattern: {
                            value: emailOnly,
                            message: 'Incorrect email format.'
                          }
                        })}
                        errors={fieldErrors}
                        disabled={reservationFormLoading}
                      />
                    </div>
                  </>
                )}

                <div className='col-12'>
                  <Autocomplete
                    key={reservationFormLoading}
                    freeSolo
                    disableClearable
                    options={pickupSuggestedPlaces ? pickupSuggestedPlaces.map(data => data.place_name) : []}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label='Pick-up Location'
                        name='pickupLocation'
                        placeholder='Bonifacio Global City'
                        {...register('pickupLocation', {
                          required: 'Pick-up location field is required.'
                        })}
                        InputLabelProps={{ 
                          shrink: true,
                        }}
                        onChange={e => handlePickupLocationChange(e.target.value)}
                        errors={fieldErrors}
                        disabled={reservationFormLoading}
                      />
                    )}
                  />
                </div>

                <div className='col-12'>
                  <Autocomplete
                    key={reservationFormLoading}
                    freeSolo
                    disableClearable
                    options={returnSuggestedPlaces ? returnSuggestedPlaces.map(data => data.place_name) : []}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label='Return Location'
                        name='returnLocation'
                        placeholder='Makati'
                        {...register('returnLocation', {
                          required: 'Return location field is required.'
                        })}
                        InputLabelProps={{ 
                          shrink: true,
                        }}
                        onChange={e => handleReturnLocationChange(e.target.value)}
                        errors={fieldErrors}
                        disabled={reservationFormLoading}
                      />
                    )}
                  />
                </div>

                <div className='col-12'>
                  <DateTimeField
                    label='Pick-up Date'
                    name='pickupDate'
                    {...register('pickupDate', {
                      required: 'Pick-up date field is required.',
                      validate: value => moment(value).isBefore(getValues('returnDate')) || 'Pick-up date field must be less than Return date.',
                    })}
                    disablePreviousDates
                    errors={fieldErrors}
                    disabled={reservationFormLoading}
                  />
                </div>

                <div className='col-12'>
                  <DateTimeField
                    label='Return Date'
                    name='returnDate'
                    {...register('returnDate', {
                      required: 'Return date field is required.',
                      validate: value => moment(value).isAfter(getValues('pickupDate')) || 'Return date field must be greater than Pick-up date.',
                    })}
                    disablePreviousDates
                    errors={fieldErrors}
                    disabled={reservationFormLoading}
                  />
                </div>

                <div className='col-12'>
                  <Button 
                    style={{ width: '100%' }} 
                    label={`${ONLINE_RENTAL_TOGGLE_ENABLED ? 'SHOW CARS' : 'GET A QOUTATION'}`} 
                    type='submit'
                    disabled={reservationFormLoading}
                  />
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  </>
};

const MeetTheFleet = ({ cars,  handleReserveVehicleClick }) => {
  return <>
    <div className='customer-page-container' align='center'>
      <div style={{ marginBottom: 100, }}>
        <span style={{ fontSize: 32, fontWeight: 'bold' }}>
          MEET THE FLEET
        </span>
      </div>

      <div className='mb-5'>
        {cars.length > 0 
          ? (
            <>
              {cars.length > 2
                 ? (
                  <SlickSlider>
                    {cars.map((i, index) => (
                      <Fragment key={index}>
                        <div>
                          <div className='mb-5'>
                            <img style={{ width: 328, height: 219 }} src={`${apiDomain}/uploads/${i.image}`} />
                          </div>
          
                          <div className='mb-3'>
                            <span style={{ fontSize: 18 }}>
                              <strong>
                                {i.brand}
                              </strong>
                            </span>
                          </div>
          
                          <div>
                            <h3 style={{ fontSize: 14 }}>
                              {i.description}
                            </h3>
                          </div>  
                        </div>
                      </Fragment>
                    ))}
                  </SlickSlider>
                 )
                 : (
                  <>
                    <div className='row g-4'>
                      {cars.map((i, index) => (
                        <Fragment key={index}>
                          <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6'>
                            <div className='mb-5'>
                              <img style={{ width: 328, height: 219 }} src={`${apiDomain}/uploads/${i.image}`} />
                            </div>
            
                            <div className='mb-3'>
                              <span style={{ fontSize: 18 }}>
                                <strong>
                                  {i.brand}
                                </strong>
                              </span>
                            </div>
            
                            <div>
                              <h3 style={{ fontSize: 14 }}>
                                {i.description}
                              </h3>
                            </div>  
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  </>
                 )
              }
            </>
          )
          : (
            <EmptyBanner text='No Cars Found'/>
          )
        }
      </div>

      <div>
        <Button label='BOOK NOW' size='large' onClick={() => handleReserveVehicleClick()}/>
      </div>
    </div>
  </>
}

const AboutUs = () => (
  <div
    id='about-us'
    style={{ 
      backgroundColor: CUSTOMER_SECONDARY_COLOR.bgColor, 
      color: 'white' 
    }}
  >
    <WebViewContainer>
      <div className='row g-0'>
        <div className='col-4'>
          <img style={{ width: '100%', height: 774 }} src={`${process.env.PUBLIC_URL}/images/about-us.png`}/>
        </div>
        
        <div className='about-us-container d-flex justify-content-center align-items-center col-8'>
          <div>
            <div className='mb-5'>
              <span style={{ fontSize: 50, fontWeight: 'bold' }}>
                ABOUT US
              </span>
            </div>

            <div>
              <span style={{ fontSize: 30, fontWeight: 200 }}>
                BossCar.com provides luxury car services in the Philippines. 
                All our cars are insured, no overcharges and no hidden charges.

                <br/> <br/>

                Services We Offer: Expert Drivers, Professional Service and Support Team.
              </span>
            </div>
          </div>
        </div>
      </div>
    </WebViewContainer>

    <MobileViewContainer>
      <div className='about-us-container' align='center'>
        <div className='mb-5'>
          <span style={{ fontSize: 35, fontWeight: 'bold' }}>
            ABOUT US
          </span>
        </div>

        <div>
          <span style={{ fontSize: 25, fontWeight: 200 }}>
            BossCar.com provides luxury car services in the Philippines. 
            All our cars are insured, no overcharges and no hidden charges.

            <br/> <br/>

            Services We Offer: Expert Drivers, Professional Service, Great Support, Technical Support, and Positive Reviews.
          </span>
        </div>
      </div>
    </MobileViewContainer>
  </div>
);

const DrivingPlan = ({ handleReserveVehicleClick }) => {
  return <>
    <div>
      <WebViewContainer>
        <div>
          <Box sx={{
            background: `url(${process.env.PUBLIC_URL}/images/driving-plan.jpg)`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            objectFit: 'fill'
          }}>
            <div style={{ height: '100%', padding: '260px 150px 260px 150px' }} className='d-flex justify-content-start align-items-center'>
              <div>
                <div className='mb-5'>
                  <span style={{ fontWeight: 'bold', fontSize: 40, color: 'white', textShadow: '2px 4px 4px rgb(105,105,105)' }}>
                    ENHANCE YOUR DRIVING <br/> PLAN WITH BOSSCAR
                  </span>
                </div>

                <div className='mb-5'>
                  <span style={{ fontWeight: 400, fontSize: 16, color: 'white', textShadow: '2px 4px 4px rgb(105,105,105)' }}>
                    Go with Bosscar and start driving business.
                  </span>
                </div>

                <div>
                  <Button 
                    style={{ backgroundColor: 'white', color: 'black' }} 
                    label='BOOK AN EXPERIENCE' 
                    size='large'
                    onClick={() => handleReserveVehicleClick()}
                  />
                </div>
              </div>
            </div>
          </Box>
        </div>
      </WebViewContainer>

      <MobileViewContainer>
        <div>
          <Box sx={{
            background: `url(${process.env.PUBLIC_URL}/images/driving-plan.jpg)`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            objectFit: 'fill'
          }}>
            <div style={{ height: '100%', padding: '55px 30px 55px 30px' }} className='d-flex justify-content-start align-items-center'>
              <div>
                <div className='mb-2'>
                  <span style={{ fontWeight: 'bold', fontSize: 25, color: 'white', textShadow: '2px 4px 4px rgb(105,105,105)' }}>
                    ENHANCE YOUR DRIVING <br/> PLAN WITH BOSSCAR
                  </span>
                </div>

                <div className='mb-5'>
                  <span style={{ fontWeight: 400, fontSize: 15, color: 'white', textShadow: '2px 4px 4px rgb(105,105,105)' }}>
                    Go with Bosscar and start driving business.
                  </span>
                </div>

                <div>
                  <Button 
                    style={{ backgroundColor: 'white', color: 'black' }} 
                    label='BOOK AN EXPERIENCE' size='large'
                    onClick={() => handleReserveVehicleClick()}
                  />
                </div>
              </div>
            </div>
          </Box>
        </div>
      </MobileViewContainer>
    </div>
  </>
};

const CustomerHomePage = () => {
  const {
    cars,
    register,
    handleSubmit,
    fieldErrors,
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
  } = useCustomerHome();

  return <>
    <div style={{ marginBottom: 100 }}>
      <BillBoard/>
    </div>

    <div style={{ marginBottom: 100 }}>
      <ReserveVehicleForm {...{
        register,
        handleSubmit,
        fieldErrors,
        onSubmit,
        getValues,

        handlePickupLocationChange,
        pickupSuggestedPlaces,
    
        handleReturnLocationChange,
        returnSuggestedPlaces,
        reservationFormLoading,
      }}/>
    </div>

    <div style={{ marginBottom: 100 }}>
      <AboutUs/>
    </div>
    
    <div style={{ marginBottom: 100 }}>
      <MeetTheFleet {...{  cars, handleReserveVehicleClick }}/>
    </div>

    <div>
      <DrivingPlan {...{ handleReserveVehicleClick }}/>
    </div>

    <ReserveVehicleModal {...{
      isOpen: isReserveVehicleModalOpen,
      handleClose: handleReserveVehicleClose,
    }}/>
  </>
};

export default CustomerHomePage;