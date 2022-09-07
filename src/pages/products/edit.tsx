import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
// mui
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
// project components
import { Header } from "../../components/PageHeaders"
import { LoadingOverlay } from '../../components/SuspenseLoader'
import ProductImage from '../../sections/products/ProductImage'
import ProductForm from '../../sections/products/ProductForm'
// hooks
import { useQuery } from '../../custom-hooks'
// types
import { UnitType, Category, Product } from "../PointOfSale"

export default function EditProductPage() {
  const { code } = useParams()
  const { data: product, loading: pLoading } = useQuery<Product>(`/products/${code}`)
  const { data: categories, loading: cLoading } = useQuery<Category[]>("/category")
  const { data: units, loading: uLoading } = useQuery<UnitType[]>("/units")
  const [image, setImage] = useState<File | null>(null)

  const handleImageChange = (image: File) => setImage(image)
  
  return (
    <Container>
        <Header title={product && `Edit ${product.productName}`} back />

        <Grid component={Card} container spacing={2} justifyContent="space-between" sx={{ p: 2 }}>
            <Grid item sm={12} md={5}>
              <ProductImage 
                onImageChange={handleImageChange}
                imageFile={image}
                imageURL={product && product.productImage}
              />
            </Grid>
            <Grid item sm={12} md={7}>
              {Boolean(product && categories && units) &&  (
                <ProductForm 
                    categories={categories} 
                    units={units} 
                    image={image}
                    product={product}
                />
              )}
            </Grid>
        </Grid>

        <LoadingOverlay open={cLoading || uLoading || pLoading} />
    </Container>
  )
}