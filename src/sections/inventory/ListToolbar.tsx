import PropTypes from 'prop-types';
import React from 'react';
// material
import { styled } from '@mui/material/styles';
import { Toolbar, Button, OutlinedInput, InputAdornment, IconButton, Tooltip, Typography } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';

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

ItemListToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

interface ItemListToolbar { label?: string, buttonLabel?: string, numSelected: number, filterName: string, onFilterName: (e: React.ChangeEvent<HTMLInputElement>) => void, onAddClick: () => void }

export default function ItemListToolbar({ label, buttonLabel, numSelected, filterName, onFilterName, onAddClick }: ItemListToolbar) {
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
          <Button variant="contained" startIcon={<AddIcon />} onClick={onAddClick}>{buttonLabel}</Button>
        )}
    </RootStyle>
  );
}