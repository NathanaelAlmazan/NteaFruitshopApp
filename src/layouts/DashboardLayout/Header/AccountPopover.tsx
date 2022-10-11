import React, { useRef, useState } from 'react';
import { useNavigate} from 'react-router-dom';
// @mui
import { Box, Chip, Divider, Typography, Stack, MenuItem, Avatar, useTheme } from '@mui/material';
// components
import MenuPopover from '../../../components/MenuPopover';
import EditProfileDialog from '../../../sections/accounts/EditProfileDialog';
// icons
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { logout } from "../../../redux/slice/auth"
import { useAppDispatch, useAppSelector } from '../../../custom-hooks'

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const { auth } = useAppSelector((state) => state)
  const anchorRef = useRef(null);

  const { firstName, lastName, position, image } = auth

  const [open, setOpen] = useState(null);
  const [profile, setProfile] = useState<boolean>(false);

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
                src={image ? image : "https://res.cloudinary.com/ddpqji6uq/image/upload/v1661866066/graphql_images/n_tea-logo_rntoqs.png"}
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
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {position}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          <MenuItem onClick={() => navigate("/app/pos")}>
            Home
          </MenuItem>
          <MenuItem onClick={() => setProfile(true)}>
            Profile
          </MenuItem>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>

      <EditProfileDialog open={profile} handleClose={() => setProfile(false)} />
    </>
  );
}
