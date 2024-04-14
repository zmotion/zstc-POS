import {
  View,
  Text,
  SafeAreaView,
  Button,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import ProductListComponent from "../components/ProductListComponent";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";

export default function AddProductScreen() {
  const navigation = useNavigation();
  // List
  const product_data = [
    { id: 1, label: "Karafuu kavu", value: "karafuu kavu" },
    { id: 1, label: "karafuu mbichi", value: "karafuu mbichi" },
    { id: 1, label: "karafuu kati na kati", value: "karafuu kati na kati" },
  ];
  const unit_data = [
    { id: 1, label: "Bag", value: "Bag" },
    { id: 1, label: "Piece", value: "Piece" },
  ];

  // Variable
  const [selected_product, setSelectedProduct] = useState(null);
  const [selected_unit, setSelectedUnit] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [products, setProducts] = useState([]);

  const addProductHandler = () => {
    if (!quantity || !selected_product || !selected_unit) {
      alert("Please fill out all the fields.");
      return;
    }
    //create new product
    const new_product = {
      id: Math.random.toString(),
      product: selected_product,
      unit: selected_unit,
      quantity: parseInt(quantity, 10),
    };

    //add new product to product list
    setProducts([...products, new_product]);

    // Show an alert to indicate successful addition
    Alert.alert('Success', 'New product added successfully!');
    

    // Reset form fields after adding the product
    // setSelectedProduct(null);
    // setSelectedUnit(null);
    // setQuantity("");
  };

  submitProductHandler = () => {
    console.log(products);
    // navigation.navigate("QRCodeScanner");
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-2">
      <View className="flex-1 bg-white rounded-lg shadow-md p-2">
        <Text className="text-xl">Abdul-razak Moh'd Abrah-man</Text>

        <View className="border border-gray-300 my-2"></View>

        <View>
          <Text className="text-xl font-bold">Product :</Text>
          <RNPickerSelect
            placeholder={{ label: "Select", value: null }}
            onValueChange={(value) => setSelectedProduct(value)}
            items={product_data}
          />

          <View className="flex-row">
            <View className="flex-1">
              <Text className="text-xl font-bold">Unit :</Text>
              <RNPickerSelect
                placeholder={{ label: "Select", value: null }}
                onValueChange={(value) => setSelectedUnit(value)}
                items={unit_data}
              />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold">Quantity :</Text>
              <TextInput
                value={quantity}
                onChangeText={(text) => setQuantity(text)}
                keyboardType="numeric"
                placeholder="Enter number"
                className="py-2 border border-gray-300 px-4 mb-2"
              />
            </View>
          </View>

          <Button
            title="Add"
            className="bg-blue-300 mx-4"
            onPress={ addProductHandler }
          />
        </View>

        { products.length > 0 ? (
          <View>
            <ProductListComponent productList={products} />
            
            <View className="my-2">
              <Button
                title="Submit"
                color="green"
                onPress={submitProductHandler}
              />
            </View>
          </View>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-red-700 text-lg">No products added yet</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
