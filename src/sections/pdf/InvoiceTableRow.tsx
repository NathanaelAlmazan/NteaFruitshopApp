import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';
// types
import { CustomerOrderItem } from "../../pages/PointOfSale"

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 10,
        fontStyle: 'bold',
    },
    description: {
        width: '50%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right'
    },
    rate: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right'
    },
    amount: {
        width: '20%',
        textAlign: 'right'
    },
  });


const InvoiceTableRow = ({ items }: { items: CustomerOrderItem[] }) => {
    const rows = items.map( item => {
        const key = item.productCode + item.unitCode
        const unitPrice = item.product.unitPrices.find(u => u.unitType === item.unitCode).unitPrice
        const finalPrice = unitPrice - item.product.discountedPrice

        return (
            <View style={styles.row} key={key}>
                <Text style={styles.description}>{`${item.product.productName} (${item.unitCode.toUpperCase()})`}</Text>
                <Text style={styles.qty}>{item.quantity}</Text>
                <Text style={styles.rate}>{`P ${unitPrice.toFixed(2)}`}</Text>
                <Text style={styles.amount}>{`P ${(finalPrice * item.quantity).toFixed(2)}`}</Text>
            </View>
        )
        })

    return (<>{rows}</> )
};
  
export default InvoiceTableRow