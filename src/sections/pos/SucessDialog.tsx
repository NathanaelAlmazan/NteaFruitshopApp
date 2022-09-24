import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface DialogProps {
    open: boolean
    id: number
    handleClose: () => void
    handleInvoice: () => void
}

export default function SuccessDialog({ open, id, handleClose, handleInvoice }: DialogProps) {
  const orderUid = `${Array(5 - id.toFixed(0).length).fill(0).map(() => "0").join("")}${id}`
  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            Do you want to view invoice?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Order with ID of ${orderUid} was successfully created.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleInvoice} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
  );
}
