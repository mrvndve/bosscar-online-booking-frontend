import { 
  Button,
  Table,
  ConfirmationDialog,
} from '../../../components';

import useAdminPromoCodes from '../../../hooks/use-admin-promo-codes';

import { Add } from '@mui/icons-material';

const AdminPromoCodesPage = () => {
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
  } = useAdminPromoCodes();

  return <>
    <div className='mb-4' align='right'>
      <Button
        label='Add Promo Codes'
        startIcon={<Add/>}
        onClick={() => navigate('/admin/promo-codes/create')}
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

export default AdminPromoCodesPage;