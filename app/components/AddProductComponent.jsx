import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";

export default function AddProductComponent() {
  const products = [
    { id: 1, label: "Karafuu kavu", value: "karafuu kavu" },
    { id: 1, label: "karafuu mbichi", value: "karafuu mbichi" },
    { id: 1, label: "karafuu kati na kati", value: "karafuu kati na kati" },
  ];
  const [selected_product, set_selected_product] = useState("");

  const units = [
    { id: 1, label: "Bag", value: "Bag" },
    { id: 1, label: "Piece", value: "Piece" },
  ];
  const [selected_unit, set_selected_unit] = useState("");

  const handleAddProduct = () => {
    console.log("App product is pressed");
  };

  return (
    <View>
      <Text className="text-lg font-bold">Product :</Text>
      <RNPickerSelect
        placeholder={{ label: "Select", value: null }}
        onValueChange={(value) => set_selected_product(value)}
        items={products}
        className="py-2 border border-gray-300"
      />

      <View className="flex-row">
        <View className="flex-1">
          <Text className="text-lg font-bold">Unit :</Text>
          <RNPickerSelect
            placeholder={{ label: "Select", value: null }}
            onValueChange={(value) => set_selected_unit(value)}
            items={units}
            style={styles.pickerSelectStyles}
          />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold">Quantity :</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Enter number"
            className="py-2 border border-gray-300 px-4 mb-2"
          />
        </View>
      </View>

      <Button
        title="Add"
        className="bg-blue-300 mx-4"
        onPress={handleAddProduct}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pickerSelectStyles: {
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#cccccc',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: '#cccccc',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  },
});
