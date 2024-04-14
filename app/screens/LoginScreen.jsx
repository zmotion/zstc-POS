import {Button, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.navigate('searchSupplier');
        
        console.log('Login button pressed');
    };


  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <Text className="text-3xl font-bold mb-8">Login</Text>
      <View className="w-4/5 bg-white rounded-lg shadow-md p-4">
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
          placeholder="Email"
          placeholderTextColor="#999"
        />
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  )
}