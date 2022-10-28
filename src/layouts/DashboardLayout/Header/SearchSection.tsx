import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
// material-ui
import { InputAdornment, Autocomplete, TextField } from '@mui/material';
// project imports
import { useAppDispatch, useQuery } from "../../../custom-hooks"
import { search } from "../../../redux/slice/search"
// assets
import SearchIcon from '@mui/icons-material/Search';

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [inputValue, setInputValue] = useState<string>('')
    const [value, setValue] = useState<string | null>(null);
    const [options, setOptions] = useState<string[]>([]);
    const { data: products, loading } = useQuery<string[]>(
      location.pathname === "/admin/accounts" ? "/users/names" : "/products/names"
    );

    const searchPaths = ["/app/pos", "/admin/products", "/admin/accounts"];

    React.useEffect(() => {
        if (products) setOptions(products)
    }, [products])

    React.useEffect(() => {
        dispatch(search(value ? value : ''))
    }, [value])

    if (searchPaths.includes(location.pathname)) return (
        <Autocomplete
            freeSolo
            disableClearable
            loading={loading}
            options={options}
            value={value}
            inputValue={inputValue}
            onChange={(event: unknown, newValue: string | null) => {
                setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                if (newInputValue.length === 0) setValue(null);
                setInputValue(newInputValue)
            }}
            sx={{ width: 350 }}
            renderInput={(params) => (
                <TextField 
                    {...params} 
                    placeholder="Search"
                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
                    }}
                />
            )}
        />
    )

    return (
        <div></div>
    )
};

export default SearchSection;