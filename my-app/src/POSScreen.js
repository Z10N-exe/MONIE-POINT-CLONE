import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const POSScreen = () => {
  const mockTerminals = [
    { id: 'POS001', status: 'Active', lastTransaction: 'Jul 3, 2025' },
    { id: 'POS002', status: 'Inactive', lastTransaction: 'Jul 1, 2025' },
  ];

  return (
    <View style={{ padding: 20, backgroundColor: '#fff', flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#000' }}>
        POS Terminal
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 10, color: '#000' }}>
        Terminal Status
      </Text>
      <FlatList
        data={mockTerminals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
            <Text style={{ color: '#000' }}>Terminal ID: {item.id}</Text>
            <Text style={{ color: '#000' }}>Status: {item.status}</Text>
            <Text style={{ color: '#000' }}>Last Transaction: {item.lastTransaction}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#007AFF',
          padding: 15,
          borderRadius: 5,
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
          Request New Terminal
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default POSScreen;