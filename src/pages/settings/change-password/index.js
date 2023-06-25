import useSettingsChangePassword from '../../../hooks/use-settings-change-password';

import {
  Card,
  Button,
  Password,
  FormError,
} from '../../../components'

import OtpModal from '../../otp-modal';

const SettingsChangePasswordForm = () => {
  const  {
    register,
    fieldErrors,
    handleSubmit,
    onSubmit,
    getValues,
    apiErrorMessage,
    otpErrorMessage,
    handleOtpCloseModal,
    otpModalOpen,
    onOtpVerify,
    otpLoading,
  } = useSettingsChangePassword()

  return <>
    <div className='row'>
      <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6'>
        <Card style={{ padding: '35px 25px 25px 25px', }}>
          <form id='change-password-form' onSubmit={handleSubmit(onSubmit)}>
            <div className='row g-4'>
              {apiErrorMessage && (
                <div className='col-12'>
                  <FormError error={apiErrorMessage} />
                </div>
              )}

              <div className='col-12'>
                <Password
                  name='oldPassword'
                  label='Old Password'
                  {...register('oldPassword', { 
                    required: 'Old password field is required.',
                  })}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-12'>
                <Password
                  name='newPassword'
                  label='New Password'
                  {...register('newPassword', { 
                    required: 'New password field is required.',
                  })}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-12'>
                <Password
                  name='confirmPassword'
                  label='Confirm Passsword'
                  {...register('confirmPassword', {
                    required: 'Confirm password field is required.',
                    validate: value => value === getValues('newPassword') || 'Confirm password does not match your New password.'
                  })}
                  errors={fieldErrors}
                />
              </div>
            </div>

            <div className='mt-4' align='right'>
              <Button
                type='submit'
                label='Submit'
              />
            </div>
          </form>
        </Card>
      </div>
    </div>

    <OtpModal {...{ 
      otpModalOpen, onOtpVerify, 
      handleOtpCloseModal, 
      otpErrorMessage,
      otpLoading,
    }}/>
  </>  
};

export default SettingsChangePasswordForm;