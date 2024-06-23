import React, { useState } from "react";
import { View, Text, SafeAreaView, Button } from "react-native";
import ProductListComponent from "./ProductListComponent";
import { useNavigation } from "@react-navigation/native";
import HeaderComponent from "../components/HeaderComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SupplierProductScreen({ route }) {
  const navigation = useNavigation();
  const order = route.params.order_details;
  const [products, setProducts] = useState(
    route.params.order_details.products || []
  );

  const handleWeightUpdate = (productId, newWeight) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, weight: newWeight } : product
    );
    setProducts(updatedProducts);
  };

  const submitProductHandler = async () => {
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f0f0f0", padding: 8 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          borderRadius: 8,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
          margin: 8,
          padding: 12,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Name:</Text>
        <Text style={{ fontSize: 16 }}>{order.supplier_name}</Text>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Order Number:
          </Text>
          <Text style={{ fontSize: 16, marginLeft: 8 }}>
            {order.order_number}
          </Text>
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            marginVertical: 8,
          }}
        />

        <ProductListComponent
          productList={products}
          isWeight={true}
          onWeightUpdate={handleWeightUpdate}
        />

        <View style={{ marginTop: 20 }}>
          <Button title="Submit" color="green" onPress={submitProductHandler} />
        </View>
      </View>
    </SafeAreaView>
  );
}
