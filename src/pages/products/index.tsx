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
  const { data: products, loading, refetchData } = useQuery<Product[]>("/products?additionalFields=category,prices")
  const { remove, error: deleteError } = useMutation<Product>()
  const navigate = useNavigate()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [sortOption, setSortOption] = useState<string>("newest")
  const [selectedCategory, setSelectedCategory] = useState<number[]>([])
  const [selectedUnits, setSelectedUnis] = useState<string[]>([])
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

  useEffect(() => {
    if (products) 
      setFilteredProducts(
        products.filter(c => 
          (selectedCategory.includes(c.categoryId) || selectedCategory.length === 0) && 
          (c.unitPrices.filter(x => selectedUnits.includes(x.unitType) && x.unitPrice > 0).length !== 0 || 
          selectedUnits.length === 0)
        ).sort((a, b) => {
          switch (sortOption) {
            case "featured": 
              return b.discountedPrice - a.discountedPrice
            case "priceDesc":
              return b.unitPrices.find(u => u.unitType === "rg").unitPrice - a.unitPrices.find(u => u.unitType === "rg").unitPrice
            case "priceAsc":
              return a.unitPrices.find(u => u.unitType === "rg").unitPrice - b.unitPrices.find(u => u.unitType === "rg").unitPrice
            default:
              return a.productCode.localeCompare(b.productCode)
          }
        })
      )
  }, [selectedCategory, selectedUnits, sortOption, products])

  const handleCreateProduct = () => navigate("/admin/products/create")

  const handleClickCateg = (id: number) => {
    const selectedIndex = selectedCategory.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedCategory, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedCategory.slice(1));
    } else if (selectedIndex === selectedCategory.length - 1) {
      newSelected = newSelected.concat(selectedCategory.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedCategory.slice(0, selectedIndex),
        selectedCategory.slice(selectedIndex + 1),
      );
    }

    setSelectedCategory(newSelected);
  };

  const handleClickUnits = (code: string) => {
    const selectedIndex = selectedUnits.indexOf(code);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedUnits, code);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedUnits.slice(1));
    } else if (selectedIndex === selectedUnits.length - 1) {
      newSelected = newSelected.concat(selectedUnits.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedUnits.slice(0, selectedIndex),
        selectedUnits.slice(selectedIndex + 1),
      );
    }

    setSelectedUnis(newSelected);
  };

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

  const handleClearFilters = () => {
    setSelectedCategory([])
    setSelectedUnis([])
  }


  return (
    <Container maxWidth="lg" sx={{ pb: 5 }}>
      <HeaderButton 
        title="Products"
        buttonText="Add Product"
        buttonClick={handleCreateProduct}
      />
      <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilterSidebar
            selectedCategories={selectedCategory}
            selectedUnits={selectedUnits}
            isOpenFilter={filter}
            onOpenFilter={() => setFilter(true)}
            onCloseFilter={() => setFilter(false)}
            selectCategory={handleClickCateg}
            selectUnits={handleClickUnits}
            clearFilters={handleClearFilters}
          />
          <ProductSort selected={sortOption} setSelected={(value) => setSortOption(value)} />
        </Stack>
      </Stack>

      <ProductList 
        products={filteredProducts} 
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

