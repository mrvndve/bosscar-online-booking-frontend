import useSettingsProfile from '../../../hooks/use-settings-profile';

import {
  TextField,
  SelectField,
  Card,
  Loading,
  DateField,
  TextAreaField,
  Button,
} from '../../../components';

import moment from 'moment';

const SettingsUpdateProfileForm = () => {
  const  {
    register,
    fieldErrors,
    handleSubmit,
    getUser,
    onSubmit,
  } = useSettingsProfile()

  return <>
    <div className='row'>
      <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6'>
        <Card style={{ padding: '35px 25px 25px 25px', }}>
          <form id='profile-form' onSubmit={handleSubmit(onSubmit)}>
            <div className='row g-4'>
              <div className='col-12'>
                <TextField
                  name='firstName'
                  label='First Name'
                  {...register('firstName', { 
                    required: 'First Name field is required.',
                  })}
                  defaultValue={getUser().firstName}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-12'>
                <TextField
                  name='middleName'
                  label='Middle Name'
                  {...register('middleName')}
                  defaultValue={getUser().middleName}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-12'>
                <TextField
                  name='lastName'
                  label='Last Name'
                  {...register('lastName', { 
                    required: 'Last Name field is required.',
                  })}
                  defaultValue={getUser().lastName}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-12'>
                <DateField
                  name='birthday'
                  label='Birth Date'
                  {...register('birthday', { 
                    required: 'Birth date field is required.',
                  })}
                  defaultValue={moment(getUser().birthday).format('YYYY-MM-DD')}
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
                  defaultValue={getUser().address}
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
  </>  
};

export default SettingsUpdateProfileForm;