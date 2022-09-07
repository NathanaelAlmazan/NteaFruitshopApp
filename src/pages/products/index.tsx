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
import ProductDeleteDialog from '../../sections/products/ProductDeleteDialog'
import CustomSnackbar from '../../components/Snackbar'
import { LoadingOverlay } from '../../components/SuspenseLoader'
//utils
import { useQuery, useMutation } from "../../custom-hooks"
// types
import { Product } from "../PointOfSale"

export default function Products() {
  const { data: products, loading, refetchData } = useQuery<Product[]>("/products?additionalFields=category")
  const { remove, error: deleteError } = useMutation<Product>()
  const navigate = useNavigate()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selected, setSelected] = useState<Product>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [filter, setFilter] = useState<boolean>(false)
  const [errDialog, setErrDialog] = useState<boolean>(false)

  useEffect(() => {
    if (products) setFilteredProducts(products)
  }, [products])

  useEffect(() => {
    if (deleteError) setErrDialog(true)
  }, [deleteError])

  const handleSelectProduct = (item: Product) => navigate(`/admin/products/edit/${item.productCode}`)

  const handleCreateProduct = () => navigate("/admin/products/create")

  const handleDeleteConfirm = (item: Product) => {
    setSelected(item)
    setOpen(true)
  }

  const handleDeleteProduct = () => {
    if (selected) remove(`/products/${selected.productCode}`)
    setSelected(null)
    setOpen(false)
    refetchData()
  }

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

      <ProductList 
        products={filteredProducts} 
        selectProduct={handleSelectProduct}
        deleteProduct={handleDeleteConfirm}
        edit 
      />

      <LoadingOverlay open={loading} />
      <ProductDeleteDialog 
        open={open}
        name={selected && selected.productName}
        handleClose={() => setOpen(false)}
        handleDelete={handleDeleteProduct}
      />

      <CustomSnackbar 
        open={errDialog}
        message={deleteError && deleteError.errors[0]}
        handleClose={() => setErrDialog(false)}
        type="error"
      />
    </Container>
  )
}

