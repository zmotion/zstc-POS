import React, { useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Keyboard,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { farmers } from "../api/farmers_api";

export default function SearchScreen() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [qrData, setQrData] = useState("");
  const [order_title, setOrderTitle] = useState([]);

  // const sample_data = [
  //   { id: 1, name: "Muhammad Ali", phone: "+255771234567" },
  //   { id: 2, name: "Fatima Hassan", phone: "+255771234568" },
  //   { id: 3, name: "Ibrahim Abdullah", phone: "+255771234569" },
  // ];

  const handleAddSupplier = () => {
    console.log("Add Supplier button pressed");
    // Add your navigation logic here
  };

  const createOrder = async (value) => {
    const order_number = "2015112910";
    setQrData(order_number);
    setData([]);
    setModalVisible(true);
    setOrderTitle(value.name);

    try {
      const jsonValue = JSON.stringify({
        supplier_id: value.id,
        supplier_name: value.name,
        supplier_phone: value.phone_number,
      });

      await AsyncStorage.setItem(order_number, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePrint = () => {
    console.log("Print button pressed");
    // Add your print logic here
  };

  const onChangeText = async (text) => {
    setInput(text);
    //fetch the farmers from the api
    let token = await AsyncStorage.getItem('token');
    farmers(token).then((res) => {
        console.log(res.data);
        sample_data = res.data;
        // Simulating a fast search by filtering local data
        if (text.length > 0) {
          const filteredData = sample_data.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase())
          );
          setData(filteredData);
        } else {
          setData([]);
        }
      })
      .catch((error) => {
        return error.message;
      });
  };

  const getItemText = (item) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPhone}>{item.phone_number}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headTitle}>Search Suppliers</Text>

      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={onChangeText}
          value={input}
          style={styles.input}
          placeholder="Enter The Supplier Name"
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={handleAddSupplier} style={styles.addButton}>
          <Icon name="plus" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {input.length > 0 && data.length > 0 && (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => createOrder(item)}
              style={styles.itemButton}
            >
              {getItemText(item)}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{order_title}</Text>
          <QRCode
            value={qrData}
            size={250}
            ecl="LOW"
            bgColor="#4CAF50"
            fgColor="#ffffff"
          />
          <View style={styles.modalButtonContainer}>
            <Button title="Print Order" onPress={handlePrint} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  headTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  itemButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  itemContainer: {
    marginBottom: 5,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemPhone: {
    fontSize: 14,
    color: "#666",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  modalButtonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
