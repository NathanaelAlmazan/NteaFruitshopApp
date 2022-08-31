import React, { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Card, Grid, InputAdornment, OutlinedInput, Popper } from '@mui/material';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

// project imports
import Transitions from '../../../components/Transitions';

// assets
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import { shouldForwardProp } from '@mui/system';

// styles
const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
    zIndex: 1100,
    width: '99%',
    top: '-55px !important',
    padding: '0 12px',
    [theme.breakpoints.down('sm')]: {
        padding: '0 10px'
    }
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 434,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: '#fff'
    }
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
    cursor: 'pointer', borderRadius: '8px',
    width: '34px', height: '34px', fontSize: '1.2rem',
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    '&:hover': {
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.light
    }
}));

// ==============================|| SEARCH INPUT - MOBILE||============================== //

interface MobileSearchProps {
    value: string,
    setValue: (value: string) => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    popupState: any
}

const MobileSearch = ({ value, setValue, popupState }: MobileSearchProps) => {
    const theme = useTheme();

    return (
        <OutlineInputStyle
            id="input-search-header"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search"
            startAdornment={
                <InputAdornment position="start">
                    <SearchIcon sx={{ color: theme.palette.grey[500] }} />
                </InputAdornment>
            }
            endAdornment={
                <InputAdornment position="end">
                    <ButtonBase sx={{ borderRadius: '12px' }}>
                        <HeaderAvatarStyle variant="rounded">
                            <TuneIcon />
                        </HeaderAvatarStyle>
                    </ButtonBase>
                    <Box sx={{ ml: 2 }}>
                        <ButtonBase sx={{ borderRadius: '12px' }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    cursor: 'pointer', borderRadius: '8px',
                                    width: '34px', height: '34px', fontSize: '1.2rem',
                                    background: theme.palette.secondary.light,
                                    color: theme.palette.secondary.dark,
                                    '&:hover': {
                                        background: theme.palette.secondary.dark,
                                        color: theme.palette.secondary.light
                                    }
                                }}
                                {...bindToggle(popupState)}
                            >
                                <CloseIcon />
                            </Avatar>
                        </ButtonBase>
                    </Box>
                </InputAdornment>
            }
            aria-describedby="search-helper-text"
            inputProps={{ 'aria-label': 'weight' }}
        />
    );
};

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = () => {
    const theme = useTheme();
    const [value, setValue] = useState('');

    return (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <PopupState variant="popper" popupId="demo-popup-popper">
                    {(popupState) => (
                        <>
                            <Box sx={{ ml: 2 }}>
                                <ButtonBase sx={{ borderRadius: '12px' }}>
                                    <HeaderAvatarStyle variant="rounded" {...bindToggle(popupState)}>
                                        <SearchIcon />
                                    </HeaderAvatarStyle>
                                </ButtonBase>
                            </Box>
                            <PopperStyle {...bindPopper(popupState)} transition>
                                {({ TransitionProps }) => (
                                    <>
                                        <Transitions type="zoom" {...TransitionProps} sx={{ transformOrigin: 'center left' }}>
                                            <Card
                                                sx={{
                                                    background: '#fff',
                                                    [theme.breakpoints.down('sm')]: {
                                                        border: 0,
                                                        boxShadow: 'none'
                                                    }
                                                }}
                                            >
                                                <Box sx={{ p: 2 }}>
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid item xs>
                                                            <MobileSearch value={value} setValue={setValue} popupState={popupState} />
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Card>
                                        </Transitions>
                                    </>
                                )}
                            </PopperStyle>
                        </>
                    )}
                </PopupState>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <OutlineInputStyle
                    id="input-search-header"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search"
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: theme.palette.grey[500] }} />
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <ButtonBase sx={{ borderRadius: '12px' }}>
                                <HeaderAvatarStyle variant="rounded">
                                    <TuneIcon />
                                </HeaderAvatarStyle>
                            </ButtonBase>
                        </InputAdornment>
                    }
                    aria-describedby="search-helper-text"
                    inputProps={{ 'aria-label': 'weight' }}
                />
            </Box>
        </>
    );
};

export default SearchSection;
