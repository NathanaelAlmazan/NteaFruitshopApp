import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader'
import InvoiceTableRow from './InvoiceTableRow'
import InvoiceTableBlankSpace from './InvoiceBlankSpaces'
import InvoiceTableFooter from './InvoiceTableFooter'
// types
import { CustomerOrder } from "../../pages/PointOfSale"

const tableRowsCount = 11;

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#bff0fd',
    },
});

  const InvoiceItemsTable = ({ invoice }: { invoice: CustomerOrder }) => (
    <View style={styles.tableContainer}>
        <InvoiceTableHeader />
        <InvoiceTableRow items={invoice.orderItems} />
        <InvoiceTableBlankSpace rowsCount={ tableRowsCount - invoice.orderItems.length} />
        <InvoiceTableFooter total={invoice.totalAmount} />
    </View>
  );
  
  export default InvoiceItemsTable