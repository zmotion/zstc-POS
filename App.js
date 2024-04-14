import React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SearchScreen from './app/screens/SearchScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterSupplierScreen from './app/screens/RegisterSupplierScreen';
import QRCodeScannerScreen from './app/screens/QRCodeScannerScreen';
import QRCodeGenerateScreen from './app/screens/QRCodeGenerateScreen';
import QRCodeScreen from './app/modals/QRCodeModel';
import AddProductScreen from './app/screens/AddProductScreen';
import OrderPreviewScreen from './app/screens/OrderPreviewScreen'

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SearchSupplier" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="SearchSupplier" component={SearchScreen} options={{ title: "Search supplier" }}></Stack.Screen>
        <Stack.Screen name="AddSupplier" component={RegisterSupplierScreen} options={{ title: "Register Supplier", headerShown: true }}></Stack.Screen>
        <Stack.Screen name="QRCodeScanner" component={QRCodeScannerScreen} options={{ title: "Scan QR Code", headerShown: true }}></Stack.Screen>
        <Stack.Screen name='QRCodeGenerator' component={QRCodeGenerateScreen} options={{ title: "Generate QR Code", headerShown: false }}></Stack.Screen>
        <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ title: "Add Products", headerShown: true }}></Stack.Screen>
        <Stack.Screen name="OrderPreview" component={OrderPreviewScreen} options={{ title: "Product Orders", headerShown: true }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
