import React from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const SuccessStyle = styled('span')(({ theme }) => {
  return {
    height: 22,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 6,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    fontSize: theme.typography.pxToRem(12),
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.info.light,
    backgroundColor: alpha(theme.palette.info.main, 0.16),
  };
});

const ErrorStyle = styled('span')(({ theme }) => {
  return {
    height: 22,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 6,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    fontSize: theme.typography.pxToRem(12),
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.error.light,
    backgroundColor: alpha(theme.palette.error.main, 0.16),
  };
});

// ----------------------------------------------------------------------

interface LabelProps {
  children: React.ReactNode
  error?: boolean
}

export default function Label({ children, error }: LabelProps) {
  if (error) return (
    <ErrorStyle>
      {children}
    </ErrorStyle>
  );

  return (
    <SuccessStyle>
      {children}
    </SuccessStyle>
  );
}
