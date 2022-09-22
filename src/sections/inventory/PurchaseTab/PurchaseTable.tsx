import React, { useState } from 'react'
// project components
import PurchaseLstToolbar from "../ListToolbar"

interface PurchaseTableProps {
    onRecordClick: () => void
}

export default function PurchaseTable({ onRecordClick }: PurchaseTableProps) {
    const [filterName, setFilterName] = useState<string>("")

    const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => setFilterName(event.target.value)

    return (
        <>
            <PurchaseLstToolbar 
                label="Search item..."
                numSelected={0}
                filterName={filterName}
                onFilterName={handleFilterName} 
                onAddClick={onRecordClick} 
            />
        </>
    )
}