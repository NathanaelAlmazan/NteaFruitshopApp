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
import { CustomerOrder } from "../PointOfSale"

export default function SalesPage() {
  const { data, loading } = useQuery<CustomerOrder[]>("/order?additionalFields=items,product,prices")
  const theme = useTheme()

  return (
    <Container maxWidth="lg" sx={{ pb: 5 }}>
        <Header title='Sales History' />
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={8}>
                <SalesChart
                title="Report"
                subheader="(+43%) than last year"
                chartLabels={[
                    '01/01/2003',
                    '02/01/2003',
                    '03/01/2003',
                    '04/01/2003',
                    '05/01/2003',
                    '06/01/2003',
                    '07/01/2003',
                    '08/01/2003',
                    '09/01/2003',
                    '10/01/2003',
                    '11/01/2003',
                ]}
                chartData={[
                    {
                    name: 'Profit',
                    type: 'column',
                    fill: 'solid',
                    data: [2300, 1100, 2200, 2700, 1300, 2200, 3700, 2100, 4400, 2200, 3000],
                    },
                    {
                    name: 'Sales',
                    type: 'area',
                    fill: 'gradient',
                    data: [4400, 5500, 4100, 6700, 2200, 4300, 2100, 4100, 5600, 2700, 4300],
                    },
                    {
                    name: 'Capital',
                    type: 'line',
                    fill: 'solid',
                    data: [3000, 2500, 3600, 3000, 4500, 3500, 6400, 5200, 5900, 3600, 3900],
                    },
                ]}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <TrendsChart
                    title="Trends"
                    subheader="Best Selling beverages"
                    chartData={[
                        { label: 'Okinawa Milktea', value: 4344 },
                        { label: 'Mango Shake', value: 5435 },
                        { label: 'Others', value: 1443 },
                        { label: 'Taro Milktea', value: 4443 },
                    ]}
                    chartColors={[
                        theme.palette.primary.main,
                        CHART_COLORS.blue[0],
                        CHART_COLORS.violet[0],
                        CHART_COLORS.yellow[0],
                    ]}
                />
            </Grid>
            <Grid item xs={12}>
                {data && <TransactionHistory orderList={data} />}
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