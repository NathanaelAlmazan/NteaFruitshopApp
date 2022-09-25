import React from 'react'
// mui
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import { useTheme } from '@mui/material/styles'
// project components
import { Header } from '../../components/PageHeaders'
import SalesChart from "../../sections/sales/SalesChart"
import TrendsChart from "../../sections/sales/TrendsChart"
import TransactionHistory from "../../sections/sales/TransactionHistory"
import { LoadingOverlay } from '../../components/SuspenseLoader'
// hooks
import { useQuery } from "../../custom-hooks"
// types
import { CustomerOrder, Product } from "../PointOfSale"

export default function SalesPage() {
  const { data: orders, loading, refetchData } = useQuery<CustomerOrder[]>("/order?additionalFields=items,product,prices")
  const { data: sales } = useQuery<DailySalesReport[]>("/order/statistics/sales")
  const { data: product } = useQuery<ProductTrend[]>("/order/statistics/product")
  const theme = useTheme()

  const handleRefreshTable = () => refetchData()

  return (
    <Container maxWidth="lg" sx={{ pb: 5 }}>
        <Header title='Sales History' />
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={8}>
                {sales && (
                    <SalesChart
                        title="Report"
                        subheader="Transactions' History every ten selling days"
                        chartLabels={sales.sort((a, b) => new Date(`${a.reportMonth}/${a.reportDate}/${a.reportYear}`).getTime() - new Date(`${b.reportMonth}/${b.reportDate}/${b.reportYear}`).getTime())
                            .map(s => `${s.reportMonth}/${s.reportDate}/${s.reportYear}`)}
                        chartData={[
                            {
                                name: 'Sales',
                                type: 'column',
                                fill: 'solid',
                                data: sales.sort((a, b) => new Date(`${a.reportMonth}/${a.reportDate}/${a.reportYear}`).getTime() - new Date(`${b.reportMonth}/${b.reportDate}/${b.reportYear}`).getTime())
                                    .map(s => s.totalSales),
                            },
                        ]}
                    />
                )}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                {product && (
                    <TrendsChart
                        title="Trends"
                        subheader="Top ten Most Selling Products"
                        chartData={product.sort((a, b) => b.totalSold - a.totalSold).slice(0, 10).map(p => ({ label: p.product.productCode, value: p.totalSold }))}
                        productNames={product.map(p => ({ code: p.product.productCode, name: p.product.productName }))}
                        chartColors={[
                            theme.palette.primary.main,
                            CHART_COLORS.blue[0],
                            CHART_COLORS.violet[0],
                            CHART_COLORS.yellow[0],
                            theme.palette.primary.dark,
                            CHART_COLORS.blue[2],
                            CHART_COLORS.red[0],
                            CHART_COLORS.violet[2],
                            CHART_COLORS.red[2],
                            CHART_COLORS.green[0],
                        ]}
                    />
                )}
            </Grid>
            <Grid item xs={12}>
                {orders && <TransactionHistory orderList={orders} onRefresh={handleRefreshTable} />}
            </Grid>
        </Grid>

        <LoadingOverlay open={loading} />
    </Container>
  )
}

const CHART_COLORS = {
    violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
    blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
    green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
    yellow: ['#FFC107', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
    red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
}

export interface DailySalesReport {
    reportYear: number,
    reportMonth: number,
    reportDate: number,
    totalSales: number
}

export interface ProductTrend {
    product: Product,
    totalSold: number
}