import React, { useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom" 
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'

import LeftSideBar from "./LeftSideBar"
import RightSideBar from "./RightSideBar"
import Header from "./Header"
import { useAppSelector } from "../../custom-hooks"
import ProductCartWidget from "../../components/ProductCartWidget"

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
  const navigate = useNavigate()
  const { cart: items, auth } = useAppSelector((state) => state)
  const [open, setOpen] = React.useState(false);
  const [cart, setCart] = React.useState(false);

  useEffect(() => {
    if (!auth.token) navigate("/auth/login")
  }, [auth])

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleToggle = () => setCart(!cart);

  return (
    <Box sx={{ display: 'flex', position: "relative" }}>
      <CssBaseline />
      <Header open={open} position={auth.position} handleDrawerOpen={handleDrawerOpen} />
      <LeftSideBar open={open} position={auth.position} handleDrawerClose={handleDrawerClose} />
      <ProductCartWidget value={items.items.length} handleClick={handleToggle} />
      <Main>
        <DrawerHeader />
        <Outlet />
      </Main>
      <RightSideBar open={cart} handleDrawerClose={handleToggle} />
    </Box>
  );
}
