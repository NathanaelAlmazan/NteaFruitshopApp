import React, { useRef, useState } from 'react';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentsIcon from '@mui/icons-material/Payments';

// ----------------------------------------------------------------------

interface MoreMenuProps { 
  collapsed: boolean, 
  paid: boolean, 
  arrived: boolean, 
  handleViewDetails: () => void 
  handleSetPaid: () => void 
  handleSetArrived: () => void 
  handleDelete: () => void
}

export default function PurchaseMoreMenu({ collapsed, paid, arrived, handleViewDetails, handleSetPaid, handleSetArrived, handleDelete }: MoreMenuProps) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleMoreClick = () => {
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
        <MenuItem onClick={handleMoreClick} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <AllInboxIcon />
          </ListItemIcon>
          <ListItemText primary={collapsed ? "Hide Details" : "Show Details"} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        {!paid && (
          <MenuItem onClick={() => {
              handleSetPaid()
              setIsOpen(false)
            }} 
            sx={{ color: 'text.secondary' }}
          >
            <ListItemIcon>
              <PaymentsIcon />
            </ListItemIcon>
            <ListItemText primary="Set Paid" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        )}

        {!arrived && (
          <MenuItem onClick={() => {
              handleSetArrived()
              setIsOpen(false)
            }} 
            sx={{ color: 'text.secondary' }}
          >
            <ListItemIcon>
              <LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary="Set Arrived" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        )}

        <MenuItem onClick={() => {
            handleDelete()
            setIsOpen(false)
          }} 
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <DeleteOutlineOutlinedIcon color="error" />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}