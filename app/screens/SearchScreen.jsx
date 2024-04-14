import { Button, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen() {
  const navigation = useNavigation();

  const handleAddSupplier = () => {
    console.log('Add Supplier button pressed');

    navigation.navigate('addSupplier')
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-5">
      <Text className="text-lg font-bold">Search Suppliers</Text>

      <View className="border-b border-gray-400 mb-4 mt-2" />

      <View className="w-full bg-white rounded-lg shadow-md p-4 mb-4">
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
          placeholder="Enter supplier name"
          placeholderTextColor="#999"
        />
      
        <View className="flex-row">
          <View className="flex-1">
            <TouchableOpacity className="flex-row bg-yellow-200 px-6 py-2 shadow-md">
              <Icon name="search" size={30} color="black" className="flex-1" />
              <Text className="flex-1 pl-2 font-bold text-lg">
                Search
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-1">
            <TouchableOpacity onPress={handleAddSupplier} className="flex-row bg-blue-200 px-6 py-2 shadow-md">
                <Icon name="plus" size={30} color="black" className="flex-1" />
                <Text className="flex-1 pl-2 font-bold text-lg">
                  Add
                </Text>
              </TouchableOpacity>
          </View>
        </View>
        
      </View>
    </SafeAreaView>
  );
}