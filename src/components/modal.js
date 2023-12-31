import {
  Modal as MUIModal,
  Box,
  Typography,
  Backdrop,
  Fade,
} from '@mui/material';

const Modal = ({
  isOpen = false,
  title,
  width = '90%',
  handleClose,
  children,
}) => {
  return <>
    <MUIModal
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      aria-labelledby='modal-modal-title'
    >
      <Fade in={isOpen}>
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: width,
            maxWidth: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography className='mb-4' id='modal-modal-title' variant='h6' component='h2'>
            <strong>
              {title}
            </strong>
          </Typography>

          <div>
            {children}
          </div>
        </Box>
      </Fade>
    </MUIModal>
  </>
};

export default Modal;