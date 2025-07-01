import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Picker } from 'react-native';

const BillPaymentScreen = () => {
  return (
    <View style={{ padding: 20, backgroundColor: '#fff', flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#000' }}>
        Pay Bills
      </Text>
      <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 15 }}>
        <Picker enabled={false} style={{ height: 50, color: '#000' }}>
          <Picker.Item label="Select Biller" value="" />
          <Picker.Item label="Electricity" value="electricity" />
          <Picker.Item label="Internet" value="internet" />
          <Picker.Item label="Cable TV" value="cable" />
        </Picker>
      </View>
      <TextInput
        placeholder="Customer ID"
        editable={false}
        placeholderTextColor="#888"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
          marginBottom: 15,
          color: '#000',
        }}
      />
      <TextInput
        placeholder="Amount (₦)"
        editable={false}
        placeholderTextColor="#888"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
          marginBottom: 20,
          color: '#000',
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#007AFF',
          padding: 15,
          borderRadius: 5,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
          Pay
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BillPaymentScreen;