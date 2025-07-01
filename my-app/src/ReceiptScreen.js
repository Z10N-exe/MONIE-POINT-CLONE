import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ReceiptScreen = () => {
  const mockTransaction = {
    id: 'TXN123456789',
    bank: 'GTBank',
    accountNumber: '0123456789',
    amount: '50,000',
    narration: 'Payment for services',
    date: 'July 3, 2025, 3:15 PM',
  };

  return (
    <View style={{ padding: 20, backgroundColor: '#fff', flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#000' }}>
        Transaction Receipt
      </Text>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, marginBottom: 10, color: '#000' }}>
          Transaction ID: {mockTransaction.id}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 10, color: '#000' }}>
          Bank: {mockTransaction.bank}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 10, color: '#000' }}>
          Account Number: {mockTransaction.accountNumber}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 10, color: '#000' }}>
          Amount: ₦{mockTransaction.amount}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 10, color: '#000' }}>
          Narration: {mockTransaction.narration}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 20, color: '#000' }}>
          Date: {mockTransaction.date}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#007AFF',
          padding: 15,
          borderRadius: 5,
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
          Share Receipt
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#007AFF',
          padding: 15,
          borderRadius: 5,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
          Back to Home
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReceiptScreen;