import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { styled, alpha } from '@mui/material/styles'
import Logo from "../../../components/Logo"
import { adminPaths, ownerPaths } from "../../AppPaths"

const drawerWidth = 280;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

const ListItemStyle = styled(ListItemButton, { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
    ...(open && {
        color: theme.palette.primary.main,
        fontWeight: 'fontWeightMedium',
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    })
}));
  
const ListItemIconStyle = styled(ListItemIcon)({
    width: 22,
    height: 22,
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

interface LeftSideBarProps {
    open: boolean;
    position: string;
    handleDrawerClose: () => void;
    window?: () => Window;
}

export default function LeftSideBar({ open, position, window, handleDrawerClose }: LeftSideBarProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNavigate = (pathname: string) => {
    navigate(pathname);
    handleDrawerClose();
  }

  const drawer = (
    <>
        <DrawerHeader>
            <Logo />
        </DrawerHeader>
        <Divider />
        <List sx={{ mt: 3 }}>
            {position === "OWNER" ? ownerPaths.map((path) => (
                <ListItemStyle
                  key={path.pathname}
                  open={path.pathname === pathname}
                  onClick={() => handleNavigate(path.pathname)}
                  disableGutters
              >
                  <ListItemIconStyle>
                      {path.icon}
                  </ListItemIconStyle>
                  <ListItemText primary={path.title} />
              </ListItemStyle>
            )) : (
                adminPaths.map((path) => (
                  <ListItemStyle
                    key={path.pathname}
                    open={path.pathname === pathname}
                    onClick={() => handleNavigate(path.pathname)}
                    disableGutters
                >
                    <ListItemIconStyle>
                        {path.icon}
                    </ListItemIconStyle>
                    <ListItemText primary={path.title} />
                </ListItemStyle>
                ))
            )}
        </List>
        <Divider />
    </>
  )

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={open}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
    </Box>
  )
}