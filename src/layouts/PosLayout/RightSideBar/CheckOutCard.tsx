import React from 'react'
// mui
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useTheme } from '@mui/material/styles'
// icons
import PaymentsIcon from '@mui/icons-material/Payments';
// types
import { PaymentType } from "./index"

interface CheckOutCardProps {
    totalPrice: number
    type: PaymentType
    changeType: (type: PaymentType) => void
    discounted: boolean
    onDiscountChange: () => void
}

export default function CheckOutCard({ totalPrice, type, discounted, onDiscountChange, changeType }: CheckOutCardProps) {
  const theme = useTheme()

  return (
    <Card sx={{ width: "100%", pt: 3, pl: 3, pr: 3, pb: 1 }}>
        <Grid 
            container 
            justifyContent="space-between" 
            alignItems="center"
            spacing={2}
        >
            <Grid item xs={12} md={4}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Amount Due
                </Typography>
                <Typography variant="h5" component="div" sx={{ color: theme.palette.success.dark }}>
                    {`₱ ${totalPrice.toFixed(2)}`}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Payment Type
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Button 
                        size="small" 
                        color="inherit" 
                        variant={type === "cash" ? "contained" : "outlined"}
                        startIcon={<PaymentsIcon />}
                        onClick={() => changeType("cash")}
                        fullWidth
                    >
                        Cash
                    </Button>
                    <Button 
                        size="small" 
                        color="inherit" 
                        variant={type === "gcash" ? "contained" : "outlined"}
                        onClick={() => changeType("gcash")}
                        fullWidth
                    >
                        <img alt="gcash icon" src="https://res.cloudinary.com/ddpqji6uq/image/upload/v1662942940/graphql_images/gcash_rjwcl3.png" />
                    </Button>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel 
                    label="PWD or Senior Citizen?"
                    control={
                        <Checkbox 
                            checked={discounted}
                            onChange={onDiscountChange}
                        />
                    }
                />
            </Grid>
        </Grid>
    </Card>
  )
}