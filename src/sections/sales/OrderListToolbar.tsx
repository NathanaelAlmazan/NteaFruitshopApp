import PropTypes from 'prop-types';
import React from 'react';
// material
import { styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, OutlinedInput, InputAdornment, Menu, MenuItem } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.shadows[18] },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500]} !important`,
  },
}));

// ----------------------------------------------------------------------

OrderListToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

interface OrderListToolbar { 
  filterName: string, 
  filter: string,
  filterSelected: (value: string) => void,
  options: { value: string, label: string }[],
  onFilterName: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function OrderListToolbar({ filter, options, filterSelected, filterName, onFilterName }: OrderListToolbar) {
  return (
    <RootStyle>
        <SearchStyle
            value={filterName}
            onChange={onFilterName}
            placeholder="Search order..."
            startAdornment={
            <InputAdornment position="start">
                <SearchOutlinedIcon sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
            }
        />

        <SortMenu options={options} selected={filter} setSelected={filterSelected} />
    </RootStyle>
  );
}

interface SortMenuProps {
  selected: string
  options: { value: string, label: string }[]
  setSelected: (value: string) => void
}

const SortMenu = ({ selected, options, setSelected }: SortMenuProps) => {
  const [open, setOpen] = React.useState(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(event.currentTarget);
    };
  
  const handleClose = () => {
      setOpen(null);
  };
  
  const handleManuClick = (value: string) => {
      setSelected(value)
      setOpen(false)
  }
  return (
      <>
          <Tooltip title="Sort">
              <IconButton onClick={handleOpen}>
                  <FilterListIcon color="inherit" />
              </IconButton>
          </Tooltip>
          <Menu
              keepMounted
              anchorEl={open}
              open={Boolean(open)}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
              {options.map((option) => (
                  <MenuItem
                      key={option.value}
                      selected={option.value === selected}
                      onClick={() => handleManuClick(option.value)}
                      sx={{ typography: 'body2' }}
                  >
                      {option.label}
                  </MenuItem>
              ))}
          </Menu>
      </>
)}