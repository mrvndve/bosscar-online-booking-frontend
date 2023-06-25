import { 
  TextField,
  TextAreaField,
  DateField,
  SelectField,
  Button,
  Card,
  Loading,
  PriceTextField,
} from '../../../components';

import useAdminPromoCodesForm from '../../../hooks/use-admin-promo-codes-form';

const AdminPromoCodesFormPage = () => {
  const {
    formMode,
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    selectedRow,
    users,
  } = useAdminPromoCodesForm();

  return <>
    <Card style={{ padding: '35px 25px 25px 25px', }}>
      {!loading
        ?
        <div>
          <form id='promo-codes-form' onSubmit={handleSubmit(onSubmit)}>
            <div className='row g-4'>
              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='code'
                  label='Code'
                  {...register('code', { 
                    required: 'Code field is required.',
                  })}
                  defaultValue={selectedRow?.code}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <SelectField
                  name='userId'
                  label='User'
                  options={users.map(data => ({
                    label: `${data.firstName} ${data.middleName} ${data.lastName}`,
                    value: data.id,
                  }))}
                  {...register('userId', { 
                    required: 'User field is required.',
                  })}
                  defaultValue={selectedRow?.userId}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <PriceTextField
                  name='value'
                  label='Value'
                  {...register('value', { 
                    required: 'Value field is required.',
                  })}
                  defaultValue={selectedRow?.value}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <DateField
                  name='startDate'
                  label='Start Date'
                  {...register('startDate', { 
                    required: 'Start date field is required.',
                  })}
                  defaultValue={selectedRow?.startDate}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <DateField
                  name='endDate'
                  label='End Date'
                  {...register('endDate', { 
                    required: 'End date field is required.',
                  })}
                  defaultValue={selectedRow?.endDate}
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

export default AdminPromoCodesFormPage;