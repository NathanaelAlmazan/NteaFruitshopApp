import React from 'react'
// mui
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
// icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
// types
import { InventoryItemCart } from './PurchasedItems'

interface ItemProps {
    item: InventoryItemCart
    onAdd: () => void
    onReduce: () => void
    onRemove: () => void
}

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

export default function PurchaseItemCard({ item, onAdd, onReduce, onRemove }: ItemProps) {

    return (
        <ListItem alignItems="center">
            <ListItemText
                primary={item.itemName}
                secondary={
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        {item.brandName}
                    </Typography>
                }
            />
            <Stack direction="row" alignItems="center" spacing={2}>
                <ButtonBase onClick={item.quantity > 1 ? () => onReduce() : () => onRemove()} sx={{ borderRadius: '12px' }}>
                    <HeaderAvatarStyle error={item.quantity === 1} variant="rounded">
                        {item.quantity > 1 ? <RemoveIcon /> : <DeleteOutlineOutlinedIcon />}
                    </HeaderAvatarStyle>
                </ButtonBase>
                <Typography
                    component="span"
                    variant="subtitle2"
                >
                        {`${item.quantity} ${item.units}`}
                </Typography>
                <ButtonBase onClick={() => onAdd()} sx={{ borderRadius: '12px' }}>
                    <HeaderAvatarStyle variant="rounded">
                        <AddIcon />
                    </HeaderAvatarStyle>
                </ButtonBase>
            </Stack>
        </ListItem>
    )
}