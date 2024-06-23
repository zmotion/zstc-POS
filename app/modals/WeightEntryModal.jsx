import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";

const WeightEntryModal = ({
  visible,
  onClose,
  onSave,
  weights,
  addWeight,
  currentWeight,
}) => {
  const [inputWeight, setInputWeight] = useState("");

  useEffect(() => {
    if (visible) {
      setInputWeight(currentWeight?.toString() || "");
    }
  }, [visible, currentWeight]);

  const saveWeights = () => {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    onSave(totalWeight);
    setInputWeight("");
  };

  const handleInputChange = (value) => {
    setInputWeight(value);
  };

  const handleAddWeight = () => {
    const weight = parseFloat(inputWeight);
    if (!isNaN(weight)) {
      addWeight(weight);
      setInputWeight(""); // Clear input field after adding weight
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.weightItemContainer}>
      <Text style={styles.weightItem}>{item.toFixed(2)} Kg</Text>
    </View>
  );

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Enter Weights</Text>
          <FlatList
            data={weights}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.weightList}
          />
          <View style={styles.totalSumContainer}>
            <Text style={styles.totalSumText}>
              Total:{" "}
              {weights.reduce((sum, weight) => sum + weight, 0).toFixed(2)} Kg
            </Text>
          </View>
          <TextInput
            style={styles.input}
            editable={false}
            keyboardType="numeric"
            value={inputWeight}
            onChangeText={handleInputChange}
            placeholder="Enter weight"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddWeight}>
            <Text style={styles.addButtonText}>Add Weight</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={saveWeights}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 350,
    padding: 30,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 15,
  },
  weightList: {
    width: "100%",
    marginVertical: 15,
  },
  weightItemContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  weightItem: {
    fontSize: 18,
  },
  totalSumContainer: {
    alignItems: "flex-end",
    marginTop: 10,
  },
  totalSumText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 15,
    fontSize: 20,
    color: "green",
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    marginRight: 10,
    flex: 1,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default WeightEntryModal;
