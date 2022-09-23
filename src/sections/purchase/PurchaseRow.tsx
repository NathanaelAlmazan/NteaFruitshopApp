import React from 'react'
// mui
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableBody from "@mui/material/TableBody"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Checkbox from "@mui/material/Checkbox"
import Collapse from "@mui/material/Collapse"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import Box from "@mui/material/Box"
import ReceiptIcon from '@mui/icons-material/Receipt';
import PurchaseMoreMenu from "./PurchaseMoreMenu"
import ReceiptDialog from './ReceiptDialog'
// types
import { PurchaseOrder } from "../../pages/purchase"

interface PurchaseRowProps { 
    purchase: PurchaseOrder, 
    isItemSelected: boolean, 
    handleClick: () => void, 
    handleUpdate: (purchase: PurchaseOrder) => void,
    handleDelete: () => void
}

export default function PurchaseRow({ purchase, isItemSelected, handleClick, handleUpdate, handleDelete }: PurchaseRowProps) {
    const [open, setOpen] = React.useState<boolean>(false)
    const [receipt, setReceipt] = React.useState<boolean>(false)
    const purchaseUid = `${Array(5 - purchase.purchaseId.toFixed(0).length).fill(0).map(() => "0").join("")}${purchase.purchaseId}`
    const labelId = `enhanced-table-checkbox-${purchase.purchaseId}`;

    return (
        <>
            <TableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={purchase.purchaseId}
                selected={isItemSelected}
            >
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        onChange={() => handleClick()}
                        checked={isItemSelected}
                        inputProps={{
                            'aria-labelledby': labelId,
                        }}
                    />
                </TableCell>
                <TableCell
                    component="th"
                    id={labelId}
                    scope="purchase"
                >
                    <Typography variant="subtitle2" noWrap>
                        {purchaseUid}
                    </Typography>
                </TableCell>
                <TableCell align="left">{purchase.supplier}</TableCell>
                <TableCell align="left">{`₱ ${purchase.totalPrice.toFixed(2)}`}</TableCell>
                <TableCell align="right">{purchase.paid ? "Yes" : "No"}</TableCell>
                <TableCell align="right">{purchase.arrived ? "Yes" : "No"}</TableCell>
                <TableCell align="right">
                    {new Date(purchase.purchaseDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
                </TableCell>
                <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end">
                        <PurchaseMoreMenu 
                            collapsed={open} 
                            paid={purchase.paid}
                            arrived={purchase.arrived}
                            handleViewDetails={() => setOpen(!open)} 
                            handleSetPaid={() => handleUpdate({ ...purchase, paid: true })}
                            handleSetArrived={() => handleUpdate({ ...purchase, arrived: true })}
                            handleDelete={handleDelete}
                        />
                        <Tooltip title="View Receipt" onClick={() => setReceipt(true)}>
                            <IconButton>
                                <ReceiptIcon color="info" />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                        Purchase Details
                    </Typography>
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                        <TableRow>
                            <TableCell>Item Name</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Unit Type</TableCell>
                            <TableCell align="right">Unit Price</TableCell>
                            <TableCell align="right">Estimated price (₱)</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {purchase.purchasedItems.map(item => (
                                    <TableRow key={`${item.purchaseId} ${item.itemId}`}>
                                        <TableCell component="th" scope="row">
                                            {item.ingredientsDto.itemName}
                                        </TableCell>
                                        <TableCell align="right">{item.quantity}</TableCell>
                                        <TableCell align="right">{item.ingredientsDto.units.toUpperCase()}</TableCell>
                                        <TableCell align="right">{`₱ ${item.ingredientsDto.unitPrice.toFixed(2)}`}</TableCell>
                                        <TableCell align="right">
                                            {`₱ ${(item.ingredientsDto.unitPrice * item.quantity).toFixed(2)}`}
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>

            <ReceiptDialog open={receipt} url={purchase.receiptURL} handleClose={() => setReceipt(false)} />
        </>
    )
}