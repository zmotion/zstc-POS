import React, { useState, useEffect } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SunmiPrinter, { AlignValue } from "@heasy/react-native-sunmi-printer";

export default function SearchScreen() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isQRCodeModalVisible, setQRCodeModalVisible] = useState(false);
  const [qrData, setQrData] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("Tigo Pesa");
  const [orderTitle, setOrderTitle] = useState([]);
  const [newFarmer, setNewFarmer] = useState({ nin: "", name: "", phone: "" });

  const sampleData = [
    { id: 1, name: "Muhammad Ali", phone: "0771234567" },
    { id: 2, name: "Fatima Hassan", phone: "0771234568" },
    { id: 3, name: "Ibrahim Abdullah", phone: "0771234569" },
    { id: 4, name: "Said Ali", phone: "0771234570" },
  ];

  useEffect(() => {
    const storeDefaultFarmers = async () => {
      try {
        const storedFarmers = await AsyncStorage.getItem("farmers");
        if (!storedFarmers) {
          await AsyncStorage.setItem("farmers", JSON.stringify(sampleData));
          setData(sampleData);
          setFilteredData(sampleData);
        } else {
          const farmers = JSON.parse(storedFarmers);
          setData(farmers);
          setFilteredData(farmers);
        }
      } catch (error) {
        console.log(error);
      }
    };
    storeDefaultFarmers();
  }, []);

  const handleAddFarmer = () => {
    setModalVisible(true);
  };

  const handleSaveFarmer = async () => {
    const newId = data.length ? data[data.length - 1].id + 1 : 1;
    const updatedFarmers = [
      ...data,
      { id: newId, name: newFarmer.name, phone: newFarmer.phone },
    ];
    try {
      await AsyncStorage.setItem("farmers", JSON.stringify(updatedFarmers));
      setData(updatedFarmers);
      setFilteredData(updatedFarmers);
    } catch (error) {
      console.log(error);
    }
    setModalVisible(false);
    setNewFarmer({ nin: "", name: "", phone: "" });
  };

  const fetchFarmerName = async (nin) => {
    try {
      const response = await fetch("https://api.example.com/farmer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nin }),
      });
      const result = await response.json();
      if (result.name) {
        setNewFarmer({ ...newFarmer, name: result.name });
      } else {
        alert("Farmer not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async (value) => {
    const orderNumber = "2015112910";
    setQrData(orderNumber);
    setOrderTitle(value.name);
    setQRCodeModalVisible(true);

    try {
      const jsonValue = JSON.stringify({
        supplier_id: value.id,
        supplier_name: value.name,
        supplier_phone: value.phone,
      });

      await AsyncStorage.setItem(orderNumber, jsonValue);
    } catch (e) {
      console.log(e);
    }
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
    SunmiPrinter.printerText("Jina Kamili: " + orderTitle);
    SunmiPrinter.lineWrap(2);
    SunmiPrinter.printerText("Kumbu Na: " + qrData);
    SunmiPrinter.lineWrap(1);
    SunmiPrinter.printerText("Tarehe: 24/06/2024");
    SunmiPrinter.lineWrap(2);
    SunmiPrinter.printerText("CHAKE CHAKE STATION");
    SunmiPrinter.lineWrap(2);
    SunmiPrinter.printQRCode(qrData, 16, 1);
    SunmiPrinter.printBarCode(qrData, 4, 50, 250, 2);
    SunmiPrinter.lineWrap(3);
    SunmiPrinter.printerText("Asante kwa Kuuza Karafuu Zako ZSTC!");
    SunmiPrinter.lineWrap(5);
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setInput(text);
    } else {
      setFilteredData(data);
      setInput(text);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Farmers</Text>
        <TouchableOpacity onPress={handleAddFarmer} style={styles.addButton}>
          <Icon name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchBar}
        value={input}
        placeholder="Search Farmers"
        onChangeText={(text) => searchFilterFunction(text)}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => createOrder(item)}
          >
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>{item.phone}</Text>
          </TouchableOpacity>
        )}
      />
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Farmer</Text>
            <TextInput
              style={styles.input}
              placeholder="NIN"
              value={newFarmer.nin}
              onChangeText={(text) => {
                setNewFarmer({ ...newFarmer, nin: text });
                fetchFarmerName(text);
              }}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newFarmer.name}
              onChangeText={(text) =>
                setNewFarmer({ ...newFarmer, name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={newFarmer.phone}
              onChangeText={(text) =>
                setNewFarmer({ ...newFarmer, phone: text })
              }
              keyboardType="phone-pad"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleSaveFarmer}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={isQRCodeModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Order QR Code for {orderTitle}
            </Text>
            <QRCode value={qrData} size={200} />
            <Text style={styles.paymentMethodTitle}>
              Select Payment Method:
            </Text>
            <View style={styles.paymentMethodContainer}>
              <TouchableOpacity
                style={[
                  styles.paymentMethodButton,
                  selectedPaymentMethod === "Tigo Pesa" &&
                    styles.selectedPaymentMethod,
                ]}
                onPress={() => setSelectedPaymentMethod("Tigo Pesa")}
              >
                <Text style={styles.paymentMethodText}>Tigo Pesa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.paymentMethodButton,
                  selectedPaymentMethod === "Cash" &&
                    styles.selectedPaymentMethod,
                ]}
                onPress={() => setSelectedPaymentMethod("Cash")}
              >
                <Text style={styles.paymentMethodText}>Cash</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.paymentMethodButton,
                  selectedPaymentMethod === "Bank" &&
                    styles.selectedPaymentMethod,
                ]}
                onPress={() => setSelectedPaymentMethod("Bank")}
              >
                <Text style={styles.paymentMethodText}>Bank</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handlePrint}
              >
                <Text style={styles.buttonText}>Print</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setQRCodeModalVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#4CAF50",
  },
  headerText: {
    fontSize: 20,
    color: "#fff",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 50,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    margin: 20,
    borderRadius: 5,
    fontSize: 18,
    width: "90%",
    alignSelf: "center",
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  paymentMethodContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  paymentMethodTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  paymentMethodButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  selectedPaymentMethod: {
    backgroundColor: "#F4CB45",
  },
});
