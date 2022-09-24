import React, { useEffect, useState } from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import Avatar from '@mui/material/Avatar'
import { AnimatePresence, motion } from 'framer-motion'
import { styled, useTheme } from '@mui/material/styles'
// project components
import CartItemCard from "./CartItem"
import CheckOutCard from './CheckOutCard'
import PaymentCard from './PaymentCard'
import InvoiceDialog from '../../../sections/pdf'
// Icons
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// Redux
import { useAppSelector, useAppDispatch, useMutation } from "../../../custom-hooks"
import { addQuantity, reduceQuantity, removeAll } from "../../../redux/slice/cart"
// types
import { CustomerOrder } from '../../../pages/PointOfSale'

const SuccessDialog = React.lazy(() => import('../../../sections/pos/SucessDialog'))

const drawerWidth = 450;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
}));


interface RightSideBarProps {
    open: boolean;
    handleDrawerClose: () => void;
}

export type PaymentType = "gcash" | "cash"

export default function RightSideBar({ open, handleDrawerClose }: RightSideBarProps) {
  const theme = useTheme()
  const { cart } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  const matches = useMediaQuery(theme.breakpoints.up('lg'))
  const { insert, data, error } = useMutation<CustomerOrder>()
  const [paymentType, setPaymentType] = useState<PaymentType>("cash")
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [invoice, setInvoice] = useState<boolean>(false)

  useEffect(() => {
    if (data) {
        dispatch(removeAll())
        setLoading(false)
    }
  }, [data])

  useEffect(() => {
    if (error) setLoading(false)
  }, [error])

  const handleReduceQuantity = (code: string, type: string) => dispatch(reduceQuantity({ code, type }))
  const handleAddQuantity = (code: string, type: string) => dispatch(addQuantity({ code, type }))
  const handleRemoveAll = () => dispatch(removeAll())

  const handlePaymentTypeChange = (type: PaymentType) => setPaymentType(type)

  const handleSubmitOrder = (account: string, amount: number) => {
    setLoading(true)
    const formData = {
        totalAmount: cart.totalPrice,
        paymentType: paymentType.toUpperCase(),
        paidAmount: paymentType === "cash" ? amount : null,
        transactionId: paymentType === "gcash" ? account : null,
        orderItems: cart.items.map(item => ({
            productCode: item.product.productCode,
            unitCode: item.unitType,
            quantity: item.quantity
        }))
    }

    insert("/order", JSON.stringify(formData));
    setSuccess(true)
  }

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
        onClose={handleDrawerClose}
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

        {/* POS Cart */}

        <List sx={{ 
            maxHeight: "calc(100% - 390px)",
            overflowX: "hidden",
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
            <AnimatePresence>
                
                {cart.items.length === 0 && (
                    <motion.div
                        key="empty-cart"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition:{ delay: 0.5, type: "spring" } }}
                        exit={{ opacity: 0 }}  
                        layout    
                    >
                        <Stack justifyContent="center" alignItems="center">
                            <Avatar 
                                variant="rounded" 
                                alt="empty-cart" 
                                src="https://res.cloudinary.com/ddpqji6uq/image/upload/v1661948271/graphql_images/empty-cart_c0zya5.png" 
                                sx={{ width: 330, height: 280 }} 
                            />
                        </Stack>
                    </motion.div>
                )}

                {cart.items.map((item) => (
                    <motion.div
                        key={`${item.product.productCode}:${item.unitType}`}
                        initial={{ x: -150, opacity: 0 }}
                        animate={{ x: 0, opacity: 1, transition:{ delay: 0.3, type: "spring" } }}
                        exit={{ x: 150, opacity: 0, transition:{ delay: 0.3 } }}     
                        layout         
                    >
                       <CartItemCard 
                            item={item}
                            addQuantity={() => handleAddQuantity(item.product.productCode, item.unitType)}
                            reduceQuantity={() => handleReduceQuantity(item.product.productCode, item.unitType)}
                       />
                    </motion.div>
                ))}

            </AnimatePresence>
        </List>

         {/* POS Payment */}

        <Stack 
            justifyContent="center" 
            alignItems="end" spacing={3} 
            sx={{ 
                position: "absolute", 
                bottom: 0, 
                right: 0, 
                width: "100%",
                p: 2 
            }}
        >
            <CheckOutCard 
                totalPrice={cart.totalPrice} 
                type={paymentType} 
                changeType={handlePaymentTypeChange} 
            />

            <PaymentCard 
                type={paymentType}
                totalPrice={cart.totalPrice}
                checkoutOrder={handleSubmitOrder}
                loading={loading}
                error={error ? error.errors[0] : null}
            />
        </Stack>

        {Boolean(data && success) && (
            <SuccessDialog 
                open={success}
                id={data && data.orderId}
                handleClose={() => setSuccess(false)}
                handleInvoice={() => setInvoice(true)}
            />
        )}

        {Boolean(data && invoice) && (
            <InvoiceDialog 
                open={invoice}
                id={data && data.orderId}
                handleClose={() => {
                    setInvoice(false)
                    setSuccess(false)
                }}
            />
        )}
    </Drawer>
  )
}

