import React from 'react'
// mui
import Drawer from "@mui/material/Drawer"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import InputAdornment from "@mui/material/InputAdornment"
// form
import * as Yup from "yup";
import { Formik } from "formik";
// icons
import CloseIcon from '@mui/icons-material/Close';

const drawerWidth = 400;

interface PurchaseFormProps {
    open: boolean
    edit?: boolean
    handleClose: () => void
}

export default function PurchaseForm({ open, edit, handleClose }: PurchaseFormProps) {
  return (
    <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        sx={{
            position: "relative",
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box'
            },
        }}
    >
         <Stack direction="row" justifyContent="space-between" sx={{ mt: 5, ml: 5, mr: 5 }}>
            <Typography variant="h5" component="h3" gutterBottom>
                {edit ? "Edit Purchase" : "Record Purchase"}
            </Typography>
            <Tooltip title="Cancel">
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </Tooltip>
        </Stack>

        <Formik
            initialValues={{
                supplier: "",
                totalPrice: 0,
                paid: false,
                arrived: false,
                submit: null
            }}
            validationSchema={Yup.object().shape({
                itemName: Yup.string().max(30).required("Item name is required."),
                brandName: Yup.string().max(20).required("Item brand is required."),
                units: Yup.string().max(3).required("Item unit measure is required."),
                inStock: Yup.number().required("Item stock count is required."),
                unitPrice: Yup.number().required("Item unit price is required.")
            })}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false)
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
                <Stack component="form" spacing={3} onSubmit={handleSubmit} sx={{ m: 5, height: "100vh", position: "relative" }} noValidate>
                    <TextField 
                        name="supplier"
                        label="Supplier Name"
                        value={values.supplier}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.supplier && errors.supplier)}
                        helperText={Boolean(touched.supplier && errors.supplier) && errors.supplier}
                        fullWidth
                        autoFocus
                    />
                    <TextField
                        name="totalPrice"
                        type="number"
                        label="Total Price"
                        value={values.totalPrice}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.totalPrice && errors.totalPrice)}
                        helperText={Boolean(touched.totalPrice && errors.totalPrice) && errors.totalPrice}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">₱</InputAdornment>
                        }}
                        fullWidth
                    />
                    <Stack direction="row" spacing={3}>
                        <FormControlLabel control={
                                <Switch 
                                    checked={values.paid} 
                                    onChange={(e) => {
                                        setFieldValue("paid", e.target.checked)
                                    }}
                                />
                            } 
                            label="Paid" 
                        />
                        <FormControlLabel control={
                                <Switch 
                                    checked={values.arrived} 
                                    onChange={(e) => {
                                        setFieldValue("arrived", e.target.checked)
                                    }}
                                />
                            } 
                            label="Arrived" 
                        />
                    </Stack>

                    <Button 
                        variant="contained"
                        size="large"
                        type="submit"
                        disabled={isSubmitting}
                        fullWidth
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0
                        }}
                    >
                        {edit ? "Edit Purchase" : "Record Purchase"}
                    </Button>
                </Stack>
            )}
        </Formik>
    </Drawer>
  )
}