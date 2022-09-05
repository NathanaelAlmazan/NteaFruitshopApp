import React from 'react'
import { Outlet } from "react-router-dom" 
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'

import LeftSideBar from "./LeftSideBar"
import Header from "./Header"

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
  flexGrow: 1,
  width: "100%",
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  })
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bars
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function DashboardLayout() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <LeftSideBar open={open} handleDrawerClose={handleDrawerClose} />
      <Main>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
