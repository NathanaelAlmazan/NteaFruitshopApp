import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ProductDeleteDialog({ open, name, handleClose, handleDelete }: { open: boolean, name: string, handleClose: () => void, handleDelete: () => void }) {

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            {`Are you sure you want to delete ${name}?`}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                If you delete this product, the product will no longer be available in the POS but can still be retrieved later.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDelete} color="error" autoFocus>
                Delete
            </Button>
        </DialogActions>
    </Dialog>
  );
}
