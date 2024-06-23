import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import WeightEntryModal from "../modals/WeightEntryModal";
import BluetoothManager from "../components/BluetoothManager";
import { useBluetooth } from "../context/BluetoothContext";

export default function ProductListComponent({
  productList,
  isWeight,
  onWeightUpdate,
  onProductRemove,
}) {
  const [weights, setWeights] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalWeights, setModalWeights] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { currentWeight } = useBluetooth();

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

  const openWeightModal = (product) => {
    setSelectedProduct(product);
    setModalWeights([]);
    setModalVisible(true);
  };

  const saveWeight = (totalWeight) => {
    if (selectedProduct) {
      handleWeightChange(selectedProduct.id, totalWeight);
      setModalVisible(false);
      setSelectedProduct(null);
    }
  };

  const addWeight = (weight) => {
    setModalWeights((prevWeights) => [...prevWeights, weight]);
  };

  return (
    <View style={{ marginTop: 8 }}>
      <BluetoothManager />

      <WeightEntryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={saveWeight}
        weights={modalWeights}
        addWeight={addWeight}
        currentWeight={currentWeight}
      />

      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Product</Text>
        <Text style={styles.headerText}>Unit</Text>
        <Text style={styles.headerText}>Qty</Text>
        {isWeight && <Text style={styles.headerText}>Kg</Text>}
      </View>

      <FlatList
        style={{ marginTop: 8 }}
        data={productList}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>{item.product}</Text>
            <Text style={styles.itemText}>{item.unit}</Text>
            <Text style={styles.itemText}>{item.quantity}</Text>
            {isWeight ? (
              <TouchableOpacity
                style={styles.weightButton}
                onPress={() => openWeightModal(item)}
              >
                <Text style={styles.weightButtonText}>
                  {weights[item.id] ? weights[item.id] : "Enter"}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => removeProductHandler(item.id)}
                style={styles.removeButton}
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

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
  weightButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  weightButtonText: {
    fontSize: 18,
    color: "green",
    fontWeight: "700",
    paddingLeft: 20,
  },
  removeButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
