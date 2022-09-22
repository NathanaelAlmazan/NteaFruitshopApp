import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
// query
import { useMutation } from '../../../custom-hooks'
import { InventoryItem } from '../../../pages/inventory';

export default function DeleteDialog({ item, onClose, onReload }: { item: number | null, onClose: () => void, onReload: () => void }) {
    const { remove } = useMutation<InventoryItem>()

    const handleDelete = () => {
        if (item) {
            remove(`/ingredients/${item}`)
            onClose()
            onReload()
        }
    }

    return (
        <Dialog
            open={Boolean(item !== null)}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this item?"}
            </DialogTitle>
            <DialogActions>
                <Button onClick={onClose}>Disagree</Button>
                <Button onClick={handleDelete} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}
