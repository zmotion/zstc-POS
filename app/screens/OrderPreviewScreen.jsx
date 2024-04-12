import { View, Text, SafeAreaView } from "react-native";
import React from "react";

export default function AddProductScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-1">
      <View className="flex-1 bg-white rounded-lg shadow-md p-2">
        <Text className="text-lg font-bold">Name:</Text>
        <Text className="text-lg">Abdul-razak Moh'd Abrah-man</Text>

        <Text className="text-lg font-bold">Phone:</Text>
        <Text className="text-lg">+255778210175</Text>

        <View className="border border-gray-300 my-2"></View>
      </View>
    </SafeAreaView>
  );
}