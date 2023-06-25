import useOtpModal from '../hooks/use-otp-modal';

import { numbersOnlyKeyPress } from '../utils';

import {
  Modal,
  TextField,
  Button,
  FormError,
  Loading,
} from '../components';

const OtpModal = ({ 
  otpModalOpen, 
  handleOtpCloseModal,
  otpErrorMessage, 
  onOtpVerify,
  otpLoading,
}) => {
  const {
    register,
    fieldErrors,
    handleSubmit,
    onSubmit,
  } = useOtpModal({ onOtpVerify })

  return <>
    <Modal {...{
      isOpen: otpModalOpen,
      handleClose: handleOtpCloseModal,
    }}>
      {!otpLoading 
        ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='row gy-4 gx-0' align='center'>
              <div className='col-12'>
                <h4>
                  Enter OTP Code
                </h4>
              </div>
              
              {otpErrorMessage && (
                <div className='col-12'>
                  <FormError {...{ error: otpErrorMessage }}/>
                </div>
              )}
              
              <div className='col-12'>
                <TextField
                  name='otp'
                  label='One Time Password'
                  {...register('otp', { 
                    required: 'OTP code field is required.', 
                  })}
                  onKeyPress={numbersOnlyKeyPress}
                  errors={fieldErrors}
                />
              </div>
    
              <div className='col-12'>
                <Button
                  size='large'
                  style={{  width: '100%' }}
                  type='submit'
                  label='Verify OTP'
                />
              </div>
            </div>
          </form>
        ) : (
          <Loading/>
        )
      }
    </Modal>
  </>
};

export default OtpModal;