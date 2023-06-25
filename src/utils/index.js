import * as XLSX from 'xlsx';

import { cloneDeep } from 'lodash';

import moment from 'moment';

import { apiDomain, axiosUrl } from './axiosConfig';

import {
  numbersOnly,
  emailOnly,
  alphanumericOnly,
} from './regex';

import {
  toastSuccess,
  toastWarning,
  toastError,
} from './toasts';

import breadCrumbsbUrl from './breadcrumbs-url';

import { 
  PRIMARY_COLOR,
  CUSTOMER_PRIMARY_COLOR,
  CUSTOMER_SECONDARY_COLOR,
} from './branding-colors';

import countryCodes from './country-codes';

import { priceFormatter, withCommasAndDecimal } from './numbers-helper';

import { authFireBase } from './firebaseConfig';

const numbersOnlyKeyPress = (e) => {
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
};

const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user : {};
};

const exportToCSV = (data, title) => {
  const xlsxData = cloneDeep(data);
  const worksheet = XLSX.utils.json_to_sheet(xlsxData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, `${title}-${moment(new Date()).format('YYYY-MM-DD')}.xlsx`);
};

const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;

const PAYPAL_CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID;

const PAYMENT_METHODS = {
  PAYPAL: 1,
  GCASH: 2,
  CASH_ON_PICKUP: 3,
};

const PAYMENT_METHODS_LABEL = {
  1: 'PAYPAL',
  2: 'GCASH',
  3: 'CASH ON PICK-UP',
};

const PAYPAL_TOGGLE_ENABLED = process.env.REACT_APP_PAYPAL_TOGGLE === true || process.env.REACT_APP_PAYPAL_TOGGLE === 'true';
const GCASH_TOGGLE_ENABLED = process.env.REACT_APP_GCASH_TOGGLE === true || process.env.REACT_APP_GCASH_TOGGLE === 'true' ;
const COP_TOGGLE_ENABLED = process.env.REACT_APP_COP_TOGGLE === true || process.env.REACT_APP_COP_TOGGLE === 'true';
const ONLINE_RENTAL_TOGGLE_ENABLED = process.env.REACT_APP_ONLINE_RENTAL_TOGGLE === true || process.env.REACT_APP_ONLINE_RENTAL_TOGGLE === 'true';

const PAYMENT_STATUS = {
  pending: 'PENDING',
  cancel: 'CANCELLED',
  active: 'PAID',
};

const getCountryCode = (countryName) => {
  return countryCodes.find(i => i.name === countryName).dial_code;
};

export {
  apiDomain,
  axiosUrl,
  numbersOnly,
  emailOnly,
  alphanumericOnly,
  numbersOnlyKeyPress,
  toastSuccess,
  toastWarning,
  toastError,
  breadCrumbsbUrl,
  PRIMARY_COLOR,
  CUSTOMER_PRIMARY_COLOR,
  CUSTOMER_SECONDARY_COLOR,
  getUser,
  exportToCSV,
  countryCodes,
  priceFormatter, 
  withCommasAndDecimal,
  authFireBase,
  MAPBOX_API_KEY,
  PAYPAL_CLIENT_ID,
  PAYMENT_METHODS,
  PAYPAL_TOGGLE_ENABLED,
  GCASH_TOGGLE_ENABLED,
  COP_TOGGLE_ENABLED,
  PAYMENT_STATUS,
  PAYMENT_METHODS_LABEL,
  getCountryCode,
  ONLINE_RENTAL_TOGGLE_ENABLED,
};