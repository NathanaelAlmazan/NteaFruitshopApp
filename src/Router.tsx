import React from 'react'
import { useRoutes, Navigate } from "react-router-dom"

// Layouts
import { PosLayout, DashboardLayout, LogoOnlyLayout } from "./layouts"
import { SuspenseLoader } from './components/SuspenseLoader'

//Pages
const PointOfSale = React.lazy(() => import("./pages/PointOfSale"))
const OfflinePage = React.lazy(() => import("./pages/Offline"))
const Products = React.lazy(() => import("./pages/products"))
const CreateProduct = React.lazy(() => import("./pages/products/create"))
const EditProduct = React.lazy(() => import("./pages/products/edit"))
const InventoryPage = React.lazy(() => import("./pages/inventory"))
const SalesPage = React.lazy(() => import("./pages/sales"))
const PurchasePage = React.lazy(() => import("./pages/purchase"))

export default function Router() {
    return useRoutes([
        {
            path: 'app',
            element: <PosLayout />,
            children: [
                { path: 'pos', element: <SuspenseLoader children={<PointOfSale />} /> },
            ]
        },
        {
            path: 'admin',
            element: <DashboardLayout />,
            children: [
                { path: 'products', element: <SuspenseLoader children={<Products />} /> },
                { path: 'products/create', element: <SuspenseLoader children={<CreateProduct />} /> },
                { path: 'products/edit/:code', element: <SuspenseLoader children={<EditProduct />} /> },
                { path: 'inventory', element: <SuspenseLoader children={<InventoryPage />} /> },
                { path: 'sales', element: <SuspenseLoader children={<SalesPage />} /> },
                { path: 'purchase', element: <SuspenseLoader children={<PurchasePage />} /> },
            ]
        },
        {
            path: '',
            element: <LogoOnlyLayout />,
            children: [
                { path: '/', element: <Navigate to="/app/pos" /> }
            ]
        },
        {
            path: 'error',
            element: <LogoOnlyLayout />,
            children: [
                { path: 'offline', element: <SuspenseLoader children={<OfflinePage />} /> },
            ]
        }
    ])
}