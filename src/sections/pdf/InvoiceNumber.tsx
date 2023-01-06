import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';
// types
import { CustomerOrder } from "../../pages/PointOfSale"

const styles = StyleSheet.create({
    invoiceNoContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
            fontSize: 5,
            fontStyle: 'bold',
    },
    label: {
        width: 30
    }
    
  });


  const InvoiceNo = ({ invoice }: { invoice: CustomerOrder }) => (
        <Fragment>
            <View style={styles.invoiceNoContainer}>
                <Text style={styles.label}>Invoice No:</Text>
                <Text style={styles.invoiceDate}>{`${Array(5 - invoice.orderId.toFixed(0).length).fill(0).map(() => "0").join("")}${invoice.orderId}`}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.label}>Date:</Text>
                <Text>{new Date(invoice.timestamp).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
            </View >
        </Fragment>
  );
  
  export default InvoiceNo