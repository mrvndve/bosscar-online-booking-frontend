import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import ErrorPage from '../pages/error-page';
import ComingSoonPage from '../pages/coming-soon-page';
import AdminPageLayout from '../layouts/admin';
import CustomerPageLayout from '../layouts/customer';
import AdminProtectedRoutes from './admin-protected-routes';
import CustomerProtectedRoutes from './customer-protected-routes';
import AdminLoginPage from '../pages/admin/login';
import AdminForgotPasswordPage from '../pages/admin/forgot-password';
import AdminDashboardPage from '../pages/admin/dashboard';
import AdminUsersPage from '../pages/admin/users';
import AdminUsersFormPage from '../pages/admin/users/form';
import AdminPromoCodesPage from '../pages/admin/promo-codes';
import AdminPromoCodesFormPage from '../pages/admin/promo-codes/form';
import AdminCarsPage from '../pages/admin/cars';
import AdminCarsFormPage from '../pages/admin/cars/form';
import AdminDriversPage from '../pages/admin/drivers';
import AdminDriversFormPage from '../pages/admin/drivers/form';
import AdminQoutationsPage from '../pages/admin/qoutations';
import AdminTransactionsPage from '../pages/admin/transactions';
import CustomerHomePage from '../pages/customer/home';
import CustomerChooseVehiclePage from '../pages/customer/choose-vehicle.js';
import CustomerCheckoutPage from '../pages/customer/checkout';
import CustomerBookingsPage from '../pages/customer/bookings';
import CustomerViewBookingPage from '../pages/customer/view-booking';
import SettingsUpdateProfileForm from '../pages/settings/profile';
import SettingsChangePasswordForm from '../pages/settings/change-password';
import SettingsChangePhoneNumberForm from '../pages/settings/change-phone-number';
import CustomerAccountSettingsPage from '../pages/customer/account-settings';
import CustomerLoginPage from '../pages/customer/login';
import CustomerForgotPasswordPage from '../pages/customer/forgot-password';
import CustomerRegisterPage from '../pages/customer/register';
import { ONLINE_RENTAL_TOGGLE_ENABLED } from '../utils';

const AppRoutes = () => {
  const ADMIN_UNAUTH_ROUTES = [
    {
      path: '/admin/login',
      page: <AdminLoginPage/>,
    },
    {
      path: '/admin/forgot-password',
      page: <AdminForgotPasswordPage/>,
    },
  ];

  const ADMIN_AUTH_ROUTES = [
    {
      path: '/admin', 
      page: <AdminDashboardPage/>,
    },
    {
      path: '/admin/users',
      page: <AdminUsersPage/>,
    },
    {
      path: '/admin/users/:formMode',
      page: <AdminUsersFormPage/>,
    },
    {
      path: '/admin/promo-codes',
      page: <AdminPromoCodesPage/>,
    },
    {
      path: '/admin/promo-codes/:formMode',
      page: <AdminPromoCodesFormPage/>,
    },
    {
      path: '/admin/cars',
      page: <AdminCarsPage/>,
    },
    {
      path: '/admin/cars/:formMode',
      page: <AdminCarsFormPage/>,
    },
    {
      path: '/admin/drivers',
      page: <AdminDriversPage/>,
    },
    {
      path: '/admin/drivers/:formMode',
      page: <AdminDriversFormPage/>,
    },
    {
      path: '/admin/qoutations',
      page: <AdminQoutationsPage/>,
    },
    {
      path: '/admin/transactions',
      page: <AdminTransactionsPage/>,
    },
    {
      path: '/admin/settings/profile',
      page: <SettingsUpdateProfileForm/>,
    },
    {
      path: '/admin/settings/change-password',
      page: <SettingsChangePasswordForm/>
    },
    {
      path: '/admin/settings/change-phone-number',
      page: <SettingsChangePhoneNumberForm/>
    }
  ];

  const CUSTOMER_ROUTES = [
    { 
      path: '/',
      page: <CustomerHomePage/>
    },
    ONLINE_RENTAL_TOGGLE_ENABLED && { 
      path: '/sign-in',
      page: <CustomerLoginPage/>
    },
    ONLINE_RENTAL_TOGGLE_ENABLED && {
      path: '/register',
      page: <CustomerRegisterPage/>
    },
    ONLINE_RENTAL_TOGGLE_ENABLED && { 
      path: '/forgot-password',
      page: <CustomerForgotPasswordPage/>
    },
    ONLINE_RENTAL_TOGGLE_ENABLED && {
      path: '/account-settings',
      page: <CustomerAccountSettingsPage/>
    },
    ONLINE_RENTAL_TOGGLE_ENABLED && {
      path: '/choose-vehicle',
      page: <CustomerChooseVehiclePage/>
    },
    ONLINE_RENTAL_TOGGLE_ENABLED && {
      path: '/check-out',
      page: <CustomerCheckoutPage/>
    },
    ONLINE_RENTAL_TOGGLE_ENABLED && {
      path: '/bookings',
      page: <CustomerBookingsPage/>
    },
    ONLINE_RENTAL_TOGGLE_ENABLED && {
      path: '/bookings/:transactionId',
      page: <CustomerViewBookingPage/>,
    },
  ].filter(Boolean);

  return <>
    <BrowserRouter>
      <Routes>
        {ADMIN_UNAUTH_ROUTES.map((i, key) => (
          <Route
            key={key}
            path={i.path}
            element={
              <AdminProtectedRoutes>
                {i.page}
              </AdminProtectedRoutes>
            }
          />
        ))}

        {ADMIN_AUTH_ROUTES.map((i, key) => (
          <Route
            key={key}
            path={i.path}
            element={
              <AdminProtectedRoutes>
                <AdminPageLayout>
                  {i.page}
                </AdminPageLayout>
              </AdminProtectedRoutes>
            }
          />
        ))}

        {CUSTOMER_ROUTES.map((i, key) => (
          <Route
            key={key}
            path={i.path}
            element={
              <CustomerProtectedRoutes>
                <CustomerPageLayout>
                  {i.page}
                </CustomerPageLayout>
              </CustomerProtectedRoutes>
            }
          />
        ))}

        <Route 
          path='*'
          element={<ErrorPage/>}
        />
      </Routes>
    </BrowserRouter>
  </>
};

export default AppRoutes;