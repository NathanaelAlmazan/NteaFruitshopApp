import React from 'react';
// material
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
// component
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.shadows[20],
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 }
}));

// ----------------------------------------------------------------------


export default function CartWidget({ value, handleClick }: { value: number, handleClick: () => void }) {
  return (
    <RootStyle onClick={handleClick}>
      <Badge showZero badgeContent={value} color="error" max={99}>
        <ShoppingCartOutlinedIcon />
      </Badge>
    </RootStyle>
  );
}
