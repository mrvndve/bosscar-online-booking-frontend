import { 
  Table,
  ConfirmationDialog,
} from '../../../components';

import useAdminTransactions from '../../../hooks/use-admin-transactions';

const AdminTransactionsPage = () => {
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
  } = useAdminTransactions();

  return <>
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

export default AdminTransactionsPage;