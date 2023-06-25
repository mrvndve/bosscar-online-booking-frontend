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
  ArrowBack,
} from '@mui/icons-material';

import { apiDomain, PAYMENT_STATUS, PAYMENT_METHODS_LABEL, } from '../../../utils';

import moment from 'moment';

import useCustomerViewBookings from '../../../hooks/use-customer-view-bookings';

import { isEmpty } from 'lodash';

const CustomerViewBookingPage = () => {
  const {
    booking,
    qrCode,
    onClickBackToBookings,
  } = useCustomerViewBookings();

  const titleStyle = { 
    fontWeight: 'bold', 
    fontSize: 25,
  };

  const subTitleStyle = {
    fontWeight: 500, 
    fontSize: 15,
  };

  const descTitleStyle = { 
    fontWeight: 400, 
    fontSize: 14, 
    color: '#484848',
  };

  return <>
    <div className='mb-5 custom-header'>
      <div className='mb-2'>
        <span style={titleStyle}>
          Booking Summary
        </span>
      </div>

      <div>
        <span style={subTitleStyle}>
          Thank you for your booking, Please check the informations below.
        </span>
      </div>
    </div>

    <div className='customer-page-container'>
      <div className='mb-4'>
        <span 
          style={{ color: '#777777', cursor: 'pointer' }}
          onClick={() => onClickBackToBookings()}
        >
          <ArrowBack/> Go to your Bookings
        </span>
      </div>

      <div className='row g-4'>
        <div className='col-12'>
          <Card>
            <div className='row g-4'>
              <div className='row g-4'>
                <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6'>
                  <div className='row g-4'>
                    <div className='col-12' style={{ wordBreak: 'break-all' }}>
                      <div className='mb-2'>
                        <span style={descTitleStyle}>
                          Booking Number
                        </span>
                      </div>

                      <div>
                        <span style={{...{ letterSpacing: 5 }, ...titleStyle}}>
                          {booking.referenceNo}
                        </span>
                      </div>
                    </div>

                    <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6'>
                      <div className='mb-2'>
                        <span style={descTitleStyle}>
                          Customer Name
                        </span>
                      </div>

                      <div>
                        <span style={subTitleStyle}>
                          {`${booking.users?.firstName} ${booking.users?.lastName}`}
                        </span>
                      </div>
                    </div>

                    <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6'>
                      <div className='mb-2'>
                        <span style={descTitleStyle}>
                          Phone Number
                        </span>
                      </div>

                      <div>
                        <span style={subTitleStyle}>
                          {booking.users?.phoneNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6' align='right'>
                  <img src={qrCode} style={{ height: 200 }}/>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className='col-sm-12 col-md-12 col-lg-12 col-xl-8'>
          <div className='row g-4'>
            <div className='col-12'>
              <Card>
                <div className='mb-5'>
                  <span style={titleStyle}>
                    YOUR CAR
                  </span>
                </div>

                <div className='row g-5'>
                  <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                    <img style={{ height: 220, width: '100%' }} src={`${apiDomain}/uploads/${booking.cars?.image}`}/>
                  </div>

                  <div className='col-sm-12 col-md-6 col-lg-6 col-xl-5'>
                    <div className='mb-4'>
                      <span style={{ fontSize: 24, fontWeight: 600 }}>
                        <strong>
                          {booking.cars?.brand}
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
                            {`${booking.cars?.capacity} Seats`}
                          </span>
                        </div>

                        {/* <div className='mb-3 d-flex justify-content-between text-left'>
                          <span>
                            <PinOutlined className='mx-2'/> License Plate:
                          </span>

                          <span>
                            {booking.cars?.licensePlate}
                          </span>
                        </div> */}
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
          </div>
        </div>

        <div className='col-sm-12 col-md-12 col-lg-12 col-xl-4'>
          <Card style={{ height: '100%' }}>
            <div className='mb-4'>
              <span style={titleStyle}>
                PICK-UP & RETURN
              </span>
            </div>

            <div className='mb-4'>
              <div className='mb-1'>
                <span style={{ color: '#484848', fontSize: 14 }}>
                  {moment(booking?.pickUpDatetime).format('ddd MMM DD, YYYY - h:mm A')}
                </span>
              </div>

              <div>
                <span style={{ fontWeight: 500, fontSize: 16 }}>
                  {booking?.pickUpLocation}
                </span>
              </div>
            </div>

            <div>
              <div className='mb-1'>
                <span style={{ color: '#484848', fontSize: 14 }}>
                  {moment(booking?.returnDatetime).format('ddd MMM DD, YYYY - h:mm A')}
                </span>
              </div>

              <div>
                <span style={{ fontWeight: 500, fontSize: 16 }}>
                  {booking?.destinationLocation}
                </span>
              </div>
            </div>
          </Card>
        </div>

        <div className='col-12 mb-5'>
          <Card>
            <div className='mb-4'>
              <span style={titleStyle}>
                PAYMENT
              </span>
            </div>

            <div className='mb-3 row g-2'>
              <div className='col-12'>
                <div className="d-flex justify-content-between" style={{ fontSize: 14 }}>
                  <span style={{ color: '#484848' }}>
                    Payment Method:
                  </span>

                  <span style={{ fontWeight: 'bold' }}>
                    {PAYMENT_METHODS_LABEL[booking.payments ? booking.payments[0].mopId : null]}
                  </span>
                </div>
              </div>
            </div>

            {(!isEmpty(booking?.promoCodeId) && !isEmpty(booking?.promoCodes)) && (
              <div className='mb-3 row g-2'>
                <div className='col-12'>
                  <div className="d-flex justify-content-between" style={{ fontSize: 14 }}>
                    <span style={{ color: '#484848' }}>
                      Discount:
                    </span>

                    <span style={{ fontWeight: 'bold' }}>
                      {`PHP ${parseFloat(booking?.promoCodes?.value).toFixed(2)}`}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className='mb-5 row g-2'>
              <div className='col-12'>
                <div className="d-flex justify-content-between" style={{ fontSize: 14 }}>
                  <span style={{ color: '#484848' }}>
                    Payment Status:
                  </span>

                  <span
                    style={{
                      color: PAYMENT_STATUS[booking.payments ? booking.payments[0].status : null] === 'PENDING' 
                        ? 'orange' : (PAYMENT_STATUS[booking.payments ? booking.payments[0].status : null] === 'PAID' ? 'green' : 'red'),
                      fontWeight: 'bold' 
                    }}
                  >
                    {PAYMENT_STATUS[booking.payments ? booking.payments[0].status : null]}
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
                  {`PHP ${booking?.totalPrice}`}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </>
};

export default CustomerViewBookingPage;