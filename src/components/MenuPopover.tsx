import React, { ReactNode } from 'react';
// material
import { Popover } from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

const ArrowStyle = styled('span')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    top: -7,
    zIndex: 1,
    width: 12,
    right: 20,
    height: 12,
    content: "''",
    position: 'absolute',
    borderRadius: '0 0 4px 0',
    transform: 'rotate(-135deg)',
    background: theme.palette.background.paper,
    borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
  },
}));

// ----------------------------------------------------------------------

interface MenuPopoverProps {
    open: boolean;
    children: ReactNode,
    sx: object,
    anchorEl: Element,
    onClose: () => void
}

export default function MenuPopover({ open, children, onClose, sx, ...other }: MenuPopoverProps) {
  const theme = useTheme();

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          p: 1,
          width: 200,
          maxHeight: "70vh",
          overflowY: 'auto',
          "::-webkit-scrollbar": {
            width: "8px"
        },
          
        /* Track */
        "::-webkit-scrollbar-track": {
            background: theme.palette.grey[300] 
        },
           
        /* Handle */
        "::-webkit-scrollbar-thumb": {
            background: theme.palette.primary.main
        },
          
          /* Handle on hover */
        "::-webkit-scrollbar-thumb:hover": {
            background: theme.palette.primary.dark
        },
          ...sx,
        },
      }}
      {...other}
    >
      <ArrowStyle className="arrow" />

      {children}
    </Popover>
  );
}
