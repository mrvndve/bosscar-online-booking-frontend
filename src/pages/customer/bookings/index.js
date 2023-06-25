import React, { Fragment } from 'react';

import useCustomerBookings from '../../../hooks/use-customer-bookings';

import { 
  EmptyBanner, 
  Loading,
  Card,
  Button,
} from '../../../components';

import { 
  PeopleOutline, 
  PinOutlined, 
  CheckCircleOutline, 
} from '@mui/icons-material';

import moment from 'moment';

import { apiDomain, PAYMENT_STATUS } from '../../../utils';

const CustomerBookingsPage = () => {
  const {
    loading,
    bookings,
    onClickViewBooking,
  } = useCustomerBookings();

  return <>
    <div className='mb-5 custom-header'>
      <div className='mb-2'>
        <span style={{ fontWeight: 600, fontSize: 25 }}>
          Bookings
        </span>
      </div>

      <div>
        <span style={{ fontWeight: 500, fontSize: 15 }}>
          Check your personal bookings.
        </span>
      </div>
    </div>

    <div className='customer-page-container'>
      {!loading 
        ? (
          <>
            {bookings.length > 0 
              ? (
                <div className='row g-4'>
                  {bookings.map((i, index) => (
                    <Fragment key={index}>
                      {console.log(i)}
                      <Card elevation={0} padding={35}>
                        <div className='row g-4'>
                          <div className='col-sm-12 col-md-6 col-lg-6 col-xl-3'>
                            <img style={{ height: 220, width: '100%' }} src={`${apiDomain}/uploads/${i.cars?.image}`}/>
                          </div>

                          <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                            <div className='mb-4'>
                              <span style={{ fontSize: 24, fontWeight: 600 }}>
                                <strong>
                                  {i.cars?.brand}
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
                                    {`${i.cars?.capacity} Seats`}
                                  </span>
                                </div>

                                {/* <div className='mb-3 d-flex justify-content-between text-left'>
                                  <span>
                                    <PinOutlined className='mx-2'/> License Plate:
                                  </span>

                                  <span>
                                    {i.cars?.licensePlate}
                                  </span>
                                </div> */}

                                <div className='mb-3 d-flex justify-content-between text-left'>
                                  <span>
                                    <CheckCircleOutline className='mx-2'/> Payment Status:
                                  </span>

                                  <span 
                                    style={{ 
                                      color: PAYMENT_STATUS[i.payments[0]?.status] === 'PENDING' 
                                        ? 'orange' : (PAYMENT_STATUS[i.payments[0]?.status] === 'PAID' ? 'green' : 'red'), 
                                      fontWeight: 'bold',
                                    }}>
                                    {PAYMENT_STATUS[i.payments[0]?.status]}
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

                              <div className='mt-5 col-12'>
                                <Button
                                  style={{ width: 168 }}
                                  label='VIEW'
                                  onClick={() => onClickViewBooking(i.id)}
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
                    <EmptyBanner text='No Bookings Found'/>
                  </Card>
                </>
              )
            }
          </>
        )
        : (
          <Loading/>
        )
      }
    </div>
  </>
};

export default CustomerBookingsPage;