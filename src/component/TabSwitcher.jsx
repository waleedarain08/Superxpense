import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const TabSwitcher = () => {
  const [activeTab, setActiveTab] = useState('Budgets');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'Budgets' ? styles.activeTab : styles.inactiveTab,
        ]}
        onPress={() => setActiveTab('Budgets')}>
        <Text
          style={[
            styles.text,
            activeTab === 'Budgets' ? styles.activeText : styles.inactiveText,
          ]}>
          Budgets
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'Upcoming Bills'
            ? styles.activeTab
            : styles.inactiveTab,
        ]}
        onPress={() => setActiveTab('Upcoming Bills')}>
        <Text
          style={[
            styles.text,
            activeTab === 'Upcoming Bills'
              ? styles.activeText
              : styles.inactiveText,
          ]}>
          Upcoming Bills
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F0F2F5',
    alignSelf: 'center',
    borderRadius:15,
  },
  tab: {
    height: 50,
    minWidth: '50%',
    justifyContent: 'center',
    borderRadius:15,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#4D6EF7', // Solid blue color

  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
  text: {
    fontWeight: '600',
  },
  activeText: {
    color: 'white',
  },
  inactiveText: {
    color: '#888',
  },
});

export default TabSwitcher;
