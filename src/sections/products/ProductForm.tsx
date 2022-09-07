import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// mui
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import MenuItem from "@mui/material/MenuItem"
import Button from "@mui/material/Button"
import FormHelperText from '@mui/material/FormHelperText'
// validator
import * as Yup from "yup";
import { Formik } from "formik";
import uploadFile from "../../firebase/upload"
import { useMutation } from '../../custom-hooks'
// types
import { UnitType, Category, Product } from "../../pages/PointOfSale"

interface ProductFormProps {
    image?: File;
    categories: Category[];
    units: UnitType[];
    product?: Product;
}

interface ProductFormData {
    code: string,
    name: string,
    price: number | string,
    discount: number | string,
    units: string,
    categoryId: number | null,
    submit: null
}

export default function ProductForm({ categories, units, image, product }: ProductFormProps) {
  const navigate = useNavigate()
  const { insert, update, error, data } = useMutation<Product>()

  useEffect(() => {
    if (data) navigate(-1)
  },[data])

  return (
    <Formik
        initialValues={{
            code: product ? product.productCode : "",
            name: product ? product.productName : "",
            price: product ? product.unitPrice : 0.00,
            units: product ? product.unitTypeCode : units[0].unitCode,
            categoryId: product ? product.categoryId : categories[0].categoryId,
            discount: product ? product.discountedPrice : 0.00,
            submit: null
        } as ProductFormData}
        validationSchema={Yup.object().shape({
            code: Yup.string().max(3).required("Product code is required."),
            name: Yup.string().max(30).required("Product name is required."),
            price: Yup.number().required("Product price is required."),
            discount: Yup.number(),
            units: Yup.string().max(3).required("Product units is required."),
            categoryId: Yup.number().min(1).required("Product category is required.")
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
            if (image) {
                uploadFile(image)
                .then(url => {
                    const data = {
                        productCode: values.code,
                        productName: values.name,
                        unitPrice: values.price,
                        discountedPrice: values.discount,
                        unitTypeCode: values.units,
                        categoryId: values.categoryId,
                        productImage: url
                    }

                    if (product) update("/products", JSON.stringify(data))
                    else insert("/products", JSON.stringify(data))
                    
                    setSubmitting(false)
                })
                .catch(() => {
                    setSubmitting(false)
                    setErrors({ submit: "Failed to upload product image." })
                })
            }
            else if (product) {
                const data = {
                    productCode: values.code,
                    productName: values.name,
                    unitPrice: values.price,
                    discountedPrice: values.discount,
                    unitTypeCode: values.units,
                    categoryId: values.categoryId,
                    productImage: product.productImage
                }

                update("/products", JSON.stringify(data))
                
                setSubmitting(false)
            }
            else {
                setSubmitting(false)
                setErrors({ submit: "Product image is required." })
            }
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
                        disabled={Boolean(product)}
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
                        name="discount"
                        label="Discount"
                        type="number"
                        value={values.discount}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.discount && errors.discount)}
                        helperText={Boolean(touched.discount && errors.discount) && errors.discount}
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
                        {units ? units.map((option) => (
                            <MenuItem key={option.unitCode} value={option.unitCode}>
                                {`${option.unitLabel} (${option.unitCode})`}
                            </MenuItem>
                        )) : (
                            <MenuItem />
                        )}
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
                        {categories ? categories.map((option) => (
                            <MenuItem key={option.categoryId} value={option.categoryId}>
                                {option.categoryName}
                            </MenuItem>
                        )) : (
                            <MenuItem />
                        )}
                    </TextField>
                </Grid>

                {errors.submit || error && (
                    <Grid item xs={12}>
                        <FormHelperText sx={{ color: "error.main" }}>{errors.submit || error.errors[0]}</FormHelperText>
                    </Grid>
                )}

            </Grid>

            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ position: { sm: "inherit", md: "absolute" }, bottom: 0, right: 0, mt: 5 }}>
                <Button variant="contained" color="error" onClick={() => navigate(-1)}>Cancel</Button>
                <Button variant="contained" type="submit" disabled={isSubmitting}>{product ? "Edit" : "Create"}</Button>
            </Stack>
        </form>
        )}
    </Formik>
  )
}