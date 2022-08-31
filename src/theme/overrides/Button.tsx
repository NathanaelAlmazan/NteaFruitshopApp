import { Theme } from "@mui/material";

// ----------------------------------------------------------------------

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none'
          }
        },
        sizeLarge: {
          height: 48
        },
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: (theme as any).customShadows.z8,
          '&:hover': {
            backgroundColor: theme.palette.grey[400]
          }
        },
        containedPrimary: {
          boxShadow: (theme as any).customShadows.primary
        },
        containedSecondary: {
          boxShadow: (theme as any).customShadows.secondary
        },
        outlinedInherit: {
          border: `1px solid ${(theme as any).palette.grey[500_32]}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        }
      }
    }
  };
}
