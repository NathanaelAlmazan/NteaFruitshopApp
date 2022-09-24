import React from 'react';
import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import InvoiceTitle from './InvoiceTitle'
import InvoiceNo from './InvoiceNumber'
import InvoiceItemsTable from './InvoiceItemsTable'
import InvoiceThankYouMsg from './InvoiceMessage'
// types
import { CustomerOrder } from "../../pages/PointOfSale"

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
  
const Invoice = ({ invoice }: { invoice: CustomerOrder }) => (
            <Document>
                <Page size="A4" style={styles.page}>
                    <InvoiceTitle title="N'Tea Fruitshop" />
                    <InvoiceNo invoice={invoice}/>
                    <InvoiceItemsTable invoice={invoice} />
                    <InvoiceThankYouMsg />
                </Page>
            </Document>
        );
  
  export default Invoice