import { 
    Button,
    Table,
    ConfirmationDialog,
  } from '../../../components';
  
  import useAdminCars from '../../../hooks/use-admin-cars';
  
  import { Add } from '@mui/icons-material';
  
  const AdminCarsPage = () => {
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
    } = useAdminCars();
  
    return <>
      <div className='mb-4' align='right'>
        <Button
          label='Add Cars'
          startIcon={<Add/>}
          onClick={() => navigate('/admin/cars/create')}
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
  
  export default AdminCarsPage;