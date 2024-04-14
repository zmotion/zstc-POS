import React from 'react';
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import SearchScreen from './app/screens/SearchScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterSupplierScreen from './app/screens/RegisterSupplierScreen';
import QRCodeScannerScreen from './app/screens/QRCodeScannerScreen';
import QRCodeScreen from './app/modals/QRCodeModel';
import AddProductScreen from './app/screens/AddProductScreen';
import SupplierProductScreen from './app/screens/SupplierProductScreen';
import SupplierProductPreviewScreen from './app/screens/SupplierProductPreviewScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="searchSupplier" component={SearchScreen} options={{title: "Search supplier"}}></Stack.Screen>
        <Stack.Screen name="addSupplier" component={RegisterSupplierScreen} options={{title: "Register Supplier", headerShown: true}}></Stack.Screen>
        <Stack.Screen name="QRCodeScanner" component={QRCodeScannerScreen} options={{title: "Scan QR Code", headerShown: true}}></Stack.Screen>
        <Stack.Screen name="addProduct" component={AddProductScreen} options={{title: "Add Products", headerShown: true}}></Stack.Screen>
        <Stack.Screen name="supplierProduct" component={SupplierProductScreen} options={{title: "Supplier Product", headerShown: true}}></Stack.Screen>
        <Stack.Screen name="supplierProductPreview" component={SupplierProductPreviewScreen} options={{title: "Supplier Product Preview", headerShown: true}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
