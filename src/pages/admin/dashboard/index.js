import { Box } from '@mui/material';
import {
  People,
  Accessible,
  DirectionsCar,
  Discount,
} from '@mui/icons-material';
import { Card } from '../../../components';
import useAdminDashboard from '../../../hooks/use-admin-dashboard';

const CountCard = ({
  icon,
  title,
  count,
  backgroundColor,
}) => (
  <Card sx={{ backgroundColor }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ alignSelf: 'flex-end' }}>
        {icon}
      </div>

      <div align='right' style={{ color: 'white' }}>
        <h1>
          <strong>
            {count}
          </strong>

          <br/>
        </h1>

        <h3>
          <span style={{ fontStyle: 'italic', opacity: 0.5 }}>
            {title}
          </span>
        </h3>
      </div>
    </Box>
  </Card>
);

const AdminDashboardPage = () => {
  const {
    usersCount,
    driversCount,
    carsCount,
    promoCodesCount,
  } = useAdminDashboard();

  const IconStyle = { 
    fontSize: 100, color: 'white', 
    opacity: 0.5 
  };

  return <>
    <div className='row g-5'>
      <div className='col-sm-12 col-md-12 col-lg-6 col-xl-4'>
        <CountCard {...{
          icon: <People style={IconStyle}/>,
          title: 'Users', 
          count: usersCount,
          backgroundColor: 'primary.main'
        }}/>
      </div>

      <div className='col-sm-12 col-md-12 col-lg-6 col-xl-4'>
        <CountCard {...{
          icon: <Accessible style={IconStyle}/>,
          title: 'Drivers', 
          count: driversCount,
          backgroundColor: 'success.main'
        }}/>
      </div>

      <div className='col-sm-12 col-md-12 col-lg-6 col-xl-4'>
        <CountCard {...{
          icon: <DirectionsCar style={IconStyle}/>,
          title: 'Cars', 
          count: carsCount,
          backgroundColor: 'warning.light'
        }}/>
      </div>

      <div className='col-sm-12 col-md-12 col-lg-6 col-xl-4'>
        <CountCard {...{
          icon: <Discount style={IconStyle}/>,
          title: 'Promo Codes', 
          count: promoCodesCount,
          backgroundColor: 'error.main'
        }}/>
      </div>
    </div>
  </>
};

export default AdminDashboardPage;