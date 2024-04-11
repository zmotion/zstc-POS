import React from 'react';
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import SearchScreen from './app/screens/SearchScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterSupplierScreen from './app/screens/RegisterSupplierScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="SearchSupplier" component={SearchScreen} options={{title: "Search supplier"}}></Stack.Screen>
        <Stack.Screen name="AddSupplier" component={RegisterSupplierScreen} options={{title: "Register Supplier", headerShown: true}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
