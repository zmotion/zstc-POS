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
import SunmiPrinter, { AlignValue } from "@heasy/react-native-sunmi-printer";

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

  const formatMoney = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const approveProductHandler = () => {
    handlePrint();
    Alert.alert("Order Submitted for payment");
    navigation.navigate("home");
  };

  const handlePrint = () => {
    SunmiPrinter.setAlignment(AlignValue.CENTER);
    SunmiPrinter.setFontSize(27);
    SunmiPrinter.lineWrap(1);
    SunmiPrinter.printBitmap(
      "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",
      250
    );
    SunmiPrinter.lineWrap(1);
    SunmiPrinter.printerText("Jina Kamili: " + order.supplier_name);
    SunmiPrinter.lineWrap(2);
    SunmiPrinter.printerText("Kumbu Na: " + order.order_number);
    SunmiPrinter.lineWrap(1);
    SunmiPrinter.printerText("Tarehe: 24/06/2024");
    SunmiPrinter.lineWrap(2);
    SunmiPrinter.printerText("CHAKE CHAKE STATION");
    SunmiPrinter.lineWrap(2);
    SunmiPrinter.printerText("-UHAKIKI WA MAUZO-");
    SunmiPrinter.lineWrap(2);
    products.forEach(async (product) => {
      SunmiPrinter.setAlignment(AlignValue.LEFT);

      SunmiPrinter.setFontSize(25);
      SunmiPrinter.printerText(`Bidhaa: ${product.product}\n`);

      SunmiPrinter.setFontSize(23);
      SunmiPrinter.printerText(`Kipimo: ${product.unit}\n`);

      SunmiPrinter.printerText(`Idadi: ${product.quantity}\n`);

      SunmiPrinter.printerText(`Uzito: ${product.weight} kg\n`);

      const price = parseFloat(product.amount || 0).toFixed(2);
      SunmiPrinter.printerText(`Bei Kwa Kilo: ${formatMoney(price)} Tsh\n`);

      const subtotal = parseFloat(product.amount * product.weight || 0).toFixed(
        2
      );
      SunmiPrinter.printerText(`Jumla Ndogo: ${formatMoney(subtotal)} Tsh\n`);

      SunmiPrinter.printerText("-------------------------------\n");
    });
    SunmiPrinter.lineWrap(2);
    SunmiPrinter.printerText(
      `Jumla Kuu: ${formatMoney(totalAmountSum.toFixed(2))} Tsh\n`
    );
    SunmiPrinter.lineWrap(2);
    SunmiPrinter.printerText("Asante kwa Kuuza Karafuu Zako ZSTC!");
    SunmiPrinter.lineWrap(5);
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
                  Price:{" "}
                  {formatMoney(parseFloat(product.amount || 0).toFixed(2))} Tsh
                </Text>
                <Text style={{ fontSize: 16 }}>
                  Subtotal:{" "}
                  {formatMoney(
                    parseFloat(product.amount * product.weight || 0).toFixed(2)
                  )}{" "}
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
            Total amount: {formatMoney(totalAmountSum.toFixed(2))} Tsh
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
