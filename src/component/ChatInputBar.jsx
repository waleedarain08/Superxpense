import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {VectorIcon} from '../icons/index';
// import { Colors, FontFamily } from '../constants'; // adjust imports
import {FontFamily} from '../utilis/Fonts';
import {Colors} from '../utilis/Colors';

const ChatInputBar = ({
  message,
  setMessage,
  handleSendMessage,
  sendMessageLoading,
  handleDocumentPick,
  handleMicPress,
}) => {
  return (
    <View style={styles.inputBar}>
      {/* Attachment Icon */}

      <TouchableOpacity onPress={handleDocumentPick} style={styles.iconWrapper}>
        <VectorIcon
          name="add"
          type="Ionicons"
          size={22}
          color={Colors.primary}
        />
      </TouchableOpacity>

      {/* Text Input */}
      <TextInput
        style={styles.input}
        placeholder="Ask anything about your money..."
        placeholderTextColor="#999"
        value={message}
        onChangeText={setMessage}
        multiline
      />

      {/* Mic or Send Icon */}
      <TouchableOpacity onPress={handleSendMessage}>
        {sendMessageLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <VectorIcon
            name={message.trim() ? 'send' : 'send'}
            type="Ionicons"
            size={20}
            color={Colors.primary}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 26 : 16,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    marginTop:10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: '#333',
    maxHeight: 100,
  },
  iconWrapper: {
    backgroundColor: Colors.lightestGreen,
    borderRadius: 50,
    padding: 6,
    marginRight: 8,
  },
});

export default ChatInputBar;
