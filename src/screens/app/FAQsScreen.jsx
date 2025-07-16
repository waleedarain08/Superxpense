import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import Header from '../../component/Header';
import {ChevronDown, ChevronUp} from '../../icons';

const FAQsScreen = ({navigation}) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = sectionId => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const faqData = [
    {
      id: 'billing',
      title: 'Billing & Subscription',
      questions: [
        {
          question: 'How do I upgrade to Pro?',
          answer:
            'You can upgrade to Pro by going to Settings > Subscription and selecting your preferred plan. Choose between monthly or yearly billing options.',
        },
        {
          question: 'Can I cancel anytime?',
          answer:
            'Yes, you can cancel your subscription anytime from your App Store account settings. Your subscription will remain active until the end of the current billing period.',
        },
      ],
    },
    {
      id: 'bank',
      title: 'Bank Connection',
      questions: [
        {
          question: 'Is it safe to connect my bank?',
          answer:
            'Yes, we use bank-level encryption and never store your banking credentials. We partner with trusted financial data providers to ensure your data is secure.',
        },
        {
          question: 'What happens if sync fails?',
          answer:
            'If sync fails, check your internet connection and ensure your bank credentials are correct. You can also try reconnecting your bank account from the Accounts section.',
        },
      ],
    },
    {
      id: 'privacy',
      title: 'Privacy & Data',
      questions: [
        {
          question: 'Do you sell my data?',
          answer:
            'No, we never sell your personal data. We take your privacy seriously and only use your data to provide you with the best financial insights and features.',
        },
        {
          question: 'How do I delete my account?',
          answer:
            'You can delete your account from Settings > Delete Account. This action is permanent and will remove all your data within 24 hours.',
        },
      ],
    },
    {
      id: 'features',
      title: 'App Features',
      questions: [
        {
          question: 'How do I set a budget?',
          answer:
            'Go to the Budget tab and tap the + button to create a new budget. Set your spending limit and category, then track your progress throughout the month.',
        },
        {
          question: 'Can I add a custom category?',
          answer:
            'Yes, when adding a transaction or setting up a budget, you can create custom categories to better organize your spending according to your needs.',
        },
      ],
    },
  ];

  const FAQSection = ({section}) => {
    const isExpanded = expandedSections[section.id];

    return (
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection(section.id)}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {isExpanded ? (
            <ChevronUp size={20} color={Colors.txtColor} />
          ) : (
            <ChevronDown size={20} color={Colors.txtColor} />
          )}
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.questionsContainer}>
            {section.questions.map((item, index) => (
              <View key={index} style={styles.questionItem}>
                <Text style={styles.question}>{item.question}</Text>
                <Text style={styles.answer}>{item.answer}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/images/greenishBackground.png')}
      style={styles.container}
      imageStyle={{resizeMode: 'cover'}}>
      <Header
        ScreenName="FAQs"
        mainContainer={{marginTop: 40}}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Frequently Asked Questions</Text>
        {faqData.map(section => (
          <FAQSection key={section.id} section={section} />
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.white,
    marginBottom: 16,
    overflow: 'hidden',
    padding: 16,
    marginHorizontal: 16,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.white,
    marginBottom: 16,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
  questionsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  questionItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  question: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginBottom: 8,
  },
  answer: {
    fontSize: 13,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
    lineHeight: 18,
  },
});

export default FAQsScreen;
