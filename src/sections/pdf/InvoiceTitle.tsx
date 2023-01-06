import React from 'react';
import {Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
   
    titleContainer:{
        flexDirection: 'row',
    },
    reportTitle:{
        color: '#61dafb',
        fontSize: 6,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    logo: {
        width: 10,
        height: 10
    }
  });


  const InvoiceTitle = ({ title }: { title: string }) => (
    <View style={styles.titleContainer}>
        <Image style={styles.logo} src="https://res.cloudinary.com/ddpqji6uq/image/upload/v1661866066/graphql_images/n_tea-logo_rntoqs.png" />
        <Text style={styles.reportTitle}>{title}</Text>
    </View>
  );
  
  export default InvoiceTitle