import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { PDFViewer } from '@react-pdf/renderer';
import InvoiceDocument from "./InvoiceDocument"
import { useQuery } from '../../custom-hooks';
import { CustomerOrder } from '../../pages/PointOfSale';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InvoiceDialog({ open, id, handleClose }: { open: boolean, id: number, handleClose: () => void }) {
  const { data } = useQuery<CustomerOrder>(`/order/${id}?additionalFields=items,product,prices`)

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
              Invoice
            </Typography>
          </Toolbar>
        </AppBar>
        <PDFViewer style={{ width: '100%', height: '100%' }}>
            {data && <InvoiceDocument invoice={data} />}
        </PDFViewer>
      </Dialog>
  );
}
