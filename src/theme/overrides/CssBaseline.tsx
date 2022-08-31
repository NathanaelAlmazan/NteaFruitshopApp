// ----------------------------------------------------------------------

import { Theme } from "@mui/material/styles";

export default function CssBaseline(theme: Theme) {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        html: {
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          width: '100%',
          height: '100%',
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
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          display: 'block',
          maxWidth: '100%',
        },
      },
    },
  };
}
