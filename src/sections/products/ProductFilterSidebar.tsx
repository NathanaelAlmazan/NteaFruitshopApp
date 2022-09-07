import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useQuery } from "../../custom-hooks"
// material
import {
  Box,
  Stack,
  Button,
  Drawer,
  Divider,
  IconButton,
  Typography,
  FormGroup,
  Tooltip,
  useTheme
} from '@mui/material';
import FilterCategControl from "./FilterCategControl"
//icons
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
// types
import { Category } from '../../pages/PointOfSale'

// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

interface ShopFilterSidebarProps {
  isOpenFilter: boolean;
  onOpenFilter: () => void;
  onCloseFilter: () => void;
}

export default function ShopFilterSidebar({ isOpenFilter, onOpenFilter, onCloseFilter }: ShopFilterSidebarProps) {
  const theme = useTheme()
  const { data: categories, refetchData } = useQuery<Category[]>("/category")
  const [addCategory, setAddCategory] = useState<boolean>(false)

  return (
    <>
      <Button disableRipple color="inherit" endIcon={<FilterListIcon />} onClick={onOpenFilter}>
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={isOpenFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <div style={{ position: "relative", height: "100%", }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
            <Typography variant="subtitle1" sx={{ ml: 1 }}>
              Filters
            </Typography>
            <IconButton onClick={onCloseFilter}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Divider />

          <Stack 
            spacing={3} 
            sx={{ p: 3, 
              maxHeight: "calc(100% - 150px)",
              overflowY: "auto",
              "::-webkit-scrollbar": {
                height: "8px",
                width: "8px"
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
            <div>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="subtitle1">
                  Categories
                </Typography>
                <Tooltip title="Add Category">
                    <IconButton onClick={() => setAddCategory(true)}>
                        <AddOutlinedIcon />
                    </IconButton>
                </Tooltip>
              </Stack>
              <FormGroup>
                {addCategory && (
                  <FilterCategControl _cancel={() => setAddCategory(false)} refresh={refetchData} create />
                )}
                {categories && categories.map(category => (
                  <FilterCategControl key={category.categoryId} category={category} />
                ))}
              </FormGroup>
            </div>
          </Stack>

          <Box sx={{ p: 3, position: "absolute", width: "100%", bottom: 0, right: 0 }}>
            <Button
              fullWidth
              size="large"
              type="submit"
              color="inherit"
              variant="outlined"
              startIcon={<ClearAllIcon />}
            >
              Clear All
            </Button>
          </Box>
        </div>
      </Drawer>
    </>
  );
}
