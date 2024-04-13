import { View, Text, FlatList } from "react-native";
import React from "react";

export default function ProductListComponent({ productList }) {
  // Render individual table rows
  const renderItem = ({ item }) => (
    <View className="flex-row justify-between border-b-2 border-gray-300 py-1">
      <Text className="flex-1 text-center font-large">{item.product}</Text>
      <Text className="flex-1 text-center font-large">{item.unit}</Text>
      <Text className="flex-1 text-center font-large">{item.quantity}</Text>
    </View>
  );

  return (
    <View className="mt-8">
      {/* Table Header */}
      <View className="flex-row justify-between border-b-2 border-gray-300 py-1">
        <Text className="flex-1 text-center font-bold text-lg">Product</Text>
        <Text className="flex-1 text-center font-bold text-lg">Unit</Text>
        <Text className="flex-1 text-center font-bold text-lg">Quantity</Text>
      </View>

      {/* FlatList to render table rows */}
      <FlatList
        data={productList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        className="mt-3"
      />
    </View>
  );
}
