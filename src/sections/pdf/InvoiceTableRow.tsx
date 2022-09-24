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
        height: 24,
        fontStyle: 'bold',
    },
    description: {
        width: '60%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '10%',
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
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
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
                <Text style={styles.rate}>{`PHP ${unitPrice.toFixed(2)}`}</Text>
                <Text style={styles.amount}>{`PHP ${(finalPrice * item.quantity).toFixed(2)}`}</Text>
            </View>
        )
        })

    return (<>{rows}</> )
};
  
export default InvoiceTableRow