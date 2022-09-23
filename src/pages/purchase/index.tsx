import React, { useState } from 'react'
// mui
import Container from "@mui/material/Container"
import Card from "@mui/material/Card"
// project components
import { HeaderButton } from "../../components/PageHeaders"
import { LoadingOverlay } from '../../components/SuspenseLoader'
import { useQuery } from "../../custom-hooks"
import { InventoryItem } from "../inventory"

const PurchaseTable = React.lazy(() => import("../../sections/purchase/PurchaseTable"))
const PurchaseForm = React.lazy(() => import("../../sections/purchase/PurchaseForm"))

export default function PurchasePage() {
    const { data, loading, refetchData } = useQuery<PurchaseOrder[]>("/purchase?additionalFields=items,ingredient")
    const [form, setForm] = useState<boolean>(false)

    const handleRecordPurchase = () => setForm(!form)
    const handleRefresh = () => refetchData()

    return (
        <Container maxWidth="lg" sx={{ pb: 5 }}>
            <HeaderButton 
                title="Purchase"
                buttonText="Record Purchase"
                buttonClick={handleRecordPurchase}
            />
            <Card>
                <PurchaseTable
                    orderList={data}
                    onRefresh={handleRefresh}
                />
            </Card>

            <PurchaseForm 
                open={form}
                handleClose={handleRecordPurchase}
                onRefresh={handleRefresh}
            />

            <LoadingOverlay open={loading} />
        </Container>
    )
}

export interface PurchaseOrder {
    purchaseId: number
    supplier: string,
    totalPrice: number,
    paid: boolean,
    arrived: boolean,
    receiptURL: string,
    dueDate: Date,
    purchaseDate: Date
    purchasedItems: PurchasedItems[]
}

export interface PurchasedItems {
    purchaseId?: number,
    itemId: number,
    quantity: number
    ingredientsDto?: InventoryItem
}