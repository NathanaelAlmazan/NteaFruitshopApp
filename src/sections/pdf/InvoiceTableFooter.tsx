import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    description: {
        width: '85%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    total: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });


const InvoiceTableFooter = ({ total, paid, discounted }: { total: number, paid: number, discounted: boolean }) => {
    return(    
        <>
            <View style={styles.row}>
                <Text style={styles.description}>TOTAL AMOUNT</Text>
                <Text style={styles.total}>{total.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.description}>DISCOUNT</Text>
                <Text style={styles.total}>{discounted ? "20%" : "0%"}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.description}>PAID AMOUNT</Text>
                <Text style={styles.total}>{paid ? paid.toFixed(2) : total.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.description}>CHANGE</Text>
                <Text style={styles.total}>{paid ? (paid - total).toFixed(2) : 0.00}</Text>
            </View>
        </>
    )
};
  
  export default InvoiceTableFooter