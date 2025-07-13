import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {ChevronLeft, ChevronRight} from '../../icons';
import DualRingProgress from '../../component/DualRingProgress';
import LinearGradient from 'react-native-linear-gradient';
import {Goal, Car, PopCorn, Heart, Bulb, Plus, Credit} from '../../assets/svgs';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

const goals = [
  {
    id: 1,
    icon: '🏠',
    title: 'Buy House',
    subtitle: 'Own a new property!',
    percent: 50,
    min: '50,000 AED',
    max: '100,000 AED',
    color: '#7563FF',
  },
  {
    id: 2,
    icon: '🚗',
    title: 'Get New Car',
    subtitle: 'Buy your dream car',
    percent: 100,
    min: '100,000 AED',
    max: '100,000 AED',
    color: '#3C00FF',
  },
  {
    id: 3,
    icon: '💍',
    title: 'Weeding',
    subtitle: 'Celebrate your wedding',
    percent: 66,
    min: '66,000 AED',
    max: '100,000 AED',
    color: '#00C48C',
  },
  {
    id: 4,
    icon: '💰',
    title: 'Emergency fund',
    subtitle: 'Save for rainy days',
    percent: 20,
    min: '20,000 AED',
    max: '100,000 AED',
    color: '#FFB800',
  },
  {
    id: 5,
    icon: '🎂',
    title: 'Birthday',
    subtitle: 'Enjoy a special day',
    percent: 10,
    min: '10,000 AED',
    max: '100,000 AED',
    color: '#FF647C',
  },
];

const goalTypes = [
  {
    key: 'house',
    icon: <Goal width={32} height={32} />,
    title: 'Buy house',
    subtitle: 'Own another property',
  },
  {
    key: 'car',
    icon: <Car width={32} height={32} />,
    title: 'Get New Car',
    subtitle: 'Buy your dream car',
  },
  {
    key: 'birthday',
    icon: <PopCorn width={32} height={32} />,
    title: 'Birthday',
    subtitle: 'Enjoy a special day',
  },
  {
    key: 'wedding',
    icon: <Heart width={32} height={32} />,
    title: 'Weeding',
    subtitle: 'Celebrate your wedding',
  },
  {
    key: 'emergency',
    icon: <Bulb width={32} height={32} />,
    title: 'Emergency',
    subtitle: 'Save for rainy days',
  },
  {
    key: 'more',
    icon: <Plus width={32} height={32} />,
    title: 'More',
    subtitle: 'Save for your dreams',
  },
];

const mockAccounts = [
  {
    id: 'fab',
    name: 'First Abu Dhabi Bank',
    type: 'Current Account',
    logo: require('../../assets/images/dubaiBank.png'),
    color: '#F36B6B',
  },
  {
    id: 'adib',
    name: 'Abu Dhabi Islamic Bank',
    type: 'Current Account',
    logo: require('../../assets/images/dubaiIslamic.png'),
    color: '#7B7BFF',
  },
];

const DotsProgressBar = ({percent, color}) => {
  // 20 dots, fill based on percent
  const totalDots = 20;
  const filledDots = Math.round((percent / 100) * totalDots);
  // Define four colors for the four segments
  const segmentColors = [
    '#FF647C', // 0-25%
    '#FFB800', // 26-50%
    '#00C48C', // 51-75%
    '#7563FF', // 76-100%
  ];
  return (
    <View style={styles.dotsBarRow}>
      {[...Array(totalDots)].map((_, i) => {
        // Determine which color segment this dot belongs to
        let segIdx = 0;
        if (i >= 15) segIdx = 3;
        else if (i >= 10) segIdx = 2;
        else if (i >= 5) segIdx = 1;
        // else segIdx = 0;
        const dotColor = segmentColors[segIdx];
        return (
          <View
            key={i}
            style={[
              styles.dot,
              i < filledDots
                ? {backgroundColor: dotColor, opacity: 1}
                : {backgroundColor: dotColor, opacity: 0.2},
            ]}
          />
        );
      })}
    </View>
  );
};

