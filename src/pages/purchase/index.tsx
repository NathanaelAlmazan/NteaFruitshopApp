import React, { useState } from 'react'
// mui
import Container from "@mui/material/Container"
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
// project components
import { HeaderButton } from "../../components/PageHeaders"
import { LoadingOverlay } from '../../components/SuspenseLoader'
import { useQuery } from "../../custom-hooks"
import { InventoryItem } from "../inventory"
import { TimelineColor } from '../../sections/purchase/DueDatesTimeline'

const PurchaseTable = React.lazy(() => import("../../sections/purchase/PurchaseTable"))
const PurchaseForm = React.lazy(() => import("../../sections/purchase/PurchaseForm"))
const PurchaseItemsChart = React.lazy(() => import("../../sections/purchase/PurchaseItemsChart"))
const DueDateTimeline = React.lazy(() => import("../../sections/purchase/DueDatesTimeline"))

const setDueDateSeverity = (dueDate: Date): TimelineColor => {
    const today = new Date().getTime()
    const due = dueDate.getTime()
    const diff = Math.floor((due - today)/(24*3600*1000))

    if (diff < 2) return "error"
    else if (diff < 7) return "warning"
    else if (diff < 14) return "secondary"
    else if (diff < 21) return "info"
    
    return "primary"
}

export default function PurchasePage() {
    const { data, loading, refetchData } = useQuery<PurchaseOrder[]>("/purchase?additionalFields=items,ingredient")
    const { data: itemsStatistics } = useQuery<ItemsStatistics[]>("/purchase/statistics/items")
    const { data: unpaidPurchases } = useQuery<DuePurchaseOrders[]>("/purchase/unpaid")
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

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={8}>
                    {itemsStatistics && (
                        <PurchaseItemsChart 
                            title="Purchased Items"
                            subheader="Top ten most purchased items"
                            chartData={itemsStatistics.map(i => ({ label: i.item.itemName, value: i.itemCount })).sort((a, b) => b.value - a.value)}
                        />
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    {unpaidPurchases && (
                        <DueDateTimeline 
                            title="Unpaid Orders"
                            subheader=''
                            list={unpaidPurchases.map(p => {
                                const order = p.purchaseOrder
                                const purchaseUid = `${Array(5 - order.purchaseId.toFixed(0).length).fill(0).map(() => "0").join("")}${order.purchaseId}`

                                return {
                                    title: `Order #${purchaseUid} from ${order.supplier}`,
                                    type: setDueDateSeverity(new Date(p.dueDate)),
                                    time: new Date(p.dueDate),
                                    amount: order.totalPrice
                                }
                            }).sort((a, b) => a.time.getTime() - b.time.getTime()).slice(0, 10)}
                        />
                    )}
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <PurchaseTable
                            orderList={data}
                            onRefresh={handleRefresh}
                        />
                    </Card>
                </Grid>
            </Grid>

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

export interface ItemsStatistics {
    item: InventoryItem,
    itemCount: number
}

export interface DuePurchaseOrders {
    purchaseOrder: PurchaseOrder,
    dueDate: Date
}