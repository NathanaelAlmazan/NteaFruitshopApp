import React, { useRef, useState } from 'react';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import CancelScheduleSendOutlinedIcon from '@mui/icons-material/CancelScheduleSendOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';

// ----------------------------------------------------------------------

export default function OrderMoreMenu({ collapsed, cancelled, handleViewDetails, handleViewInvoice, handleCancel }: { collapsed: boolean, cancelled: boolean, handleViewDetails: () => void, handleViewInvoice: () => void, handleCancel: () => void }) {
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

        <MenuItem onClick={() => {
            handleViewInvoice()
            setIsOpen(false)
          }} 
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <ReceiptOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="View Invoice" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        {!cancelled && (
          <MenuItem onClick={() => {
              handleCancel()
              setIsOpen(false)
            }} 
            sx={{ color: 'text.secondary' }}
          >
            <ListItemIcon>
              <CancelScheduleSendOutlinedIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Cancel" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        )}
      </Menu>
    </>
  );
}