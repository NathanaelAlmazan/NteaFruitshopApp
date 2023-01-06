import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '35%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    amount: {
        width: '20%'
    },
  });

  const ReportTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.description}>Report Date</Text>
        <Text style={styles.qty}>Cash</Text>
        <Text style={styles.qty}>GCash</Text>
        <Text style={styles.rate}>Payable</Text>
        <Text style={styles.amount}>Profit</Text>
    </View>
  );
  
  export default ReportTableHeader