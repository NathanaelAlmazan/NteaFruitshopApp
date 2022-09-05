import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
// material
import { Box, Card, Link, Typography, Stack, IconButton, Tooltip, CardActions } from '@mui/material'
import { styled } from '@mui/material/styles'
//icons
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
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
    filter: "brightness(70%)"
  }
});

// ----------------------------------------------------------------------

interface ProductCardProps {
  product: Product;
  selectProduct: () => void;
}

export default function AdminProductCard({ product, selectProduct }: ProductCardProps) {
  const { productImage, productName, unitPrice, discountedPrice } = product

  return (
    <Card onClick={selectProduct} sx={{ cursor: "pointer" }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={productName} src={productImage} />
      </Box>

      <Stack sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {productName}
          </Typography>
        </Link>
        <Typography variant="subtitle1">
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
      <CardActions sx={{ justifyContent: 'flex-end' }} disableSpacing>
        <Tooltip title="Edit Product">
          <IconButton>
            <ModeEditOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Remove Product">
          <IconButton>
            <DeleteOutlinedIcon color="error" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}