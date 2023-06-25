import { 
  Person,
  Key,
  Phone,
} from '@mui/icons-material';

import { Card } from '../../../components';

import SettingsUpdateProfileForm from '../../settings/profile';
import SettingsChangePasswordForm from '../../settings/change-password';
import SettingsChangePhoneNumberForm from '../../settings/change-phone-number';

const CustomerAccountSettingsPage = () => {
  return <>
    <div className='mb-5 custom-header'>
      <div className='mb-2'>
        <span style={{ fontWeight: 600, fontSize: 25 }}>
          Account Settings
        </span>
      </div>

      <div>
        <span style={{ fontWeight: 500, fontSize: 15 }}>
          Manage your profile information and password.
        </span>
      </div>
    </div>

    <div className='customer-page-container'>
      <Card elevation={0}>
        <div className='row g-5'>
          <div className='col-12'>
            <div className='mb-2'>
              <span style={{ fontWeight: 600, fontSize: 25 }}>
                <Person/> Profile
              </span>
            </div>

            <div>
              <SettingsUpdateProfileForm/>
            </div>
          </div>

          <div className='col-12'>
            <div className='mb-2'>
              <span style={{ fontWeight: 600, fontSize: 25 }}>
                <Phone/> Change Phone Number
              </span>
            </div>

            <div>
              <SettingsChangePhoneNumberForm/>
            </div>
          </div>

          <div className='col-12'>
            <div className='mb-2'>
              <span style={{ fontWeight: 600, fontSize: 25 }}>
                <Key/> Change Password
              </span>
            </div>

            <div>
              <SettingsChangePasswordForm/>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </>
};

export default CustomerAccountSettingsPage;