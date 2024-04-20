import {Button, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { user_api } from '../api/user_api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        user_api({
          email: email.toLowerCase(),
          password: password,
        }).then((res) => {
          if (res.status === 200) {
            AsyncStorage.setItem('token', res.data.token);
            AsyncStorage.setItem('role', res.data.role);
            AsyncStorage.setItem('user_id', JSON.stringify(res.data.user_id));
            navigation.navigate('home');
          }
        }).catch((error) => {
          console.log(error);
        });
    };


  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <Text className="text-3xl font-bold mb-8">Login</Text>
      <View className="w-4/5 bg-white rounded-lg shadow-md p-4">
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  )
}