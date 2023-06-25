import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  CheckOutlined,
  CloseOutlined,
  Delete,
  Download,
} from '@mui/icons-material';
import axios from 'axios';
import {
  PAYMENT_STATUS,
  exportToCSV,
  toastSuccess,
} from '../utils';
import { toastError } from '../utils';
import { isEmpty } from 'lodash';
import moment from 'moment';

const useAdminTransactions = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [selected, setSelected] = useState([]);

  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('customer');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');

  const [exportData, setExportData] = useState('');

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    await axios.get('/transactions')
      .then(({data}) => {
        var filtered = data.datas.filter(data => {
          data['customer'] = `${data?.users?.firstName} ${data?.users?.lastName}`;
          data['car'] = data?.cars?.brand;
          data['discount'] = (!isEmpty(data?.promoCodeId) && isEmpty(data?.promoCode)) ? data?.promoCode?.value : '--';
          data['paymentStatus'] = PAYMENT_STATUS[data?.payments[0]?.status];
          return data[searchBy].toLowerCase().includes(search.toLowerCase());
        })
        setResponse(state => ({...state, data: filtered, status: data.status}));
        setLoading(false);
      })
      .catch(err => {
        toastError(err.message);
        setLoading(false);
      });
  };

  const exportDatas = (expData) => {
    let arr = [];

    expData.map(data => {
      arr.push({
        ['Reference No.']: data?.referenceNo,
        ['Customer']: `${data?.users?.firstName} ${data?.users?.lastName}`,
        ['Car']: data?.cars?.brand,
        ['Discount']: (!isEmpty(data?.promoCodeId) && isEmpty(data?.promoCode)) ? data?.promoCode?.value : '--',
        ['Total Price']: data?.totalPrice,
        ['Payment Status']: PAYMENT_STATUS[data?.payments[0]?.status],
        ['Pick-Up Location']: data?.pickUpLocation,
        ['Pick-Up Date']: moment(data?.pickUpDatetime).format('MMMM DD YYYY hh:mm A'),
        ['Return Location']: data?.destinationLocation,
        ['Return Date']: moment(data?.returnDatetime).format('MMMM DD YYYY hh:mm A'),
        ['Transaction Created']: moment(data.createdAt).format('MMMM DD YYYY hh:mm A'),
      })
    });

    setExportData(arr);
  };

  const openDialog = (action, isMultiple, data) => {
    setDialogOpen(true);
    setDialogAction(action);
    setDialogMessage(`Are you sure you want to ${action} the selected row/s.`);

    if (!isMultiple) {
      setSelected([data.id]);
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelected([]);
  };

  const onConfirmDialog = () => {
    if (dialogAction === 'Delete') {
      deleteData();
    } else if (dialogAction === 'Approve') {
      approveData();
    } else if (dialogAction === 'Cancel') {
      cancelData();
    }
  }

  const deleteData = async () => {
    const params = { params: { where: { id: { inq: selected } } } };
      
    setLoading(true);
    await axios.delete('/transactions', params)
      .then(({data}) => {
        selected.map((data) => {
          let indexes = response.data.findIndex((i) => i.id === data)
          response.data.splice(indexes, 1);
        })

        toastSuccess(`Data/s successfully deleted.`);
        setLoading(false);
      })
      .catch(err => {
        toastError(err.message);
        setLoading(false);
      });
  };

  const approveData = async () => {
    setLoading(true);
    await axios.patch(`/transactions-finish/${selected[0]}`)
      .then(({data}) => {
        selected.map((data) => {
          let indexes = response.data.findIndex((i) => i.id === data)
          response.data[indexes]['paymentStatus'] = PAYMENT_STATUS['active'];
        });

        toastSuccess(`Data/s successfully Approved.`);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        toastError(err.message);
      })
  };

  const cancelData = async () => {
    setLoading(true);
    await axios.patch(`/transactions-cancel/${selected[0]}`)
      .then(({data}) => {
        selected.map((data) => {
          let indexes = response.data.findIndex((i) => i.id === data)
          response.data[indexes]['paymentStatus'] = PAYMENT_STATUS['cancel'];
        });

        toastSuccess(`Data/s successfully Cancelled.`);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        toastError(err.message);
      })
  };

  const tableRowsHeaders = [
    {
      id: 'id',
      label: 'Id',
    },
    {
      id: 'referenceNo',
      label: 'Reference No.',
    },
    {
      id: 'totalPrice',
      label: 'Total Price',
      isPrice: true,
    },
    {
      id: 'paymentStatus',
      label: 'Payment Status',
    },
    {
      id: 'pickUpLocation',
      label: 'Pick-Up Location',
    },
    {
      id: 'pickUpDatetime',
      label: 'Pick-Up Date',
      isDateTime: true,
    },
    {
      id: 'destinationLocation',
      label: 'Return Location',
    },
    {
      id: 'returnDatetime',
      label: 'Return Date',
      isDateTime: true,
    },
    {
      id: 'createdAt',
      label: 'Transaction Date',
      isDateTime: true,
    },
    {
      id: 'action',
      label: 'Actions',
      actionItems: [
        { 
          icon: <Delete color='error'/>,
          label: 'Delete', 
          action: (e, rowData) => openDialog('Delete', false, rowData),
        },
        { 
          icon: <CheckOutlined color='success'/>,
          label: 'Approve Payment', 
          action: (e, rowData) => openDialog('Approve', false, rowData),
        },
        { 
          icon: <CloseOutlined color='error'/>,
          label: 'Cancel Payment', 
          action: (e, rowData) => openDialog('Cancel', false, rowData),
        },
      ],
    },
  ];

  const tableHeaderActions = {
    actionButtons: [
      {
        icon: <Download/>,
        color: 'success',
        label: 'Export',
        onClick: () => exportToCSV(exportData, 'Transactions'),
        skipPermission: true,
      },
      {
        icon: <Delete/>,
        color: 'error',
        label: 'Delete',
        disabled: selected.length === 0,
        onClick: () => openDialog('Delete', true, null),
      },
    ],
    filterByOptions: [
      {
        label: 'Customer',
        value: 'customer',
      },
    ],
  };

  useEffect(() => {
    if (!isEmpty(response?.data)) {
      exportDatas(response.data);
    }
  }, [response]);

  return {
    navigate,
    loading,
    rows: response ? response.data : [],
    tableRowsHeaders,
    tableHeaderActions,
    selected,
    setSelected,
    searchBy,
    setSearchBy,
    search,
    setSearch,
    fetchData,

    dialog: {
      open: dialogOpen,
      title: dialogAction,
      message: dialogMessage,
      onClose: closeDialog,
      onConfirm: onConfirmDialog,
    },
  }
};

export default useAdminTransactions;