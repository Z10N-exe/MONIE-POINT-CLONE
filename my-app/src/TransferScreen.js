import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Picker } from 'react-native';

const TransferScreen = () => {
  return (
    <View style={{ padding: 20, backgroundColor: '#fff', flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#000' }}>
        Send Money
      </Text>
      <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 15 }}>
        <Picker enabled={false} style={{ height: 50, color: '#000' }}>
          <Picker.Item label="Select Bank" value="" />
          <Picker.Item label="Access Bank" value="access" />
          <Picker.Item label="GTBank" value="gtbank" />
          <Picker.Item label="Zenith Bank" value="zenith" />
          <Picker.Item label="Moniepoint" value="moniepoint" />
        </Picker>
      </View>
      <TextInput
        placeholder="Account Number"
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
          marginBottom: 15,
          color: '#000',
        }}
      />
      <TextInput
        placeholder="Narration (optional)"
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
          Send
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransferScreen;