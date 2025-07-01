import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Picker } from 'react-native';

const AirtimeScreen = () => {
  return (
    <View style={{ padding: 20, backgroundColor: '#fff', flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#000' }}>
        Buy Airtime
      </Text>
      <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 15 }}>
        <Picker enabled={false} style={{ height: 50, color: '#000' }}>
          <Picker.Item label="Select Network" value="" />
          <Picker.Item label="MTN" value="mtn" />
          <Picker.Item label="Glo" value="glo" />
          <Picker.Item label="Airtel" value="airtel" />
        </Picker>
      </View>
      <TextInput
        placeholder="Phone Number"
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
          Buy
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AirtimeScreen;