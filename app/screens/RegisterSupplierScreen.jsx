import { View, Text, SafeAreaView, TextInput, Button } from "react-native";
import React from "react";

export default function RegisterSupplierScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-5">
      <View className="flex-1 bg-white rounded-lg shadow-md p-4 mb-4">
        <Text className="text-lg pb-1">Name</Text>
        <TextInput
          placeholder="Enter name"
          className="py-2 border border-gray-300 px-4 mb-2"
        />

        <Text className="text-lg pb-1">Phone Number</Text>
        <TextInput
          placeholder="Enter phone number"
          className="py-2 border border-gray-300 px-4 mb-2"
        />

        <Button title="Save" className="bg-blue-300 mx-4" />
      </View>
    </SafeAreaView>
  );
}
