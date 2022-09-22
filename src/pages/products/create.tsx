import React, { useState } from 'react'
// mui
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
// project components
import { Header } from "../../components/PageHeaders"
import { LoadingOverlay } from '../../components/SuspenseLoader'
import ProductImage from '../../sections/products/ProductImage'
// hooks
import { useQuery } from '../../custom-hooks'
// types
import { UnitType, Category } from "../PointOfSale"

const ProductForm = React.lazy(() => import('../../sections/products/ProductForm'))

export default function CreateProductPage() {
  const { data: categories, loading: cLoading } = useQuery<Category[]>("/category")
  const { data: units, loading: uLoading } = useQuery<UnitType[]>("/units")
  const [image, setImage] = useState<File | null>(null)

  const handleImageChange = (image: File) => setImage(image)
  
  return (
    <Container>
        <Header title="New Product" back />

        <Grid component={Card} container spacing={2} justifyContent="space-between" sx={{ p: 2 }}>
            <Grid item sm={12} md={5}>
              <ProductImage 
                onImageChange={handleImageChange}
                imageFile={image}
              />
            </Grid>
            <Grid item sm={12} md={7}>
              {Boolean(categories && units) && (
                <ProductForm 
                  categories={categories} 
                  units={units} 
                  image={image}
                />
              )}
            </Grid>
        </Grid>

        <LoadingOverlay open={cLoading || uLoading} />
    </Container>
  )
}