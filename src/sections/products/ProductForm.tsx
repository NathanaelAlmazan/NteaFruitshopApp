import React from 'react'
// mui
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import MenuItem from "@mui/material/MenuItem"
import Button from "@mui/material/Button"
// validator
import * as Yup from "yup";
import { Formik } from "formik";
// types
import { UnitType, Category } from "../../pages/PointOfSale"

interface ProductFormProps {
    categories: Category[];
    units: UnitType[];
}

interface ProductFormData {
    code: string,
    name: string,
    price: number,
    units: string,
    categoryId: number | null,
    submit: null
}

export default function ProductForm({ categories, units }: ProductFormProps) {
  return (
    <Formik
        initialValues={{
            code: "",
            name: "",
            price: 0.00,
            units: "",
            categoryId: null,
            submit: null
        } as ProductFormData}
        validationSchema={Yup.object().shape({
            code: Yup.string().max(3).required("Product code is required."),
            name: Yup.string().max(30).required("Product name is required."),
            price: Yup.number().required("Product price is required."),
            units: Yup.string().max(3).required("Product units is required."),
            categoryId: Yup.number().min(1).required("Product category is required.")
        })}
        onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
            console.log(values)
        }}
    >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form onSubmit={handleSubmit} style={{ position: "relative", height: "100%"}}>
            <Grid container spacing={3}>
                <Grid item sm={12} md={6}>
                    <TextField 
                        name="code"
                        label="Product Code"
                        value={values.code}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.code && errors.code)}
                        helperText={Boolean(touched.code && errors.code) && errors.code}
                        fullWidth
                        autoFocus
                    />
                </Grid>
                <Grid item sm={12} md={6}>
                    <TextField 
                        name="name"
                        label="Product Name"
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.name && errors.name)}
                        helperText={Boolean(touched.name && errors.name) && errors.name}
                        fullWidth
                    />
                </Grid>
                <Grid item sm={12} md={6}>
                    <TextField 
                        name="price"
                        label="Unit Price"
                        type="number"
                        value={values.price}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.price && errors.price)}
                        helperText={Boolean(touched.price && errors.price) && errors.price}
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start">₱</InputAdornment>
                        }}
                    />
                </Grid>
                <Grid item sm={12} md={6}>
                    <TextField 
                        name="units"
                        label="Unit Type"
                        value={values.units}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.units && errors.units)}
                        helperText={Boolean(touched.units && errors.units) && errors.units}
                        select
                        fullWidth
                    >
                        {units && units.map((option) => (
                            <MenuItem key={option.unitCode} value={option.unitCode}>
                                {`${option.unitLabel} (${option.unitCode})`}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item sm={12} md={6}>
                    <TextField 
                        name="categoryId"
                        label="Category"
                        value={values.categoryId}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.categoryId && errors.categoryId)}
                        helperText={Boolean(touched.categoryId && errors.categoryId) && errors.categoryId}
                        select
                        fullWidth
                    >
                        {categories && categories.map((option) => (
                            <MenuItem key={option.categoryId} value={option.categoryId}>
                                {option.categoryName}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>

            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ position: { sm: "inherit", md: "absolute" }, bottom: 0, right: 0, mt: 5 }}>
                <Button variant="contained" color="error">Cancel</Button>
                <Button variant="contained" type="submit" disabled={isSubmitting}>Add Product</Button>
            </Stack>
        </form>
        )}
    </Formik>
  )
}