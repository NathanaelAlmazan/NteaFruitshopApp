import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// project components
import { useMutation } from '../../custom-hooks'
// types
import { UserAccount } from "../../pages/accounts"

export default function AccountDeleteDialog({ open, account, handleClose }: { open: boolean, account: UserAccount, handleClose: () => void }) {
  const { remove, data } = useMutation<UserAccount>()

  React.useEffect(() => {
    if (data) handleClose()
  }, [data])

  const handleDelete = () => {
    remove(`/users/${account.userId}`)
  }

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
    >
        <DialogTitle id="alert-dialog-title">
            {`Are you sure you want to delete ${account.firstName} ${account.lastName}?`}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                If you delete this employee, you cannot retrieve this employee later.
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
