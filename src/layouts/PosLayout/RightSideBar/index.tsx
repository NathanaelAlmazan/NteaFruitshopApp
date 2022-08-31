import React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import useMediaQuery from '@mui/material/useMediaQuery'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import { styled, useTheme } from '@mui/material/styles'

// Icons
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// Redux
import { useAppSelector, useAppDispatch } from "../../../custom-hooks"
import { addQuantity, reduceQuantity, removeAll } from "../../../redux/slice/cart"

const drawerWidth = 450;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
}));

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


interface RightSideBarProps {
    open: boolean;
    handleDrawerClose: () => void;
}

export default function RightSideBar({ open, handleDrawerClose }: RightSideBarProps) {
  const theme = useTheme()
  const { cart } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  const matches = useMediaQuery(theme.breakpoints.up('lg'))

  const handleReduceQuantity = (id: string) => dispatch(reduceQuantity(id))
  const handleAddQuantity = (id: string) => dispatch(addQuantity(id))
  const handleRemoveAll = () => dispatch(removeAll())

  return (
    <Drawer
        sx={{
            position: "relative",
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box'
            },
        }}
        variant={matches ? "permanent" : "temporary"}
        anchor="right"
        open={matches || open}
    >
        <DrawerHeader>
            <Typography variant="h5">Current Order</Typography>
            <Stack direction="row" alignItems="center" spacing={2}>

                <Button variant="contained" color="error" onClick={handleRemoveAll}>Clear All</Button>

                {!matches && (
                    <IconButton onClick={handleDrawerClose}>
                        <CloseOutlinedIcon />
                    </IconButton>
                )}

            </Stack>
        </DrawerHeader>
        <Divider />
        <List sx={{ 
            maxHeight: "calc(100% - 250px)",
            overflowY: "auto",
            "::-webkit-scrollbar": {
                height: "8px",
                width: "8px"
            },
            "::-webkit-scrollbar-track": {
                background: theme.palette.grey[300] 
            },
              
            /* Handle */
            "::-webkit-scrollbar-thumb": {
                background: theme.palette.grey[600]
            },
              
              /* Handle on hover */
            "::-webkit-scrollbar-thumb:hover": {
                background: theme.palette.grey[900]
            }
         }}>
            {cart.items.length === 0 && (
                <Stack justifyContent="center" alignItems="center">
                    <Avatar variant="rounded" alt="empty-cart" src="https://res.cloudinary.com/ddpqji6uq/image/upload/v1661948271/graphql_images/empty-cart_c0zya5.png" sx={{ width: 330, height: 280 }} />
                </Stack>
            )}
            {cart.items.map((item) => (
                <ListItem key={item.product.productCode} alignItems="center">
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
                                    {`₱ ${(item.quantity * (item.product.unitPrice - item.product.discountedPrice)).toFixed(2)}`}
                            </Typography>
                        }
                    />
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <ButtonBase onClick={() => handleReduceQuantity(item.product.productCode)} sx={{ borderRadius: '12px' }}>
                            <HeaderAvatarStyle error={item.quantity === 1} variant="rounded">
                                {item.quantity > 1 ? <RemoveIcon /> : <DeleteOutlineOutlinedIcon />}
                            </HeaderAvatarStyle>
                        </ButtonBase>
                        <Typography
                            component="span"
                            variant="subtitle2"
                        >
                                {`${item.quantity} ${item.product.unitTypeCode}`}
                        </Typography>
                        <ButtonBase onClick={() => handleAddQuantity(item.product.productCode)} sx={{ borderRadius: '12px' }}>
                            <HeaderAvatarStyle variant="rounded">
                                <AddIcon />
                            </HeaderAvatarStyle>
                        </ButtonBase>
                    </Stack>
                </ListItem>
            ))}
        </List>
        <Stack justifyContent="center" alignItems="end" spacing={3} sx={{ position: "absolute", bottom: 0, right: 0, p: 2, width: "100%" }}>
            <Card sx={{ width: "100%" }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Amount Due
                    </Typography>
                    <Typography variant="h5" component="div" sx={{ color: theme.palette.success.dark }}>
                        {`₱ ${cart.totalPrice.toFixed(2)}`}
                    </Typography>
                </CardContent>
            </Card>
            <Button variant="contained" size="large" fullWidth>
                Checkout Order
            </Button>
        </Stack>
    </Drawer>
  )
}

