import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Platform} from 'react-native';
import {Colors} from '../utilis/Colors';
import WavyBump from '../component/WavyBump';
import {FontFamily} from '../utilis/Fonts';

const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const icon = options.tabBarIcon?.({
          focused: isFocused,
          color: isFocused ? Colors.activeTabColor : '#B0B0B0',
          size: isFocused ? 32 : 24,
        });

        return (
          <View key={index} style={styles.tabWrapper}>
            {isFocused && (
              <View style={styles.bumpContainer}>
                <WavyBump width={70} height={25} color={Colors.newButtonBack} />
              </View>
            )}
            <TouchableOpacity
              accessibilityRole="button"
              onPress={onPress}
              style={isFocused ? styles.activeTab : styles.inactiveTab}
              activeOpacity={0.9}>
              {icon}
            </TouchableOpacity>
            {isFocused && <Text style={styles.label}>{label}</Text>}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 90 : 70,
    backgroundColor: '#F8FBFA',
    paddingBottom: 20,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  tabWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  bumpContainer: {
    position: 'absolute',
    top: -15,
    left: '38%',
    marginLeft: -22,
    zIndex: 2,
    transform: [{scaleY: -1}],
  },
  bump: {
    width: 44,
    height: 22,
    //backgroundColor: 'red',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 5,
  },
  activeTab: {
    backgroundColor: Colors.newButtonBack,
    borderRadius: 200,
    height: 40,
    width: 40,
    bottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    zIndex: 100,
  },
  inactiveTab: {
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
    backgroundColor: 'transparent',
  },
  label: {
    color: Colors.newButtonBack,
    fontSize: 15,
    fontFamily: FontFamily.medium,
    bottom: 25,
  },
});

export default CustomTabBar;
