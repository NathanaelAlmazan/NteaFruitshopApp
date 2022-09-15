import React, { useEffect, useState } from 'react'
// mui
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import Button from "@mui/material/Button"
// animation
import { AnimatePresence, motion } from 'framer-motion'
// types
import { PaymentType } from "./index"

interface PaymentCardProps {
    type: PaymentType
    totalPrice: number
    error: string | null
    loading: boolean
    checkoutOrder: (account: string, amount: number) => void
}

export default function PaymentCard({ type, totalPrice, error, loading, checkoutOrder }: PaymentCardProps) {
  const [amount, setAmount] = useState<number>(0)
  const [change, setChange] = useState<number>(0)
  const [account, setAccount] = useState<string>("")

  useEffect(() => {
    if (totalPrice === 0) setAmount(0)
  }, [totalPrice])

  useEffect(() => {
    setChange(amount - totalPrice)
  }, [amount, totalPrice])

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    setAmount(parseFloat(e.target.value))

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 17) setAccount(e.target.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 '))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if ((type === "cash" && amount >= totalPrice) || type === "gcash") {
        checkoutOrder(account.replace(/\s/g, ''), amount)
        setAmount(0)
        setChange(0)
        setAccount("")
    }
        
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Card>
            <CardContent>
                <AnimatePresence mode="wait">
                    {type === "cash" ? (
                        <motion.div
                            key="cash"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0, transition:{ type: "spring" } }}
                            exit={{ opacity: 0, x: -100 }}    
                        >
                            <Stack direction="row" spacing={2}>
                                <TextField 
                                    type="number"
                                    name="amount"
                                    label="Paid Amount"
                                    value={isNaN(amount) ? "" : amount}
                                    onChange={handleAmountChange}
                                    fullWidth
                                    required
                                    error={error !== null}
                                    helperText={error && error}
                                    InputProps={{
                                        startAdornment: 
                                            <InputAdornment position="start">₱</InputAdornment>
                                    }}
                                />
                                <TextField 
                                    type="number"
                                    name="change"
                                    label="Change"
                                    value={change < 0 ? 0 : change.toFixed(2)}
                                    InputProps={{
                                        startAdornment: 
                                            <InputAdornment position="start">₱</InputAdornment>
                                    }}
                                />
                            </Stack>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="gcash"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0, transition:{ type: "spring" } }}
                            exit={{ opacity: 0, x: 100 }}    
                        >
                            <Stack direction="row">
                                <TextField 
                                    name="account"
                                    label="Reference Number"
                                    value={account}
                                    onChange={handleAccountChange}
                                    error={error !== null}
                                    helperText={error && error}
                                    required
                                    fullWidth
                                />
                            </Stack>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>

        <Button 
            type="submit" 
            variant="contained" 
            size="large" 
            sx={{ mt: 2 }} 
            disabled={loading || totalPrice === 0} 
            fullWidth
        >
            Checkout Order
        </Button>
    </form>
  )
}