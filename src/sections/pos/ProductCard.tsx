import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'

// types
import { Product } from '../..//pages/PointOfSale'

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  objectPosition: "center",
  transition: "0.5s",
  "&:hover": {
    filter: "brightness(40%)"
  }
});

// ----------------------------------------------------------------------

interface ProductCardProps {
  product: Product;
  selectProduct: () => void;
}

export default function ShopProductCard({ product, selectProduct }: ProductCardProps) {
  const { productImage, productName, unitPrice, discountedPrice, productCategory } = product
  const [hovered, setHovered] = useState<boolean>(false)

  return (
    <Card onClick={selectProduct} sx={{ cursor: "pointer" }}>
      <Box onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} sx={{ pt: '100%', position: 'relative' }}>
        {hovered && (
          <Typography 
            component="div" 
            variant="caption"
            sx={{
              zIndex: 9,
              right: 20,
              top: 20,
              position: 'absolute',
              color: "white",
              textTransform: 'uppercase',
              border: '2px solid white',
              p: 1
            }}
          >
            Click to Add in Cart
          </Typography>
        )}
        <ProductImgStyle alt={productName} src={productImage} />
      </Box>

      <Stack sx={{ p: 2 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle1" noWrap>
            {productName}
          </Typography>
        </Link>
        <Typography variant="caption">
          {productCategory ? productCategory.categoryName : "Unassigned"}
        </Typography>
        <Typography component="div" variant="subtitle1" align="right" sx={{ mt: 2 }}>
          <Typography
            component="span"
            variant="body1"
            sx={{
              color: 'text.disabled',
              textDecoration: 'line-through',
            }}
          >
            {discountedPrice > 0 && `₱ ${unitPrice.toFixed(2)}`}
          </Typography>
          &nbsp;
          {discountedPrice > 0 ? `₱ ${(unitPrice - discountedPrice).toFixed(2)}` : `₱ ${unitPrice.toFixed(2)}`}
        </Typography>
      </Stack>
    </Card>
  );
}