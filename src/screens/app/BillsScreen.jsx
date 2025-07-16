import React, {useState, memo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
  Image,
  Modal,
  Switch,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import Header from '../../component/Header';

const {width} = Dimensions.get('window');

// Subscription Modal Component - Extracted and memoized to prevent re-creation
const SubscriptionModal = memo(({
  selectedBill,
  subscriptionModalVisible,
  setSubscriptionModalVisible,
  selectedPlan,
  setSelectedPlan,
  isYearly,
  setIsYearly
}) => {
  if (!selectedBill) return null;

  const plans = [
    {
      name: 'Basic plan- current',
      price: '13.00',
      period: 'month',
      description: 'Per year',
    },
    {
      name: 'Premium plan',
      price: '19.50',
      period: 'month',
      description: 'Per year',
    },
  ];

  const advancedPlan = {
    name: 'Advanced',
    price: '30.00',
    period: 'month',
    description: 'Per year',
  };

  return (
    <Modal
      key="subscription-modal"
      animationType="slide"
      transparent={true}
      visible={subscriptionModalVisible}
      onRequestClose={() => setSubscriptionModalVisible(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.subscriptionModalContent}>
          {/* Green indicator bar */}
          <View style={styles.indicatorBar} />

          {/* Header */}
          <Text style={styles.subscriptionModalTitle}>Manage bill</Text>
          <Text style={styles.subscriptionModalSubtitle}>
            Manage and track your bills due date
          </Text>

          {/* Bill Info with Yearly Toggle */}
          <View style={styles.subscriptionBillInfo}>
            <View style={styles.subscriptionBillLeft}>
              <Image
                source={selectedBill.logo}
                style={styles.subscriptionBillLogo}
              />
              <View style={styles.subscriptionBillDetails}>
                <Text style={styles.subscriptionBillTitle}>
                  {selectedBill.title}
                </Text>
                <Text style={styles.subscriptionBillDescription}>
                  Basic plan - Due in 8 days
                </Text>
              </View>
            </View>
            <View style={styles.subscriptionBillRight}>
              <Text style={styles.subscriptionBillPrice}>AED 32/ month</Text>
              <View style={styles.yearlyToggleContainer}>
                <Text style={styles.yearlyLabel}>Yearly</Text>
                <Switch
                  value={isYearly}
                  onValueChange={value => {
                    setIsYearly(value);
                  }}
                  thumbColor={isYearly ? Colors.white : '#f4f3f4'}
                  trackColor={{false: '#767577', true: Colors.newButtonBack}}
                  style={styles.yearlySwitch}
                />
              </View>
            </View>
          </View>

          {/* Plans */}
          <ScrollView
            style={styles.plansContainer}
            showsVerticalScrollIndicator={false}>
            {plans.map((plan, index) => {
              const isSelected = selectedPlan === plan.name;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.planOption,
                    isSelected && styles.selectedPlanOption,
                  ]}
                  onPress={e => {
                    e.stopPropagation();
                    setSelectedPlan(plan.name);
                  }}>
                  <Text
                    style={[
                      styles.planOptionName,
                      isSelected && styles.selectedPlanOptionText,
                    ]}>
                    {plan.name}
                  </Text>
                  <View style={styles.planOptionPricing}>
                    <Text
                      style={[
                        styles.planOptionPrice,
                        isSelected && styles.selectedPlanOptionText,
                      ]}>
                      AED {plan.price}/{plan.period}
                    </Text>
                    <Text
                      style={[
                        styles.planOptionDescription,
                        isSelected && styles.selectedPlanOptionText,
                      ]}>
                      {plan.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}

            {/* Advanced Section */}
            <Text style={styles.advancedSectionTitle}>Advanced</Text>
            <TouchableOpacity 
              style={[
                styles.planOption,
                selectedPlan === advancedPlan.name &&
                  styles.selectedPlanOption,
              ]}
              onPress={e => {
                e.stopPropagation();
                setSelectedPlan(advancedPlan.name);
              }}>
              <Text 
                style={[
                  styles.planOptionName,
                  selectedPlan === advancedPlan.name &&
                    styles.selectedPlanOptionText,
                ]}>
                {advancedPlan.name}
              </Text>
              <View style={styles.planOptionPricing}>
                <Text 
                  style={[
                    styles.planOptionPrice,
                    selectedPlan === advancedPlan.name &&
                      styles.selectedPlanOptionText,
                  ]}>
                  AED {advancedPlan.price}/{advancedPlan.period}
                </Text>
                <Text 
                  style={[
                    styles.planOptionDescription,
                    selectedPlan === advancedPlan.name &&
                      styles.selectedPlanOptionText,
                  ]}>
                  {advancedPlan.description}
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>

          {/* Action Buttons */}
          <TouchableOpacity 
            style={styles.subscriptionUpgradeButton}
            onPress={() => setSubscriptionModalVisible(false)}>
            <Text style={styles.subscriptionUpgradeButtonText}>
              Upgrade Subscription
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.subscriptionCancelButton}
            onPress={() => setSubscriptionModalVisible(false)}>
            <Text style={styles.subscriptionCancelButtonText}>
              Cancel Subscription
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <Text style={styles.subscriptionFooter}>
            If you cancel this subscription, your service will end on 4th
            March 2026
          </Text>
        </View>
      </View>
    </Modal>
  );
});

SubscriptionModal.displayName = 'SubscriptionModal';

const BillsScreen = ({navigation}) => {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [subscriptionModalVisible, setSubscriptionModalVisible] =
    useState(false);
  const [isYearly, setIsYearly] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState('Basic plan- current');

  // Sample bills data
  const billsData = [
    {
      id: 1,
      title: 'Netflix',
      description: '32 AED Monthly',
      subtitle: 'Due in 8 days',
      color: '#E50914',
      logo: require('../../assets/images/netflix.png'),
    },
    {
      id: 2,
      title: 'Du home internet',
      description: '32 AED Monthly',
      subtitle: 'Due in 8 days',
      color: '#00A651',
      logo: require('../../assets/images/du.png'),
    },
    {
      id: 3,
      title: 'Etisalat Kids plan',
      description: '32 AED Monthly',
      subtitle: 'Due in 8 days',
      color: '#00B04F',
      logo: require('../../assets/images/du.png'),
    },
    {
      id: 4,
      title: 'Amazon Prime',
      description: '32 AED Monthly',
      subtitle: 'Due in 8 days',
      color: '#FF9900',
      logo: require('../../assets/images/amazon.png'),
    },
    {
      id: 5,
      title: 'Spotify',
      description: '32 AED Monthly',
      subtitle: 'Due in 8 days',
      color: '#1DB954',
      logo: require('../../assets/images/spotify.png'),
    },
  ];

  const BillItem = ({bill}) => (
    <TouchableOpacity
      style={styles.billItem}
      onPress={() => {
        setSelectedBill(bill);
        setModalVisible(true);
      }}>
      <View style={styles.billLeft}>
        <View style={[styles.logoContainer]}>
          <Image source={bill.logo} style={styles.billLogo} />
        </View>
        <View style={styles.billInfo}>
          <Text style={styles.billTitle}>{bill.title}</Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              marginTop: 4,
            }}>
            <Text style={[styles.billDescription, {color: Colors.txtColor}]}>
              {bill.description}
            </Text>
            <Text style={styles.billSubtitle}>{bill.subtitle}</Text>
          </View>
        </View>
      </View>
      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );

  const IntroScreen = () => (
    <ImageBackground
      source={require('../../assets/images/greenishBackground.png')}
      style={styles.container}>
      <ScrollView
        // style={styles.introContent}
        contentContainerStyle={{
          paddingBottom: 200,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 100,
          width: '90%',
          borderRadius: 20,
          alignSelf: 'center',
          borderWidth: 1,
          borderColor: Colors.white,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.illustrationContainer}>
          <Image
            source={require('../../assets/images/BillsMain.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.introTitle}>Bills</Text>
          <Text style={styles.introSubtitle}>
            Keep your bills organized, paid, and always on schedule
          </Text>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => setShowIntro(false)}>
          <Text style={styles.startButtonText}>Start Saving</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );

  const BillsDataScreen = () => (
    <ImageBackground
      source={require('../../assets/images/greenishBackground.png')}
      style={styles.container}>
      <SafeAreaView style={styles.billsContainer}>
        <Header
          ScreenName="Bills"
          mainContainer={styles.headerContainer}
          calendar={true}
          onMenuPress={() => navigation.navigate('ShowBillsDate')}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderWidth: 1,
            borderColor: Colors.white,
            borderRadius: 18,
          }}>
          {/* Tab Section */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Upcoming' && styles.activeTab]}
              onPress={() => setActiveTab('Upcoming')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'Upcoming' && styles.activeTabText,
                ]}>
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'Recurring' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('Recurring')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'Recurring' && styles.activeTabText,
                ]}>
                Recurring
              </Text>
            </TouchableOpacity>
          </View>

          {/* Filter Section */}
          <View style={styles.filterContainer}>
            {['All', 'subscriptions', 'monthly bills'].map(filter => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterItem,
                  selectedFilter === filter && styles.activeFilter,
                ]}
                onPress={() => setSelectedFilter(filter)}>
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === filter && styles.activeFilterText,
                  ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* This Month Section */}
          <Text style={styles.sectionTitle}>This Month</Text>

          {/* Bills List */}
          <ScrollView
            style={styles.billsList}
            showsVerticalScrollIndicator={false}>
            {billsData.map(bill => (
              <BillItem key={bill.id} bill={bill} />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );

  // Manage Bill Modal Component
  const ManageBillModal = () => {
    if (!selectedBill) return null;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Manage bill</Text>
            </View>

            {/* Subtitle */}
            <Text style={styles.modalSubtitle}>
              Manage and track your bills due date
            </Text>

            {/* Bill Info Card */}
            <View style={styles.billInfoCard}>
              <View style={styles.billInfoHeader}>
                <Image
                  source={selectedBill.logo}
                  style={styles.modalBillLogo}
                />
                <View style={styles.billInfoDetails}>
                  <Text style={styles.modalBillTitle}>
                    {selectedBill.title}
                  </Text>
                  <Text style={styles.modalBillDescription}>
                    Basic plan - Due in 3 days
                  </Text>
                </View>
                <Text style={styles.modalBillPrice}>AED 32/ month</Text>
              </View>
            </View>

            {/* Action Buttons */}
            <TouchableOpacity
              style={styles.upgradeButton}
              onPress={() => {
                setModalVisible(false);
                setSubscriptionModalVisible(true);
              }}>
              <Text style={styles.upgradeButtonText}>Upgrade Subscription</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel Subscription</Text>
            </TouchableOpacity>

            {/* Footer */}
            <Text style={styles.modalFooter}>
              If you cancel this subscription, your service will end on 4th
              March 2026
            </Text>
          </View>
        </View>
      </Modal>
    );
  };

  

  return (
    <>
      {showIntro ? <IntroScreen /> : <BillsDataScreen />}
      <ManageBillModal />
      <SubscriptionModal
        selectedBill={selectedBill}
        subscriptionModalVisible={subscriptionModalVisible}
        setSubscriptionModalVisible={setSubscriptionModalVisible}
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
        isYearly={isYearly}
        setIsYearly={setIsYearly}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Intro Screen Styles
  introContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  introContent: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 700,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
    marginTop: 100,
  },
  illustrationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: 350,
    height: 350,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
    flex: 0.8,
  },
  introTitle: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.background,
    marginBottom: 8,
    textAlign: 'center',
  },
  introSubtitle: {
    fontSize: 32,
    fontFamily: FontFamily.bold,
    color: Colors.black,
    textAlign: 'center',
    lineHeight: 38,
  },
  startButton: {
    backgroundColor: Colors.newButtonBack,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 1000,
    width: '90%',
    alignItems: 'center',
  },
  startButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  // Bills Data Screen Styles
  billsContainer: {
    flex: 1,
    borderRadius: 18,
    marginTop: 60,
    // marginHorizontal: 14,
  },
  headerContainer: {
    paddingBottom: 30,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 25,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: Colors.txtColor,
  },
  tabText: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.grayIcon,
  },
  activeTabText: {
    color: Colors.white,
  },
  filterContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    gap: 10,
  },
  filterItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
    borderColor: Colors.white,
  },
  activeFilter: {
    borderWidth: 1,
    borderColor: Colors.newButtonBack,
  },
  filterText: {
    fontSize: 13,
    fontFamily: FontFamily.medium,
    color: Colors.grayIcon,
  },
  activeFilterText: {
    color: Colors.newButtonBack,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  billsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  billItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.17)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  billLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    width: 38,
    height: 38,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  billLogo: {
    width: 38,
    height: 38,
    borderRadius: 4,
  },
  billInfo: {
    flex: 1,
  },
  billTitle: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginBottom: 2,
  },
  billDescription: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
    marginBottom: 2,
  },
  billSubtitle: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
  },
  arrowContainer: {
    marginLeft: 8,
  },
  arrow: {
    fontSize: 20,
    color: Colors.grayIcon,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#E0F2F1',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    minHeight: '0%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 32,
    fontFamily: FontFamily.bold,
    color: Colors.txtColor,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  closeButtonText: {
    fontSize: 20,
    color: Colors.txtColor,
    fontWeight: 'bold',
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
    marginBottom: 24,
  },
  billInfoCard: {
    borderRadius: 15,
    marginBottom: 25,
    width: '100%',
  },
  billInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  billInfoDetails: {
    flex: 1,
    marginLeft: 12,
  },
  modalBillLogo: {
    width: 45,
    height: 45,
    borderRadius: 8,
  },
  modalBillTitle: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
  },
  modalBillDescription: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
    marginTop: 10,
  },
  modalBillPrice: {
    fontSize: 18,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
  upgradeButton: {
    backgroundColor: Colors.newButtonBack,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  upgradeButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  cancelButton: {
    backgroundColor: Colors.white,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelButtonText: {
    color: Colors.red,
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  modalFooter: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  modalHandle: {
    width: 55,
    height: 7,
    backgroundColor: Colors.background,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  // Subscription Modal Styles
  subscriptionModalContent: {
    backgroundColor: '#E0F2F1',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    minHeight: '0%',
  },
  indicatorBar: {
    width: 55,
    height: 7,
    backgroundColor: Colors.background,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  subscriptionModalTitle: {
    fontSize: 32,
    fontFamily: FontFamily.bold,
    color: Colors.txtColor,
    marginBottom: 8,
  },
  subscriptionModalSubtitle: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
    marginBottom: 24,
  },
  subscriptionBillInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  subscriptionBillLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  subscriptionBillLogo: {
    width: 45,
    height: 45,
    borderRadius: 8,
    marginRight: 12,
  },
  subscriptionBillDetails: {
    flex: 1,
  },
  subscriptionBillTitle: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginBottom: 2,
  },
  subscriptionBillDescription: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
  },
  subscriptionBillRight: {
    alignItems: 'flex-end',
  },
  subscriptionBillPrice: {
    fontSize: 18,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginBottom: 10,
  },
  yearlyToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yearlyLabel: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.grayIcon,
    marginRight: 10,
  },
  yearlySwitch: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}], // Adjust scale for Switch
  },
  plansContainer: {
    marginBottom: 20,
  },
  planOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.17)',
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  selectedPlanOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderColor: Colors.newButtonBack,
  },
  planOptionName: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginBottom: 5,
  },
  selectedPlanOptionText: {
    color: Colors.newButtonBack,
  },
  planOptionPricing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  planOptionPrice: {
    fontSize: 18,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
  planOptionDescription: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
  },
  advancedSectionTitle: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginTop: 20,
    marginBottom: 12,
  },
  subscriptionUpgradeButton: {
    backgroundColor: Colors.newButtonBack,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  subscriptionUpgradeButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  subscriptionCancelButton: {
    backgroundColor: Colors.white,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  subscriptionCancelButtonText: {
    color: Colors.red,
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  subscriptionFooter: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 10,
  },
});

export default BillsScreen;
