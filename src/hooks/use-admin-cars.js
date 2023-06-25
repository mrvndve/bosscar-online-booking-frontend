import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Edit,
  Delete,
  Lock,
  LockOpen,
  Download,
} from '@mui/icons-material';
import axios from 'axios';
import {
  exportToCSV,
  toastSuccess,
} from '../utils';
import { toastError } from '../utils';
import { isEmpty } from 'lodash';
import moment from 'moment';

const useAdminCars = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [selected, setSelected] = useState([]);

  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('brand');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');

  const [exportData, setExportData] = useState('');

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    await axios.get('/cars')
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
        ['Brand']: data.brand,
        ['License Plate']: data.licensePlate,
        ['Capacity']: data.capacity,
        ['totalPrice']: data.totalPrice,
        ['description']: data.description,
        ['status']: data.status,
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
    } else if (dialogAction === 'Activate') {
      activateDeactivateData('activate');
    } else if (dialogAction === 'Deactivate') {
      activateDeactivateData('deactivate');
    }
  }

  const deleteData = async () => {
    const params = { params: { where: { id: { inq: selected } } } };
      
    setLoading(true);
    await axios.delete('/cars', params)
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

  const activateDeactivateData = async (action) => {
    const params = { params: { where: { id: { inq: selected } } } };
    const apiData = { status: action === 'activate' ? 'active' : 'inactive' };

    setLoading(true);
    await axios.patch(`/cars`, apiData, params)
      .then(({data}) => {
        selected.map((data) => {
          let indexes = response.data.findIndex((i) => i.id === data)
          response.data[indexes]['status'] = action === 'activate' ? 'active' : 'inactive';
        })

        toastSuccess(`Data/s successfully ${action}.`);
        setLoading(false);
      })
      .catch(err => {
        toastError(err);
      });
  };

  const tableRowsHeaders = [
    {
      id: 'id',
      label: 'Id',
    },
    {
      id: 'image',
      label: 'Image',
      isImage: true,
    },
    {
      id: 'brand',
      label: 'Brand',
    },
    {
      id: 'licensePlate',
      label: 'Licence Plate',
    },
    {
      id: 'capacity',
      label: 'Capacity',
    },
    {
      id: 'totalPrice',
      label: 'Total Price',
      isPrice: true,
    },
    {
      id: 'status',
      label: 'Status',
    },
    {
      id: 'createdAt',
      label: 'Date Created',
      isDateTime: true,
    },
    {
      id: 'updatedAt',
      label: 'Date Updated',
      isDateTime: true,
    },
    {
      id: 'action',
      label: 'Actions',
      actionItems: [
        { 
          icon: <Edit color='primary'/>,
          label: 'Edit',
          action: (e, rowData) => navigate('/admin/cars/edit', { state: rowData }),
        },
        { 
          icon: <Delete color='error'/>,
          label: 'Delete', 
          action: (e, rowData) => openDialog('Delete', false, rowData),
        },
        { 
          icon: <Lock color='warning'/>,
          label: 'Activate', 
          action: (e, rowData) => openDialog('Activate', false, rowData),
        },
        { 
          icon: <LockOpen color='warning'/>,
          label: 'Deactivate', 
          action: (e, rowData) => openDialog('Deactivate', false, rowData),
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
        onClick: () => exportToCSV(exportData, 'Cars'),
        skipPermission: true,
      },
      {
        icon: <Delete/>,
        color: 'error',
        label: 'Delete',
        disabled: selected.length === 0,
        onClick: () => openDialog('Delete', true, null),
      },
      {
        icon: <LockOpen/>,
        color: 'warning',
        label: 'Activate',
        disabled: selected.length === 0,
        onClick: () => openDialog('Activate', true, null),
      },
      {
        icon: <Lock/>,
        color: 'warning',
        label: 'Deactivate',
        disabled: selected.length === 0,
        onClick: () => openDialog('Deactivate', true, null),
      },
    ],
    filterByOptions: [
      {
        label: 'Brand',
        value: 'brand',
      },
      {
        label: 'License Plate',
        value: 'licensePlate',
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

export default useAdminCars;