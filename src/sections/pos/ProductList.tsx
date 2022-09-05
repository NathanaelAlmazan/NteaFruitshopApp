import React from 'react';
// material
import Grid from '@mui/material/Grid';
import ShopProductCard from './ProductCard';
import AdminProductCard from '../products/ProductCard'

// animation
import { AnimatePresence, motion } from 'framer-motion'

// types
import { Product } from '../../pages/PointOfSale';

// ----------------------------------------------------------------------

interface ProductListProps {
  products: Product[];
  edit?: boolean;
  selectProduct: (item: Product) => void;
}

export default function ProductList({ products, edit, selectProduct, ...other }: ProductListProps) {
  return (
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
              {edit ? (
                <AdminProductCard product={product} selectProduct={() => selectProduct(product)} />
              ): (
                <ShopProductCard product={product} selectProduct={() => selectProduct(product)} />
              )}    
            </motion.div>
          </Grid>
        ))}
      </AnimatePresence>
    </Grid>
  );
}