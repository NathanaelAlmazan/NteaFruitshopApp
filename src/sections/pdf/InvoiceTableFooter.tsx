import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 10,
        fontSize: 5,
        fontStyle: 'bold',
    },
    description: {
        width: '80%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1
    },
    total: {
        width: '20%',
        textAlign: 'right'
    },
  });


const InvoiceTableFooter = ({ total, paid, discount }: { total: number, paid: number, discount: number }) => {
    return(    
        <>
            <View style={styles.row}>
                <Text style={styles.description}>TOTAL AMOUNT</Text>
                <Text style={styles.total}>{"P " + (total + discount).toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.description}>DISCOUNT</Text>
                <Text style={styles.total}>{"P " + discount.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.description}>AMOUNT DUE</Text>
                <Text style={styles.total}>{"P " + total.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.description}>PAID AMOUNT</Text>
                <Text style={styles.total}>{paid ? "P " + paid.toFixed(2) : total.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.description}>CHANGE</Text>
                <Text style={styles.total}>{paid ? "P " + (paid - total).toFixed(2) : 0.00}</Text>
            </View>
        </>
    )
};
  
  export default InvoiceTableFooter