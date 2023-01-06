import React from 'react'
// mui
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import { useTheme } from '@mui/material/styles'
// icons
import PaymentsIcon from '@mui/icons-material/Payments';
// types
import { PaymentType } from "./index"

interface CheckOutCardProps {
    totalPrice: number
    type: PaymentType
    changeType: (type: PaymentType) => void
    discount: number
    onDiscountChange: (discount: number) => void
}

export default function CheckOutCard({ totalPrice, type, discount, onDiscountChange, changeType }: CheckOutCardProps) {
  const theme = useTheme();
  const [percent, setPercent] = React.useState<number>(0);

  React.useEffect(() => {
    if (totalPrice === 0) setPercent(0);
  }, [totalPrice])
  
  const handlePercentDiscountChange = (value: number) => {
    if (!isNaN(value)) {
        setPercent(value);
        onDiscountChange(totalPrice * (value * 0.01))
    } else {
        onDiscountChange(0);
        setPercent(0);
    }
  }

  const handlePesoDiscountChange = (value: number) => {
    if (!isNaN(value)) {
        onDiscountChange(value);
        setPercent((value / totalPrice) * 100);
    } else {
        onDiscountChange(0);
        setPercent(0);
    }
  }

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
                    {`₱ ${(totalPrice - discount).toFixed(2)}`}
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
            <Grid item xs={12} md={6}>
                <TextField 
                    label="Discount in Percent"
                    name="percent"
                    type="number"
                    fullWidth
                    InputProps={{
                        endAdornment: 
                        <InputAdornment position="end">%</InputAdornment>
                    }}
                    inputProps={{ min: 0, max: 100 }}
                    value={parseInt(percent.toFixed(2))}
                    onChange={(event) => handlePercentDiscountChange(parseFloat(event.target.value))}
                    sx={{ mt: 2 }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField 
                    label="Discount in Peso"
                    name="peso"
                    type="number"
                    fullWidth
                    InputProps={{
                        startAdornment: 
                        <InputAdornment position="start">₱</InputAdornment>
                    }}
                    inputProps={{ min: 0, max: 100 }}
                    value={discount}
                    onChange={(event) => handlePesoDiscountChange(parseFloat(event.target.value))}
                    sx={{ mt: 2 }}
                />
            </Grid>
        </Grid>
    </Card>
  )
}