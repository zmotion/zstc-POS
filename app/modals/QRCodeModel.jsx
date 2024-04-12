import { View, Text } from 'react-native'
import React from 'react'
import {QRCode} from 'react-native-qrcode-svg'

export default function QRCodeScreen() {
  return (
    <View>
      <QRCode />
    </View>
  )
}