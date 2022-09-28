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
        width: '40%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    total: {
        width: '20%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });


const ReportTableFooter = ({ sales, purchase, profit }: { sales: number, purchase: number, profit: number }) => {
    return(    
        <View style={styles.row}>
            <Text style={styles.description}>TOTAL</Text>
            <Text style={styles.total}>{`PHP ${sales.toFixed(2)}`}</Text>
            <Text style={styles.total}>{`PHP ${purchase.toFixed(2)}`}</Text>
            <Text style={styles.total}>{`PHP ${profit.toFixed(2)}`}</Text>
        </View>
    )
};
  
  export default ReportTableFooter