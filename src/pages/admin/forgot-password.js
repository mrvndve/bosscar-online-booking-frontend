import { Fragment } from 'react';

import { 
  WebViewContainer, 
  MobileViewContainer,
  Card,
  Loading,
  TextField,
  Button,
  FormError,
} from '../../components';

import { Autocomplete, Box } from '@mui/material';

import { 
  numbersOnlyKeyPress, 
  countryCodes, 
} from '../../utils';

import useAdminForgotPassword from '../../hooks/use-admin-forgot-password';

const ResponsiveWrapper = ({ children }) => {
  return <>
    <Fragment>
      <WebViewContainer>
        <div className='d-flex align-items-center justify-content-center h-100'>
          <Card elevation={5} style={{ width: '35%' }}>
            {children}
          </Card>
        </div>
      </WebViewContainer>

      <MobileViewContainer>
        <div className='d-flex align-items-center justify-content-center h-100 p-4'>
          <Card elevation={5}>
            {children}
          </Card>
        </div>
      </MobileViewContainer>
    </Fragment>
  </>
}

const CustomForm = () => {
  const {
    navigate,
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    formMode,
    otpErrorMessage,
    forgotPasswordMessage,
  } = useAdminForgotPassword();

  const ForgotPassword = () => (
    <div className='row gy-4 gx-0' align='center'>
      <div className='col-12'>
        <h4>
          Forgot Password
        </h4>
      </div>

      <div className='col-12'>
        <Autocomplete
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
            />
          )}
          defaultValue={countryCodes[countryCodes.findIndex(i => i.name === 'Philippines')]}
        />
      </div>
      
      <div className='col-12'>
        <TextField
          name='phoneNumber'
          label='Phone Number'
          {...register('phoneNumber', { 
            required: 'Phone number field is required.', 
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
          label='Submit'
        />
      </div>

      <div className='col-12'>
        <div className='row g-0'>
          <div className='col-12' align='right'>
            <span 
              role='button'
              style={{ textDecoration: 'underline', fontWeight: 'bold' }}
              onClick={() => navigate('/admin/login')}
            >
              Back to Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const OtpVerify = () => (
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
  )

  const PasswordChanged = () => (
    <div className='row gy-4 gx-0' align='center'>
      <div className='col-12'>
        <h4>
          Forgot Password
        </h4>
      </div>

      <div className='col-12'>
        {forgotPasswordMessage}
      </div>

      <div className='col-12' align='right'>
        <span 
          role='button'
          style={{ textDecoration: 'underline', fontWeight: 'bold' }}
          onClick={() => navigate('/admin/login')}
        >
          Back to Login
        </span>
      </div>
    </div>
  );

  return <>
    {!loading
      ?
      <form onSubmit={handleSubmit(onSubmit)}>
        {formMode === 'forgot-password' && (
          <ForgotPassword/>
        )}

        {formMode === 'otp' && (
          <OtpVerify/>
        )}

        {formMode === 'password-changed' && (
          <PasswordChanged/>
        )}
      </form>
      :
      <Loading/>
    }
  </>
}

const AdminForgotPasswordPage = () => (
  <ResponsiveWrapper>
    <div id='recaptcha-container'></div>
    <CustomForm/>
  </ResponsiveWrapper>
);

export default AdminForgotPasswordPage;