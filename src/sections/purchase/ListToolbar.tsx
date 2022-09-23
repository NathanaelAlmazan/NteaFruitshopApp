import PropTypes from 'prop-types';
import React from 'react';
// material
import { styled } from '@mui/material/styles';
import { Toolbar, OutlinedInput, InputAdornment, IconButton, Tooltip, Typography, Menu, MenuItem } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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

ListToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

interface ItemListToolbar { 
    label?: string
    filter: string
    filterSelected: (value: string) => void
    options: { value: string, label: string }[]
    numSelected: number, 
    filterName: string, 
    onFilterName: (e: React.ChangeEvent<HTMLInputElement>) => void 
}

export default function ListToolbar({ label, options, filter, numSelected, filterName, onFilterName, filterSelected }: ItemListToolbar) {
  return (
    <RootStyle>
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
            value={filterName}
            onChange={onFilterName}
            placeholder={label}
            startAdornment={
            <InputAdornment position="start">
                <SearchOutlinedIcon sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
            }
        />
      )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteOutlineIcon color="error" />
            </IconButton>
          </Tooltip>
        ) : (
            <SortMenu options={options} selected={filter} setSelected={filterSelected} />
        )}
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