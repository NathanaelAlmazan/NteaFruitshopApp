import React from 'react'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { Outlet } from "react-router-dom" 
// material
import { styled } from '@mui/material/styles';
// components
import Logo from '../../components/Logo';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0)
  }
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {

  return (
    <Box sx={{ display: 'flex', position: "relative" }}>
      <CssBaseline />
        <HeaderStyle>
          <Link underline="none">
            <Logo />
          </Link>
        </HeaderStyle>
        <Outlet />
      </Box>
  );
}
