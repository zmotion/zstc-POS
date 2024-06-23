import React, { createContext, useContext, useState, useEffect } from "react";
import BleManager from "react-native-ble-manager";
import { BleManagerEmitter } from "react-native-ble-manager";
import {
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
} from "react-native";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const BluetoothContext = createContext();

export const useBluetooth = () => {
  return useContext(BluetoothContext);
};

export const BluetoothProvider = ({ children }) => {
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [devices, setDevices] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [currentWeight, setCurrentWeight] = useState(0);

  useEffect(() => {
    BleManager.start({ showAlert: false });

    const handleDiscoverPeripheral = (peripheral) => {
        if (peripheral.name) {
          setDevices((prevDevices) => {
            if (!prevDevices.find((dev) => dev.id === peripheral.id)) {
              return [...prevDevices, peripheral];
            }
            return prevDevices;
          });
        }
     
    };

    const handleStopScan = () => {
      setIsScanning(false);
    };

    const handleDisconnectedPeripheral = (data) => {
      if (connectedDevice && data.peripheral === connectedDevice.id) {
        setConnectedDevice(null);
        attemptReconnect(data.peripheral);
      }
    };

    const discoverPeripheralListener = bleManagerEmitter.addListener(
      "BleManagerDiscoverPeripheral",
      handleDiscoverPeripheral
    );
    const stopScanListener = bleManagerEmitter.addListener(
      "BleManagerStopScan",
      handleStopScan
    );
    const disconnectPeripheralListener = bleManagerEmitter.addListener(
      "BleManagerDisconnectPeripheral",
      handleDisconnectedPeripheral
    );

    return () => {
      discoverPeripheralListener.remove();
      stopScanListener.remove();
      disconnectPeripheralListener.remove();
    };
  }, [connectedDevice]);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === "android" && Platform.Version >= 30) {
      await requestAndroidPermissions();
    }
  };

  const requestAndroidPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
      const allGranted = Object.values(granted).every(
        (result) => result === PermissionsAndroid.RESULTS.GRANTED
      );
      if (!allGranted) {
        console.warn("Some permissions were not granted");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const startScan = () => {
    if (!isScanning) {
      setDevices([]);
      BleManager.scan([], 5, true)
        .then(() => {
          setIsScanning(true);
        })
        .catch((error) => {
          console.error("Scan failed:", error);
        });
    }
  };

  const connectDevice = (device) => {
    BleManager.connect(device.id)
      .then(() => {
        setConnectedDevice(device);
        discoverServicesAndCharacteristics(device);
      })
      .catch((error) => {
        console.error("Connection failed:", error);
      });
  };

  const discoverServicesAndCharacteristics = (device) => {
    BleManager.retrieveServices(device.id).then((peripheralInfo) => {
      const serviceUUID = "49535343-fe7d-4ae5-8fa9-9fafd205e455";
      const characteristicUUID = "49535343-1e4d-4bd9-ba61-23c647249616";
      BleManager.startNotification(device.id, serviceUUID, characteristicUUID)
        .then(() => {
          bleManagerEmitter.addListener(
            "BleManagerDidUpdateValueForCharacteristic",
            ({ value, peripheral, characteristic, service }) => {
              if (
                peripheral === device.id &&
                characteristic === characteristicUUID
              ) {
                const weight = parseWeightData(value);
                console.log("Received weight data:", weight);
                setCurrentWeight(weight);
              }
            }
          );
        })
        .catch((error) => {
          console.error("Notification failed:", error);
        });
    });
  };

  const parseWeightData = (data) => {
    let charList = data.map((num) => String.fromCharCode(num));
    let weightStr = charList.join("");

    if (weightStr.startsWith("=")) {
      weightStr = weightStr.substring(1);
    }
    let weight = parseFloat(weightStr);

    return weight;
  };

  const attemptReconnect = (deviceId) => {
    BleManager.connect(deviceId)
      .then(() => {
        const reconnectedDevice = devices.find((dev) => dev.id === deviceId);
        setConnectedDevice(reconnectedDevice);
        discoverServicesAndCharacteristics(reconnectedDevice);
      })
      .catch((error) => {
        console.error("Reconnection failed:", error);
      });
  };

  return (
    <BluetoothContext.Provider
      value={{
        connectedDevice,
        devices,
        isScanning,
        startScan,
        connectDevice,
        currentWeight,
      }}
    >
      {children}
    </BluetoothContext.Provider>
  );
};
