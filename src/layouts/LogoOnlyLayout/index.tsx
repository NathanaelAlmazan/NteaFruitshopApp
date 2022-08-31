import React from "react"
import { Outlet } from "react-router-dom"

export default function LogoOnlyLayout() {
    return (
        <div>
            <div>LogoOnlyLayout</div>
            <Outlet />
        </div>
    )
}