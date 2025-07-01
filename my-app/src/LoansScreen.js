import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Picker } from 'react-native';

const LoansScreen = () => {
  return (
    <View style={{ padding: 20, backgroundColor: '#fff', flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#000' }}>
        Apply for Loan
      </Text>
      <TextInput
        placeholder="Loan Amount (₦)"
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
      <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 15 }}>
        <Picker enabled={false} style={{ height: 50, color: '#000' }}>
          <Picker.Item label="Loan Purpose" value="" />
          <Picker.Item label="Business Expansion" value="business" />
          <Picker.Item label="Personal Use" value="personal" />
        </Picker>
      </View>
      <TextInput
        placeholder="Repayment Period (months)"
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
          Apply
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoansScreen;