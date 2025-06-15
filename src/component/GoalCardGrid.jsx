import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Colors} from '../utilis/Colors';
import {CheckCircle} from '../icons';

const GoalCardGrid = ({data, onPress}) => {
  const [selectedIds, setSelectedIds] = React.useState([]);

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      numColumns={2}
      contentContainerStyle={styles.grid}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      extraData={selectedIds}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => {
        const isSelected = selectedIds.includes(item.id);
        return (
          <TouchableOpacity
            style={[styles.card, {backgroundColor: Colors.lightWhite}]}
            onPress={() => {
              setSelectedIds(prev =>
                isSelected
                  ? prev.filter(id => id !== item.id)
                  : [...prev, item.id],
              );
              onPress(
                isSelected
                  ? selectedIds.filter(id => id !== item.id)
                  : [...selectedIds, item.id],
              );
            }}>
            {isSelected ? (
              <View style={styles.checkCircle}>
                <CheckCircle color={Colors.black} size={18} />
              </View>
            ) : null}
            <View style={[styles.iconWrapper, {backgroundColor: item.bgColor}]}>
              <item.SvgIcon width={60} height={60} />
            </View>
            <Text style={[styles.label, {color: Colors.txtColor}]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    gap: 15,
    justifyContent: 'space-between',
  },
  card: {
    height: 172,
    width: '48%',
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    borderRadius: 50,
    marginBottom: 20,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    color: '#222',
    textAlign: 'center',
  },
  checkCircle: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default GoalCardGrid;
