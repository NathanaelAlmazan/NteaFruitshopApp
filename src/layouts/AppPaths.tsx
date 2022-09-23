import React from 'react';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined'
import SellIcon from '@mui/icons-material/Sell'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const appPaths = [
    {
        title: "Point of Sale",
        pathname: "/app/pos",
        icon: <PointOfSaleOutlinedIcon />
    },
    {
        title: "Products",
        pathname: "/admin/products",
        icon: <SellIcon />
    },
    {
        title: "Sales",
        pathname: "/admin/sales",
        icon: <LocalMallIcon />
    },
    {
        title: "Inventory",
        pathname: "/admin/inventory",
        icon: <Inventory2Icon />
    },
    {
        title: "Purchase",
        pathname: "/admin/purchase",
        icon: <ReceiptLongIcon />
    }
]

export default appPaths