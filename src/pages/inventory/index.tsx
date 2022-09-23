import React from 'react'
// mui
import Container from "@mui/material/Container"
import Card from "@mui/material/Card"
// project components
import { Header } from "../../components/PageHeaders"

const ItemPanel = React.lazy(() => import("../../sections/inventory"))

export default function InventoryPage() {
  return (
    <Container maxWidth="lg" sx={{ pb: 5 }}>
      <Header title="Inventory" />
      <Card><ItemPanel /></Card>
    </Container>
  )
}

export interface InventoryItem {
  itemId: number
  itemName: string
  brandName: string
  units: string
  inStock: number
  unitPrice: number
  lastUpdated: Date
}