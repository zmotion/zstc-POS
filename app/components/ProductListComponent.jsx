import { View, Text, FlatList } from "react-native";
import React from "react";

export default function ProductListComponent({ productList }) {
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
        className="mt-3"
        data={productList}
        renderItem={(itemData) => {
          return (
            <View className="flex-row justify-between border-b-2 border-gray-300 py-1">
              <Text className="flex-1 text-center font-large">
                {itemData.item.text.product}
              </Text>
              <Text className="flex-1 text-center font-large">{itemData.item.text.unit}</Text>
              <Text className="flex-1 text-center font-large">
                {itemData.item.text.quantity}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
