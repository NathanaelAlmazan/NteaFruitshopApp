import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
// material
import { Box, Card, Link, Typography, Stack, IconButton, Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'
//icons
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// types
import { Product } from '../../pages/PointOfSale'

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
    filter: "brightness(70%)"
  }
});

// ----------------------------------------------------------------------

interface ProductCardProps {
  product: Product;
  selectProduct: () => void;
  deleteProduct: () => void;
}

export default function AdminProductCard({ product, selectProduct, deleteProduct }: ProductCardProps) {
  const { productImage, productName, unitPrice, discountedPrice, productCategory } = product

  return (
    <Card sx={{ cursor: "pointer" }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={productName} src={productImage} />
      </Box>

      <Stack sx={{ p: 2 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle1" noWrap>
            {productName}
          </Typography>
        </Link>
        <Typography variant="caption">
          {productCategory && productCategory.categoryName}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
        <Typography component="div" variant="subtitle1" align="right">
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
        <Stack direction="row">
          <Tooltip title="Edit Product">
            <IconButton onClick={selectProduct}>
              <ModeEditOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove Product">
            <IconButton onClick={() => deleteProduct()}>
              <DeleteOutlinedIcon color="error" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Card>
  );
}