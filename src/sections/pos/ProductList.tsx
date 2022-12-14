import React, { useEffect, useState } from 'react';
// material
import Grid from '@mui/material/Grid';
import ShopProductCard from './ProductCard';
import AdminProductCard from '../products/ProductCard'
import UnitTypeDialog from "./UnitTypeDialog"
// animation
import { AnimatePresence, motion } from 'framer-motion'

// types
import { Product } from '../../pages/PointOfSale';

// ----------------------------------------------------------------------

interface ProductListProps {
  products: Product[];
  edit?: boolean;
  selectProduct?: (item: Product, type: string) => void;
  deleteProduct?: (item: Product) => void;
}

export default function ProductList({ products, edit, selectProduct, deleteProduct, ...other }: ProductListProps) {
  const [selected, setSelected] = useState<Product>()
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (selectProduct && selected) setOpen(true)
  }, [selected, selectProduct])

  const handleSelectProduct = (type: string) => {
    if (selectProduct && selected) {
      selectProduct(selected, type)
      setSelected(undefined)
      setOpen(false)
    }
  }

  const handleCloseDialog = () => {
    setOpen(false)
    setSelected(undefined)
  }

  return (
    <>
      <Grid 
        container 
        spacing={3} 
        {...other} 
        sx={{ 
          mb: 5
        }}
      >
        <AnimatePresence>
          {products.map((product) => (
            <Grid key={product.productCode} item xs={12} sm={6} md={3}>
              <motion.div
                    key={product.productCode}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, transition:{ delay: 0.3 } }}
                    exit={{ opacity: 0, transition:{ delay: 0.3 } }}     
                    layout         
              >
                {edit && deleteProduct ? (
                  <AdminProductCard product={product} deleteProduct={() => deleteProduct(product)} />
                ): (
                  <ShopProductCard product={product} selectProduct={() => setSelected(product)} />
                )}    
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>
      <UnitTypeDialog 
        open={open}
        name={selected ? selected.productName : ""}
        units={selected ? selected.unitPrices : []}
        handleClose={handleCloseDialog}
        handleSelect={handleSelectProduct}
      />
    </>
  );
}