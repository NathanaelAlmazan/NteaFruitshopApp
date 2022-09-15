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
import FilterUnitsControl from "./FilterUnitsControl"
import { AnimatePresence, motion } from 'framer-motion';
//icons
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
// types
import { Category, UnitType } from '../../pages/PointOfSale'

// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
}

interface ShopFilterSidebarProps {
  isOpenFilter: boolean;
  selectedCategories: number[];
  selectedUnits: string[];
  onOpenFilter: () => void;
  onCloseFilter: () => void;
  selectCategory:(id: number) => void;
  selectUnits: (code: string) => void;
  clearFilters: () => void;
}

export default function ShopFilterSidebar({ isOpenFilter, selectedCategories, selectedUnits, onOpenFilter, onCloseFilter, selectCategory, selectUnits, clearFilters }: ShopFilterSidebarProps) {
  const theme = useTheme()
  const { data: categories, refetchData: refreshCategory } = useQuery<Category[]>("/category")
  const { data: units, refetchData: refreshUnits } = useQuery<UnitType[]>("/units")
  const [addUnits, setAddUnits] = useState<boolean>(false)
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
              overflowX: "hidden",
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
                <AnimatePresence>
                  {addCategory && (
                    <FilterCategControl cancel={() => setAddCategory(false)} refresh={refreshCategory} create />
                  )}
                  {categories && categories.map((category, i) => (
                    <motion.div
                      key={category.categoryId}
                      initial={{ x: -150, opacity: 0 }}
                      animate={{ x: 0, opacity: 1, transition:{ delay: 0.2 * i, type: "spring" } }}
                      exit={{ x: 150, opacity: 0 }}  
                      layout    
                    >
                      <FilterCategControl 
                        selected={selectedCategories.includes(category.categoryId)}
                        category={category} 
                        handleClick={() => selectCategory(category.categoryId)}
                        refresh={refreshCategory} 
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </FormGroup>
            </div>

            <div>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="subtitle1">
                  Unit Measures
                </Typography>
                <Tooltip title="Add Units">
                    <IconButton onClick={() => setAddUnits(true)}>
                        <AddOutlinedIcon />
                    </IconButton>
                </Tooltip>
              </Stack>
              <FormGroup>
                <AnimatePresence>
                  {addUnits && (
                    <FilterUnitsControl cancel={() => setAddUnits(false)} refresh={refreshUnits} create />
                  )}
                  {units && units.filter(u => u.unitCode !== "rg").map((unit, i) => (
                    <motion.div
                      key={unit.unitCode}
                      initial={{ x: -150, opacity: 0 }}
                      animate={{ x: 0, opacity: 1, transition:{ delay: 0.2 * i, type: "spring" } }}
                      exit={{ x: 150, opacity: 0 }}  
                      layout    
                    >
                      <FilterUnitsControl 
                        selected={selectedUnits.includes(unit.unitCode)}
                        units={unit} 
                        refresh={refreshUnits} 
                        handleClick={() => selectUnits(unit.unitCode)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
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
              onClick={clearFilters}
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
