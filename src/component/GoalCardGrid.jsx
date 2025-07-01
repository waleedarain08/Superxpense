import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Colors} from '../utilis/Colors';
import {Check, CheckCircle} from '../icons';
import {FontFamily} from '../utilis/Fonts';
import {Bolt} from '../assets/svgs';

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
            style={[styles.card, {backgroundColor: 'rgba(255,255,255,0.3)'}]}
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
                <Check color={Colors.white} size={18} />
              </View>
            ) : null}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0)',
              }}>
              <View
                style={[styles.iconWrapper]}>
                <item.SvgIcon width={24} height={24} />
              </View>
              <Text style={[styles.label, {color: Colors.txtColor}]}>
                {item.label}
              </Text>
              <View style={styles.boltStyle}>
                <Bolt />
                <Text
                  style={{
                    fontFamily: FontFamily.medium,
                    fontSize: 13,
                    marginLeft: 3,
                  }}>
                  Top Picked
                </Text>
              </View>
            </View>
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
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.white,  
  },
  iconWrapper: {
    borderRadius: 50,
    marginBottom: 20,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
    borderColor: Colors.white,
  },
  label: {
    fontSize: 16,
    color: Colors.txtColor,
    fontFamily: FontFamily.medium,
    textAlign: 'center',
  },
  checkCircle: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Colors.newButtonBack,
    borderRadius: 50,
    height:24,
    width:24,
    justifyContent:'center',
    alignItems:'center',
  },
  boltStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
});

export default GoalCardGrid;
