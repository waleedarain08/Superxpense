import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import {FontFamily} from '../../utilis/Fonts';
import {Colors} from '../../utilis/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {VectorIcon} from '../../icons';
import {get, post} from '../../utilis/Api';
import {getItem} from '../../utilis/StorageActions';
import {API} from '../../utilis/Constant';
import DocumentPicker from 'react-native-document-picker';

const HomeScreen = ({navigation}) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [sendMessageLoading, setSendMessageLoading] = useState(false);
  const [name, setName] = useState('');

  const scrollViewRef = useRef(null);

  useEffect(() => {
    fetchChats();
    fetchData();
  }, []);

  const fetchData = async () => {
    const userData = await getItem('userData');
    const token = userData?.data?.accessToken;

    try {
      const response = await get(`${API.getUserData}`, {}, token);
      const {name} = response?.data;

      setName(name);
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  const fetchChats = async () => {
    try {
      setLoading(true);
      const userData = await getItem('userData');
      const token = userData.data?.accessToken;
      const response = await get(`${API.getAllChats}`, null, token);
      console.log('Fetched chats:', response);
      // Transform the history into chat messages and reverse the order
      const formattedChats = response.data.history
        .reverse() // Reverse the array to show oldest messages first
        .map(chat => [
          {
            message: chat.userQuery,
            isUser: true,
            timestamp: new Date(chat.createdAt).toLocaleTimeString(),
          },
          {
            message: chat.aiResponse,
            isUser: false,
            timestamp: new Date(chat.createdAt).toLocaleTimeString(),
          },
        ])
        .flat();
      setChats(formattedChats);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching chats:', error);
      setLoading(false);
    }
  };

  const handleDocumentPick = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: DocumentPicker.types.allFiles,
      });

      await handleSendMessage(file);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('Document pick error:', err);
      }
    }
  };

  

  const handleSendMessage = async (file = null) => {
    if (!message.trim() && !file) return;

    try {
      setSendMessageLoading(true);
      const userData = await getItem('userData');
      const token = userData.data?.accessToken;

      const timestamp = new Date().toLocaleTimeString();

      // Add user message or file-sending indicator
      setChats(prevChats => [
        ...prevChats,
        {
          message: file ? `Uploading document: ${file.name}` : message,
          isUser: true,
          timestamp,
        },
        {
          message: 'Thinking...',
          isUser: false,
          isThinking: true,
          timestamp,
        },
      ]);

      let formData;
      let headers;

      if (file) {
        formData = new FormData();
        formData.append('file', {
          uri: file.uri,
          name: file.name,
          type: file.type || 'application/octet-stream',
        });
        formData.append('query', message); // optionally include the message too
        headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        };
      }

      const response = await fetch(API.createChat, {
        method: 'POST',
        headers: file
          ? headers
          : {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
        body: file ? formData : JSON.stringify({query: message}),
      });

      const data = await response.json();
      //console.log('Response data:', data);
      // Remove thinking and show bot reply
      setChats(prevChats => {
        const newChats = prevChats.filter(chat => !chat.isThinking);
        return [
          ...newChats,
          {
            message: file ? data.data.response : data.data,
            isUser: false,
            timestamp: new Date().toLocaleTimeString(),
            installments: data.data.installments || [],
          },
        ];
      });

      if (file) {
        Alert.alert(
          'Payment Reminders Set',
          'You will be notified when payment is due.',
          [{text: 'OK'}],
          {cancelable: false},
        );
      }

      setMessage('');
    } catch (err) {
      console.error('Send error:', err);
      setChats(prevChats => prevChats.filter(chat => !chat.isThinking));
    } finally {
      setSendMessageLoading(false);
    }
  };

  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={{width: '10%'}}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
        <TouchableOpacity style={{width: '10%'}}>
          {/* <ChatHeader /> */}
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({animated: true})
          }
          onLayout={() => scrollViewRef.current?.scrollToEnd({animated: true})}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={Platform.OS === 'ios' ? 90 : 0}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : chats.length === 0 ? (
            <View style={styles.greetingContainer}>
              <Text style={styles.greetingText}>Welcome, {name}</Text>
              <Text style={styles.subGreetingText}>
                Let's make your money work for you.
              </Text>
            </View>
          ) : (
            <View style={styles.chatContainer}>
              {chats.map((chat, index) => (
                <View
                  key={index}
                  style={[
                    styles.messageContainer,
                    chat.isUser ? styles.userMessage : styles.botMessage,
                  ]}>
                  {/* <Text
                    style={[
                      styles.messageText,
                      chat.isThinking && styles.thinkingText,
                    ]}>
                    {chat.message}
                  </Text> */}
                  <Text
                    style={[
                      styles.messageText,
                      chat.isThinking && styles.thinkingText,
                    ]}>
                    {chat.message}
                  </Text>
                  {Array.isArray(chat.installments) && chat.installments.length > 0 && (
                    <View style={{ marginTop: 8, backgroundColor: '#f7f7f7', borderRadius: 8, padding: 4,marginBotton:4 }}>
                      <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#e0e0e0', paddingBottom: 4, marginBottom: 4 }}>
                        <Text style={{ flex: 0.3,  fontSize: 10 }}>No</Text>
                        <Text style={{ flex: 1,  fontSize: 10 }}>Milestone</Text>
                        <Text style={{ flex: 1,  fontSize: 10 }}>Due Date</Text>
                        <Text style={{ flex: 1,  fontSize: 10 }}>Amount</Text>
                      </View>
                      {chat.installments.map((inst, idx) => (
                        <View key={idx} style={{ flexDirection: 'row', paddingVertical: 2 }}>
                          <Text style={{ flex: 0.3, fontSize: 11 }}>
                            {inst.installment_no}
                          </Text>
                          <Text style={{ flex: 1, fontSize: 11 }}>
                            {inst.milestone}
                          </Text>
                          <Text style={{ flex: 1, fontSize: 11 }}>
                            {inst.date}
                          </Text>
                           <Text style={{ flex: 1, fontSize: 12, fontWeight: 'bold' }}>
                            {Number(inst.amount).toLocaleString()} AED
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                  {!chat.isThinking && (
                    <Text style={styles.timestampText}>{chat.timestamp}</Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Bottom Input Bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Ask me Anything"
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity onPress={() => handleSendMessage()}>
            {sendMessageLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <VectorIcon
                name="send"
                color={Colors.primary}
                size={20}
                type="Ionicons"
              />
            )}
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 6,
              marginBottom: 8,
            }}>
            <TouchableOpacity
              onPress={handleDocumentPick}
              style={[
                styles.iconStyle,
                {
                  backgroundColor: Colors.lightestGreen,
                  borderRadius: 100,
                  padding: 6,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.15,
                  shadowRadius: 2,
                  elevation: 2,
                },
              ]}>
              <VectorIcon
                name="document-attach"
                type="Ionicons"
                size={22}
                color={Colors.background}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    // paddingTop: 60,
    paddingTop: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight,
    paddingBottom: 16,
    width: '100%',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    marginTop: 5,
    width: '80%',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContainer: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.lightestGreen,
    //opacity: 0.9,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.white,
  },
  messageText: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: Colors.txtColor,
    marginBottom: 4,
    lineHeight:21
  },
  timestampText: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: Colors.lightTxtColor,
    alignSelf: 'flex-end',
  },
  inputBar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 30,
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 26 : 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: 40,
    fontFamily: FontFamily.regular,
    color: '#333',
  },
  // iconStyle: {
  //   height: 28,
  //   width: 32,
  //   borderRadius: 100,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
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
  greetingContainer: {
    marginTop: 200,
    alignItems: 'center',
    justifyContent: 'center',
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
  thinkingText: {
    fontStyle: 'italic',
    color: Colors.lightTxtColor,
  },
  iconStyle: {
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default HomeScreen;

// const formatAndHighlightAmounts = (text) => {
//   const parts = text.split(/(\d{6,})/); 
//   return parts.map((part, index) => {
//     if (/^\d{6,}$/.test(part)) {
//       const formatted = Number(part).toLocaleString(); // Add commas
//       return (
//         <Text key={index} style={{ fontWeight: 'bold', fontSize:18 }}>
//           {formatted} AED
//         </Text>
//       );
//     }
//     return <Text key={index}>{part}</Text>;
//   });
// };
