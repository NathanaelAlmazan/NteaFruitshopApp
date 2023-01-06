import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// material
import { Card, Typography, Stack, IconButton, CardHeader, CardMedia, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { ColorPreview } from "../../components/color-utils"
//icons
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// types
import { Product } from '../../pages/PointOfSale'

// ----------------------------------------------------------------------

interface ProductCardProps {
  product: Product;
  deleteProduct: () => void;
}

const colors = ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF', '#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC']

const CardMoreMenu = ({ select, remove }: { select: () => void, remove: () => void }) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <MoreVertOutlinedIcon />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem 
          onClick={() => { 
            setIsOpen(false)
            remove()
          }} 
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <DeleteOutlineOutlinedIcon color="error" />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem 
          onClick={() => {
            setIsOpen(false);
            select()
          }} 
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <ModeEditOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  )
}

export default function AdminProductCard({ product, deleteProduct }: ProductCardProps) {
  const navigate = useNavigate()
  const { productImage, productName, unitPrices, discountedPrice, productCategory } = product
  const regularPrice = unitPrices.find(u => u.unitType === "rg");
  const displayPrice = regularPrice ? regularPrice.unitPrice : 0;

  const handleEdit = () => navigate(`/admin/products/edit/${product.productCode}`)

  return (
    <Card sx={{ cursor: "pointer" }}>
      <CardHeader
        action={
         <CardMoreMenu select={handleEdit} remove={deleteProduct} />
        }
        title={
          <Typography variant="subtitle2">{productName}</Typography>
        }
        subheader={
          <Typography variant="body2">
            {productCategory ? productCategory.categoryName : "Unassigned"}
            {!product.available && (
              <span style={{ color: "red" }}>{" (Not Available)"}</span>
            )}
          </Typography>
        }
      />

      <CardMedia
        component="img"
        height="250"
        src={productImage}
        alt={productName}
        sx={{ pt: 2 }}
      />

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
          <ColorPreview colors={unitPrices.slice(0, 4).map((u, i) => colors[i])} />
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
    </Card>
  );
}

{/* <Stack direction="row">
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
</Stack> */}