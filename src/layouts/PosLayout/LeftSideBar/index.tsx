import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { styled, useTheme, alpha } from '@mui/material/styles'
import Logo from "../../../components/Logo"
import appPaths from "../../AppPaths"

const drawerWidth = 280;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
}));

const ListItemStyle = styled(ListItemButton, { shouldForwardProp: (prop) => prop !== "active" })<{
    active?: boolean;
}>(({ theme, active }) => ({
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
    ...(active && {
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
    handleDrawerClose: () => void;
}

export default function LeftSideBar({ open, handleDrawerClose }: LeftSideBarProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNavigate = (pathname: string) => {
    navigate(pathname);
    handleDrawerClose();
  }

  return (
    <Drawer
        sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
        },
        }}
        onClose={handleDrawerClose}
        variant="temporary"
        anchor="left"
        open={open}
    >
        <DrawerHeader>
            <Logo />
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ mt: 3 }}>
        {appPaths.map((path) => (
            <ListItemStyle 
                key={path.pathname}
                active={Boolean(path.pathname === pathname)}
                onClick={() => handleNavigate(path.pathname)}
                disableGutters
            >
                <ListItemIconStyle>
                    {path.icon}
                </ListItemIconStyle>
                <ListItemText primary={path.title} />
            </ListItemStyle>
        ))}
        </List>
        <Divider />
    </Drawer>
  )
}

