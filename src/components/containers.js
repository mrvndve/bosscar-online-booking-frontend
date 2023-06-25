import { Box } from '@mui/material';

const MobileViewContainer = ({ children }) => {
  return <>
    <Box sx={{ height: '100vh', display: { md: 'none' } }}>
      {children}
    </Box>
  </>
};

const WebViewContainer = ({ children }) => {
  return <>
    <Box sx={{ height: '100vh', display: { xs: 'none', md: 'block' } }}>
      {children}
    </Box>
  </>
};

export {
  MobileViewContainer,
  WebViewContainer,
};