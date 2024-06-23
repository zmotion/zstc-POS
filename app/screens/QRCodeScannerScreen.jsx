import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Permissions } from "expo";

export default function QRCodeScannerScreen({ route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  const [orderData, setOrderData] = useState(null);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (scanned && orderData) {
      console.log("order data", orderData);

      if (route.params.next === "Grading") {
        navigation.navigate("addProduct", { order_details: orderData });
      }
      if (route.params.next == "Weighting") {
        navigation.navigate("supplierProduct", { order_details: orderData });
      }

      if (route.params.next == "Cashier") {
        navigation.navigate("supplierProductPreview", {
          order_details: orderData,
        });
      }
    }
  }, [scanned, orderData, navigation, route.params.next]);

  const playBeepSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("./assets/beep.mp3")
      );
      await sound.playAsync();
    } catch (error) {
      console.log("Error playing beep sound:", error);
    }
  };

  const toggleFlash = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off
    );
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    getData(data);
    // playBeepSound();

    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        console.log("Camera roll permission granted.");
      } else {
        console.log("Camera roll permission denied.");
      }
    }
  };

  const getData = async (order_number) => {
    try {
      const jsonValue = await AsyncStorage.getItem(order_number);
      setOrderData({
        order_number: order_number,
        ...(jsonValue ? JSON.parse(jsonValue) : null),
      });
    } catch (e) {
      console.log(e);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        flashMode={flashMode}
      />
      <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
        <MaterialCommunityIcons
          name={
            flashMode === Camera.Constants.FlashMode.off ? "flash-off" : "flash"
          }
          size={24}
          color="white"
        />
      </TouchableOpacity>
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flashButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
