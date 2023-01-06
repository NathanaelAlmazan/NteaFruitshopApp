import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
   
    titleContainer:{
        flexDirection: 'row',
        marginTop: 5
    },
    reportTitle:{
        fontSize: 4,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
  });


  const InvoiceThankYouMsg = () => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>Thank you!</Text>
    </View>
  );
  
  export default InvoiceThankYouMsg