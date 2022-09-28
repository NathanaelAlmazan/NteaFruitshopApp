import React from 'react'
// mui
import Container from "@mui/material/Container"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
// project components
import { Header } from "../../components/PageHeaders"
import { useQuery } from '../../custom-hooks'
import SalesChart from "../../sections/sales/SalesChart"

const ItemPanel = React.lazy(() => import("../../sections/inventory"))

interface ChartProps {
  id: number
  name: string,
  units: string,
  data: number[]
}

const dateToString = (date: Date): string => {
  return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
}

export default function InventoryPage() {
  const { data: itemGraph } = useQuery<InventoryReport[]>("/ingredients/graph")
  const [chartLabels, setChartLabels] = React.useState<string[]>([])
  const [chartData, setChartData] = React.useState<ChartProps[]>([])
  const [chartDate, setChartDate] = React.useState<Date>(new Date())
  const [units, setUnits] = React.useState<string[]>([])
  const [page, setPage] = React.useState<number>(0)

  React.useEffect(() => {
    if (itemGraph) {
      const unitList: string[] = []
    
      itemGraph.forEach(g => {
        if (!unitList.includes(g.item.units)) unitList.push(g.item.units)
      })

      setUnits(unitList)
    }
  }, [itemGraph])

  React.useEffect(() => {
    if (itemGraph) {
      const current = new Date(itemGraph[0].timestamp)
      setChartDate(current)
      current.setDate(current.getDate() + 3)
      const labels: string[] = []

      for (let i = 0; i < 10; i++) {
        labels.push(dateToString(current))

        current.setDate(current.getDate() - 3)
      }

      setChartLabels(labels.sort((a, b) => new Date(a).getTime() - new Date(b).getTime()))
    }
  }, [itemGraph])

  React.useEffect(() => {
    if (itemGraph) {
      const data: ChartProps[] = []

      for (let i = 0; i < chartLabels.length - 1; i++) {
        const date = new Date(chartLabels[i])
        const nextDate = new Date(chartLabels[i + 1])
        const filteredGraphs = itemGraph.filter(g => new Date(g.timestamp).getTime() >= date.getTime() && new Date(g.timestamp).getTime() <= nextDate.getTime())

        filteredGraphs.forEach(g => {
          const index = data.findIndex(d => d.id === g.item.itemId)

          if (index !== -1) {
            data[index].data.fill(g.reportedQuantity, i, chartLabels.length)
          } else {
            const array: number[] = Array(chartLabels.length).fill(0)
            data.push({
              id: g.item.itemId,
              name: g.item.itemName,
              units: g.item.units,
              data: array.fill(g.reportedQuantity, i, chartLabels.length)
            })
          }
        })
      }

      setChartData(data)
    }
  }, [chartLabels, itemGraph])

  return (
    <Container maxWidth="lg" sx={{ pb: 5 }}>
      <Header title="Inventory" />
      <Stack spacing={2}>
        <SalesChart
          title="Inventory Items"
          subheader={`Items' quantity in (${units[page]}) for the entire month of ${chartDate.toLocaleDateString(undefined, { month: 'long' })}`}
          chartLabels={chartLabels}
          page={page}
          chartData={chartData.filter(c => c.units === units[page]).map(d => ({ name: d.name, data: d.data, type: "area", fill: "gradient" }))}
          onSeek={() => setPage(state => state + 1)}
          onBack={() => setPage(state => state - 1)}
          contentLength={units.length - 1}
          inventory={units[page]}
        />

        <Card><ItemPanel /></Card>
      </Stack>
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

export interface InventoryReport {
  reportId: number,
  reportedQuantity: number,
  item: InventoryItem
  timestamp: Date
}