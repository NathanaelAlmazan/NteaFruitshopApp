import React from 'react'
import Snackbar from "@mui/material/Snackbar"
import Alert, { AlertColor } from "@mui/material/Alert"

export default function CustomSnackbar({ open, message, type, handleClose }: { open: boolean, message: string, type: AlertColor, handleClose: () => void }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
            {message}
        </Alert>
    </Snackbar>
  )
}