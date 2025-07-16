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
  Animated,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {
  ChevronLeft,
  ChevronRight,
  EntoChevronRight,
  PlusIcon,
} from '../../icons';
import DualRingProgress from '../../component/DualRingProgress';
import LinearGradient from 'react-native-linear-gradient';
import {
  Goal,
  Car,
  PopCorn,
  Heart,
  Bulb,
  Plus,
  Credit,
  Houses,
  Cars,
  Rings,
  DotsSvg,
  Emergency,
  Birthday,
  GoalSvg,
  Amount,
  SaveCard,
  BlubIcon,
  DirhamWhite,
} from '../../assets/svgs';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

const goals = [
  {
    id: 1,
    icon: <Houses width={40} height={40} />,
    title: 'Buy House',
    subtitle: 'Own a new property!',
    percent: 50,
    min: '50,000 AED',
    max: '100,000 AED',
    color: Colors.newButtonBack,
  },
  {
    id: 2,
    icon: <Cars width={40} height={40} />,
    title: 'Get New Car',
    subtitle: 'Buy your dream car',
    percent: 100,
    min: '100,000 AED',
    max: '100,000 AED',
    color: Colors.newButtonBack,
  },
  {
    id: 3,
    icon: <Rings width={40} height={40} />,
    title: 'Weeding',
    subtitle: 'Celebrate your wedding',
    percent: 66,
    min: '66,000 AED',
    max: '100,000 AED',
    color: Colors.newButtonBack,
  },
];

const goalTypes = [
  {
    key: 'house',
    icon: <Houses width={48} height={48} />,
    title: 'Buy house',
    subtitle: 'Own another property',
  },
  {
    key: 'car',
    icon: <Cars width={48} height={48} />,
    title: 'Get New Car',
    subtitle: 'Buy your dream car',
  },
  {
    key: 'birthday',
    icon: <Birthday width={48} height={48} />,
    title: 'Birthday',
    subtitle: 'Enjoy a special day',
  },
  {
    key: 'wedding',
    icon: <Rings width={48} height={48} />,
    title: 'Weeding',
    subtitle: 'Celebrate your wedding',
  },
  {
    key: 'emergency',
    icon: <Emergency width={48} height={48} />,
    title: 'Emergency',
    subtitle: 'Save for rainy days',
  },
  {
    key: 'more',
    icon: <DotsSvg width={48} height={48} />,
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
    bg: require('../../assets/images/redCard.png'),
  },
  {
    id: 'adib',
    name: 'Abu Dhabi Islamic Bank',
    type: 'Current Account',
    logo: require('../../assets/images/dubaiIslamic.png'),
    color: '#7B7BFF',
    bg: require('../../assets/images/purpleCard.png'),
  },
];

