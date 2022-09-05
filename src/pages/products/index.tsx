import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// mui
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
// project coponents
import { HeaderButton } from "../../components/PageHeaders"
import ProductList from "../../sections/pos/ProductList"
import ProductSort from "../../sections/products/ProductSort"
import ProductFilterSidebar from "../../sections/products/ProductFilterSidebar"
import { LoadingOverlay } from '../../components/SuspenseLoader'
//utils
import { useQuery } from "../../custom-hooks"
// types
import { Product } from "../PointOfSale"

export default function Products() {
  const { data: products, error, loading } = useQuery<Product[]>("/products?additionalFields=category")
  const navigate = useNavigate()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [filter, setFilter] = useState<boolean>(false)

  if (error) console.log(error)

  useEffect(() => {
    if (products) {
      setFilteredProducts(products)
    }
  }, [products])

  const handleSelectProduct = (item: Product) => navigate("/admin/products/create" + item.productCode)
  const handleCreateProduct = () => navigate("/admin/products/create")

  return (
    <Container maxWidth="lg">
      <HeaderButton 
        title="Products"
        buttonText="Add Product"
        buttonClick={handleCreateProduct}
      />
      <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilterSidebar
            isOpenFilter={filter}
            onOpenFilter={() => setFilter(true)}
            onCloseFilter={() => setFilter(false)}
          />
          <ProductSort />
        </Stack>
      </Stack>

      <ProductList products={filteredProducts} selectProduct={handleSelectProduct} edit />

      <LoadingOverlay open={loading} />
    </Container>
  )
}

