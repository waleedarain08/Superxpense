import React from 'react';
import { View, Text, FlatList } from 'react-native';
import moment from 'moment';

const ContractInstallmentsTable = ({ contract }) => {
    console.log(contract);
    
  return (
    <View
      style={{
        backgroundColor: '#fff',
        margin: 12,
        borderRadius: 10,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}>
      {/* Contract File Name */}
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 8,
          color: '#333',
        }}>
        📄 Contract File: {contract.fileName}
      </Text>

      {/* Table Header */}
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#007bff',
          paddingVertical: 8,
          borderRadius: 6,
          paddingHorizontal: 4,
        }}>
        <Text style={{ flex: 0.6, fontSize: 11, color: '#fff', fontWeight: 'bold' }}>No</Text>
        <Text style={{ flex: 2, fontSize: 11, color: '#fff', fontWeight: 'bold' }}>Milestone</Text>
        <Text style={{ flex: 2, fontSize: 11, color: '#fff', fontWeight: 'bold' }}>Due Date</Text>
        <Text style={{ flex: 2, fontSize: 11, color: '#fff', fontWeight: 'bold' }}>Amount (AED)</Text>
      </View>

      {/* Table Body */}
      {contract?.installments?.map((inst, idx) => (
        <View
          key={inst.id}
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            borderBottomWidth: idx !== contract.installments.length - 1 ? 1 : 0,
            borderColor: '#eee',
          }}>
          <Text style={{ flex: 0.6, fontSize: 12, color: '#333' }}>
            {inst.installmentNo}
          </Text>
          <Text style={{ flex: 2, fontSize: 12, color: '#333' }}>
            {inst.milestone}
          </Text>
          <Text style={{ flex: 2, fontSize: 12, color: '#333' }}>
            {moment(inst.dueDate).format('DD MMM YYYY')}
          </Text>
          <Text style={{ flex: 2, fontSize: 12, fontWeight: 'bold', color: '#444' }}>
            {Number(inst.amount).toLocaleString()} AED
          </Text>
        </View>
      ))}
    </View>
  );
};

export default ContractInstallmentsTable;