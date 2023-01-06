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
        width: '100%',
        fontSize: 12,
        fontStyle: 'bold',
    },
    description: {
        width: '70%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    total: {
        width: '30%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });



const ReportTableFooter = ({ cash, gcash, purchase, profit }: { cash: number, gcash: number, purchase: number, profit: number }) => {
    return(    
        <>
            <View style={styles.row}>
                <Text style={styles.description}>TOTAL CASH</Text>
                <Text style={styles.total}>{`PHP ${cash.toFixed(2)}`}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.description}>TOTAL GCASH</Text>
                <Text style={styles.total}>{`PHP ${gcash.toFixed(2)}`}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.description}>TOTAL PAYABLE</Text>
                <Text style={styles.total}>{`PHP ${purchase.toFixed(2)}`}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.description}>TOTAL REVENUE</Text>
                <Text style={styles.total}>{`PHP ${profit.toFixed(2)}`}</Text>
            </View>
        </>
    )
};
  
  export default ReportTableFooter