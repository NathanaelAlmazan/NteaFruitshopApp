import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles'
import { capitalCase, constantCase } from 'change-case';
// types
import { UnitPrices } from '../../pages/PointOfSale';

const IconStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  borderRadius: '50%',
  width: 50,
  height: 50,
  border: `solid 2px ${theme.palette.background.paper}`,
  boxShadow: `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`,
}));

const colors = ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF', '#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC']

export default function UnitTypeDialog(
    { open, units, name, handleClose, handleSelect }: 
    { open: boolean, units: UnitPrices[], name: string, handleClose: () => void, handleSelect: (type: string) => void }
  ) {
  return (
    <Dialog
        open={open}
        onClose={handleClose}
    >
        <DialogTitle id="alert-dialog-title">
            {`${capitalCase(name)} Type`}
        </DialogTitle>
        <List sx={{ pt: 0 }}>
            {units.filter(u => u.unitPrice > 0).sort((a, b) => a.unitPrice - b.unitPrice).map((u, i) => (
                <ListItemButton onClick={() => handleSelect(u.unitType)} key={u.unitType}>
                    <ListItemAvatar>
                        <IconStyle sx={{ backgroundColor: colors[i] }}>
                            <Typography variant="subtitle1" color="white">{constantCase(u.unitType)}</Typography>
                        </IconStyle>
                    </ListItemAvatar>
                    <ListItemText primary={
                        <Typography variant="subtitle2">{`₱ ${u.unitPrice.toFixed(2)}`}</Typography>
                    } />
                </ListItemButton>
            ))}
        </List>
    </Dialog>
  );
}