const GoalCard = ({icon, title, subtitle, percent, min, max, color}) => (
  <View style={styles.card}>
    <View style={styles.cardHeaderRow}>
      <DualRingProgress
        percent={percent}
        color={color}
        size={44}
        strokeWidth={5}
        backgroundColor={'#E0E0E0'}>
        <Text style={styles.cardIcon}>{icon}</Text>
      </DualRingProgress>
      <View style={{flex: 1, marginLeft: 10}}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
      <Text style={[styles.cardPercent, {color}]}>{percent}%</Text>
    </View>
    <DotsProgressBar percent={percent} color={color} />
    <View style={styles.cardMinMaxRow}>
      <Text style={styles.cardMin}>{min}</Text>
      <Text style={styles.cardMax}>{max}</Text>
    </View>
  </View>
);

const StepTwoGoalType = ({selected, onSelect, onNext}) => (
  <View style={styles.stepTwoContainer}>
    <Text style={styles.stepTwoTitle}>Create a goal</Text>
    <Text style={styles.stepTwoSubtitle}>What are you saving for?</Text>
    <View style={styles.goalTypeGrid}>
      {goalTypes.map(type => (
        <TouchableOpacity
          key={type.key}
          style={[
            styles.goalTypeCard,
            selected === type.key && styles.goalTypeCardSelected,
          ]}
          onPress={() => onSelect(type.key)}
          activeOpacity={0.8}>
          {type.icon}
          <Text style={styles.goalTypeCardTitle}>{type.title}</Text>
          <Text style={styles.goalTypeCardSubtitle}>{type.subtitle}</Text>
        </TouchableOpacity>
      ))}
    </View>
    <TouchableOpacity
      style={[styles.stepTwoNextBtn, !selected && {opacity: 0.5}]}
      onPress={onNext}
      disabled={!selected}>
      <Text style={styles.stepTwoNextBtnText}>Next</Text>
    </TouchableOpacity>
  </View>
);

