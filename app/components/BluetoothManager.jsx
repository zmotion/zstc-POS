import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { useBluetooth } from "../context/BluetoothContext";

const BluetoothManager = () => {
  const { connectedDevice, devices, isScanning, startScan, connectDevice } =
    useBluetooth();
  const [modalVisible, setModalVisible] = useState(false);

  // Effect to close the modal when a device is connected
  useEffect(() => {
    if (connectedDevice) {
      setModalVisible(false);
    }
  }, [connectedDevice]);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {connectedDevice
            ? `Connected to ${connectedDevice.name || connectedDevice.id}`
            : "Scale Not Connected"}
        </Text>
        {!connectedDevice && (
          <Button title="Link Scale" onPress={() => setModalVisible(true)} />
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Button title="Scan for Scale Devices" onPress={startScan} />
            {isScanning && <Text>Scanning...</Text>}
            {devices.length === 0 ? (
              <Text>No scale devices found</Text>
            ) : (
              <FlatList
                data={devices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => connectDevice(item)}
                    style={styles.deviceItem}
                  >
                    <Text>{item.name || "Unnamed Device"}</Text>
                    <Text>{item.id}</Text>
                  </TouchableOpacity>
                )}
                style={styles.deviceList}
              />
            )}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  deviceItem: {
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 5,
  },
  deviceList: {
    width: "100%",
    marginTop: 10,
  },
});

export default BluetoothManager;
