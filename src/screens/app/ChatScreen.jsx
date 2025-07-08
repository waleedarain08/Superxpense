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
  ImageBackground,
} from 'react-native';
import {FontFamily} from '../../utilis/Fonts';
import {Colors} from '../../utilis/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {VectorIcon} from '../../icons';
import {get, post} from '../../utilis/Api';
import {getItem} from '../../utilis/StorageActions';
import {API} from '../../utilis/Constant';
import { pick } from '@react-native-documents/picker'
import Header from '../../component/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import ChatInputBar from '../../component/ChatInputBar';
import {Stars, UploadPayment, ViewPayment} from '../../assets/svgs';

const HomeScreen = ({navigation, route}) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [sendMessageLoading, setSendMessageLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (route.params?.message) {
      setMessage(route.params.message);
    }
  }, [route.params?.message]);

  const predefinedMessages = [
    'Where did I spend most this week?',
    'How much did I save this month?',
    'Suggest a monthly budget',
    'Compare this month to last month',
  ];

  // Array of objects with SVG and text
  const predefinedActions = [
    {
      icon: <UploadPayment />,
      text: 'Upload Payment Plan',
    },
    {
      icon: <ViewPayment />,
      text: 'View Payment Schedule',
    },
  ];

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
    console.log("pickerrr");
    
    try {
      // const file = await DocumentPicker.pick({
      //   type: DocumentPicker.types.allFiles,
      // });

      const [file] = await pick()

      console.log('Selected file:', file); // Debug log
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

    console.log('handleSendMessage called with:', {
      message: message,
      file: file,
      fileType: typeof file,
      isFileObject: file && typeof file === 'object' && file.uri,
    });

    try {
      setSendMessageLoading(true);
      const userData = await getItem('userData');
      const token = userData.data?.accessToken;

      const timestamp = new Date().toLocaleTimeString();

      // Add user message or file-sending indicator
      setChats(prevChats => [
        ...prevChats,
        {
          message:
            file && file.name ? `Uploading document: ${file.name}` : message,
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

      if (file && file.uri) {
        console.log('Processing file upload:', file);
        formData = new FormData();
        formData.append('file', {
          uri: file.uri,
          name: file.name,
          type: file.type || 'application/octet-stream',
        });
        formData.append('query', message || ''); // Handle empty message case
        headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        };
      }

      const response = await fetch(API.createChat, {
        method: 'POST',
        headers:
          file && file.uri
            ? headers
            : {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
        body: file && file.uri ? formData : JSON.stringify({query: message}),
      });

      const data = await response.json();
      console.log('Response data:', data);

      // Remove thinking and show bot reply
      setChats(prevChats => {
        const newChats = prevChats.filter(chat => !chat.isThinking);
        return [
          ...newChats,
          {
            message: file && file.uri ? data.data?.response : data.data,
            isUser: false,
            timestamp: new Date().toLocaleTimeString(),
            installments: data.data?.installments || [],
          },
        ];
      });

      if (file && file.uri) {
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
    <ImageBackground
      source={require('../../assets/images/greenishBackground.png')}
      style={[styles.container, {flex: 1}]}
      imageStyle={{resizeMode: 'cover'}}
      resizeMode="cover">
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
          <Header
            onBackPress={() => navigation.goBack()}
            onMenuPress={() => console.log('Menu pressed')}
          />

          <View style={styles.contentContainer}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={{
                flexGrow: 1,
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderWidth: 1,
                borderColor: Colors.white,
                borderBottomWidth: 0,
              }}
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current?.scrollToEnd({animated: true})
              }
              onLayout={() =>
                scrollViewRef.current?.scrollToEnd({animated: true})
              }
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
                  <Text style={styles.greetingText}>Hey {name} 👋</Text>
                  <Text style={styles.subGreetingText}>
                    What would you like help with today?
                  </Text>
                  <View style={[styles.quickActionsContainer, {width: '100%'}]}>
                    <View>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                          paddingVertical: 4,
                          alignItems: 'center',
                        }}>
                        {predefinedActions.map((item, index) => (
                          <TouchableOpacity
                            key={`horizontal-${index}`}
                            style={[
                              styles.quickAction,
                              {
                                width: 153,
                                height: 116,
                                marginRight: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column', // Ensure icon and text are stacked vertically
                              },
                            ]}
                            onPress={() => handleDocumentPick()}>
                            {item.icon}
                            <Text
                              style={[
                                styles.quickActionText,
                                {
                                  marginTop: 12,
                                  lineHeight: 24,
                                },
                              ]}>
                              {item.text}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                    <Text style={styles.tryAsking}>Try Asking</Text>
                    <View style={{alignItems: 'flex-start'}}>
                      {predefinedMessages.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.quickAction,
                            {
                              alignSelf: 'flex-start',
                              minWidth: 0,
                              width: undefined,
                              maxWidth: '100%',
                            },
                          ]}
                          onPress={() => setMessage(item)}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Stars width={20} height={20} />
                            <Text style={styles.quickActionText}>{item}</Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
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
                      <Text
                        style={[
                          chat.isUser ? styles.userText : styles.messageText,
                          chat.isThinking && styles.thinkingText,
                        ]}>
                        {chat.message}
                      </Text>
                      {Array.isArray(chat.installments) &&
                        chat.installments.length > 0 && (
                          <View
                            style={{
                              marginTop: 8,
                              backgroundColor: '#f7f7f7',
                              borderRadius: 8,
                              padding: 4,
                              marginBotton: 4,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                borderBottomWidth: 1,
                                borderColor: '#e0e0e0',
                                paddingBottom: 4,
                                marginBottom: 4,
                              }}>
                              <Text style={{flex: 0.3, fontSize: 10}}>No</Text>
                              <Text style={{flex: 1, fontSize: 10}}>
                                Milestone
                              </Text>
                              <Text style={{flex: 1, fontSize: 10}}>
                                Due Date
                              </Text>
                              <Text style={{flex: 1, fontSize: 10}}>
                                Amount
                              </Text>
                            </View>
                            {chat.installments.map((inst, idx) => (
                              <View
                                key={idx}
                                style={{
                                  flexDirection: 'row',
                                  paddingVertical: 2,
                                }}>
                                <Text style={{flex: 0.3, fontSize: 11}}>
                                  {inst.installment_no}
                                </Text>
                                <Text style={{flex: 1, fontSize: 11}}>
                                  {inst.milestone}
                                </Text>
                                <Text style={{flex: 1, fontSize: 11}}>
                                  {inst.date}
                                </Text>
                                <Text
                                  style={{
                                    flex: 1,
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                  }}>
                                  {Number(inst.amount).toLocaleString()} AED
                                </Text>
                              </View>
                            ))}
                          </View>
                        )}
                      {/* {!chat.isThinking && (
                        <Text style={styles.timestampText}>
                          {chat.timestamp}
                        </Text>
                      )} */}
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
            {/* <View style={styles.inputBar}>
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
            </View> */}
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.3)',
              }}>
              <ChatInputBar
                message={message}
                setMessage={setMessage}
                handleSendMessage={handleSendMessage}
                sendMessageLoading={sendMessageLoading}
                handleDocumentPick={handleDocumentPick}
                // handleMicPress={handleMicPress}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: Colors.background,
    //opacity: 0.9,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  messageText: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: Colors.txtColor,
    marginBottom: 4,
    lineHeight: 21,
  },
  userText: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: Colors.white,
    marginBottom: 4,
    lineHeight: 21,
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
  quickActionsContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'center',
  },
  quickAction: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginLeft: 10,
    textAlign: 'center',
  },
  greetingContainer: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  greetingText: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    textAlign: 'center',
  },
  subGreetingText: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginTop: 8,
    textAlign: 'center',
    marginBottom: 20,
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
  tryAsking: {
    paddingBottom: 16,
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
  },
});

export default HomeScreen;
