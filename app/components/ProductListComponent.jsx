import { View, Text, FlatList, TextInput, Button, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from "react";

export default function ProductListComponent({ productList, is_weight = null }) {
  
  const [weight, setWeight] = useState(null)

  const removeProductHandler = (index) => {
    console.log('delete btn pressed! ');
    // navigation.navigate("QRCodeScanner");
  }

  return (
    <View className="mt-8">
      {/* Table Header */}
      <View className="flex-row justify-between border-b-2 border-gray-300 py-1">
        <Text className="flex-1 font-bold text-lg">Product</Text>
        <Text className="flex-1 font-bold text-lg">Unit</Text>
        <Text className="flex-1 font-bold text-lg">Qty</Text>
        {is_weight == true ? (
          <View>
            <Text className="flex-1 font-bold text-lg pl-6">Kg</Text>
          </View>
        ) : (
          <View></View>
        )}
      </View>

      {/* FlatList to render table rows */}
      <FlatList
        className="mt-3"
        data={productList}
        renderItem={(itemData, index) => {
          return (
            <View className="flex-row justify-between border-b-2 border-gray-300 py-1">
              <Text className="flex-1 text-lg mr-1">
                {itemData.item.product}
              </Text>
              <Text className="flex-1 text-lg">
                {itemData.item.unit }
              </Text>
              <Text className="flex-1 text-lg ">
                {itemData.item.quantity}
              </Text>
              {is_weight == true ? (
                <View>
                  <TextInput className="text-lg " keyboardType="numeric" placeholder="Enter" />
                </View>
              ) : (
                <View>
                  <TouchableOpacity onPress={() => removeProductHandler(index)} className="bg-red-600 p-1">
                    <Icon name="trash" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        }}
        keyExtractor={(item, index) => {
          item.id.toString();
        }}
      />
    </View>
  );
}
