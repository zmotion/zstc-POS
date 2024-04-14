import { View, Text } from 'react-native'
import React from 'react'

export default function HeaderComponent({title}) {
  return (
    <View className="my-5">
      <Text className="text-xl font-bold text-center">{title}</Text>
    </View>
  )
}