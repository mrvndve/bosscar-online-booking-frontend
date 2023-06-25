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

const useAdminQoutations = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [selected, setSelected] = useState([]);

  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('fullName');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');

  const [exportData, setExportData] = useState('');

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    await axios.get('/reservations')
      .then(({data}) => {
        var filtered = data.datas.filter(data => {
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
        ['Name']: data.fullName,
        ['Phone Number']: data.phoneNumber,
        ['Email']: data.email,
        ['Pick-up Location']: data.pickUpLocation,
        ['Return Location']: data.returnLocation,
        ['Pick-up Date']: data.pickUpDatetime,
        ['Return Date']: data.returnDatetime,
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
    }
  }

  const deleteData = async () => {
    const params = { params: { where: { id: { inq: selected } } } };
      
    setLoading(true);
    await axios.delete('/reservations', params)
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

  const tableRowsHeaders = [
    {
      id: 'id',
      label: 'Id',
    },
    {
      id: 'fullName',
      label: 'Name',
    },
    {
      id: 'phoneNumber',
      label: 'Phone No.',
    },
    {
      id: 'email',
      label: 'Email',
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
      id: 'returnLocation',
      label: 'Return Location',
    },
    {
      id: 'returnDatetime',
      label: 'Return Date',
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
        label: 'Name',
        value: 'fullName',
      },
      {
        label: 'Phone Number',
        value: 'phoneNumber',
      },
      {
        label: 'Email',
        value: 'email',
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

export default useAdminQoutations;