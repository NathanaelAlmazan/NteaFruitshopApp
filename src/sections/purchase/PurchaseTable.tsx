import React, { useEffect, useState } from 'react'
// mui
import { filter } from 'lodash';
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination'
// project components
import PurchaseLstToolbar from "./ListToolbar"
import PurchaseListHead from "../inventory/ItemListHead"
import PurchaseRow from "./PurchaseRow"
// types
import { PurchaseOrder } from "../../pages/purchase"
import { useMutation } from '../../custom-hooks';

const SearchNotFound = React.lazy(() => import('../../components/SearchNotFound'))
const CustomSnackbar = React.lazy(() => import('../../components/Snackbar'))

const TABLE_HEAD = [
    { id: 'purchaseId', label: 'Purchase ID', alignRight: false },
    { id: 'suplier', label: 'Supplier', alignRight: false },
    { id: 'totalPrice', label: 'Total Price', alignRight: false },
    { id: 'paid', label: "Paid", alignRight: true },
    { id: 'arrived', label: "Arrived", alignRight: true },
    { id: 'purchaseDate', label: "Purchase Date", alignRight: true },
    { id: '', label: 'Actions', alignRight: true },
];
interface PurchaseTableProps { 
    orderList: PurchaseOrder[] 
    onRefresh: () => void
}

function descendingComparator(a: PurchaseOrder, b: PurchaseOrder, orderBy: string) {
    const key = orderBy as keyof typeof a;
    const x = key !== "purchaseDate" ? a[key] : new Date(a[key])
    const y = key !== "purchaseDate" ? b[key] : new Date(b[key])

    if (y < x) return -1
    if (y > x) return 1
    return 0;
}

function getComparator(a: PurchaseOrder, b: PurchaseOrder, order: 'asc' | 'desc', orderBy: string) {
    return order === 'desc'
      ? descendingComparator(a, b, orderBy)
      : -descendingComparator(a, b, orderBy);
}

function applySortFilter(array: PurchaseOrder[], orderType: 'asc' | 'desc', orderBy: string, query: string) {
    const stabilizedThis = array.map((el, index) => ({ el, index }));
    stabilizedThis.sort((a, b) => {
      const order = getComparator(a.el, b.el, orderType, orderBy);
      if (order !== 0) return order;
      return a.index - b.index;
    });

    if (query) {
      return filter(array, (_item) => _item.purchaseId.toString().indexOf(query) !== -1);
    }

    return stabilizedThis.map((el) => el.el);
}

const FILTER_BY_OPTIONS = [
    { value: 'all', label: 'All' },
    { value: 'paid', label: 'Paid' },
    { value: 'unpaid', label: 'Unpaid' },
    { value: 'arrived', label: 'Arrived' },
    { value: 'shipping', label: 'Shipping' }
  ];

export default function PurchaseTable({ orderList, onRefresh }: PurchaseTableProps) {
    const { update, remove, error } = useMutation<PurchaseOrder>()
    const [filter, setFilter] = useState<string>("all")
    const [filterName, setFilterName] = useState<string>("")
    const [filteredItems, setFilteredItems] = useState<PurchaseOrder[]>([])
    const [selected, setSelected] = useState<number[]>([]);
    const [page, setPage] = useState<number>(0)
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<string>('date');
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [emptyRows, setEmptyRows] = useState<number>(0);
    const [snackbar, setSnackbar] = useState<boolean>(false);

    useEffect(() => {
        if (orderList) {
            const sorted = applySortFilter(orderList, order, orderBy, filterName)
            
            switch (filter) {
                case "paid":
                    setFilteredItems(sorted.filter(s => s.paid));
                    break;
                case "unpaid":
                    setFilteredItems(sorted.filter(s => !s.paid));
                    break;
                case "arrived":
                    setFilteredItems(sorted.filter(s => s.arrived));
                    break;
                case "shipping":
                    setFilteredItems(sorted.filter(s => !s.arrived));
                    break;
                default:
                    setFilteredItems(sorted);
            }
        }
    }, [orderList, order, orderBy, filter, filterName])

    useEffect(() => {
        setEmptyRows(page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredItems.length) : 0)
    }, [filteredItems, page, rowsPerPage])

    useEffect(() => {
        if (error) setSnackbar(true)
    }, [error])

    const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => setFilterName(event.target.value)

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, page: number) => setPage(page)

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          const newSelecteds = filteredItems.map((n) => n.purchaseId);
          setSelected(newSelecteds);
          return;
        }
        setSelected([]);
    };

    const handleClick = (id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: number[] = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        setSelected(newSelected);
    };

    const handleUpdatePurchase = (purchase: PurchaseOrder) => {
        update("/purchase", JSON.stringify(purchase))
        onRefresh()
    }

    const handleDeletePurchase = (id: number) => {
        remove(`/purchase/${id}`)
        onRefresh()
    }

    return (
        <>
            <PurchaseLstToolbar 
                label="Search purchase..."
                options={FILTER_BY_OPTIONS}
                filter={filter}
                filterSelected={(value) => setFilter(value)}
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterName} 
            />

            <TableContainer>
                <Table
                    sx={{ minWidth: 800 }}
                    aria-labelledby="tableTitle"
                    size="medium"
                >
                    <PurchaseListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={filteredItems.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                        {filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                            <PurchaseRow 
                                key={row.purchaseId}
                                purchase={row} 
                                isItemSelected={isSelected(row.purchaseId)} 
                                handleClick={() => handleClick(row.purchaseId)} 
                                handleUpdate={handleUpdatePurchase}
                                handleDelete={() => handleDeletePurchase(row.purchaseId)}
                            />
                        ))}

                        {emptyRows > 0 && (
                            <TableRow
                            style={{
                                height: 53 * emptyRows,
                            }}
                            >
                            <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>

                    {filteredItems.length === 0 && (
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" colSpan={7} sx={{ py: 3 }}>
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
                count={filteredItems.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <CustomSnackbar 
                open={snackbar}
                message={error ? error.errors[0] : ""}
                type="error"
                handleClose={() => setSnackbar(false)}
            />
        </>
    )
}