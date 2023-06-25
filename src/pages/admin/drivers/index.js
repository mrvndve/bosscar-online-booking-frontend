import { 
  Button,
  Table,
  ConfirmationDialog,
} from '../../../components';

import useAdminDrivers from '../../../hooks/use-admin-drivers';

import { Add } from '@mui/icons-material';

const AdminDriversPage = () => {
  const {
    navigate,
    loading,
    rows,
    tableRowsHeaders,
    tableHeaderActions,
    selected,
    setSelected,
    searchBy,
    setSearchBy,
    search,
    setSearch,
    dialog,
    fetchData,
  } = useAdminDrivers();

  return <>
    <div className='mb-4' align='right'>
      <Button
        label='Add Driver'
        startIcon={<Add/>}
        onClick={() => navigate('/admin/drivers/create')}
      />
    </div>

    <div>
      <Table {...{
        loading,
        rows,
        tableRowsHeaders,
        tableHeaderActions,
        selected,
        setSelected,
        searchBy,
        setSearchBy,
        search,
        setSearch,
        fetchData,
      }}/>

      <ConfirmationDialog {...{
        open: dialog.open,
        onClose: dialog.onClose,
        title: dialog.title,
        message: dialog.message,
        onConfirm: dialog.onConfirm,
      }}/>
    </div>
  </>
};

export default AdminDriversPage;