const StepThreeGoalDetails = ({
  goalName,
  setGoalName,
  goalAmount,
  setGoalAmount,
  savedSoFar,
  setSavedSoFar,
  selectedAccount,
  setSelectedAccount,
  onNext,
}) => (
  <View style={styles.stepThreeContainer}>
    <Text style={styles.stepTwoTitle}>Create a goal</Text>
    <Text style={styles.stepTwoSubtitle}>
      Create a new goal to achieve your dreams
    </Text>
    <View style={styles.stepThreeFormBox}>
      <View style={styles.inputRow}>
        <Credit width={22} height={22} style={{marginRight: 8}} />
        <TextInput
          style={styles.input}
          placeholder="Goal Name"
          value={goalName}
          onChangeText={setGoalName}
          placeholderTextColor={Colors.grayIcon}
        />
      </View>
      <View style={styles.inputRow}>
        <Credit width={22} height={22} style={{marginRight: 8}} />
        <TextInput
          style={styles.input}
          placeholder="Goal Amount"
          value={goalAmount}
          onChangeText={setGoalAmount}
          placeholderTextColor={Colors.grayIcon}
          keyboardType="numeric"
        />
        <Text style={styles.inputSuffix}>AED</Text>
      </View>
      <View style={styles.inputRow}>
        <Credit width={22} height={22} style={{marginRight: 8}} />
        <TextInput
          style={styles.input}
          placeholder="Saved so far"
          value={savedSoFar}
          onChangeText={setSavedSoFar}
          placeholderTextColor={Colors.grayIcon}
          keyboardType="numeric"
        />
      </View>
    </View>
    <Text style={styles.sourceAccountLabel}>
      Source Account <Text style={styles.viewAccounts}>View accounts</Text>
    </Text>
    <View style={styles.accountList}>
      {mockAccounts.map(acc => (
        <TouchableOpacity
          key={acc.id}
          style={[
            styles.accountCard,
            selectedAccount === acc.id && {
              borderColor: acc.color,
              backgroundColor: acc.color + '22',
            },
          ]}
          onPress={() => setSelectedAccount(acc.id)}
          activeOpacity={0.8}>
          <Image source={acc.logo} style={styles.accountLogo} />
          <View style={{flex: 1}}>
            <Text style={[styles.accountName, {color: acc.color}]}>
              {acc.name}
            </Text>
            <Text style={styles.accountType}>{acc.type}</Text>
          </View>
          <View
            style={[
              styles.radioOuter,
              selectedAccount === acc.id && {borderColor: acc.color},
            ]}>
            {selectedAccount === acc.id && (
              <View style={[styles.radioInner, {backgroundColor: acc.color}]} />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
    <View style={styles.accountHintRow}>
      <Text style={styles.accountHintText}>
        You can always switch account later from settings
      </Text>
    </View>
    <TouchableOpacity
      style={[
        styles.stepTwoNextBtn,
        !(goalName && goalAmount && selectedAccount) && {opacity: 0.5},
      ]}
      onPress={onNext}
      disabled={!(goalName && goalAmount && selectedAccount)}>
      <Text style={styles.stepTwoNextBtnText}>Next</Text>
    </TouchableOpacity>
  </View>
);

const StepFourSelectSourceAccount = ({
  selectedSource,
  setSelectedSource,
  onNext,
}) => (
  <View style={styles.stepFourContainer}>
    <Text style={styles.stepFourTitle}>Select Source Account</Text>
    <Text style={styles.stepFourSubtitle}>
      select the bank you will use to save from
    </Text>
    <View style={styles.sourceAccountList}>
      {mockAccounts.map(acc => (
        <ImageBackground
          key={acc.id}
          source={require('../../assets/images/cardBackground.png')}
          style={[
            styles.sourceAccountCard,
            selectedSource === acc.id && {borderColor: acc.color},
          ]}
          imageStyle={styles.sourceAccountCardImage}>
          <View style={styles.sourceAccountCardContent}>
            <Image source={acc.logo} style={styles.sourceAccountLogo} />
            <View style={{flex: 1}}>
              <Text style={[styles.sourceAccountName, {color: acc.color}]}>
                {acc.name}
              </Text>
              <View style={styles.sourceAccountTypeRow}>
                <Text style={styles.sourceAccountType}>Current Account</Text>
                <Text style={styles.sourceAccountBalance}>฿ 35,000.00</Text>
              </View>
              <View style={styles.sourceAccountTypeRow}>
                <Text style={styles.sourceAccountType}>Savings Account</Text>
                <Text style={styles.sourceAccountBalance}>฿ 35,000.00</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.radioOuter,
                selectedSource === acc.id && {borderColor: acc.color},
              ]}
              onPress={() => setSelectedSource(acc.id)}
              activeOpacity={0.8}>
              {selectedSource === acc.id && (
                <View
                  style={[styles.radioInner, {backgroundColor: acc.color}]}
                />
              )}
            </TouchableOpacity>
          </View>
        </ImageBackground>
      ))}
    </View>
    <TouchableOpacity
      style={[styles.selectAccountBtn, !selectedSource && {opacity: 0.5}]}
      onPress={onNext}
      disabled={!selectedSource}>
      <Text style={styles.selectAccountBtnText}>Select Account</Text>
    </TouchableOpacity>
  </View>
);

const StepFiveGoalCalendar = ({weekRange, setWeekRange, onCreateGoal}) => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      // When start date is selected, automatically calculate end date (7 days later)
      const startDate = moment(date);
      const endDate = startDate.clone().add(6, 'days');

      setSelectedStartDate(date);
      setSelectedEndDate(endDate);

      setWeekRange({
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
      });
    }
  };

  const onMonthChange = date => {
    setCurrentMonth(moment(date));
  };

  const navigateMonth = direction => {
    const newMonth = currentMonth.clone().add(direction, 'month');
    setCurrentMonth(newMonth);
  };

  const formatDateRange = () => {
    if (selectedStartDate && selectedEndDate) {
      const start = moment(selectedStartDate).format('MMM DD');
      const end = moment(selectedEndDate).format('MMM DD, YYYY');
      return `${start} - ${end}`;
    }
    return 'Select a week';
  };

  const customDayHeaderStylesCallback = () => {
    return {
      textStyle: {
        color: '#666',
        fontSize: 12,
        fontFamily: 'Gilroy-Medium',
        fontWeight: '500',
      },
    };
  };

  const customDatesStylesCallback = date => {
    const momentDate = moment(date);
    const isSelected =
      selectedStartDate &&
      selectedEndDate &&
      momentDate.isBetween(selectedStartDate, selectedEndDate, 'day', '[]');

    if (isSelected) {
      return {
        style: {
          backgroundColor: '#00C48C',
          borderRadius: 8,
        },
        textStyle: {
          color: '#fff',
          fontFamily: 'Gilroy-Bold',
          fontWeight: 'bold',
        },
      };
    }
    return {};
  };

  return (
    <LinearGradient
      colors={['#A8E6CF', '#E8F5E8', '#F0F8F0']}
      style={styles.stepFiveContainer}>
      {/* Header */}
      <View style={styles.stepFiveHeader}>
        <Text style={styles.stepFiveTitle}>Create a goal</Text>
        <Text style={styles.stepFiveSubtitle}>
          how long do you want to save?
        </Text>
        <Text style={styles.stepFiveDateLabel}>Start date - End date</Text>
      </View>

      {/* Calendar Container */}
      <View style={styles.calendarContainer}>
        {/* Custom Calendar Header */}
        <View style={styles.customCalendarHeader}>
          <TouchableOpacity
            style={styles.calendarArrowButton}
            onPress={() => navigateMonth(-1)}>
            <Text style={styles.calendarArrowText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.calendarMonthText}>
            {currentMonth.format('MMMM YYYY')}
          </Text>

          <TouchableOpacity
            style={styles.calendarArrowButton}
            onPress={() => navigateMonth(1)}>
            <Text style={styles.calendarArrowText}>›</Text>
          </TouchableOpacity>
        </View>

        <CalendarPicker
          startFromMonday={false}
          allowRangeSelection={false}
          selectedDayColor="#00C48C"
          selectedDayTextColor="#FFFFFF"
          scaleFactor={375}
          textStyle={{
            fontFamily: 'Gilroy-Medium',
            color: '#333',
            fontSize: 16,
          }}
          onDateChange={onDateChange}
          onMonthChange={onMonthChange}
          customDayHeaderStyles={customDayHeaderStylesCallback}
          customDatesStyles={customDatesStylesCallback}
          hideArrows={true}
          hideExtraDays={true}
          disableMonthChange={true}
          initialDate={currentMonth.toDate()}
          dayLabelsWrapper={{
            borderTopWidth: 0,
            borderBottomWidth: 0,
            paddingBottom: 10,
          }}
          previousTitle=""
          nextTitle=""
          previousTitleStyle={{display: 'none'}}
          // nextTitleStyle={{ display: 'none' }}
          monthTitleStyle={{display: 'none'}}
          yearTitleStyle={{display: 'none'}}
          todayBackgroundColor="transparent"
          todayTextStyle={{
            color: '#00C48C',
            fontFamily: 'Gilroy-Bold',
          }}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          minDate={moment()}
          width={320}
          height={250}
        />
      </View>

      {/* Create Goal Button */}
      <TouchableOpacity
        style={[
          styles.createGoalButton,
          !selectedStartDate && styles.createGoalButtonDisabled,
        ]}
        onPress={onCreateGoal}
        disabled={!selectedStartDate}>
        <Text style={styles.createGoalButtonText}>Create Goal</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const StepOneCard = ({onStart}) => (
  <View style={styles.stepOneCard}>
    <View style={styles.stepOneImageWrapper}>
      {/* Replace with your actual image asset */}
      <Image
        source={require('../../assets/images/moneyBagImage.png')}
        style={styles.stepOneImage}
        resizeMode="contain"
      />
    </View>
    <Text style={styles.stepOneLabel}>Saving & goals</Text>
    <Text style={styles.stepOneTitle}>
      Save for tomorrow,{'\n'}without sacrificing today
    </Text>
    <TouchableOpacity style={styles.stepOneBtn} onPress={onStart}>
      <Text style={styles.stepOneBtnText}>Start Saving</Text>
    </TouchableOpacity>
  </View>
);

const AddGoals = ({navigation}) => {
  const [showStepper, setShowStepper] = useState(false);
  const [step, setStep] = useState(0); // 0-4 for 5 steps
  const [selectedGoalType, setSelectedGoalType] = useState(null);
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [savedSoFar, setSavedSoFar] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedSourceAccount, setSelectedSourceAccount] = useState(null);
  const [weekRange, setWeekRange] = useState({startDate: '', endDate: ''});
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else setShowStepper(false); // finish
  };
  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else setShowStepper(false); // exit stepper
  };

  const handleCreateGoal = () => {
    setShowLoadingModal(true);

    // After 3 seconds, hide the modal and return to the same screen
    setTimeout(() => {
      setShowLoadingModal(false);
      setShowStepper(false);
    }, 3000);
  };

  // Loading Modal Component
  const LoadingModal = () => (
    <Modal visible={showLoadingModal} transparent={true} animationType="fade">
      <LinearGradient
        colors={['#A8E6CF', '#E8F5E8', '#F0F8F0']}
        style={styles.loadingModalContainer}>
        <View style={styles.loadingContent}>
          <Text style={styles.loadingTitle}>Creating your goal</Text>
          <Text style={styles.loadingSubtitle}>
            Your goal is almost ready, let's make it happen.
          </Text>

          <View style={styles.loadingSpinnerContainer}>
            <ActivityIndicator size="large" color="#00C48C" />
          </View>
        </View>
      </LinearGradient>
    </Modal>
  );

  // Placeholder content for each step
  const stepContents = [
    <StepOneCard key={0} onStart={() => setStep(1)} />, // Step 1: Card with Start Saving
    <StepTwoGoalType
      key={1}
      selected={selectedGoalType}
      onSelect={setSelectedGoalType}
      onNext={() => setStep(2)}
    />,
    <StepThreeGoalDetails
      key={2}
      goalName={goalName}
      setGoalName={setGoalName}
      goalAmount={goalAmount}
      setGoalAmount={setGoalAmount}
      savedSoFar={savedSoFar}
      setSavedSoFar={setSavedSoFar}
      selectedAccount={selectedAccount}
      setSelectedAccount={setSelectedAccount}
      onNext={() => setStep(3)}
    />,
    <StepFourSelectSourceAccount
      key={3}
      selectedSource={selectedSourceAccount}
      setSelectedSource={setSelectedSourceAccount}
      onNext={() => setStep(4)}
    />,
    <StepFiveGoalCalendar
      key={4}
      weekRange={weekRange}
      setWeekRange={setWeekRange}
      onCreateGoal={handleCreateGoal}
    />,
  ];

  if (showStepper) {
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
            <ChevronLeft size={24} color={Colors.txtColor} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Goal</Text>
          <View style={{width: 32}} />
        </View>
        <View style={styles.stepperBody}>{stepContents[step]}</View>
        <View style={styles.stepperFooter}>
          <TouchableOpacity
            style={[styles.stepperBtn, step === 0 && {opacity: 0.5}]}
            onPress={handleBack}
            disabled={step === 0}>
            <Text style={styles.stepperBtnText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stepperBtn} onPress={handleNext}>
            <Text style={styles.stepperBtnText}>
              {step === 4 ? 'Finish' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
        <LoadingModal />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <ChevronLeft size={24} color={Colors.txtColor} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Goals</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            setShowStepper(true);
            setStep(0);
          }}>
          <Text style={styles.addBtnPlus}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>
        Track your goals and see how far you’ve come
      </Text>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {goals.map(goal => (
          <GoalCard key={goal.id} {...goal} />
        ))}
      </ScrollView>
      <LoadingModal />
    </View>
  );
};

