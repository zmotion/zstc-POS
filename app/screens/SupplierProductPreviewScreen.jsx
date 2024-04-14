import { View, Text, SafeAreaView, FlatList, Button, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import axios from "axios";

export default function OrderPreviewScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:3000/former_order');
      setProducts(response.data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  // Calculate sum of total amounts for all orders
  const totalAmountSum = products.reduce((sum, order) => {
    // Calculate total amount for the current order
    const orderTotalAmount = order.products.reduce((orderSum, product) => {
      return orderSum + product.amount;
    }, 0);

    // Add the order's total amount to the overall sum
    return sum + orderTotalAmount;
  }, 0);

  const approveProductHandler = () => {
    console.log("approve button pressed");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-1">
      <HeaderComponent title="Order Preview" />

      <View className="flex-1 bg-white rounded-lg shadow-md p-2">
        { products.map((order, index) => (
          <View>
            <Text className="text-lg font-bold">Name:</Text>
            <Text className="text-lg">{order.former_name}</Text>

            <Text className="text-lg font-bold">Phone:</Text>
            <Text className="text-lg">{order.former_phone_number}</Text>

            <Text className="text-lg font-bold">Order number:</Text>
            <Text className="text-lg">{order.order_id}</Text>

            <View className="border border-gray-300 my-2"></View>

            {/* Table Header */}
            <View className="flex-row justify-between border-b-2 border-gray-300 py-1">
              <Text className="flex-1 font-bold text-lg">Product</Text>
              <Text className="flex-1 font-bold text-lg">Unit</Text>
              <Text className="flex-1 font-bold text-lg">Qty</Text>
              <Text className="flex-1 font-bold text-lg">Weight</Text>
              <Text className="flex-1 font-bold text-lg">Amount</Text>
            </View>

            <ScrollView>
            {/* FlatList to render table rows */}
            <FlatList
              className="mt-3"
              data={order.products}
              renderItem={(itemData, index) => {
                return (
                  <View className="flex-row justify-between border-b-2 border-gray-300 py-1">
                    <Text className="flex-1 text-lg mr-1">
                      {itemData.item.name}
                    </Text>
                    <Text className="flex-1 text-lg">{itemData.item.unit}</Text>
                    <Text className="flex-1 text-lg ">
                      {itemData.item.quantity}
                    </Text>
                    <Text className="flex-1 text-lg ">
                      {itemData.item.weight}
                    </Text>
                    <Text className="flex-1 text-lg ">
                      {itemData.item.amount}
                    </Text>
                  </View>
                );
              }}
              keyExtractor={(item, index) => {
                item.id.toString();
              }}
            />
            {/* Table Footer */}
            <View className="flex-row justify-between border-b-2 border-gray-300 py-1">
              <Text className="font-bold text-lg">Total amount</Text>
              <Text className="font-bold text-lg">Tsh {totalAmountSum}</Text>
            </View>
            </ScrollView>
          </View>
        ))}

        <View className="mt-3">
          <Button
            title="Approve"
            color="green"
            onPress={approveProductHandler}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
