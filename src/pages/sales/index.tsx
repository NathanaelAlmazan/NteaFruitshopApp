import React from 'react'
// mui
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import { useTheme } from '@mui/material/styles'
import PrintIcon from '@mui/icons-material/Print';
// project components
import { HeaderButton } from '../../components/PageHeaders'
import SalesChart from "../../sections/sales/SalesChart"
import TrendsChart from "../../sections/sales/TrendsChart"
import TransactionHistory from "../../sections/sales/TransactionHistory"
import { LoadingOverlay } from '../../components/SuspenseLoader'
// hooks
import { useQuery } from "../../custom-hooks"
// types
import { CustomerOrder, Product } from "../PointOfSale"

const GenerateReportDialog = React.lazy(() => import("../../sections/sales/ReportGenDialog"))
const SalesReportDocument = React.lazy(() => import("../../sections/sales-report"))

export default function SalesPage() {
  const { data: orders, loading, refetchData } = useQuery<CustomerOrder[]>("/order?additionalFields=items,product,prices")
  const { data: sales } = useQuery<DailySalesReport[]>("/order/statistics/sales")
  const { data: product } = useQuery<ProductTrend[]>("/order/statistics/product")
  const { data: purchases } = useQuery<PurchaseReport[]>("/purchase/statistics/expenses")
  const [content, setContent] = React.useState<ChartData[]>([])
  const [pdfContent, setPdfContent] = React.useState<ChartData[]>([])
  const [page, setPage] = React.useState<number>(0)
  const [reportDialog, setReportDialog] = React.useState<boolean>(false)
  const [reportPdf, setReportPdf] = React.useState<boolean>(false)
  const theme = useTheme()

  React.useEffect(() => {
    if (sales && purchases) {
        let startIndex = 0;

        const data: ChartData[] = sales.map(s => ({ date: new Date(`${s.reportMonth}/${s.reportDate}/${s.reportYear}`), sales: s.totalSales, purchase: 0, profit: s.totalSales }))
        purchases.forEach((p, i) => {
            const purchaseDate = new Date(`${p.reportMonth}/${p.reportDate}/${p.reportYear}`)
            const index = data.findIndex(d => d.date.getTime() === purchaseDate.getTime())

            if (index !== -1) {
                data[index].purchase = p.totalPurchase
                data[index].profit = data[index].sales - p.totalPurchase
            }
            else {
                data.push({ date: purchaseDate, purchase: p.totalPurchase, sales: 0, profit: 0 - p.totalPurchase })
            }

            if (startIndex === 0) {
                const today = new Date()
                if (today.getMonth() === p.reportMonth && today.getFullYear() === p.reportYear) startIndex = i
            }
        })

        setContent(data.sort((a, b) => a.date.getTime() - b.date.getTime()))
        setPage(startIndex)
    }
  }, [sales, purchases])

  const handleRefreshTable = () => refetchData()

  const handleGenerateSalesReport = (start: Date, end: Date) => {
    setPdfContent(content.filter(s => s.date.getTime() >= start.getTime() && s.date.getTime() <= end.getTime()))
    setReportDialog(false)
    setReportPdf(true)
  }

  return (
    <Container maxWidth="lg" sx={{ pb: 5 }}>
        <HeaderButton 
            title='Sales History'
            buttonText="Print Report"
            buttonClick={() => setReportDialog(true)}
            icon={<PrintIcon fontSize='small' />}
        />
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={8}>
                <SalesChart
                    title="Report"
                    subheader="Transactions' History every selling days"
                    chartLabels={content.map(c => `${c.date.getMonth() + 1}/${c.date.getDate()}/${c.date.getFullYear()}`).slice(page, page + 7)}
                    page={page}
                    chartData={[
                        {
                            name: 'Profit',
                            type: 'column',
                            fill: 'solid',
                            data: content.map(c => c.profit).slice(page, page + 7),
                        },
                        {
                            name: 'Receivable',
                            type: 'column',
                            fill: 'solid',
                            data: content.map(c => c.sales).slice(page, page + 7),
                        },
                        {
                            name: 'Payable',
                            type: 'column',
                            fill: 'solid',
                            data: content.map(c => c.purchase).slice(page, page + 7),
                        },
                    ]}
                    onSeek={() => setPage(state => state + 1)}
                    onBack={() => setPage(state => state - 1)}
                    contentLength={content.length}
                />
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

        {reportDialog && (
            <GenerateReportDialog 
                open={reportDialog}
                handleClose={() => setReportDialog(false)}
                start={content[0].date.toISOString()}
                end={content[content.length - 1].date.toISOString()}
                handleSubmit={handleGenerateSalesReport}
            />
        )}

        {reportPdf && (
            <SalesReportDocument 
                open={reportPdf}
                handleClose={() => setReportPdf(false)}
                data={pdfContent}
            />
        )}

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

export interface ChartData { 
    date: Date, 
    purchase: number, 
    sales: number, 
    profit: number 
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

export interface PurchaseReport {
    reportYear: number,
    reportMonth: number,
    reportDate: number,
    totalPurchase: number
}