import { View, Text, SafeAreaView, FlatList, Button } from "react-native";
import React, { useState } from "react";
import AddProductComponent from "./../components/AddProductComponent";
import { useNavigation } from "@react-navigation/native";

export default function AddProductScreen() {
    const navigation = useNavigation();
  // Sample data for the table
  const data = [
    { id: "1", product: "Karafuu kavu", unit: "Bag", quantity: 5 },
    // Add more data as needed
  ];

  // Render individual table rows
  const renderItem = ({ item }) => (
    <View className="flex-row justify-between border-b-2 border-gray-300 py-1">
      <Text className="flex-1 text-center font-large">{item.product}</Text>
      <Text className="flex-1 text-center font-large">{item.unit}</Text>
      <Text className="flex-1 text-center font-large">{item.quantity}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-2">
      <View className="flex-1 bg-white rounded-lg shadow-md p-2">
        <Text className="text-lg">Abdul-razak Moh'd Abrah-man</Text>

        <View className="border border-gray-300 my-2"></View>

        <AddProductComponent />

        <View className="mt-8">
          {/* Table Header */}
          <View className="flex-row justify-between border-b-2 border-gray-300 py-1">
            <Text className="flex-1 text-center font-bold text-lg">
              Product
            </Text>
            <Text className="flex-1 text-center font-bold text-lg">Unit</Text>
            <Text className="flex-1 text-center font-bold text-lg">
              Quantity
            </Text>
          </View>

          {/* FlatList to render table rows */}
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            className="mt-3"
          />
        </View>

        <View className="flex-1 justify-end">
        <Button
          title="Submit"
          className="bg-green-300 mx-4 items-baseline flex-1"
          onPress={()=>{navigation.navigate('QRCodeScanner')}}
        />
        </View>
      </View>
    </SafeAreaView>
  );
}
