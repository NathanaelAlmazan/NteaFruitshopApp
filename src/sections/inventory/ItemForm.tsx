import React, { useEffect } from 'react'
// mui
import Drawer from "@mui/material/Drawer"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import Autocomplete from "@mui/material/Autocomplete"
import FormHelperText from "@mui/material/FormHelperText"
import Button from "@mui/material/Button"
// form
import * as Yup from "yup";
import { Formik } from "formik";
// icons
import CloseIcon from '@mui/icons-material/Close';
// project components
import { useMutation } from '../../custom-hooks'
import { InventoryItem } from "../../pages/inventory"

interface ItemFormProps {
    open: boolean
    edit: InventoryItem | null
    handleClose: () => void
    onReload: () => void
}

const drawerWidth = 400;

const UNIT_MEASUREMENTS = ["pcs", "ml", "g", "kg", "ft", "oz", "lb", "cm", "mm", "dm", "m"]

export default function ItemForm({ open, edit, handleClose, onReload }: ItemFormProps) {
  const { insert, update, error, data } = useMutation<InventoryItem>()

  useEffect(() => {
    if (data) {
        handleClose()
        onReload()
    }
  }, [data])

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
                {edit ? "Edit Item" : "Add Item"}
            </Typography>
            <Tooltip title="Cancel">
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </Tooltip>
        </Stack>

        <Formik
            initialValues={{
                itemName: edit ? edit.itemName : "",
                brandName: edit ? edit.brandName : "",
                units: edit ? edit.units : "",
                inStock: edit ? edit.inStock.toFixed(0) : "",
                unitPrice: edit ? edit.unitPrice.toFixed(2) : "",
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
                if (edit) {
                    update("/ingredients", JSON.stringify({
                        itemId: edit.itemId,
                        itemName: values.itemName,
                        brandName: values.brandName,
                        units: values.units,
                        inStock: parseFloat(values.inStock),
                        unitPrice: parseFloat(values.unitPrice)
                    }))
                } else {
                    insert("/ingredients", JSON.stringify({
                        itemName: values.itemName,
                        brandName: values.brandName,
                        units: values.units,
                        inStock: parseFloat(values.inStock),
                        unitPrice: parseFloat(values.unitPrice)
                    }))
                }
                setSubmitting(false)
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
                <Stack component="form" spacing={2} onSubmit={handleSubmit} sx={{ m: 5 }} noValidate>
                    <TextField 
                        name="itemName"
                        label="Item Name"
                        value={values.itemName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.itemName && errors.itemName)}
                        helperText={Boolean(touched.itemName && errors.itemName) && errors.itemName}
                        fullWidth
                        autoFocus
                    />
                    <TextField 
                        name="brandName"
                        label="Brand"
                        value={values.brandName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.brandName && errors.brandName)}
                        helperText={Boolean(touched.brandName && errors.brandName) && errors.brandName}
                        fullWidth
                    />
                    <Autocomplete
                        freeSolo
                        value={values.units}
                        onChange={(event: unknown, newValue: string | null) => {
                            setFieldValue("units", newValue);
                        }}
                        inputValue={values.units}
                        onInputChange={(event, newInputValue) => {
                            setFieldValue("units", newInputValue);
                        }}
                        options={UNIT_MEASUREMENTS}
                        disableClearable
                        renderInput={(params) => 
                            <TextField 
                                {...params} 
                                label="Units"
                                onBlur={handleBlur}
                                error={Boolean(touched.units && errors.units)}
                                helperText={Boolean(touched.units && errors.units) && errors.units}
                                fullWidth 
                            />
                        }
                    />
                    <TextField 
                        name="inStock"
                        label="In Stock"
                        type="number"
                        value={values.inStock}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.inStock && errors.inStock)}
                        helperText={Boolean(touched.inStock && errors.inStock) && errors.inStock}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">{values.units}</InputAdornment>
                        }}
                        fullWidth
                    />
                    <TextField 
                        name="unitPrice"
                        label="Unit Price"
                        type="number"
                        value={values.unitPrice}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.unitPrice && errors.unitPrice)}
                        helperText={Boolean(touched.unitPrice && errors.unitPrice) && errors.unitPrice}
                        InputProps={{ 
                            startAdornment: <InputAdornment position="start">₱</InputAdornment>
                        }}
                        fullWidth
                    />
                    <Button 
                        variant="contained"
                        size="large"
                        type="submit"
                        disabled={isSubmitting}
                        fullWidth
                    >
                        {edit ? "Edit Item" : "Submit Item"}
                    </Button>

                    {error && (
                        <FormHelperText sx={{ color: "error.main" }}>{error.errors[0]}</FormHelperText>
                    )}
                </Stack>
            )}
        </Formik>

    </Drawer>
  )
}