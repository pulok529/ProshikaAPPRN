import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/screens/LoginScreen';
import CustomerScreen from '@/screens/CustomerScreen';
import QRScannerScreen from '@/screens/QRScannerScreen';

export type RootStackParamList = {
  Login: undefined;
  Customer: undefined;
  QRScanner: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Customer" component={CustomerScreen} />
    <Stack.Screen name="QRScanner" component={QRScannerScreen} options={{ title: 'Scan QR' }} />
  </Stack.Navigator>
);
