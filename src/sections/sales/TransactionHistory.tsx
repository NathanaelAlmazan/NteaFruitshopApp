import React, { useEffect, useState } from 'react'
import { filter } from 'lodash';
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination'
import Card from '@mui/material/Card'
// project components
import OrderListToolbar from "./OrderListToolbar"
import OrderListHead from "./OrderListHead"
import SearchNotFound from '../../components/SearchNotFound';
import TransactionRow from "./TransactionRow"
// hooks
import { useMutation } from '../../custom-hooks';
// types
import { CustomerOrder } from '../../pages/PointOfSale'

const TABLE_HEAD = [
    { id: 'orderId', label: 'UID', alignRight: false },
    { id: 'totalAmount', label: 'Total Amount', alignRight: false },
    { id: 'timestamp', label: 'Timestamp', alignRight: false },
    { id: 'paymentType', label: 'Payment Type', alignRight: false },
    { id: 'cancelled', label: "Status", alignRight: false },
    { id: 'orderItems', label: "Ordered Items", alignRight: true },
    { id: '', label: '', alignRight: true },
];

interface TransactionHistoryProps {
    orderList: CustomerOrder[]
    onRefresh: () => void
}

function descendingComparator(a: CustomerOrder, b: CustomerOrder, orderBy: string) {
    const key = orderBy as keyof typeof a;
    const x = key !== "timestamp" ? a[key] : new Date(a[key])
    const y = key !== "timestamp" ? b[key] : new Date(b[key])

    if (y < x) return -1
    if (y > x) return 1
    return 0;
}

function getComparator(a: CustomerOrder, b: CustomerOrder, order: 'asc' | 'desc', orderBy: string) {
    return order === 'desc'
      ? descendingComparator(a, b, orderBy)
      : -descendingComparator(a, b, orderBy);
}

function applySortFilter(array: CustomerOrder[], orderType: 'asc' | 'desc', orderBy: string, query: string) {
    const stabilizedThis = array.map((el, index) => ({ el, index }));
    stabilizedThis.sort((a, b) => {
      const order = getComparator(a.el, b.el, orderType, orderBy);
      if (order !== 0) return order;
      return a.index - b.index;
    });

    if (query) {
      return filter(array, (_order) => _order.orderId.toString().indexOf(query) !== -1);
    }

    return stabilizedThis.map((el) => el.el);
}

const FILTER_BY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'cash', label: 'Cash' },
  { value: 'gcash', label: 'GCash' },
  { value: 'cancelled', label: 'Cancelled' }
];

export default function TransactionHistory({ orderList, onRefresh }: TransactionHistoryProps) {
  const { update, data } = useMutation<CustomerOrder>()
  const [filter, setFilter] = useState<string>("all")
  const [filteredOrders, setFilteredOrders] = useState<CustomerOrder[]>(orderList)
  const [displayedOrders, setDisplayedOrders] = useState<CustomerOrder[]>([])
  const [page, setPage] = useState<number>(0)
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('date');
  const [filterName, setFilterName] = useState<string>('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [emptyRows, setEmptyRows] = useState<number>(0);

  useEffect(() => {
    if (orderList) {
        const sorted = applySortFilter(orderList, order, orderBy, filterName)
        
        switch (filter) {
            case "cash":
              setFilteredOrders(sorted.filter(s => s.paymentType === 'CASH'));
              break;
            case "gcash":
              setFilteredOrders(sorted.filter(s => s.paymentType === "GCASH"));
              break;
            case "cancelled":
              setFilteredOrders(sorted.filter(s => s.cancelled));
              break;
            default:
              setFilteredOrders(sorted);
        }
    }
}, [orderList, order, orderBy, filter, filterName])

  useEffect(() => {
    setDisplayedOrders(filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
    setEmptyRows(page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredOrders.length) : 0)
  }, [filteredOrders, page, rowsPerPage])

  useEffect(() => {
    if (data) onRefresh()
  }, [data])

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, page: number) => setPage(page)

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  };

  const handleRequestSort = (property: string) => {
    if (property !== 'orderItems') {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => setFilterName(event.target.value)

  const handleSetCancelled = (order: CustomerOrder) => {
    order.cancelled = true
    update("/order", JSON.stringify(order))
  }

  return (
    <Card>
        <OrderListToolbar 
          filterName={filterName} 
          options={FILTER_BY_OPTIONS}
          filter={filter}
          filterSelected={(value) => setFilter(value)}
          onFilterName={handleFilterByName} 
        />

        <TableContainer sx={{ minWidth: 800 }}>
            <Table>
                <OrderListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    onRequestSort={handleRequestSort}
                />
                <TableBody>
                    {displayedOrders.map((row) => (
                        <TransactionRow key={row.orderId} order={row} onCancel={() => handleSetCancelled(row)} />
                    ))}
                    {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                    </TableRow>
                    )}
                </TableBody>

                {filteredOrders.length === 0 && (
                    <TableBody>
                        <TableRow>
                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                <SearchNotFound searchQuery={filterName} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                )}
            </Table>
        </TableContainer>

        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredOrders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
    </Card>
  )
}