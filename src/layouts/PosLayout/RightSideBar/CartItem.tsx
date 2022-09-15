import React from 'react'
// mui
import Avatar from '@mui/material/Avatar'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import { constantCase } from 'change-case'
// icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
// types
import { CartItem } from '../../../pages/PointOfSale'

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp: (prop) => prop !== 'error' })<{
    error?: boolean;
}>(({ theme, error }) => ({
    cursor: 'pointer', borderRadius: '8px',
    width: '34px', height: '34px', fontSize: '1.2rem',
    background: error ? theme.palette.error.main : theme.palette.secondary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
        background: error ? theme.palette.error.dark : theme.palette.secondary.dark,
        color: theme.palette.primary.contrastText
    }
}));

export default function CartItemCard({ item , addQuantity, reduceQuantity }: { item: CartItem, addQuantity: () => void, reduceQuantity: () => void }) {
  return (
    <ListItem alignItems="center">
        <ListItemAvatar>
            <Avatar variant="rounded" alt={item.product.productName} src={item.product.productImage} />
        </ListItemAvatar>
        <ListItemText
            primary={item.product.productName}
            secondary={
                <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                        {`₱ ${(item.quantity * (item.unitPrice - item.product.discountedPrice)).toFixed(2)}`}
                </Typography>
            }
        />
        <Stack direction="row" alignItems="center" spacing={2}>
            <ButtonBase onClick={() => reduceQuantity()} sx={{ borderRadius: '12px' }}>
                <HeaderAvatarStyle error={item.quantity === 1} variant="rounded">
                    {item.quantity > 1 ? <RemoveIcon /> : <DeleteOutlineOutlinedIcon />}
                </HeaderAvatarStyle>
            </ButtonBase>
            <Typography
                component="span"
                variant="subtitle2"
            >
                    {`${item.quantity} ${constantCase(item.unitType)}`}
            </Typography>
            <ButtonBase onClick={() => addQuantity()} sx={{ borderRadius: '12px' }}>
                <HeaderAvatarStyle variant="rounded">
                    <AddIcon />
                </HeaderAvatarStyle>
            </ButtonBase>
        </Stack>
    </ListItem>
  )
}