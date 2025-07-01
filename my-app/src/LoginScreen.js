import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const LoginScreen = () => {
  return (
    <View style={{ padding: 20, backgroundColor: '#fff', flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#000' }}>
        Welcome to Moniepoint
      </Text>
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
        placeholder="Password"
        editable={false}
        placeholderTextColor="#888"
        secureTextEntry
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
          Login
        </Text>
      </TouchableOpacity>
      <Text style={{ textAlign: 'center', marginTop: 10, color: '#007AFF' }}>
        Sign Up
      </Text>
    </View>
  );
};

export default LoginScreen;