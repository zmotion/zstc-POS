import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Button,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function AddProductScreen({ route }) {
  const navigation = useNavigation();

  const product_data = [
    { id: 1, label: "GRADE I", value: "GRADE I", amount: 18000 },
    { id: 2, label: "GRADE II", value: "GRADE II", amount: 12000 },
    { id: 3, label: "GRADE III", value: "GRADE III", amount: 7500 },
    { id: 4, label: "MAKONYO", value: "MAKONYO", amount: 3500 },
  ];

  const unit_data = [
    { id: 1, label: "Bag", value: "Bag" },
    { id: 2, label: "Sack", value: "Sack" },
  ];

  const [selected_product, setSelectedProduct] = useState(null);
  const [selected_unit, setSelectedUnit] = useState("Sack");
  const [quantity, setQuantity] = useState("1");
  const [products, setProducts] = useState([]);

  const addProductHandler = () => {
    if (!quantity || !selected_product || !selected_unit) {
      Alert.alert("Error", "Please fill out all the fields.");
      return;
    }

    const selectedProductData = product_data.find(
      (product) => product.label === selected_product
    );

    if (!selectedProductData) {
      Alert.alert("Error", "Invalid product selected.");
      return;
    }

    const existingProduct = products.find(
      (product) =>
        product.product === selected_product && product.unit === selected_unit
    );

    if (existingProduct) {
      const updatedProducts = products.map((product) =>
        product.product === selected_product && product.unit === selected_unit
          ? { ...product, quantity: product.quantity + parseInt(quantity, 10) }
          : product
      );
      setProducts(updatedProducts);
    } else {
      const new_product = {
        id: Math.random().toString(),
        product: selected_product,
        unit: selected_unit,
        quantity: parseInt(quantity, 10),
        amount: parseFloat(selectedProductData.amount),
      };
      setProducts([...products, new_product]);
    }

    setQuantity("1");
  };

  const removeProductHandler = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
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

  const renderProductItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 5,
        backgroundColor: "#95C9C4",
        marginTop: 4,
        padding: 10,
      }}
    >
      <Text style={{ flex: 1, fontSize: 18, fontWeight: "600" }}>
        {item.product} - {item.unit}
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "600" }}>
        Qty: {item.quantity}
      </Text>
      <Icon
        name="remove-circle"
        size={24}
        color="red"
        onPress={() => removeProductHandler(item.id)}
      />
    </View>
  );

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
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            color: "green",
            marginBottom: 10,
          }}
        >
          {route.params.order_details.supplier_name} :{" "}
          {route.params.order_details.order_number}
        </Text>

        <View
          style={{ borderWidth: 1, borderColor: "#D1D5DB", marginVertical: 10 }}
        />

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Product :</Text>
          <Picker
            selectedValue={selected_product}
            onValueChange={(value) => setSelectedProduct(value)}
            style={{ fontSize: 18 }}
          >
            <Picker.Item label="Select" value={null} />
            {product_data.map((product) => (
              <Picker.Item
                key={product.id}
                label={product.label}
                value={product.value}
              />
            ))}
          </Picker>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Unit :</Text>
            <Picker
              selectedValue={selected_unit}
              onValueChange={(value) => setSelectedUnit(value)}
              style={{ fontSize: 18 }}
            >
              {unit_data.map((unit) => (
                <Picker.Item
                  key={unit.id}
                  label={unit.label}
                  value={unit.value}
                />
              ))}
            </Picker>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Quantity :</Text>
            <TextInput
              value={quantity}
              onChangeText={(text) => setQuantity(text)}
              keyboardType="numeric"
              placeholder="Enter quantity"
              style={{
                height: 40,
                borderColor: "#D1D5DB",
                borderWidth: 1,
                paddingHorizontal: 10,
                fontSize: 18,
                fontWeight: "bold",
              }}
            />
          </View>
        </View>

        <Button
          title="Add Product"
          onPress={addProductHandler}
          color="green"
          style={{ marginBottom: 10 }}
        />

        <View style={{ flex: 1, marginBottom: 10 }}>
          <FlatList
            data={products}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
          />
        </View>

        {products.length > 0 && (
          <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
            <Button
              title="Submit Order"
              onPress={saveOrderToDB}
              color="green"
              style={{ width: "50%", height: 50 }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