const DotsProgressBar = ({percent, color}) => {
  // 20 dots, fill based on percent
  const totalDots = 32;
  const filledDots = Math.round((percent / 100) * totalDots);
  // Define four colors for the four segments
  const segmentColors = [
    '#FF8A8A', // 0-25%
    '#FFB07C', // 26-50%
    '#4ECE77', // 51-75%
    '#28A08C', // 76-100%
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
        size={80}
        strokeWidth={5}>
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

const StepTwoGoalType = ({selected, onSelect, onNext, onBack}) => (
  <View>
    <TouchableOpacity
      style={[styles.backBtn, {height: 32, width: 32, marginBottom: 24}]}
      onPress={onBack}>
      <ChevronLeft size={24} color={Colors.txtColor} />
    </TouchableOpacity>
    <View style={[styles.stepTwoContainer, {padding: 16}]}>
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
  onBack,
}) => (
  <>
    <TouchableOpacity
      style={{
        height: 32,
        width: 32,
        borderRadius: 1000,
        backgroundColor: 'rgba(255,255,255,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onBack}>
      <ChevronLeft size={24} color={Colors.txtColor} />
    </TouchableOpacity>
    <View style={styles.stepThreeContainer}>
      <Text style={styles.stepTwoTitle}>Create a goal</Text>
      <Text style={styles.stepTwoSubtitle}>
        Create a new goal to achieve your dreams
      </Text>
      <View style={styles.stepThreeFormBox}>
        <View style={styles.inputRow}>
          <GoalSvg style={{marginRight: 8}} />
          <TextInput
            style={styles.input}
            placeholder="Goal Name"
            value={goalName}
            onChangeText={setGoalName}
            placeholderTextColor={Colors.grayIcon}
          />
        </View>
        <View style={styles.inputRow}>
          <Amount style={{marginRight: 8}} />
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
          <SaveCard style={{marginRight: 8}} />
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
          width: '100%',
        }}>
        <Text style={styles.sourceAccountLabel}>Source Account</Text>
        <Text style={styles.viewAccounts}>View accounts</Text>
      </View>
      <View style={styles.accountList}>
        {mockAccounts.map(acc => (
          <TouchableOpacity
            key={acc.id}
            onPress={() => setSelectedAccount(acc.id)}>
            <ImageBackground
              source={acc.bg}
              style={styles.accountCard}
              imageStyle={styles.accountCardImage}>
              <Image source={acc.logo} style={styles.accountLogo} />
              <View style={{flex: 1}}>
                <Text style={[styles.accountName]}>{acc.name}</Text>
                <Text style={styles.accountType}>{acc.type}</Text>
              </View>
              <View style={styles.radioOuter}>
                {selectedAccount === acc.id && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.accountHintRow}>
        <BlubIcon />
        <Text style={styles.accountHintText}>
          You can always switch account later from settings
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.stepTwoNextBtn,
          {
            marginTop: 30,
          },
        ]}
        onPress={onNext}>
        <Text style={styles.stepTwoNextBtnText}>Next</Text>
      </TouchableOpacity>
    </View>
  </>
);

const StepFourSelectSourceAccount = ({
  selectedSource,
  setSelectedSource,
  onNext,
  onBack,
}) => (
  <View>
    <TouchableOpacity
      style={[styles.backBtn, {height: 32, width: 32, marginBottom: 24}]}
      onPress={onBack}>
      <ChevronLeft size={24} color={Colors.txtColor} />
    </TouchableOpacity>
    <View style={styles.stepFourContainer}>
      <Text style={styles.stepFourTitle}>Select Source Account</Text>
      <Text style={styles.stepFourSubtitle}>
        select the bank you will use to save from
      </Text>
      <View style={styles.sourceAccountList}>
        {mockAccounts.map(acc => (
          <ImageBackground
            key={acc.id}
            source={acc.bg}
            style={styles.sourceAccountCard}
            imageStyle={styles.sourceAccountCardImage}>
            <View style={styles.sourceAccountCardHeader}>
              <Image source={acc.logo} style={styles.sourceAccountLogo} />
              <Text style={styles.sourceAccountName}>{acc.name}</Text>
            </View>

            <TouchableOpacity
              style={styles.sourceAccountTypeContainer}
              onPress={() => setSelectedSource(`${acc.id}-current`)}>
              <View style={styles.sourceAccountTypeInfo}>
                <Text style={styles.sourceAccountType}>Current Account</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <DirhamWhite
                    height={12}
                    width={14}
                    style={{marginRight: 4}}
                  />
                  <Text style={styles.sourceAccountBalance}>35,000.00</Text>
                </View>
              </View>
              <View style={styles.radioOuter}>
                {selectedSource === `${acc.id}-current` && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sourceAccountTypeContainer}
              onPress={() => setSelectedSource(`${acc.id}-savings`)}>
              <View style={styles.sourceAccountTypeInfo}>
                <Text style={styles.sourceAccountType}>Savings Account</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <DirhamWhite
                    height={12}
                    width={14}
                    style={{marginRight: 4}}
                  />
                  <Text style={styles.sourceAccountBalance}>35,000.00</Text>
                </View>
              </View>
              <View style={styles.radioOuter}>
                {selectedSource === `${acc.id}-savings` && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </TouchableOpacity>
          </ImageBackground>
        ))}
      </View>
      <TouchableOpacity style={styles.selectAccountBtn} onPress={onNext}>
        <Text style={styles.selectAccountBtnText}>Select Account</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const StepFiveGoalCalendar = ({
  weekRange,
  setWeekRange,
  onCreateGoal,
  onBack,
}) => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const onDateChange = (date, type) => {
    // Calculate 7 days starting from the selected date
    const selectedMoment = moment(date);
    const startDate = selectedMoment.clone();
    const endDate = selectedMoment.clone().add(6, 'days'); // 7 days total (selected day + 6 more)

    setSelectedStartDate(startDate.toDate());
    setSelectedEndDate(endDate.toDate());
    setWeekRange({
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
    });
  };

  const onMonthChange = date => {
    setCurrentMonth(moment(date));
  };

  const navigateMonth = direction => {
    const newMonth = currentMonth.clone().add(direction, 'month');
    setCurrentMonth(newMonth);
  };

  const customDayHeaderStylesCallback = () => {
    return {
      textStyle: {
        color: '#888',
        fontSize: 13,
        fontFamily: FontFamily.medium,
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
      },
    };
  };

  // Helper to determine if a date is the start or end of the selected week
  const isStartOfWeek = date => {
    if (!selectedStartDate) return false;
    return moment(date).isSame(moment(selectedStartDate), 'day');
  };
  const isEndOfWeek = date => {
    if (!selectedEndDate) return false;
    return moment(date).isSame(moment(selectedEndDate), 'day');
  };

  const customDatesStylesCallback = date => {
    if (!selectedStartDate || !selectedEndDate) {
      // Handle today styling when no week is selected
      const isToday = moment(date).isSame(moment(), 'day');
      if (isToday) {
        return {
          textStyle: {
            color: Colors.newButtonBack,
            fontFamily: FontFamily.bold,
            fontWeight: 'bold',
          },
        };
      }
      return {};
    }

    const momentDate = moment(date);
    const startMoment = moment(selectedStartDate);
    const endMoment = moment(selectedEndDate);

    const isInSelectedWeek = momentDate.isBetween(
      startMoment,
      endMoment,
      'day',
      '[]',
    );

    if (isInSelectedWeek) {
      // To ensure borderRadius works, use overflow: 'hidden' and set backgroundColor on the container
      let style = {
        backgroundColor: Colors.newButtonBack,
        width: 44,
        height: 44,
        borderRadius: 22,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
      };

      // Make start and end of week more visually distinct (optional)
      if (isStartOfWeek(date) || isEndOfWeek(date)) {
        style = {
          ...style,
          borderWidth: 1,
          borderColor: Colors.white,
        };
      }

      return {
        containerStyle: style,
        textStyle: {
          color: Colors.txtColor,
          fontFamily: FontFamily.regular,
          fontSize: 20,
        },
      };
    }

    // Handle today styling when it's not in selected week
    const isToday = momentDate.isSame(moment(), 'day');
    if (isToday) {
      return {
        textStyle: {
          color: Colors.newButtonBack,
          fontFamily: FontFamily.regular,
          fontSize: 20,
        },
      };
    }

    return {};
  };

  return (
    <ScrollView
      style={{flex: 1}}
      contentContainerStyle={{
        paddingBottom: 200,
      }}
      showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        style={[styles.backBtn, {height: 32, width: 32, marginBottom: 24}]}
        onPress={onBack}>
        <ChevronLeft size={24} color={Colors.txtColor} />
      </TouchableOpacity>
      <View style={styles.stepFiveContainer}>
        {/* Calendar Header */}
        <View style={styles.stepFiveHeader}>
          <Text style={styles.stepFiveHeaderTitle}>Create a goal</Text>
          <Text style={styles.stepFiveHeaderSubtitle}>
            how long do you want to save?
          </Text>
          <Text style={styles.stepFiveHeaderDate}>Start date - End date</Text>
        </View>
        <View style={styles.stepFiveCalendarContainer}>
          <View style={styles.calendarHeader}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.monthText}>
                {currentMonth.format('MMMM YYYY')}
              </Text>
              <ChevronRight
                size={14}
                color={Colors.background}
                style={{marginLeft: 4}}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
              <TouchableOpacity
                style={styles.monthArrowButton}
                onPress={() => navigateMonth(-1)}>
                <EntoChevronRight size={20} color={Colors.background} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.monthArrowButton}
                onPress={() => navigateMonth(1)}>
                <ChevronRight size={20} color={Colors.background} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Calendar */}
          <View style={styles.calendarWrapper}>
            <CalendarPicker
              startFromMonday={true}
              allowRangeSelection={false}
              selectedDayColor={Colors.newButtonBack}
              selectedDayTextColor={Colors.white}
              // selectedDayTextColor={Colors.txtColor}
              scaleFactor={400}
              textStyle={{
                fontFamily: FontFamily.regular,
                color: Colors.txtColor,
                fontSize: 20,
              }}
              onDateChange={onDateChange}
              onMonthChange={onMonthChange}
              customDayHeaderStyles={customDayHeaderStylesCallback}
              customDatesStyles={customDatesStylesCallback}
              hideArrows={true}
              hideExtraDays={false}
              disableMonthChange={true}
              initialDate={currentMonth.toDate()}
              dayLabelsWrapper={{
                borderTopWidth: 0,
                borderBottomWidth: 0,
              }}
              dayShape="circle"
              dayContainerStyle={{
                backgroundColor: 'transparent',
                borderRadius: 22,
                height: 44,
                width: 44,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              previousTitle=""
              nextTitle=""
              previousTitleStyle={{display: 'none'}}
              monthTitleStyle={{display: 'none'}}
              yearTitleStyle={{display: 'none'}}
              todayBackgroundColor="transparent"
              todayTextStyle={{
                color: Colors.txtColor,
                fontFamily: FontFamily.regular,
              }}
              minDate={moment()}
              width={350}
              height={400}
            />
          </View>
        </View>
        {/* Create Goal Button */}
        <TouchableOpacity
          style={styles.createGoalButton}
          onPress={onCreateGoal}>
          <Text style={styles.createGoalButtonText}>Create Goal</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const StepOneCard = ({onStart}) => (
  <View style={styles.stepOneCard}>
    <View style={styles.stepOneImageWrapper}>
      {/* Replace with your actual image asset */}
      <Image
        source={require('../../assets/images/GoalScreen.png')}
        style={styles.stepOneImage}
        resizeMode="contain"
      />
    </View>
    <Text style={styles.stepOneLabel}>Saving & goals</Text>
    <Text style={styles.stepOneTitle}>
      Save for tomorrow, without sacrificing today
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

  // Simple Circular Loader Component
  const CustomLoader = () => {
    const [rotateAnim] = useState(new Animated.Value(0));

    React.useEffect(() => {
      const rotateAnimation = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      );

      rotateAnimation.start();

      return () => {
        rotateAnimation.stop();
      };
    }, []);

    const spin = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <Animated.View
        style={[
          styles.simpleLoader,
          {
            transform: [{rotate: spin}],
          },
        ]}
      />
    );
  };

  // Loading Modal Component
  const LoadingModal = () => (
    <Modal visible={showLoadingModal} transparent={true} animationType="fade">
      <ImageBackground
        source={require('../../assets/images/greenishBackground.png')}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.loadingContent}>
          <Text style={styles.loadingTitle}>Creating your goal</Text>
          <Text style={styles.loadingSubtitle}>
            Your goal is almost ready, let's make it happen.
          </Text>

          <View style={styles.loadingSpinnerContainer}>
            <CustomLoader />
          </View>
        </View>
      </ImageBackground>
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
      onBack={() => setStep(0)}
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
      onBack={() => setStep(1)}
    />,
    <StepFourSelectSourceAccount
      key={3}
      selectedSource={selectedSourceAccount}
      setSelectedSource={setSelectedSourceAccount}
      onNext={() => setStep(4)}
      onBack={() => setStep(2)}
    />,
    <StepFiveGoalCalendar
      key={4}
      weekRange={weekRange}
      setWeekRange={setWeekRange}
      onCreateGoal={handleCreateGoal}
      onBack={() => setStep(3)}
    />,
  ];

  if (showStepper) {
    return (
      <ImageBackground
        source={require('../../assets/images/greenishBackground.png')}
        style={{flex: 1}}>
        <View style={styles.stepperBody}>{stepContents[step]}</View>
        <LoadingModal />
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/greenishBackground.png')}
      style={{flex: 1}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 200}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}>
            <ChevronLeft
              size={24}
              color={Colors.txtColor}
              style={{marginLeft: 16}}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}></Text>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              setShowStepper(true);
              setStep(0);
            }}>
            <PlusIcon size={18} color={Colors.newButtonBack} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>My Goals</Text>
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
      </ScrollView>
    </ImageBackground>
  );
};

