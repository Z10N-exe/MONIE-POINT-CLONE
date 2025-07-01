import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import DashboardScreen from './DashboardScreen';
import TransferScreen from './TransferScreen';
import ReceiptScreen from './ReceiptScreen';
import BillPaymentScreen from './BillPaymentScreen';
import AirtimeScreen from './AirtimeScreen';
import POSScreen from './POSScreen';
import LoansScreen from './LoansScreen';
import SettingsScreen from './SettingsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Transfer" component={TransferScreen} />
        <Stack.Screen name="Receipt" component={ReceiptScreen} />
        <Stack.Screen name="BillPayment" component={BillPaymentScreen} />
        <Stack.Screen name="Airtime" component={AirtimeScreen} />
        <Stack.Screen name="POS" component={POSScreen} />
        <Stack.Screen name="Loans" component={LoansScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;