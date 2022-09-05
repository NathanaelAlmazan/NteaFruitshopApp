import React from 'react'
import Stack from '@mui/material/Stack'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import { styled, alpha } from '@mui/material/styles'

// Icons
import MenuIcon from '@mui/icons-material/Menu'

// project components
import SearchSection from "./SearchSection"
import NotificationsPopover from "./NotificationsPopover"
import AccountPopover from './AccountPopover'

const drawerWidth = 280;

const AppBar = styled(MuiAppBar)(({ theme }) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    backgroundColor: alpha(theme.palette.background.default, 0.72),
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`
    }
}));

interface HeaderProps {
    open: boolean;
    handleDrawerOpen: () => void;
}

export default function Header({ handleDrawerOpen }: HeaderProps) {
  return (
    <AppBar position="fixed">
    <Toolbar sx={{ width: "100%" }}>
        <IconButton
          color="primary"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ display: { md: 'none' }, mb: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Stack direction="row" justifyContent="space-between" sx={{ width: "100%", mt: 2, mb: 2 }}>
          <SearchSection />

          <Stack direction="row" spacing={2} alignItems="center">
            <NotificationsPopover />
            <AccountPopover />
          </Stack>
          
        </Stack>

    </Toolbar>
    </AppBar>
  )
}
