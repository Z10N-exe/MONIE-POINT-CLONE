import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={{ padding: 20, backgroundColor: '#fff', flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#000' }}>
        Settings
      </Text>
      <TouchableOpacity style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
        <Text style={{ fontSize: 16, color: '#000' }}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
        <Text style={{ fontSize: 16, color: '#000' }}>Change PIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
        <Text style={{ fontSize: 16, color: '#000' }}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
        <Text style={{ fontSize: 16, color: '#000' }}>Contact Support</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;