import PropTypes from 'prop-types';
import React from 'react';
// material
import { styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, OutlinedInput, InputAdornment } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';

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

interface OrderListToolbar { filterName: string, onFilterName: (e: React.ChangeEvent<HTMLInputElement>) => void }

export default function OrderListToolbar({ filterName, onFilterName }: OrderListToolbar) {
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

        <Tooltip title="Filter list">
          <IconButton>
            <FilterListOutlinedIcon />
          </IconButton>
        </Tooltip>
    </RootStyle>
  );
}