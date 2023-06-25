import { useEffect } from 'react';

import {
  AirportShuttleOutlined,
  CheckCircleOutline, 
  PeopleOutline, 
  PinOutlined,
  ArrowBack,
} from '@mui/icons-material';

import { 
  Card,
  TextField,
  SelectField,
  Button,
  ConfirmationDialog,
} from '../../../components';

import {
  apiDomain, 
  getUser, 
  countryCodes,
  numbersOnlyKeyPress,
  PAYPAL_CLIENT_ID,
  PAYMENT_METHODS,
  PAYPAL_TOGGLE_ENABLED,
  GCASH_TOGGLE_ENABLED,
  COP_TOGGLE_ENABLED,
} from '../../../utils';

import { Radio } from '@mui/material';

import moment from 'moment';

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

import { isEmpty } from 'lodash';

import useCustomerCheckout from '../../../hooks/use-customer-checkout';

const CustomerCheckoutPage = () => {
  const {
    register,
    fieldErrors,

    loading,
    pickupLocation,
    returnLocation,
    pickupDate,
    returnDate,
    selectedCar,
    totalRentalFee,
    totalPrice,
    promoCode,

    selectedMop,
    onMopChange,

    paypalCreateOrder,
    paypalOnApprove,
    paypalOnCancel,

    onClickCancelBooking,

    leavingPage,
    onCloseLeavePageDialog,
    onConfirmLeavePage,

    onCashPickUp,
  } = useCustomerCheckout();

  return <>
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
      </div>
    </div>

    <div className='customer-page-container'>
      <div className='mb-3'>
        <span 
          style={{ color: '#777777', cursor: 'pointer' }}
          onClick={() => onClickCancelBooking()}
        >
          <ArrowBack/> Cancel Booking
        </span>
      </div>


      <div className='mb-5'>
        <h2>
          <span style={{ fontWeight: 600 }}>
            CHECK OUT
          </span>
        </h2>
      </div>

      <div>
        <div className='row g-4'>
          <div className='col-sm-12 col-md-12 col-lg-12 col-xl-8'>
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
            </div>
          </div>

          <div className='col-sm-12 col-md-12 col-lg-12 col-xl-4'>
            <div className='col-12'>
              <div className='mb-4'>
                <Card>
                  <div className='row g-4'>
                    <div className='col-12'>
                      <span style={{ fontWeight: 600, fontSize: 18 }}>
                        BILLING INFORMATION
                      </span>
                    </div>

                    <div className='col-12'>
                      <TextField
                        name='firstName'
                        label='First Name'
                        {...register('firstName', {
                          required: 'First name field is required.'
                        })}
                        defaultValue={getUser().firstName}
                        errors={fieldErrors}
                      />
                    </div>

                    <div className='col-12'>
                      <TextField
                        name='lastName'
                        label='Last Name'
                        {...register('lastName', {
                          required: 'Last name field is required.'
                        })}
                        defaultValue={getUser().lastName}
                        errors={fieldErrors}
                      />
                    </div>

                    <div className='col-12'>
                      <SelectField
                        name='countryCode'
                        className='country-code-select-field'
                        label='Country Code'
                        options={countryCodes.map(data => ({
                          label: `${data.dial_code} ${data.name}`,
                          value: data.dial_code,
                        }))}
                        {...register('countryCode', { 
                          required: 'Country code field is required.',
                        })}
                        defaultValue={'+63'}
                        errors={fieldErrors}
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
                        defaultValue={getUser().phoneNumber.replace(getUser().countryCode, '')}
                        errors={fieldErrors}
                      />
                    </div>
                  </div>
                </Card>
              </div>

              <div className='mb-4'>
                <Card>
                  <div className='row g-2'>
                    <div className='col-12'>
                      <span style={{ fontWeight: 600, fontSize: 18 }}>
                        PAYMENT METHOD
                      </span>
                    </div>

                    {PAYPAL_TOGGLE_ENABLED && (
                      <div className='col-12'>
                        <Radio 
                          checked={selectedMop === PAYMENT_METHODS.PAYPAL} 
                          onChange={() => onMopChange(PAYMENT_METHODS.PAYPAL)} 
                        /> 
  
                        &nbsp;
                        
                        <img 
                          style={{ width: 30, height: 30 }} 
                          src={`${process.env.PUBLIC_URL}/images/Paypal.png`}
                        />
  
                        &nbsp;
                        Pay with Paypal
                      </div>
                    )}

                    {GCASH_TOGGLE_ENABLED && (
                      <div className='col-12'>
                        <Radio 
                          checked={selectedMop === PAYMENT_METHODS.GCASH} 
                          onChange={() => onMopChange(PAYMENT_METHODS.GCASH)}
                        />
                        
                        <img 
                          style={{ width: 50, height: 50 }} 
                          src={`${process.env.PUBLIC_URL}/images/Gcash.png`}
                        />
  
                        Pay with Gcash
                      </div>
                    )}

                    {COP_TOGGLE_ENABLED && (
                      <div className='col-12'>
                        <Radio 
                          checked={selectedMop === PAYMENT_METHODS.CASH_ON_PICKUP} 
                          onChange={() => onMopChange(PAYMENT_METHODS.CASH_ON_PICKUP)}
                        />
                        
                        <AirportShuttleOutlined style={{ fontSize: 35 }} className='mx-2'/>
  
                        Cash on Pickup
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {selectedMop === PAYMENT_METHODS.PAYPAL && (
                <>
                  {!loading 
                    ? (
                      <PayPalScriptProvider options={{ 'client-id': PAYPAL_CLIENT_ID }}>
                        <PayPalButtons
                          createOrder={(data, actions) => paypalCreateOrder(data, actions)}
                          onApprove={(data, actions) => paypalOnApprove(data, actions)}
                          onCancel={(data) => paypalOnCancel(data)}
                          style={{ 
                            layout: 'horizontal', 
                            label: 'checkout',
                            color: 'black',
                          }} 
                        />
                      </PayPalScriptProvider>
                    )
                    : (
                      <div className='mt-4' align='right'>
                        <Button
                          style={{ width: '100%' }}
                          label='PROCESSING...'
                          size='large'
                          disabled={loading}
                        />
                      </div>
                    )
                  }
                </>
              )}

              {(selectedMop === PAYMENT_METHODS.GCASH) && (
                <div className='mt-4' align='right'>
                  <Button
                    style={{ width: '100%' }}
                    label={!loading ? 'CHECKOUT' : 'PROCESSING...'}
                    size='large'
                    disabled={loading}
                  />
                </div>
              )}

              {(selectedMop === PAYMENT_METHODS.CASH_ON_PICKUP) && (
                <div className='mt-4' align='right'>
                  <Button
                    style={{ width: '100%' }}
                    label={!loading ? 'CHECKOUT' : 'PROCESSING...'}
                    size='large'
                    disabled={loading}
                    onClick={() => onCashPickUp()}
                  />
                </div>
              )}
            </div>         
          </div>
        </div>
      </div>
    </div>
    
    <ConfirmationDialog {...{
      title: 'Cancel Booking',
      open: leavingPage,
      message: 'Are you sure you want to cancel your booking?',
      onClose: onCloseLeavePageDialog,
      onConfirm: onConfirmLeavePage,
    }}/>
  </>
};

export default CustomerCheckoutPage;