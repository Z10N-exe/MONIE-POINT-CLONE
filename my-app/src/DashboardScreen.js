import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const DashboardScreen = () => {
  const mockTransactions = [
    { id: '1', description: 'Transfer to GTBank', amount: '₦10,000', date: 'Jul 3, 2025' },
    { id: '2', description: 'Airtime Purchase', amount: '₦500', date: 'Jul 2, 2025' },
  ];

  return (
    <View style={{ padding: 20, backgroundColor: '#fff', flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#000' }}>
        Dashboard
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 20, color: '#000' }}>
        Balance: ₦100,000
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#007AFF',
            padding: 10,
            borderRadius: 5,
            width: '22%',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 14 }}>Transfer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#007AFF',
            padding: 10,
            borderRadius: 5,
            width: '22%',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 14 }}>Bills</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#007AFF',
            padding: 10,
            borderRadius: 5,
            width: '22%',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 14 }}>Airtime</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#007AFF',
            padding: 10,
            borderRadius: 5,
            width: '22%',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 14 }}>Loans</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#000' }}>
        Recent Transactions
      </Text>
      <FlatList
        data={mockTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
            <Text style={{ color: '#000' }}>{item.description}</Text>
            <Text style={{ color: '#000' }}>{item.amount} • {item.date}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default DashboardScreen;