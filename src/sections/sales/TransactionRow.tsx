import React from 'react'
// mui
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableBody from "@mui/material/TableBody"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Avatar from "@mui/material/Avatar"
import AvatarGroup from "@mui/material/AvatarGroup"
import Collapse from "@mui/material/Collapse"
import Box from "@mui/material/Box"
import OrderMoreMenu from "./OrderMoreMenu"
// types
import { CustomerOrder } from '../../pages/PointOfSale'

export default function TransactionRow({ order }: { order: CustomerOrder }) {
  const { orderId, paymentType, timestamp, totalAmount, orderItems, transactionId } = order;
  const orderUid = `${Array(5 - orderId.toFixed(0).length).fill(0).map(() => "0").join("")}${orderId}`
  const orderDate = new Date(timestamp).toLocaleString()

  const [open, setOpen] = React.useState<boolean>(false)

  return (
    <>
        <TableRow hover>
            <TableCell component="th" scope="row">
                <Typography variant="subtitle2" noWrap>
                    {`${orderUid}`}
                </Typography>
            </TableCell>
            <TableCell align="left">{`₱ ${totalAmount.toFixed(2)}`}</TableCell>
            <TableCell align="left">
                <Stack>
                    <Typography variant="subtitle2" noWrap>
                        {new Date(orderDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
                    </Typography>
                    <Typography variant="body2" noWrap>
                        {orderDate.split(", ")[1]}
                    </Typography>
                </Stack>
            </TableCell>
            <TableCell align="left">
                <Stack>
                    <Typography variant="subtitle2" noWrap>
                        {paymentType}
                    </Typography>
                    <Typography variant="body2" noWrap>
                        {paymentType === "CASH" ? "" : `Ref. ${transactionId}`}
                    </Typography>
                </Stack>
            </TableCell>
            <TableCell align="left">
                <AvatarGroup max={4}>
                    {orderItems.map(item => (
                        <Avatar key={item.productCode + item.unitCode} alt={item.productCode} src={item.product.productImage} />
                    ))}
                </AvatarGroup>
            </TableCell>
            <TableCell align="right">
                <OrderMoreMenu collapsed={open} handleViewDetails={() => setOpen(!open)} />
            </TableCell>
        </TableRow>
        <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Unit Type</TableCell>
                    <TableCell align="right">Unit Price</TableCell>
                    <TableCell align="right">Total price (₱)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderItems.map(item => {
                    const key = item.productCode + item.unitCode
                    const unitPrice = item.product.unitPrices.find(u => u.unitType === item.unitCode).unitPrice
                    const finalPrice = unitPrice - item.product.discountedPrice
                    
                    return (
                        <TableRow key={key}>
                            <TableCell component="th" scope="row">
                                {item.product.productName}
                            </TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">{item.unitCode.toUpperCase()}</TableCell>
                            <TableCell align="right">{`₱ ${unitPrice.toFixed(2)}`}</TableCell>
                            <TableCell align="right">
                                {`₱ ${(finalPrice * item.quantity).toFixed(2)}`}
                            </TableCell>
                        </TableRow>
                  )})}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}