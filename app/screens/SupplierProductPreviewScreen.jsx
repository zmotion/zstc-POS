import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import { useNavigation } from "@react-navigation/native";

export default function OrderPreviewScreen({ route }) {
  const order = route.params.order_details;
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (order && order.products) {
      setProducts(order.products);
    }
  }, [order]);

  let totalAmountSum = 0;

  if (products && products.length > 0) {
    // Calculate sum of total amounts for all orders
    totalAmountSum = products.reduce((sum, product) => {
      // Calculate total amount for the current product
      const productAmount = parseFloat(product.amount * product.weight || 0); // Assuming product.amount is a number

      // Add the product's amount to the overall sum
      return sum + productAmount;
    }, 0);
  }

  const approveProductHandler = () => {
    console.log("approve button pressed");
    Alert.alert("Order Submitted for payment");
    navigation.navigate("home");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f0f0f0", margin: 10 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          padding: 10,
        }}
      >
        {products && products.length > 0 ? (
          <ScrollView>
            {products.map((product, index) => (
              <View key={index}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Product: {product.product}
                </Text>
                <Text style={{ fontSize: 16 }}>Unit: {product.unit}</Text>
                <Text style={{ fontSize: 16 }}>
                  Quantity: {product.quantity}
                </Text>
                <Text style={{ fontSize: 16 }}>Weight: {product.weight}</Text>
                <Text style={{ fontSize: 16 }}>
                  Price: {parseFloat(product.amount || 0).toFixed(2)} Tsh
                </Text>
                <Text style={{ fontSize: 16 }}>
                  Subtotal:{" "}
                  {parseFloat(product.amount * product.weight || 0).toFixed(2)}{" "}
                  Tsh
                </Text>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc",
                    marginVertical: 10,
                  }}
                />
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text>No products available</Text>
        )}

        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Total amount: {totalAmountSum.toFixed(2)} Tsh
          </Text>
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
