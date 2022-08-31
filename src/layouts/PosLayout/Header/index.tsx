import React from 'react'
import Stack from '@mui/material/Stack'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import { styled, alpha } from '@mui/material/styles'

// Icons
import MenuIcon from '@mui/icons-material/Menu'

// project components
import Logo from "../../../components/Logo"
import SearchSection from "./SearchSection"
import NotificationsPopover from "./NotificationsPopover"
import AccountPopover from './AccountPopover'

const AppBar = styled(MuiAppBar)(({ theme }) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    backgroundColor: alpha(theme.palette.background.default, 0.72),
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
}));

interface HeaderProps {
    open: boolean;
    handleDrawerOpen: () => void;
}

export default function Header({ open, handleDrawerOpen }: HeaderProps) {
  return (
    <AppBar position="fixed">
    <Toolbar sx={{ width: { xs: "100%", lg: "calc(100% - 450px)" } }}>
        <IconButton
          color="primary"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        
        <Stack direction="row" justifyContent="space-between" sx={{ width: "100%", mt: 2, mb: 2 }}>
          <Logo />

          <Stack direction="row" spacing={2} alignItems="center">
            <SearchSection />
            <NotificationsPopover />
            <AccountPopover />
          </Stack>
          
        </Stack>

    </Toolbar>
    </AppBar>
  )
}
