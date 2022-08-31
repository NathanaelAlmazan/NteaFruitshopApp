import React from 'react';
// material
import Grid from '@mui/material/Grid';
import ShopProductCard from './ProductCard';

// animation
import { AnimatePresence, motion } from 'framer-motion'

// types
import { Product } from '../../pages/PointOfSale';

// ----------------------------------------------------------------------

interface ProductListProps {
  products: Product[];
  selectProduct: (productCode: string) => void;
}

export default function ProductList({ products, selectProduct, ...other }: ProductListProps) {
  return (
    <Grid 
      container 
      spacing={3} 
      {...other} 
      sx={{ 
        mb: 5
      }}
    >
      {products.map((product, i) => (
        <Grid key={product.productCode} item xs={12} sm={6} md={4}>
          <AnimatePresence>
            <motion.div
              key={product.productCode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <ShopProductCard product={product} selectProduct={() => selectProduct(product.productCode)} />
            </motion.div>
          </AnimatePresence>
        </Grid>
      ))}
    </Grid>
  );
}