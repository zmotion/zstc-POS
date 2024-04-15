import React, { useState } from "react";
import { View, Text, SafeAreaView, Button, TextInput } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductListComponent from "../components/ProductListComponent";
import { useNavigation } from "@react-navigation/native";

export default function AddProductScreen({ route }) {
  const navigation = useNavigation();

  const product_data = [
    { id: 1, label: "GRADE I", value: "GRADE I", amount: 18000 },
    { id: 2, label: "GRADE II", value: "GRADE II", amount: 12000 },
    { id: 3, label: "GRADE II", value: "GRADE III", amount: 7500 },
    { id: 4, label: "MAKONYO", value: "MAKONYO", amount: 3500 },
  ];

  const unit_data = [
    { id: 1, label: "Bag", value: "Bag" },
    { id: 2, label: "Piece", value: "Piece" },
  ];

  const [selected_product, setSelectedProduct] = useState(null);
  const [selected_unit, setSelectedUnit] = useState("Bag");
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(0);
  const [products, setProducts] = useState([]);

  const addProductHandler = () => {
    if (!quantity || !selected_product || !selected_unit) {
      alert("Please fill out all the fields.");
      return;
    }

    const selectedProductData = product_data.find(
      (product) => product.label === selected_product
    );

    if (!selectedProductData) {
      alert("Invalid product selected.");
      return;
    }

    const new_product = {
      id: Math.random().toString(),
      product: selected_product,
      unit: selected_unit,
      quantity: parseInt(quantity, 10),
      amount: parseFloat(selectedProductData.amount),
    };

    console.log("collected", selected_product);

    setProducts([...products, new_product]);
    setQuantity("");
  };

  const saveOrderToDB = async () => {
    try {
      const order_number = route.params.order_details.order_number;
      const order_detail = {
        ...route.params.order_details,
        products: products,
      };

      await AsyncStorage.setItem(order_number, JSON.stringify(order_detail));
      navigation.navigate("home");
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Failed to save order to database.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E5E7EB", padding: 10 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          borderRadius: 10,
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            color: "green",
          }}
        >
          {route.params.order_details.supplier_name} :{" "}
          {route.params.order_details.order_number}
        </Text>

        <View
          style={{ borderWidth: 1, borderColor: "#D1D5DB", marginVertical: 10 }}
        />

        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Product :</Text>
          <RNPickerSelect
            placeholder={{ label: "Select", value: null }}
            onValueChange={(value) => setSelectedProduct(value)}
            items={product_data}
          />

          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Unit :</Text>
              <RNPickerSelect
                placeholder={{ label: "Select", value: null }}
                onValueChange={(value) => setSelectedUnit(value)}
                items={unit_data}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Quantity :
              </Text>
              <TextInput
                value={quantity}
                onChangeText={(text) => setQuantity(text)}
                keyboardType="numeric"
                placeholder="Enter number"
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderWidth: 1,
                  borderColor: "#D1D5DB",
                  marginBottom: 10,
                }}
              />
            </View>
          </View>

          <Button title="Add" onPress={addProductHandler} />
        </View>

        {products.length > 0 ? (
          <View>
            <ProductListComponent productList={products} isWeight={false} />
            <View style={{ marginVertical: 10 }}>
              <Button title="Submit" color="green" onPress={saveOrderToDB} />
            </View>
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 18, color: "red" }}>
              No products added yet
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
