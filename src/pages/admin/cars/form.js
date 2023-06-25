import { 
  TextField,
  TextAreaField,
  Button,
  Card,
  Loading,
  PriceTextField,
  UploadField,
} from '../../../components';

import useAdminCarsForm from '../../../hooks/use-admin-cars-form';
import { numbersOnlyKeyPress } from '../../../utils';

const AdminCarsFormPage = () => {
  const {
    formMode,
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    selectedRow,
    onUpload,
  } = useAdminCarsForm();

  return <>
    <Card style={{ padding: '35px 25px 25px 25px', }}>
      {!loading
        ?
        <div>
          <form id='cars-form' onSubmit={handleSubmit(onSubmit)}>
            <div className='row g-4'>
              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <UploadField
                  name='image'
                  label='Image'
                  {...register('image', { 
                    required: 'Image field is required.',
                  })}
                  handleUpload={onUpload}
                  defaultValue={selectedRow?.image}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='brand'
                  label='Brand'
                  {...register('brand', { 
                    required: 'Brand field is required.',
                  })}
                  defaultValue={selectedRow?.brand}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='licensePlate'
                  label='License Plate'
                  {...register('licensePlate', { 
                    required: 'License plate field is required.',
                  })}
                  defaultValue={selectedRow?.licensePlate}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <TextField
                  name='capacity'
                  label='Capacity'
                  {...register('capacity', { 
                    required: 'Capacity field is required.',
                  })}
                  onKeyPress={numbersOnlyKeyPress}
                  defaultValue={selectedRow?.capacity}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                <PriceTextField
                  name='totalPrice'
                  label='Total Price'
                  {...register('totalPrice', { 
                    required: 'Total Price field is required.',
                  })}
                  defaultValue={selectedRow?.totalPrice}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-12'>
                <TextAreaField
                  name='description'
                  label='Description'
                  {...register('description', { 
                    required: 'Description field is required.',
                  })}
                  defaultValue={selectedRow?.description}
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

export default AdminCarsFormPage;