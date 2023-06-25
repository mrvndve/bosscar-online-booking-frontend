import { Fragment } from 'react';

import { 
  WebViewContainer, 
  MobileViewContainer,
  Card,
  Loading,
  Password,
  SelectField,
  TextField,
  Button,
  FormError,
} from '../../components';

import { Autocomplete, Box } from '@mui/material';

import { numbersOnlyKeyPress, countryCodes } from '../../utils';

import useCustomerLogin from '../../hooks/use-customer-login';

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

const LoginForm = () => {
  const {
    navigate,
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    apiErrorMessage,
  } = useCustomerLogin();

  return <>
    {!loading
      ?
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row gy-4 gx-0' align='center'>
          <div className='col-12'>
            <h4>
              Sign In
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
            <Button
              size='large'
              style={{  width: '100%' }}
              type='submit'
              label='Sign In'
            />
          </div>

          <div className='col-12'>
            <div className='row g-0'>
              <div className='col-12' align='right'>
                <span 
                  role='button'
                  style={{ textDecoration: 'underline', fontWeight: 'bold' }}
                  onClick={() => navigate('/forgot-password')}
                >
                  Forgot Password?
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
      :
      <Loading/>
    }
  </>
}

const CustomerLoginPage = () => (
  <ResponsiveWrapper>
    <LoginForm/>
  </ResponsiveWrapper>
);

export default CustomerLoginPage;