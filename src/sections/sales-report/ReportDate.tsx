import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
            fontSize: 12,
            fontStyle: 'bold',
    },
    label: {
        width: 60
    }
    
  });


  const InvoiceNo = ({ start, end }: { start: Date, end: Date }) => (
        <Fragment>
            <View style={styles.invoiceDateContainer}>
                <Text>Report Date:</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text>
                    {`${start.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })} — ${end.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}`}
                </Text>
            </View >
        </Fragment>
  );
  
  export default InvoiceNo