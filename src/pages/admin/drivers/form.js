import { Fragment } from 'react';

import { 
  TextField,
  TextAreaField,
  DateField,
  SelectField,
  Button,
  Card,
  Loading,
} from '../../../components';

import { Autocomplete, Box } from '@mui/material';

import { countryCodes, numbersOnlyKeyPress, getCountryCode } from '../../../utils';

import useAdminDriversForm from '../../../hooks/use-admin-drivers-form';

const AdminDriversFormPage = () => {
  const {
    formMode,
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    selectedRow,
    cars,
  } = useAdminDriversForm();

  return <>
    <Card style={{ padding: '35px 25px 25px 25px', }}>
      {!loading
        ?
        <div>
          <form id='users-form' onSubmit={handleSubmit(onSubmit)}>
            <div className='row g-4'>
              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
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
                  defaultValue={countryCodes[countryCodes.findIndex(i => i.name === selectedRow?.countryCode.substring(0, selectedRow.countryCode.indexOf('+')).trim())]}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='phoneNumber'
                  label='Phone Number'
                  {...register('phoneNumber', { 
                    required: 'Phone number field is required.',
                  })}
                  onKeyPress={numbersOnlyKeyPress}
                  defaultValue={selectedRow?.phoneNumber}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='firstName'
                  label='First Name'
                  {...register('firstName', { 
                    required: 'First name field is required.',
                  })}
                  defaultValue={selectedRow?.firstName}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='middleName'
                  label='Middle Name'
                  {...register('middleName', { 
                    required: 'Middle name field is required.',
                  })}
                  defaultValue={selectedRow?.middleName}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='lastName'
                  label='Last Name'
                  {...register('lastName', { 
                    required: 'Last name field is required.',
                  })}
                  defaultValue={selectedRow?.lastName}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <DateField
                  name='birthday'
                  label='Birth Date'
                  {...register('birthday', { 
                    required: 'Birth date field is required.',
                  })}
                  defaultValue={selectedRow?.birthday}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <SelectField
                  name='carId'
                  label='Car'
                  options={cars.map((data) => ({
                    label: data.brand,
                    value: data.id,
                  }))}
                  {...register('carId', { 
                    required: 'Car field is required.',
                  })}
                  defaultValue={selectedRow?.carId}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='licenseNo'
                  label='License Number'
                  {...register('licenseNo', { 
                    required: 'License number field is required.',
                  })}
                  defaultValue={selectedRow?.licenseNo}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-12'>
                <TextAreaField
                  name='address'
                  label='Address'
                  {...register('address', { 
                    required: 'Address field is required.',
                  })}
                  defaultValue={selectedRow?.address}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-12' align='right'>
                <Button
                  type='submit'
                  label={`${formMode === 'create' ? 'Save' : 'Update'}`}
                />
              </div>
            </div>
          </form>
        </div>
        :
        <Loading/>
      }
    </Card>
  </>
};

export default AdminDriversFormPage;