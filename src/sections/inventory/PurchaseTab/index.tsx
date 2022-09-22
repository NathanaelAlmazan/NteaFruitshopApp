import React, { useState } from 'react'
// project components
import PurchaseForm from './PurchaseForm'

const PurchaseTable = React.lazy(() => import("./PurchaseTable"))

export default function PurchaseTab() {
    const [form, setForm] = useState<boolean>(false)

    const handleRecordPurchase = () => setForm(!form)

    return (
        <>
            <PurchaseTable 
                onRecordClick={handleRecordPurchase}
            />

            <PurchaseForm 
                open={form}
                handleClose={handleRecordPurchase}
            />
        </>
    )
}