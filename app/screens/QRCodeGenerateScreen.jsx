import { StyleSheet, Text, View } from 'react-native'
import { SPrinter, Constants } from '@makgabri/react-native-sunmi-printer';
import React from 'react'
import QrCodePage from '../components/QRCodeComponent';

export default function QRCodeGenerateScreen() {
  // await SPrinter.connect();
  return (
    <View style={{con}}>
      <Text>QRCodeGenerateScreen</Text>
      <QrCodePage />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})