export default AddGoals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderRadius: 1000,
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
    backgroundColor: Colors.white,
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
    color: '#0D2D2D99',
    fontFamily: FontFamily.regular,
    textAlign: 'center',
    marginBottom: 12,
  },
  scrollView: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardIcon: {},
  cardTitle: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginBottom: 8,
  },
  cardPercent: {
    fontSize: 18,
    color: Colors.newButtonBack,
    fontFamily: FontFamily.semiBold,
  },
  stepFiveHeaderDate: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
    marginBottom: 16,
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
    fontSize: 14,
    color: Colors.newButtonBack,
    fontFamily: FontFamily.medium,
    marginTop: 19,
  },
  cardMax: {
    fontSize: 14,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
    marginTop: 19,
    marginBottom: 16,
  },
  dotsBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginBottom: 8,
    gap: 2,
  },
  dot: {
    width: 4,
    height: 12,
    borderRadius: 4,
    marginHorizontal: 2,
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
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
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
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 28,
  },
  stepperBtnText: {
    color: Colors.txtColor,
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  stepOneCard: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.white,
    alignItems: 'center',
    width: '100%',
    height: 650,
    justifyContent: 'center',
    marginTop: 60,
  },
  stepOneImageWrapper: {
    width: 360,
    height: 360,
    marginBottom: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepOneImage: {
    width: 360,
    height: 360,
  },
  stepOneLabel: {
    color: Colors.newGreen,
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    marginBottom: 8,
  },
  stepOneTitle: {
    color: Colors.txtColor,
    fontSize: 32,
    fontFamily: FontFamily.bold,
    textAlign: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  stepOneBtn: {
    backgroundColor: Colors.newButtonBack,
    borderRadius: 100,
    width: '90%',
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepOneBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  stepTwoContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.white,
    alignItems: 'center',
    height: 650,
  },
  stepTwoTitle: {
    fontSize: 24,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginBottom: 8,
    textAlign: 'center',
  },
  stepTwoSubtitle: {
    fontSize: 14,
    color: Colors.txtColor,
    fontFamily: FontFamily.regular,
    marginBottom: 12,
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
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.white,
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 16,
  },
  goalTypeCardSelected: {
    borderColor: Colors.green,
    backgroundColor: '#d2f5e7',
  },
  goalTypeCardTitle: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginTop: 15,
    marginBottom: 4,
    textAlign: 'center',
  },
  goalTypeCardSubtitle: {
    fontSize: 12,
    color: Colors.txtColor,
    fontFamily: FontFamily.regular,
    textAlign: 'center',
  },
  stepTwoNextBtn: {
    backgroundColor: Colors.newButtonBack,
    borderRadius: 100,
    paddingVertical: 14,
    // marginTop: 14,
    width: '100%',
    alignItems: 'center',
  },
  stepTwoNextBtnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  stepThreeContainer: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.white,
    padding: 16,
    marginTop: 24,
    height: 650,
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
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.white,
    marginBottom: 24,
    paddingHorizontal: 12,
    height: 56,
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
    fontSize: 16,
    color: Colors.grayIcon,
    fontFamily: FontFamily.medium,
  },
  viewAccounts: {
    color: Colors.newButtonBack,
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
  accountList: {
    width: '100%',
    marginBottom: 8,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  accountCardImage: {
    borderRadius: 12,
    resizeMode: 'cover',
  },
  accountLogo: {
    width: 38,
    height: 38,
    borderRadius: 8,
    marginRight: 12,
  },
  accountName: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.txtColor,
    marginBottom: 8,
    color: Colors.cardTxt,
  },
  accountType: {
    fontSize: 14,
    color: Colors.cardTxt,
    fontFamily: FontFamily.medium,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.white,
  },
  accountHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
    paddingHorizontal: 25,
  },
  accountHintText: {
    color: Colors.grayIcon,
    fontSize: 12,
    fontFamily: FontFamily.regular,
    marginLeft: 8,
  },
  stepFourContainer: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.white,
    width: '100%',
    padding: 16,
    marginTop: 30,
    alignItems: 'center',
  },
  stepFourTitle: {
    fontSize: 24,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginBottom: 8,
    textAlign: 'center',
  },
  stepFourSubtitle: {
    fontSize: 14,
    color: Colors.txtColor,
    fontFamily: FontFamily.regular,
    marginBottom: 16,
    textAlign: 'center',
  },
  sourceAccountList: {
    width: '100%',
    marginBottom: 8,
  },
  sourceAccountCard: {
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
    overflow: 'hidden',
  },
  sourceAccountCardImage: {
    borderRadius: 16,
    resizeMode: 'cover',
  },
  sourceAccountCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sourceAccountLogo: {
    width: 38,
    height: 38,
    borderRadius: 8,
    marginRight: 12,
  },
  sourceAccountName: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.cardTxt,
  },
  sourceAccountTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sourceAccountTypeInfo: {
    flex: 1,
  },
  sourceAccountType: {
    fontSize: 14,
    color: Colors.cardTxt,
    fontFamily: FontFamily.regular,
    marginBottom: 10,
  },
  sourceAccountBalance: {
    fontSize: 16,
    color: Colors.progressBackground,
    fontFamily: FontFamily.semiBold,
  },
  selectAccountBtn: {
    backgroundColor: Colors.newButtonBack,
    borderRadius: 1000,
    paddingVertical: 16,
    marginTop: 21,
    width: '100%',
    alignItems: 'center',
  },
  selectAccountBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  stepFiveContainer: {
    paddingHorizontal: 16,
    padding: 16,
    paddingBottom: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 18,
    height: 700,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  stepFiveHeaderTitle: {
    fontSize: 24,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginBottom: 8,
    textAlign: 'center',
  },
  stepFiveHeaderSubtitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.txtColor,
    marginBottom: 16,
    textAlign: 'center',
  },
  stepFiveCalendarContainer: {
    // flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 18,
    borderWidth: 1,
    paddingTop: 10,
    borderColor: Colors.white,
  },
  calendarWrapper: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginBottom: 26,
  },
  monthArrowButton: {
    // padding: 8,
  },
  monthArrowText: {
    fontSize: 24,
    color: Colors.txtColor,
    fontFamily: FontFamily.semiBold,
  },
  monthText: {
    fontSize: 17,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
  },
  createGoalButton: {
    backgroundColor: Colors.newButtonBack,
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
    width: '100%',
    marginTop: 180,
  },
  createGoalButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  loadingModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.white,
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingTitle: {
    fontSize: 24,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    textAlign: 'center',
    marginBottom: 8,
  },
  loadingSubtitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.txtColor,
    textAlign: 'center',
    marginBottom: 24,
  },
  loadingSpinnerContainer: {
    marginTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginBottom: 8,
    textAlign: 'center',
  },
  headerTextContainer: {
    paddingHorizontal: 5,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    marginBottom: 16,
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  // Simple Loader Styles
  simpleLoader: {
    width: 124,
    height: 124,
    borderRadius: 10000,
    borderWidth: 9,
    borderColor: 'rgba(255,255,255,0.3)',
    borderTopColor: Colors.newButtonBack,
    borderRightColor: Colors.newButtonBack,
  },
});
