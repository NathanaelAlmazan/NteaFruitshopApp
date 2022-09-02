import React from 'react'
import { useRoutes, Navigate } from "react-router-dom"

// Layouts
import { PosLayout, LogoOnlyLayout } from "./layouts"
import { SuspenseLoader } from './components/SuspenseLoader'

//Pages
const PointOfSale = React.lazy(() => import("./pages/PointOfSale"))
const OfflinePage = React.lazy(() => import("./pages/Offline"))

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