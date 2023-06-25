import { Button, Modal } from "../components";

const ReserveVehicleModal = ({
  isOpen,
  handleClose,
}) => (
  <Modal {...{
    isOpen,
    handleClose,
    title: 'RESERVE A VEHICLE',
  }}>
    <div className='row g-4'>
      <div className='col-12'>
        Thank you for your inquiry! We will contact you soon!
      </div>

      <div className='col-12'>
        <Button 
          style={{ width: '100%' }} 
          label='OKAY' 
          onClick={() => {
            handleClose();
          }}
        />
      </div>
    </div>
  </Modal>
);

export default ReserveVehicleModal;