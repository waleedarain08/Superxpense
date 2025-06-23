import React from 'react';
import {View, Text, FlatList} from 'react-native';
import moment from 'moment';
import {Colors} from '../utilis/Colors';
import {FontFamily} from '../utilis/Fonts';

const InstallmentCard = ({installment}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.06,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F1F1F1',
      }}>
      {/* Header Row */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontWeight: '500', fontSize: 13, color: '#111827'}}>
          Installment #{installment.installmentNo}
        </Text>
        <View
          style={{
            backgroundColor: Colors.green,
            paddingVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 16,
            borderWidth: 0.1,
            borderColor: Colors.background,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: Colors.black,
              fontFamily: FontFamily.medium,
              fontWeight: '600',
            }}>
            {Number(installment.amount).toLocaleString()} AED
          </Text>
        </View>
      </View>

      {/* Sub Info */}
      <View style={{flexDirection:'row',justifyContent:'space-between', marginTop: 8}}>
      <Text
        style={{
          marginTop: 4,
          color: '#6B7280',
          fontSize: 13,
          fontFamily: FontFamily.regular,
        }}>
        {moment(installment.dueDate).format('ddd, MMM D, YYYY')}
      </Text>

       <View
          style={{
            backgroundColor: Colors.lightestGreen,
            paddingVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 16,
          }}>
          <Text
            style={{
              fontSize: 12,
              color: '#4B5563',
              fontFamily: FontFamily.regular,
            }}>
            {installment.milestone}
          </Text>
        </View>
        </View>

    </View>
  );
};

const ContractInstallmentsList = ({contract}) => {
  return (
    <View style={{padding: 0}}>
      <Text
        style={{fontSize: 18, fontFamily: FontFamily.bold, marginBottom: 12}}>
        Payment Schedule
      </Text>

      {Array.isArray(contract?.installments) &&
      contract?.installments?.length > 0 ? (
        <FlatList
          data={[...contract.installments].sort(
            (a, b) => a.installmentNo - b.installmentNo,
          )}
          keyExtractor={item => item.id}
          renderItem={({item}) => <InstallmentCard installment={item} />}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text
          style={{
            fontSize: 14,
            color: '#6B7280',
            textAlign: 'center',
            marginTop: 10,
            marginBottom: 10,
          }}>
          No Data Found.
        </Text>
      )}
    </View>
  );
};

export default ContractInstallmentsList;
