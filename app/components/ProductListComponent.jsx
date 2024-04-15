import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ProductListComponent({
  productList,
  isWeight,
  onWeightUpdate,
  onProductRemove,
}) {
  const [weights, setWeights] = useState({});

  const handleWeightChange = (productId, newWeight) => {
    setWeights({ ...weights, [productId]: newWeight });
    if (onWeightUpdate) {
      onWeightUpdate(productId, newWeight);
    }
  };

  const removeProductHandler = (productId) => {
    if (onProductRemove) {
      onProductRemove(productId);
    }
  };

  return (
    <View style={{ marginTop: 8 }}>
      {/* Table Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomWidth: 2,
          borderBottomColor: "#ccc",
          paddingVertical: 8,
        }}
      >
        <Text style={{ flex: 1, fontWeight: "bold", fontSize: 16 }}>
          Product
        </Text>
        <Text style={{ flex: 1, fontWeight: "bold", fontSize: 16 }}>Unit</Text>
        <Text style={{ flex: 1, fontWeight: "bold", fontSize: 16 }}>Qty</Text>
        {isWeight && (
          <Text
            style={{
              flex: 1,
              fontWeight: "bold",
              fontSize: 16,
              paddingLeft: 20,
            }}
          >
            Kg
          </Text>
        )}
      </View>

      {/* FlatList to render table rows */}
      <FlatList
        style={{ marginTop: 8 }}
        data={productList}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 2,
              borderBottomColor: "#ccc",
              paddingVertical: 8,
            }}
          >
            <Text style={{ flex: 1, fontSize: 16 }}>{item.product}</Text>
            <Text style={{ flex: 1, fontSize: 16 }}>{item.unit}</Text>
            <Text style={{ flex: 1, fontSize: 16 }}>{item.quantity}</Text>
            {isWeight ? (
              <TextInput
                style={{ flex: 1, fontSize: 16, paddingLeft: 20 }}
                keyboardType="numeric"
                placeholder="Enter"
                value={item.weight}
                onChangeText={(value) => handleWeightChange(item.id, value)}
              />
            ) : (
              <TouchableOpacity
                onPress={() => removeProductHandler(item.id)}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
