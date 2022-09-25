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
import Typography from '@mui/material/Typography'
// validator
import * as Yup from "yup";
import { Formik } from "formik";
import uploadFile from "../../firebase/upload"
import { useMutation } from '../../custom-hooks'
import { capitalCase } from 'change-case'
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
    discount: number | string,
    categoryId: number | null,
    submit: null
    [key: string]: number | string
}

export default function ProductForm({ categories, units, image, product }: ProductFormProps) {
  const navigate = useNavigate()
  const { insert, update, error, data } = useMutation<Product>()
 
  const renderDefaultValue = () => {
    const defaultValue: ProductFormData = {
        code: product ? product.productCode : "",
        name: product ? product.productName : "",
        categoryId: product ? product.categoryId : categories.length !== 0 ? categories[0].categoryId : 0,
        discount: product ? product.discountedPrice : 0.00,
        submit: null
    }

    units.forEach(u => {
        const unit = product ? product.unitPrices.find(p => p.unitType === u.unitCode) : null
        if (unit) defaultValue[u.unitCode] = unit.unitPrice.toFixed(2)
        else defaultValue[u.unitCode] = 0
    })

    return defaultValue
  }

  useEffect(() => {
    if (data) navigate(-1)
  },[data])

  return (
    <Formik
        initialValues={renderDefaultValue()}
        validationSchema={Yup.object().shape({
            code: Yup.string().max(3).required("Product code is required."),
            name: Yup.string().max(30).required("Product name is required."),
            discount: Yup.number(),
            categoryId: Yup.number().min(1).required("Product category is required.")
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
            if (image) {
                uploadFile(image)
                .then(url => {
                    const body = {
                        productCode: values.code,
                        productName: values.name,
                        discountedPrice: values.discount,
                        categoryId: values.categoryId,
                        productImage: url,
                        unitPrices: Object.keys(values).filter(v => units.find(u => u.unitCode === v) !== undefined).map(p => ({ unitType: p, unitPrice: values[p] }))
                    }

                    if (product) update("/products", JSON.stringify(body))
                    else insert("/products", JSON.stringify(body))
                    
                    setSubmitting(false)
                })
                .catch(() => {
                    setSubmitting(false)
                    setErrors({ submit: "Failed to upload product image." })
                })
            }
            else if (product) {
                const body = {
                    productCode: values.code,
                    productName: values.name,
                    discountedPrice: values.discount,
                    categoryId: values.categoryId,
                    productImage: product.productImage,
                    unitPrices: Object.keys(values).filter(v => units.find(u => u.unitCode === v) !== undefined).map(p => ({ unitType: p, unitPrice: values[p] }))
                }

                update("/products", JSON.stringify(body))
                
                setSubmitting(false)
            }
            else {
                setSubmitting(false)
                setErrors({ submit: "Product image is required." })
            }
        }}
    >
        {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
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
                                    {capitalCase(option.categoryName)}
                                </MenuItem>
                            )) : (
                                <MenuItem />
                            )}
                        </TextField>
                    </Grid>
                    {units.map(u => (
                            <Grid key={u.unitCode} item sm={12} md={6}>
                                <TextField 
                                    name="price"
                                    type="number"
                                    label="Unit Price"
                                    value={values[u.unitCode]}
                                    onChange={(e) => {
                                        const value = parseFloat(e.target.value)
                                        setFieldValue(u.unitCode, !isNaN(value) ? value : "")
                                    }}
                                    InputProps={{
                                        endAdornment: 
                                        <InputAdornment position="end">
                                            <Typography variant="subtitle1">{capitalCase(u.unitLabel)}</Typography>
                                        </InputAdornment>
                                    }}
                                    fullWidth
                                />
                            </Grid>
                    ))}

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