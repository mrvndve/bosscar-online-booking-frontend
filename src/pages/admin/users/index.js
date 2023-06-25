import { 
  Button,
  Table,
  ConfirmationDialog,
} from '../../../components';

import useAdminUsers from '../../../hooks/use-admin-users';

import { Add } from '@mui/icons-material';

const AdminUsersPage = () => {
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
  } = useAdminUsers();

  return <>
    <div className='mb-4' align='right'>
      <Button
        label='Add User'
        startIcon={<Add/>}
        onClick={() => navigate('/admin/users/create')}
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

export default AdminUsersPage;