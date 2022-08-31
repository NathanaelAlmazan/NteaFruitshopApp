import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ColorPreview } from '../../components/color-utils'

// types
import { Product } from '../..//pages/PointOfSale'

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  objectPosition: "center"
});

// ----------------------------------------------------------------------

interface ProductCardProps {
  product: Product;
  selectProduct: () => void;
}

export default function ShopProductCard({ product, selectProduct }: ProductCardProps) {
  const { productImage, productName, unitPrice, discountedPrice, productCategory } = product

  return (
    <Card onClick={selectProduct} sx={{ cursor: "pointer" }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={productName} src={productImage} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {productName}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {productCategory && (
            <Stack direction="row" spacing={1}>
              <ColorPreview colors={["red"]} />
              <Typography variant="caption">{productCategory.categoryName}</Typography>
            </Stack>
          )}
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {discountedPrice && `₱ ${discountedPrice.toFixed(2)}`}
            </Typography>
            &nbsp;
            {`₱ ${unitPrice.toFixed(2)}`}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}