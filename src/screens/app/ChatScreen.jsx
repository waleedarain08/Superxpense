// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';

// const ChatScreen = () => {
//   return (
//     <View>
//       <Text>ChatScreen</Text>
//     </View>
//   );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import {FontFamily} from '../../utilis/Fonts';
import {Colors} from '../../utilis/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  AddExpense,
  ChatHeader,
  Plan,
  SetBudget,
  ViewSummary,
  Voice,
} from '../../assets/svgs';

const QuickAction = ({icon, label, backgroundColor}) => (
  <TouchableOpacity style={[styles.quickAction]}>
    <View style={[styles.iconStyle, {backgroundColor: backgroundColor}]}>
      {icon}
    </View>
    <Text style={styles.quickActionText}>{label}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Superxpense AI</Text>
        <TouchableOpacity>
          <ChatHeader />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 80,
          justifyContent: 'center',
        }}>
                  <Text style={{marginLeft:'37%',marginTop:10, color:Colors.lightblack}}>Coming Soon</Text>
          
        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Good morning John</Text>
          <Text style={styles.subGreetingText}>
            Let's make your money work for you.
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <QuickAction
            icon={<AddExpense />}
            label="Add Expense"
            backgroundColor="#C9F7FF"
          />
          <QuickAction
            icon={<SetBudget />}
            label="Set Budget"
            backgroundColor="#D9C9FF"
          />
          <QuickAction
            icon={<Plan />}
            label="Plan a Payment"
            backgroundColor="#FFC9DC"
          />
          <QuickAction
            icon={<ViewSummary />}
            label="View Summary"
            backgroundColor="#C9E2FF"
          />
        </View>
      </ScrollView>

      {/* Bottom Input Bar */}
      <View style={styles.inputBar}>
        <TouchableOpacity style={styles.plusButton}>
          <Ionicons name="add" size={20} color={Colors.primary || '#00A86B'} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Ask me Anything"
          placeholderTextColor="#999"
        />
        <TouchableOpacity>
          <Voice />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  header: {
    backgroundColor: Colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  greetingContainer: {
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 30,
  },
  greetingText: {
    fontSize: 24,
    fontFamily: FontFamily.medium,
    marginBottom: 10,
  },
  subGreetingText: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.lightTxtColor,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  quickAction: {
    width: '47%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    marginTop: 20,
  },
  inputBar: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 30,
  },
  plusButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5F7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontFamily: FontFamily.regular,
    color: '#333',
  },
  iconStyle: {
    height: 28,
    width: 32,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
