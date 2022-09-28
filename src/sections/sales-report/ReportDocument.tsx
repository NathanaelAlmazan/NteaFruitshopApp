import React from 'react';
import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import InvoiceTitle from '../pdf/InvoiceTitle'
import ReportDate from './ReportDate'
import ReportTable from './ReportTable'
// types
import { ChartData } from "../../pages/sales"

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    }
  });
  
const Report = ({ reports }: { reports: ChartData[] }) => (
            <Document>
                <Page size="A4" style={styles.page}>
                    <InvoiceTitle title="Sales Report" />
                    <ReportDate start={reports[0].date} end={reports[reports.length - 1].date} />
                    <ReportTable reports={reports} />
                </Page>
            </Document>
        );
  
export default Report