import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import ReportTableHead from './ReportTableHead'
import ReportRow from './ReportRow'
import InvoiceTableBlankSpace from './BlankSpaces'
import ReportTableFooter from './ReportTableFooter'
// types
import { ChartData } from "../../pages/sales"

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

  const ReportTable = ({ reports }: { reports: ChartData[] }) => (
    <View style={styles.tableContainer}>
        <ReportTableHead />
        <ReportRow items={reports} />
        <InvoiceTableBlankSpace rowsCount={reports.length > tableRowsCount ? 0 : tableRowsCount - reports.length} />
        <ReportTableFooter 
          cash={reports.map(r => r.cash).reduce((a, b) => a + b, 0)} 
          gcash={reports.map(r => r.gcash).reduce((a, b) => a + b, 0)}
          purchase={reports.map(r => r.purchase).reduce((a, b) => a + b, 0)} 
          profit={reports.map(r => r.profit).reduce((a, b) => a + b, 0)}
        />
    </View>
  );
  
  export default ReportTable