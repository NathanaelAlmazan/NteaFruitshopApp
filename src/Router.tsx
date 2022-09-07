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