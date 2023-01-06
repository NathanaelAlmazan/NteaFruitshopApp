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
        fontSize: 5,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        lineHeight: 1.5,
        flexDirection: 'column',
    }
  });
  
const Invoice = ({ invoice }: { invoice: CustomerOrder }) => (
            <Document>
                <Page size="C8" style={styles.page}>
                    <InvoiceTitle title="N'Tea Fruitshop" />
                    <InvoiceNo invoice={invoice}/>
                    <InvoiceItemsTable invoice={invoice} />
                    <InvoiceThankYouMsg />
                </Page>
            </Document>
        );
  
  export default Invoice