import React, { useEffect, useState } from 'react'
// mui
import Typography from '@mui/material/Typography'
import ProductList from "../sections/pos/ProductList"
import CategoryList from "../sections/pos/CategoryList"
// project components
import { LoadingOverlay } from '../components/SuspenseLoader'
import { useQuery, useAppDispatch, useAppSelector } from "../custom-hooks"
import { upsert } from "../redux/slice/cart"

const allCategory: Category = {
  categoryId: 0,
  categoryName: "All",
  categoryIcon: null,
  rawMaterial: false,
  categoryProducts: null
} 

export default function PointOfSale() {
  const { data: products, error, loading } = useQuery<Product[]>("/products?additionalFields=category,prices")
  const dispatch = useAppDispatch()
  const { search } = useAppSelector((state) => state)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category>(allCategory)

  if (error) console.log(error)

  useEffect(() => {
    if (products) {
      if (selectedCategory.categoryId === 0) setFilteredProducts(products.filter(p => p.productName.toLowerCase().includes(search.searchQuery)))
      else setFilteredProducts(products.filter(product => product.categoryId === selectedCategory.categoryId && product.productName.toLowerCase().includes(search.searchQuery)))
    }
  }, [products, selectedCategory, search])

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

  const handleSelectProduct = (item: Product, type: string) => {
    const cartItem: CartItem = { 
      product: item, 
      quantity: 1, 
      unitType: type,
      unitPrice: item.unitPrices.find(p => p.unitType === type).unitPrice 
    };

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

export interface UnitPrices {
  unitType: string,
  unitPrice: number,
  productCode: string,
}

export interface Product {
  productCode: string,
  productName: string,
  unitPrices: UnitPrices[],
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
  unitPrice: number,
  quantity: number,
  unitType: string
}

export interface CustomerOrder {
  orderId: number
  totalAmount: number
  paidAmount: number
  paymentType: "CASH" | "GCASH"
  transactionId: string | null
  orderItems: CustomerOrderItem[]
  timestamp: Date
  cancelled: boolean
}

export interface CustomerOrderItem {
  orderId: number
  productCode: string
  unitCode: string
  quantity: number
  product: Product
}