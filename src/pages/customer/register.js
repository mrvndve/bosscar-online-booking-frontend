import { Fragment } from 'react';

import { 
  WebViewContainer, 
  MobileViewContainer,
  Card,
  Loading, 
  TextField,
  Button,
  Password,
  FormError,
  DateField,
} from '../../components';

import { Autocomplete, Box } from '@mui/material';

import { numbersOnlyKeyPress, countryCodes, emailOnly } from '../../utils';

import useCustomerSignUp from '../../hooks/use-customer-sign-up';

const ResponsiveWrapper = ({ children }) => {
  return <>
    <Fragment>
      <WebViewContainer>
        <div className='d-flex align-items-center justify-content-center h-100'>
          <Card elevation={0} style={{ width: '35%' }}>
            {children}
          </Card>
        </div>
      </WebViewContainer>

      <MobileViewContainer>
        <div className='d-flex align-items-center justify-content-center h-100 p-4'>
          <Card elevation={0}>
            {children}
          </Card>
        </div>
      </MobileViewContainer>
    </Fragment>
  </>
}

const CustomForm = () => {
  const {
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    apiErrorMessage,
    formMode,
    registeredMessage,
    getValues,
  } = useCustomerSignUp();

  const RegisterForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='row g-4' align='center'>
        <div className='col-12'>
          <h4>
            Register Account
          </h4>
        </div>

        {apiErrorMessage && (
          <FormError {...{ error: apiErrorMessage }}/>
        )}

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
          <TextField
            name='firstName'
            label='First Name'
            {...register('firstName', { 
              required: 'First name field is required.', 
            })}
            errors={fieldErrors}
          />
        </div>

        <div className='col-12'>
          <TextField
            name='middleName'
            label='Middle Name'
            {...register('middleName', { 
              required: 'Middle name field is required.', 
            })}
            errors={fieldErrors}
          />
        </div>

        <div className='col-12'>
          <TextField
            name='lastName'
            label='Last Name'
            {...register('lastName', { 
              required: 'Last name field is required.', 
            })}
            errors={fieldErrors}
          />
        </div>

        <div className='col-12'>
          <DateField
            name='birthday'
            label='Birth Date'
            {...register('birthday', { 
              required: 'Birthday field is required.', 
            })}
            errors={fieldErrors}
          />
        </div>

        <div className='col-12'>
          <Password
            name='password'
            label='Password'
            {...register('password', { 
              required: 'Password field is required.', 
            })}
            errors={fieldErrors}
          />
        </div>

        <div className='col-12'>
          <Password
            name='confirmPassword'
            label='Confirm Password'
            {...register('confirmPassword', { 
              required: 'Confirm password field is required.', 
              validate: value => value === getValues()?.password || 'Confirm password does not match password.',
            })}
            errors={fieldErrors}
          />
        </div>

        <div className='col-12'>
          <TextField
            name='address'
            label='Address'
            {...register('address', { 
              required: 'Address field is required.', 
            })}
            errors={fieldErrors}
          />
        </div>

        <div className='col-12'>
          <Button
            size='large'
            style={{  width: '100%' }}
            type='submit'
            label='SUBMIT'
          />
        </div>
      </div>
    </form>
  );

  const OtpVerify = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='row gy-4 gx-0' align='center'>
        <div className='col-12'>
          <h4>
            Enter OTP Code
          </h4>
        </div>
        
        {apiErrorMessage && (
          <div className='col-12'>
            <FormError {...{ error: apiErrorMessage }}/>
          </div>
        )}
        
        <div className='col-12'>
          <TextField
            name='verifyOtp'
            label='One Time Password'
            {...register('verifyOtp', { 
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
  );

  const RegisterAccountStatus = () => (
    <div className='row gy-4 gx-0' align='center'>
      <div className='col-12'>
        <h4>
          Register
        </h4>
      </div>

      <div className='col-12'>
        {registeredMessage}
      </div>
    </div>
  );

  return <>
    {!loading
      ?
        <>
          {formMode === 'REGISTER' && (
            <RegisterForm/>
          )}

          {formMode === 'VERIFY_OTP' && (
            <OtpVerify/>
          )}

          {formMode === 'REGISTER_ACCOUNT_STATUS' && (
            <RegisterAccountStatus/>
          )}
        </>
      :
      <Loading/>
    }
  </>
}

const CustomerRegisterPage = () => (
  <ResponsiveWrapper>
    <CustomForm/>
  </ResponsiveWrapper>
);

export default CustomerRegisterPage;