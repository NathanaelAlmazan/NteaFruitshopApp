import React from 'react';
// material
import Stack from '@mui/material/Stack'
import { useTheme } from "@mui/material/styles"

import CategoryCard from './CategoryCard';

// types
import { Category } from '../../pages/PointOfSale';

// ----------------------------------------------------------------------

interface CategoryListProps {
  category: Category[];
  selected: Category;
  changeCategory: (category: Category) => void;
}

export default function CategoryList({ category, selected, changeCategory }: CategoryListProps) {
  const theme = useTheme();

  return (
    <Stack 
        direction="row" 
        spacing={2} 
        sx={{ 
            maxWidth: "100%", 
            overflowX: "auto",
            "::-webkit-scrollbar": {
                height: "8px"
            },
              
            /* Track */
            "::-webkit-scrollbar-track": {
                background: theme.palette.grey[300] 
            },
               
            /* Handle */
            "::-webkit-scrollbar-thumb": {
                background: theme.palette.primary.main
            },
              
              /* Handle on hover */
            "::-webkit-scrollbar-thumb:hover": {
                background: theme.palette.primary.dark
            }
        }}
    >
      {category.map((category) => (
        <CategoryCard 
          key={category.categoryId} 
          category={category} 
          selected={selected.categoryId === category.categoryId} 
          changeCategory={() => changeCategory(category)} 
        />
      ))}
    </Stack>
  );
}