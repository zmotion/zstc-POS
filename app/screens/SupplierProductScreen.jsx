import { View, Text, SafeAreaView, Button } from "react-native";
import { useState } from "react";
import ProductListComponent from "../components/ProductListComponent";
import { useNavigation } from "@react-navigation/native";
import HeaderComponent from "../components/HeaderComponent";

export default function SupplierProductScreen() {
  const navigation = useNavigation();
  const [orders, setOrder] = useState([
    {
      order_id: "u1c1" + Math.random().toString(),
      supplier_name: "Abdul-razak Mohd Abrah-man",
      products: [
        { id: 1, product: "karafuu kavu", unit: "bag", quantity: 3 },
        { id: 2, product: "karafuu mbichi", unit: "bag", quantity: 5 },
        { id: 3, product: "karafuu grade 3", unit: "bag", quantity: 7 },
      ],
    },
  ]);
  const [products, setProducts] = useState([]);

  function submitProductHandler() {
    console.log("submit button pressed");

    // navigation.navigate("supplierProductPreview");
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-1">
      <HeaderComponent title="Supplier Product" />

      <View className="flex-1 bg-white rounded-lg shadow-md p-2">
        {orders.map((order, index) => (
          <View>
            <Text className="text-lg font-bold">Name:</Text>
            <Text className="text-lg">{order.supplier_name}</Text>

            <View className="flex-row">
              <Text className="flex-1/2 text-lg font-bold">Order Number :</Text>
              <Text className="flex-1 text-lg ml-2">{order.order_id}</Text>
            </View>

            <View className="border border-gray-300 my-2"></View>

            <ProductListComponent
              productList={order.products}
              is_weight={true}
            />

            <View className="mt-3">
              <Button
                title="Submit"
                color="green"
                onPress={submitProductHandler}
              />
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
