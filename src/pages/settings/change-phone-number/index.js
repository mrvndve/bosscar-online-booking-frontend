import { Fragment } from 'react';

import useSettingsChangePhoneNumber from '../../../hooks/use-settings-change-phone-number';

import {
  TextField,
  Card,
  Button,
} from '../../../components';

import { Autocomplete, Box } from '@mui/material';

import OtpModal from '../../otp-modal';

import { numbersOnlyKeyPress } from '../../../utils';

const SettingsChangePhoneNumberForm = () => {
  const  {
    countryCodes,
    register,
    setValue,
    fieldErrors,
    handleSubmit,
    getUser,
    onSubmit,
    otpModalOpen,
    handleOtpCloseModal,
    onOtpVerify,
    otpErrorMessage,
    otpLoading,
  } = useSettingsChangePhoneNumber()

  return <>
    <div className='row'>
      <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6'>
        <Card style={{ padding: '35px 25px 25px 25px', }}>
          <form id='change-password-form' onSubmit={handleSubmit(onSubmit)}>
            <div className='row g-4'>
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
                  defaultValue={countryCodes[countryCodes.findIndex(i => i.name === getUser().countryCode.substring(0, getUser().countryCode.indexOf('+')).trim())]}
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
      otpErrorMessage,
      otpModalOpen,
      handleOtpCloseModal,
      onOtpVerify,
      otpLoading,
    }}/>
  </>  
};

export default SettingsChangePhoneNumberForm;