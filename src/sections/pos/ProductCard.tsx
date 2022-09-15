import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ColorPreview } from "../../components/color-utils"
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

const colors = ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF']

export default function ShopProductCard({ product, selectProduct }: ProductCardProps) {
  const { productImage, productName, unitPrices, discountedPrice, productCategory } = product;
  const regularPrice = unitPrices.find(u => u.unitType === "rg");
  const displayPrice = regularPrice ? regularPrice.unitPrice : 0;
  const [hovered, setHovered] = useState<boolean>(false);

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

      <Stack spacing={2} sx={{ p: 2 }}>
        <div>
          <Link to="#" color="inherit" underline="hover" component={RouterLink}>
            <Typography variant="subtitle1" noWrap>
              {productName}
            </Typography>
          </Link>
          <Typography variant="caption">
            {productCategory ? productCategory.categoryName : "Unassigned"}
          </Typography>
        </div>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <ColorPreview colors={unitPrices.filter(p => p.unitPrice > 0).slice(0, 4).map((u, i) => colors[i])} />
            <Typography variant="subtitle1">
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through',
                }}
              >
                {discountedPrice > 0 && `₱ ${displayPrice.toFixed(2)}`}
              </Typography>
              &nbsp;
              {discountedPrice > 0 ? `₱ ${(displayPrice - discountedPrice).toFixed(2)}` : `₱ ${displayPrice.toFixed(2)}`}
            </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}