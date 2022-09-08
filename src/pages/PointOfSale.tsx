import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'

import ProductList from "../sections/pos/ProductList"
import CategoryList from "../sections/pos/CategoryList"
import { LoadingOverlay } from '../components/SuspenseLoader'

import { useQuery, useAppDispatch } from "../custom-hooks"
import { upsert } from "../redux/slice/cart"

const allCategory: Category = {
  categoryId: 0,
  categoryName: "All",
  categoryIcon: null,
  rawMaterial: false,
  categoryProducts: null
} 

export default function PointOfSale() {
  const { data: products, error, loading } = useQuery<Product[]>("/products?additionalFields=category")
  const dispatch = useAppDispatch()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category>(allCategory)

  if (error) console.log(error)

  useEffect(() => {
    if (products) {
      if (selectedCategory.categoryId === 0) setFilteredProducts(products)
      else setFilteredProducts(products.filter(product => product.categoryId === selectedCategory.categoryId))
    }
  }, [products, selectedCategory])

  useEffect(() => {
    if (products) {
      const categ: Category[] = [allCategory].concat(products.map(category => category.productCategory))

      setCategories(categ.filter((value, index, self) =>
        value !== null && index === self.findIndex((t) => (
          t.categoryId === value.categoryId
        ))
      ))
    }
  }, [products])

  const handleChangeCategory = (category: Category) => setSelectedCategory(category)

  const handleSelectProduct = (item: Product) => {
    const cartItem: CartItem = { product: item, quantity: 1 }
    dispatch(upsert(cartItem))
  }

  return (
    <div>
      <CategoryList category={categories} selected={selectedCategory} changeCategory={handleChangeCategory} />

      <Typography component="div" variant="h4" sx={{ mt: 5, mb: 3 }}>
        {selectedCategory.categoryId === 0 ? "All Beverages" : selectedCategory.categoryName}
      </Typography>

      <ProductList products={filteredProducts} selectProduct={handleSelectProduct} />

      <LoadingOverlay open={loading} />
    </div>
  )
}

export interface Product {
  productCode: string,
  productName: string,
  unitTypeCode: string,
  unitType: UnitType | null,
  unitPrice: number,
  discountedPrice: number | null,
  productImage: string,
  isActive: boolean,
  categoryId: number,
  productCategory: Category | null
}

export interface UnitType {
  unitCode: string,
  unitLabel: string
}

export interface Category {
  categoryId: number,
  categoryName: string,
  categoryIcon: string | null,
  rawMaterial: boolean,
  categoryProducts: Product[] | null
}

export interface CartItem {
  product: Product,
  quantity: number
}