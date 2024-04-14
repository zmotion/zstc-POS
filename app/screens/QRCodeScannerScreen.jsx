import { View, Text, Button, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { idText } from 'typescript';

export default function QRCodeScannerScreen({route}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation =  useNavigation();
  const [orderData, setOrderData] =  useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const getData = async (order_number) => {
    try {
      const jsonValue = await AsyncStorage.getItem(order_number);
      setOrderData(jsonValue)
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e)
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

   getData(data)

   if(orderData){
    console.log('order data', orderData)

    if(route.params.next == 'Checker'){
      navigation.navigate('addProduct', {'order_details': orderData})
    }
    console.log(route.params.next)
   }
    
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button
          title={'Tap to Scan Again'}
          onPress={() => setScanned(false)}
        />
      )}
    </View>
  );
}