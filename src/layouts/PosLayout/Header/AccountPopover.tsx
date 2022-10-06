import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Chip, Divider, Typography, Stack, MenuItem, Avatar, useTheme } from '@mui/material';
// components
import MenuPopover from '../../../components/MenuPopover';
// icons
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { logout } from "../../../redux/slice/auth"
import { useAppDispatch } from '../../../custom-hooks'


const account = {
    displayName: 'Jaydon Frankie',
    email: 'demo@minimals.cc',
    photoURL: 'https://res.cloudinary.com/ddpqji6uq/image/upload/v1660784778/graphql_images/logo512_gclk73.png',
};

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    linkTo: '/',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    linkTo: '#',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    linkTo: '#',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const theme = useTheme();
  const dispatch = useAppDispatch()
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(null);

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => dispatch(logout())

  return (
    <>
      <Chip
        sx={{
            height: '48px',
            alignItems: 'center',
            borderRadius: '27px',
            transition: 'all .2s ease-in-out',
            borderColor: theme.palette.primary.light,
            backgroundColor: theme.palette.primary.light,
            '&[aria-controls="menu-list-grow"], &:hover': {
                borderColor: theme.palette.primary.main,
                background: `${theme.palette.primary.main}!important`,
                color: theme.palette.primary.light,
                '& svg': {
                    stroke: theme.palette.primary.light
                }
            },
            '& .MuiChip-label': {
                lineHeight: 0
            }
        }}
        icon={
            <Avatar
                src={account.photoURL}
                sx={{
                  width: '34px',
                  height: '34px',
                  fontSize: '1.2rem',
                    margin: '8px 0 8px 8px !important',
                    cursor: 'pointer'
                }}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                color="inherit"
            />
        }
        label={<SettingsOutlinedIcon sx={{ color: theme.palette.primary.dark }} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleOpen}
        color="primary"
      />

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
