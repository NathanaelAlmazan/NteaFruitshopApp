import React, { useState, useEffect } from 'react'
// mui
import { filter } from 'lodash';
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// project components
import ItemListHead from "./ItemListHead"
import ItemListToolbar from "./ListToolbar"
import SearchNotFound from '../../components/SearchNotFound';
// types 
import { InventoryItem } from '../../pages/inventory';

const TABLE_HEAD = [
    { id: 'itemName', label: 'Item Name', alignRight: false },
    { id: 'brandName', label: 'Supplier', alignRight: false },
    { id: 'inStock', label: 'In Stock', alignRight: true },
    { id: 'unitPrice', label: "Unit Price", alignRight: true },
    { id: 'lastUpdated', label: "Last Updated", alignRight: true },
    { id: '', label: 'Actions', alignRight: true },
];

interface ItemTableProps { 
    itemList: InventoryItem[] 
    onAddClick: () => void
    onEditClick: (item: InventoryItem) => void
    onDeleteClick: (id: number) => void
}

function descendingComparator(a: InventoryItem, b: InventoryItem, orderBy: string) {
    const key = orderBy as keyof typeof a;
    const x = key !== "lastUpdated" ? a[key] : new Date(a[key])
    const y = key !== "lastUpdated" ? b[key] : new Date(b[key])

    if (y < x) return -1
    if (y > x) return 1
    return 0;
}

function getComparator(a: InventoryItem, b: InventoryItem, order: 'asc' | 'desc', orderBy: string) {
    return order === 'desc'
      ? descendingComparator(a, b, orderBy)
      : -descendingComparator(a, b, orderBy);
}

function applySortFilter(array: InventoryItem[], orderType: 'asc' | 'desc', orderBy: string, query: string) {
    const stabilizedThis = array.map((el, index) => ({ el, index }));
    stabilizedThis.sort((a, b) => {
      const order = getComparator(a.el, b.el, orderType, orderBy);
      if (order !== 0) return order;
      return a.index - b.index;
    });

    if (query) {
      return filter(array, (_item) => _item.itemName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }

    return stabilizedThis.map((el) => el.el);
}

export default function ItemTable({ itemList, onAddClick, onEditClick, onDeleteClick }: ItemTableProps) {
    const [filteredItems, setFilteredItems] = useState<InventoryItem[]>(itemList)
    const [displayedItems, setDisplayedItems] = useState<InventoryItem[]>([])
    const [selected, setSelected] = useState<number[]>([]);
    const [filterName, setFilterName] = useState<string>("")
    const [page, setPage] = useState<number>(0)
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<string>('date');
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [emptyRows, setEmptyRows] = useState<number>(0);

    useEffect(() => {
        if (itemList) setFilteredItems(applySortFilter(itemList, order, orderBy, filterName))
    }, [itemList, order, orderBy, filterName])

    useEffect(() => {
        setDisplayedItems(filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
        setEmptyRows(page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredItems.length) : 0)
    }, [filteredItems, page, rowsPerPage])

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, page: number) => setPage(page)

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
    };

    const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => setFilterName(event.target.value)
  
    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          const newSelecteds = filteredItems.map((n) => n.itemId);
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
    

    return (
        <>
            <ItemListToolbar 
                label="Search item..."
                buttonLabel="Add Item"
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterName} 
                onAddClick={onAddClick} 
            />
            <TableContainer>
                <Table
                    sx={{ minWidth: 800 }}
                    aria-labelledby="tableTitle"
                    size="medium"
                >
                    <ItemListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={filteredItems.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                    rows.slice().sort(getComparator(order, orderBy)) */}
                    {displayedItems.map((row, index) => {
                        const isItemSelected = isSelected(row.itemId);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.itemId}
                                    selected={isItemSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            onChange={() => handleClick(row.itemId)}
                                            checked={isItemSelected}
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                    >
                                        <Typography variant="subtitle2" noWrap>
                                            {row.itemName}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left">{row.brandName}</TableCell>
                                    <TableCell align="right">{`${row.inStock} ${row.units}`}</TableCell>
                                    <TableCell align="right">{`₱ ${row.unitPrice.toFixed(2)}`}</TableCell>
                                    <TableCell align="right">
                                        {new Date(row.lastUpdated).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Stack direction="row" justifyContent="flex-end">
                                            <Tooltip title="Edit">
                                                <IconButton onClick={() => onEditClick(row)}>
                                                    <ModeEditOutlineOutlinedIcon color="info" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton onClick={() => onDeleteClick(row.itemId)}>
                                                    <DeleteOutlineOutlinedIcon color="error" />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            );
                        })}

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
        </>
    )
}
