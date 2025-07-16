import React, {useState} from 'react';
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
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import {ChevronRight, EntoChevronRight} from '../../icons';
import Header from '../../component/Header';

const {width} = Dimensions.get('window');

const ShowBillsDate = ({navigation}) => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(null);

  // Sample bills data
  const billsData = [
    {
      id: 1,
      title: 'Netflix',
      description: 'Basic Plan',
      amount: '49 AED Monthly',
      color: '#E91E63',
      date: 'Due in 8 Days',
    },
    {
      id: 2,
      title: 'Netflix',
      description: 'Basic Plan',
      amount: '49 AED Monthly',
      color: '#E91E63',
      date: 'Due in 8 Days',
    },
    {
      id: 3,
      title: 'Netflix',
      description: 'Basic Plan',
      amount: '49 AED Monthly',
      color: '#E91E63',
      date: 'Due in 8 Days',
    },
  ];

  const onDateChange = (date, type) => {
    setSelectedDate(date);
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

  const customDatesStylesCallback = date => {
    const isToday = moment(date).isSame(moment(), 'day');
    if (isToday) {
      return {
        textStyle: {
          color: Colors.txtColor,
          fontFamily: FontFamily.bold,
          fontWeight: 'bold',
        },
      };
    }
    return {};
  };

  const BillItem = ({bill}) => (
    <View style={styles.billItem}>
      <View style={[styles.billIndicator]}>
        <Image
          source={require('../../assets/images/netflix.png')}
          style={{width: 38, height: 38}}
        />
      </View>
      <View style={styles.billContent}>
        <Text style={styles.billTitle}>{bill.title}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Text style={styles.billDescription}>{bill.amount}</Text>
          <Text style={[styles.billDescription, {color: Colors.grayIcon}]}>
            {bill.date}
          </Text>
        </View>
      </View>
      <ChevronRight size={12} color={Colors.txtColor} />
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/greenishBackground.png')}
      style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}>
        {/* Header */}
        <Header
          ScreenName="Bills"
          mainContainer={styles.headerContainer}
          svgDots={true}
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.contentContainer}>
          {/* Calendar Header */}
          <View style={styles.calendarHeaderContainer}>
            <View style={styles.calendarHeader}>
              <TouchableOpacity
                style={styles.monthArrowButton}
                onPress={() => navigateMonth(-1)}>
                <EntoChevronRight size={12} color={Colors.txtColor} />
              </TouchableOpacity>
              <Text style={styles.monthText}>
                {currentMonth.format('MMMM YYYY')}
              </Text>
              <TouchableOpacity
                style={styles.monthArrowButton}
                onPress={() => navigateMonth(1)}>
                <ChevronRight size={12} color={Colors.txtColor} />
              </TouchableOpacity>
            </View>

            {/* Calendar */}
            <View style={styles.calendarWrapper}>
              <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={false}
                selectedDayColor={Colors.newButtonBack}
                selectedDayTextColor={Colors.white}
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
                width={350}
                height={400}
              />
            </View>
          </View>
        </View>{' '}
        {/* Bills List */}
        <View style={styles.billsContainer}>
          {billsData.map(bill => (
            <BillItem key={bill.id} bill={bill} />
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 60,
    paddingHorizontal: 14,
  },
  headerContainer: {},
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 18,
    marginHorizontal: 16,
    marginTop: 30,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  calendarHeaderContainer: {
    paddingTop: 10,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 10,
    marginBottom: 20,
  },
  monthText: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
  },
  monthArrowButton: {
    // padding: 8,
  },
  calendarWrapper: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginBottom: 26,
  },
  billsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    marginTop: 24,
  },
  billsTitle: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginBottom: 16,
  },
  billItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  billIndicator: {
    width: 38,
    height: 38,
    borderRadius: 2,
    marginRight: 16,
  },
  billContent: {
    flex: 1,
  },
  billTitle: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginBottom: 4,
  },
  billDescription: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.txtColor,
  },
  billAmount: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.newButtonBack,
  },
});

export default ShowBillsDate;
