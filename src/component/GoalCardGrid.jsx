import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

const GoalCardGrid = ({data, onPress}) => {
  const [selectedId, setSelectedId] = React.useState(null);

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      numColumns={2}
      contentContainerStyle={styles.grid}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      extraData={selectedId}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => {
        const isSelected = selectedId === item.id;
        return (
          <TouchableOpacity
            style={[
              styles.card,
              {backgroundColor: isSelected ? '#00B67A' : '#fff'},
            ]}
            onPress={() => {
              setSelectedId(item.id);
              onPress(item.id);
            }}>
            <View
              style={[
                styles.iconWrapper,
                {backgroundColor: isSelected ? '#ffffff' : item.bgColor},
              ]}>
              <item.SvgIcon width={24} height={24} />
            </View>
            <Text style={[styles.label,{color: isSelected ? '#ffffff' : '#000000'}]}>{item.label}</Text>
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
});

export default GoalCardGrid;
