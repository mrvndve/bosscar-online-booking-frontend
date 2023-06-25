import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button } from '../../components';
import { 
  Menu as MenuIcon,
  AccountCircle,
  LogoutOutlined,
  Call,
  Email,
  Facebook,
  Instagram,
  Twitter,
  Person,
  Book,
} from '@mui/icons-material';
import { getUser, CUSTOMER_PRIMARY_COLOR, ONLINE_RENTAL_TOGGLE_ENABLED } from '../../utils';
import useCustomerHeader from '../../hooks/use-customer-header';

const CustomerPageLayout = ({ children }) => {
  const {
    handleDrawerToggle,
    handleOpenAccMenu,
    handleCloseAccMenu,    
    handleLogout,
    mobileOpen,
    openAccMenu,
    navigate,
    anchor,
    loggedIn,
    scrollIntoView,
  } = useCustomerHeader();

  const drawerWidth = 240;

  const theme = createTheme({
    palette: {
      primary: {
        main: CUSTOMER_PRIMARY_COLOR.bgColor,
        contrastText: CUSTOMER_PRIMARY_COLOR.txtColor,
      },
    },
    typography: {
      fontFamily: 'Jost, sans-serif',
      fontSize: 16,
      button: {
        fontWeight: 500,
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 0,
          },
        },
        raisedPrimary: {
          color: 'white',
        },
      }, 
    },
  });

  const DrawerItems = () => {
    return <>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            B O S S C A R
          </span>
        </Typography>

        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton 
              sx={{ textAlign: 'center' }} 
              onClick={() => {
                handleDrawerToggle();
                scrollIntoView('home');
              }}
            >
              <ListItemText primary={<strong>HOME</strong>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton 
              sx={{ textAlign: 'center' }} 
              onClick={() => {
                handleDrawerToggle();
                scrollIntoView('about-us');
              }}
            >
              <ListItemText primary={<strong>ABOUT US</strong>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton 
              sx={{ textAlign: 'center' }} 
              onClick={() => {
                handleDrawerToggle();
                scrollIntoView('contact');
              }}
            >
              <ListItemText primary={<strong>CONTACT</strong>} />
            </ListItemButton>
          </ListItem>

          {ONLINE_RENTAL_TOGGLE_ENABLED 
            ? (
              <>
                {!loggedIn && (
                  <>
                    <ListItem disablePadding>
                      <ListItemButton 
                        sx={{ textAlign: 'center' }} 
                        onClick={() => {
                          handleDrawerToggle();
                          navigate('/sign-in');
                        }}
                      >
                        <ListItemText primary={<strong>SIGN IN</strong>} />
                      </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                      <ListItemButton 
                        sx={{ textAlign: 'center' }} 
                        onClick={() => {
                          handleDrawerToggle();
                          navigate('/register');
                        }}
                      >
                        <ListItemText primary={<strong>REGISTER</strong>} />
                      </ListItemButton>
                    </ListItem>
                  </>
                )}
              </>
            )
            : (
              <ListItem disablePadding>
                <ListItemButton 
                  sx={{ textAlign: 'center' }} 
                  onClick={() => {
                    handleDrawerToggle();
                    scrollIntoView('reserve-vehicle');
                  }}
                >
                  <ListItemText primary={<strong>BOOK NOW</strong>} />
                </ListItemButton>
              </ListItem>
            )
          }
        </List>
      </Box>
    </>
  };

  return <>
    <ThemeProvider {...{ theme }}>
      <Box>
        <CssBaseline />

        <AppBar component='nav'>
          <Toolbar sx={{ bgcolor: CUSTOMER_PRIMARY_COLOR.bgColor, color: 'white' }}> 
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 'bold' }}
            >
              <span 
                style={{ cursor: 'pointer' }} 
                onClick={() => {
                  navigate('/');
                  scrollIntoView('home');
                }}
              >
                B O S S C A R
              </span>
            </Typography>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button
                className='mx-2'
                variant='text'
                style={{
                  fontWeight: 'bold', 
                  color: 'white',
                }}
                onClick={() => scrollIntoView('home')}   
              >
                HOME
              </Button>

              <Button
                className='mx-2'
                variant='text'
                style={{
                  fontWeight: 'bold', 
                  color: 'white',
                }}
                onClick={() => scrollIntoView('about-us')}   
              >
                ABOUT US
              </Button>

              <Button
                className='mx-2'
                variant='text'
                style={{
                  fontWeight: 'bold', 
                  color: 'white',
                }}
                onClick={() => scrollIntoView('contact')}   
              >
                CONTACT
              </Button>
            </Box>

            {ONLINE_RENTAL_TOGGLE_ENABLED  
              ? (
                <>
                  {(!loggedIn) 
                    ? (
                      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Person/>

                        <Button
                          variant='text'
                          style={{
                            fontWeight: 'bold', 
                            color: 'white',
                          }}
                          onClick={() => navigate('/sign-in')}
                        >
                          SIGN IN
                        </Button>
                        
                        /
                        
                        <Button
                          variant='text'
                          style={{
                            fontWeight: 'bold', 
                            color: 'white',
                          }} 
                          onClick={() => navigate('/register')}
                        >
                          REGISTER
                        </Button>
                      </Box>
                    ) 
                    : (
                      <Box>
                        <IconButton
                          variant='text'
                          style={{ 
                            backgroundColor: CUSTOMER_PRIMARY_COLOR.bgColor, 
                            fontWeight: 'bold', 
                            color: CUSTOMER_PRIMARY_COLOR.txtColor, 
                          }}
                          onClick={(e) => handleOpenAccMenu(e)}
                        >
                          <Person/>
                        </IconButton>

                        <Menu
                          anchorEl={anchor}
                          open={openAccMenu}
                          onClose={() => handleCloseAccMenu()}
                          onClick={() => handleCloseAccMenu()}
                          PaperProps={{
                            elevation: 0,
                            sx: {
                              width: 240,
                              overflow: 'visible',
                              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                              mt: 1.5,
                              left: 0,
                              '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                              },
                              '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                              },
                            },
                          }}
                          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                          >
                          <div align='center'>
                            <div className='mb-2'>
                              <AccountCircle style={{ fontSize: 50 }} />
                            </div>

                            <div className='mb-2'>
                              <span style={{ fontSize: 18, fontWeight: 'bold' }}>
                                {getUser().firstName}
                              </span>
                            </div>

                            <div className='mb-2'>
                              <span style={{ fontSize: 18, fontWeight: 'bold' }}>
                                {getUser().phoneNumber}
                              </span>
                            </div>
                          </div>

                          <hr/>

                          <MenuItem 
                            style={{ fontSize: 16 }} 
                            onClick={() => navigate('/account-settings')}
                          >
                            <Person className='me-3'/> 
                            <strong>Account Settings</strong>
                          </MenuItem>

                          <MenuItem 
                            style={{ fontSize: 16 }} 
                            onClick={() => navigate('/bookings')}
                          >
                            <Book className='me-3'/> 
                            <strong>Bookings</strong>
                          </MenuItem>

                          <MenuItem 
                            style={{ fontSize: 16 }} 
                            onClick={() => handleLogout()}
                          >
                            <LogoutOutlined className='me-3'/> 
                            <strong>Sign Out</strong>
                          </MenuItem>
                        </Menu>
                      </Box>
                  )}
                </>
              )
              : (
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Button
                    className='mx-2'
                    variant='text'
                    style={{
                      fontWeight: 'bold', 
                      color: 'white',
                    }}
                    onClick={() => scrollIntoView('reserve-vehicle')}   
                  >
                    BOOK NOW
                  </Button>
                </Box>
              )
            }
          </Toolbar>
        </AppBar>

        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            <DrawerItems/>
          </Drawer>
        </Box>

        <Box component="main">
          <Toolbar />

          <Box sx={{ minHeight: '100vh', backgroundColor: 'whitesmoke' }}>
            <div id='recaptcha-container'></div>
            {children}
          </Box>

          <Box
            className='footer'
            sx={{
              width: '100%',
              backgroundColor: CUSTOMER_PRIMARY_COLOR.bgColor,
              color: CUSTOMER_PRIMARY_COLOR.txtColor,
            }}
          >
            <div className='row g-5 mb-5'>
              <div id='contact' className='col-sm-12 col-md-6 col-lg-4 col-xl-3'>
                <div className='mb-4'>
                  <h5>
                    <strong>
                      CONTACT
                    </strong>
                  </h5>
                </div>

                <div className='mb-3'>
                  <Call className='me-2'/> 
                  +63 9696-4-11111
                </div>

                <div>
                  <Email className='me-2'/> 
                  cs@bosscar.com
                </div>
              </div>

              <div className='col-sm-12 col-md-6 col-lg-4 col-xl-2'>
                <div className='mb-4'>
                  <h5>
                    <strong>
                      FOLLOW US
                    </strong>
                  </h5>
                </div>

                <div className='mb-2'>
                  <Facebook
                    className='me-3'
                    style={{ cursor: 'pointer'}}
                  />

                  <Instagram 
                    className='me-3'
                    style={{ cursor: 'pointer'}}
                  />
                  
                  <Twitter
                    className='me-3'
                    style={{ cursor: 'pointer'}}
                  />
                </div>
              </div>
            </div>

            <div>
              <span style={{ fontSize: 14, color: '#777777' }}>
                {`© ${new Date().getFullYear()} Bosscar, Inc. All Rights Reserved.`}
              </span>
            </div>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  </>
};

export default CustomerPageLayout;