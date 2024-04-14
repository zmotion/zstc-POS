import { View, Text, SafeAreaView, TextInput, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {QRCode} from 'react-native-qrcode-svg';

export default function RegisterSupplierScreen() {
    const navigation = useNavigation();

    const handleRegister = () => {
        //Register supplier
        console.log('Register supplier pressed !')

        //Generate QR Code
        navigation.navigate('QRCodeScanner')
    }
  return (
    <SafeAreaView className="flex-1 p-5 bg-gray-100">
      <View className="flex-1 p-4 mb-4 bg-white rounded-lg shadow-md">
        <Text className="pb-1 text-lg">Name</Text>
        <TextInput
          placeholder="Enter name"
          className="px-4 py-2 mb-2 border border-gray-300"
        />

        <Text className="pb-1 text-lg">Phone Number</Text>
        <TextInput
          placeholder="Enter phone number"
          className="px-4 py-2 mb-2 border border-gray-300"
        />

        <Button title="Save" className="mx-4 bg-blue-300" onPress={handleRegister} />
      </View>
    </SafeAreaView>
  );
}
