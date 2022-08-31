import React from 'react'
import { Outlet } from "react-router-dom" 
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'

import LeftSideBar from "./LeftSideBar"
import RightSideBar from "./RightSideBar"
import Header from "./Header"
import Tooltip from '@mui/material/Tooltip'
import Fab from '@mui/material/Fab'
import IconButton from '@mui/material/IconButton'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
  flexGrow: 1,
  width: "100%",
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up('lg')]: {
    width: "calc(100% - 450px)"
  }
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PosLayout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [cart, setCart] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleToggle = () => setCart(!cart);

  return (
    <Box sx={{ display: 'flex', position: "relative" }}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <LeftSideBar open={open} handleDrawerClose={handleDrawerClose} />
      <Tooltip title="Live Customize">
          <Fab
              component="div"
              onClick={handleToggle}
              size="medium"
              variant="circular"
              color="secondary"
              sx={{
                  borderRadius: 0,
                  borderTopLeftRadius: '50%',
                  borderBottomLeftRadius: '50%',
                  borderTopRightRadius: '50%',
                  borderBottomRightRadius: '4px',
                  top: '25%',
                  position: 'fixed',
                  right: 10,
                  zIndex: theme.zIndex.speedDial
              }}
          >
              <IconButton color="inherit" size="large" disableRipple>
                  <ShoppingCartOutlinedIcon />
              </IconButton>
          </Fab>
      </Tooltip>
      <Main>
        <DrawerHeader />
        <Outlet />
      </Main>
      <RightSideBar open={cart} handleDrawerClose={handleToggle} />
    </Box>
  );
}
