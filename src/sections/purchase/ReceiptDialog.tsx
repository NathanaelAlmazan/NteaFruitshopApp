import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReceiptDialog({ open, url, handleClose }: { open: boolean, url: string, handleClose: () => void }) {

  const handleSaveReceipt = () => api.downloadFromUrl(url)

  return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Receipt
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSaveReceipt}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <Box 
            component="img"
            src={url}
            alt="receipt"
            sx={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Dialog>
  );
}
