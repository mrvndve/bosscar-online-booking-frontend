import { CircularProgress, Box } from '@mui/material';

const Loading = () => {
  return <>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  </>
}

export default Loading;