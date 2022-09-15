import React, { useRef, useState } from 'react';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// ----------------------------------------------------------------------

export default function OrderMoreMenu({ collapsed, handleViewDetails }: { collapsed: boolean, handleViewDetails: () => void }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleReceiptClick = () => {
    setIsOpen(false);
    handleViewDetails()
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <MoreVertOutlinedIcon />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => handleReceiptClick()} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <ReceiptRoundedIcon />
          </ListItemIcon>
          <ListItemText primary={collapsed ? "Hide Details" : "Show Details"} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <DeleteOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}