export default AddGoals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf6fb',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  backBtn: {
    marginRight: 8,
    padding: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    flex: 1,
    textAlign: 'center',
    marginRight: 32,
  },
  addBtn: {
    backgroundColor: Colors.green,
    borderRadius: 100,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnPlus: {
    color: '#fff',
    fontSize: 22,
    fontFamily: FontFamily.semiBold,
    marginTop: -2,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
    textAlign: 'center',
    marginBottom: 12,
  },
  scrollView: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardIcon: {
    fontSize: 28,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    flex: 1,
  },
  cardPercent: {
    fontSize: 15,
    color: Colors.green,
    fontFamily: FontFamily.semiBold,
  },
  cardSubtitle: {
    fontSize: 13,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
    marginBottom: 8,
  },
  progressBarBg: {
    width: '100%',
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  cardMinMaxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardMin: {
    fontSize: 12,
    color: Colors.grayIcon,
    fontFamily: FontFamily.medium,
  },
  cardMax: {
    fontSize: 12,
    color: Colors.grayIcon,
    fontFamily: FontFamily.medium,
  },
  dotsBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginBottom: 8,
    gap: 2,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 1,
  },
  stepContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: 22,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginTop: 40,
  },
  stepperBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  stepperFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  stepperBtn: {
    backgroundColor: Colors.green,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 28,
  },
  stepperBtnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  stepOneCard: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#b6e0e6',
    padding: 24,
    alignItems: 'center',
    margin: 24,
    marginTop: 40,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
  },
  stepOneImageWrapper: {
    width: 120,
    height: 120,
    marginBottom: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepOneImage: {
    width: 110,
    height: 110,
  },
  stepOneLabel: {
    color: '#00C48C',
    fontSize: 14,
    fontFamily: FontFamily.medium,
    marginBottom: 8,
  },
  stepOneTitle: {
    color: Colors.txtColor,
    fontSize: 20,
    fontFamily: FontFamily.semiBold,
    textAlign: 'center',
    marginBottom: 24,
  },
  stepOneBtn: {
    backgroundColor: Colors.green,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 8,
  },
  stepOneBtnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  stepTwoContainer: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#b6e0e6',
    padding: 18,
    margin: 18,
    marginTop: 30,
    alignItems: 'center',
  },
  stepTwoTitle: {
    fontSize: 20,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginBottom: 4,
    marginTop: 8,
    textAlign: 'center',
  },
  stepTwoSubtitle: {
    fontSize: 14,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
    marginBottom: 18,
    textAlign: 'center',
  },
  goalTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 18,
  },
  goalTypeCard: {
    width: '47%',
    backgroundColor: '#eaf6fb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#b6e0e6',
    alignItems: 'center',
    paddingVertical: 18,
    marginBottom: 12,
  },
  goalTypeCardSelected: {
    borderColor: Colors.green,
    backgroundColor: '#d2f5e7',
  },
  goalTypeCardTitle: {
    fontSize: 15,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginTop: 8,
    marginBottom: 2,
    textAlign: 'center',
  },
  goalTypeCardSubtitle: {
    fontSize: 12,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
    textAlign: 'center',
  },
  stepTwoNextBtn: {
    backgroundColor: Colors.green,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 8,
    width: '100%',
    alignItems: 'center',
  },
  stepTwoNextBtnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  stepThreeContainer: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#b6e0e6',
    padding: 18,
    margin: 18,
    marginTop: 30,
    alignItems: 'center',
  },
  stepThreeFormBox: {
    width: '100%',
    marginBottom: 18,
    marginTop: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaf6fb',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#b6e0e6',
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.txtColor,
    fontFamily: FontFamily.regular,
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  inputSuffix: {
    fontSize: 14,
    color: Colors.grayIcon,
    fontFamily: FontFamily.medium,
    marginLeft: 6,
  },
  sourceAccountLabel: {
    fontSize: 15,
    color: Colors.txtColor,
    fontFamily: FontFamily.semiBold,
    marginBottom: 6,
    marginTop: 2,
    alignSelf: 'flex-start',
  },
  viewAccounts: {
    color: Colors.green,
    fontSize: 13,
    fontFamily: FontFamily.medium,
    marginLeft: 8,
  },
  accountList: {
    width: '100%',
    marginBottom: 8,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#b6e0e6',
    backgroundColor: '#eaf6fb',
    padding: 12,
    marginBottom: 10,
  },
  accountLogo: {
    width: 38,
    height: 38,
    borderRadius: 8,
    marginRight: 12,
  },
  accountName: {
    fontSize: 15,
    fontFamily: FontFamily.semiBold,
    marginBottom: 2,
  },
  accountType: {
    fontSize: 13,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#b6e0e6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  accountHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 2,
    width: '100%',
  },
  accountHintText: {
    color: Colors.green,
    fontSize: 13,
    fontFamily: FontFamily.regular,
    marginLeft: 4,
  },
  stepFourContainer: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#b6e0e6',
    width: '90%',
    padding: 18,
    margin: 18,
    marginTop: 30,
    alignItems: 'center',
  },
  stepFourTitle: {
    fontSize: 20,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginBottom: 4,
    marginTop: 8,
    textAlign: 'center',
  },
  stepFourSubtitle: {
    fontSize: 14,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
    marginBottom: 18,
    textAlign: 'center',
  },
  sourceAccountList: {
    width: '100%',
    marginBottom: 8,
  },
  sourceAccountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    marginBottom: 16,
    padding: 16,
    overflow: 'hidden',
  },
  sourceAccountCardImage: {
    borderRadius: 16,
    resizeMode: 'cover',
  },
  sourceAccountCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sourceAccountLogo: {
    width: 38,
    height: 38,
    borderRadius: 8,
    marginRight: 12,
  },
  sourceAccountName: {
    fontSize: 15,
    fontFamily: FontFamily.semiBold,
    marginBottom: 2,
  },
  sourceAccountTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  sourceAccountType: {
    fontSize: 13,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
  },
  sourceAccountBalance: {
    fontSize: 13,
    color: Colors.txtColor,
    fontFamily: FontFamily.semiBold,
  },
  selectAccountBtn: {
    backgroundColor: Colors.green,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  selectAccountBtnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  stepFiveContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  stepFiveHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  stepFiveTitle: {
    fontSize: 24,
    fontFamily: 'Gilroy-Bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  stepFiveSubtitle: {
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  stepFiveDateLabel: {
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
    color: '#666',
    textAlign: 'center',
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 40,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  customCalendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  calendarArrowButton: {
    padding: 8,
  },
  calendarArrowText: {
    fontSize: 20,
    color: '#6B46C1',
    fontFamily: 'Gilroy-Bold',
  },
  calendarMonthText: {
    fontSize: 18,
    fontFamily: 'Gilroy-Bold',
    color: '#000',
  },
  createGoalButton: {
    backgroundColor: '#00C48C',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  createGoalButtonDisabled: {
    backgroundColor: '#ccc',
  },
  createGoalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Gilroy-Bold',
    fontWeight: 'bold',
  },
  loadingModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingTitle: {
    fontSize: 24,
    fontFamily: 'Gilroy-Bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  loadingSubtitle: {
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  loadingSpinnerContainer: {
    marginTop: 20,
  },
});
