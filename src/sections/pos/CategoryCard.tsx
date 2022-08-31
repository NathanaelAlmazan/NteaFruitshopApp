import React from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { useTheme } from '@mui/material/styles'

// icons
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';

// types
import { Category } from '../../pages/PointOfSale'

interface CategoryCardProps {
    category: Category;
    selected: boolean;
    changeCategory: () => void;
}

export default function CategoryCard({ category, selected, changeCategory }: CategoryCardProps) {
  const theme = useTheme();

  return (
    <Paper 
        onClick={changeCategory}
        variant="outlined" 
        sx={{ 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center", 
            alignItems: "center", 
            p: 2, 
            cursor: "pointer",
            "&:hover": {
                borderColor: theme.palette.secondary.main
            },
            ...(selected && {
                borderColor: theme.palette.primary.main
            })
        }}
    >
        {category.categoryIcon ? (
            <Avatar variant="square" alt={category.categoryName} src={category.categoryIcon} />
        ): (
            <Inventory2TwoToneIcon sx={{ m: 1 }} />
        )}
        <Typography variant="caption" align="center" sx={{ width: 80 }}>{category.categoryName}</Typography>
    </Paper>
  )
}

