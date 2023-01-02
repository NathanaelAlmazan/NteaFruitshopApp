import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';
// types
import { ChartData } from "../../pages/sales"

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    description: {
        width: '35%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    amount: {
        width: '20%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });


const InvoiceTableRow = ({ items }: { items: ChartData[] }) => {
    const rows = items.map( item => (
            <View style={styles.row} key={item.date.toISOString()}>
                <Text style={styles.description}>{item.date.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                <Text style={styles.qty}>{`P${item.cash.toFixed(2)}`}</Text>
                <Text style={styles.qty}>{`P${item.gcash.toFixed(2)}`}</Text>
                <Text style={styles.rate}>{`P${item.purchase.toFixed(2)}`}</Text>
                <Text style={styles.amount}>{`P${item.profit.toFixed(2)}`}</Text>
            </View>
        ))

    return (<>{rows}</> )
};
  
export default InvoiceTableRow