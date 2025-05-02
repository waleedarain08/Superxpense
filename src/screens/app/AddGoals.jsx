import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {HomePurple, LeftIcon} from '../../assets/svgs';
import CreateGoalModal from '../../component/CreateGoalModal';

const GradientProgressBar = ({progress}) => {
  return (
    <View style={styles.progressContainer}>
      <LinearGradient
        colors={['#7563FF', '#3C00FF']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[styles.progressFill, {width: `${progress * 100}%`}]}
      />
    </View>
  );
};

const GoalCard = ({
  icon,
  title,
  available,
  spent,
  leftToSave,
  goal,
  targetDate,
}) => (
  <View style={styles.card}>
    <View style={styles.headerRow}>
      <HomePurple />
      <Text style={styles.title}>{title}</Text>
    </View>

    <GradientProgressBar progress={available / goal} />

    <View style={styles.row}>
      <Text style={styles.dotPurple}>●</Text>
      <Text style={styles.label}>Available</Text>
      <Text style={styles.amount}>{available.toLocaleString()} AED</Text>
      <Text style={styles.goal}>Goal: {goal.toLocaleString()} AED</Text>
    </View>

    <View style={styles.row}>
      <Text style={styles.dotRed}>●</Text>
      <Text style={styles.label}>Spent</Text>
      <Text style={[styles.amount, {flex: 0.9}]}>0 AED</Text>
      <Text style={styles.goal}>Target: {targetDate}</Text>
    </View>

    <View style={styles.row}>
      <Text style={[styles.dotPurple, {color: '#D8CCFF'}]}>●</Text>
      <Text style={styles.label}>Left to save</Text>
      <Text style={styles.amount}>{leftToSave.toLocaleString()} AED</Text>
      <Text style={styles.onTrack}>✓ On track</Text>
    </View>
  </View>
);

const AddGoals = ({navigation}) => {
  const [goalModalVisible, setGoalModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <CreateGoalModal
        visible={goalModalVisible}
        onClose={() => setGoalModalVisible(false)}
      />
      <View style={styles.header}>
        <View style={{width: 20}} />
        <Text style={styles.headerTxt}>Saving Goals</Text>
        <View style={{width: 10}} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <GoalCard
          icon="🏠"
          title="House"
          available={19352}
          spent={20000}
          leftToSave={181922}
          goal={200000}
          targetDate="December 2030"
        />
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setGoalModalVisible(true)}>
        <Text style={styles.addButtonText}>Add a New Goal ➕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.bgColor},
  header: {
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 19,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: Colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTxt: {
    color: Colors.white,
    fontFamily: FontFamily.medium,
    fontSize: 18,
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 17,
  },

  title: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginLeft: 8,
  },
  row: {flexDirection: 'row', alignItems: 'center', marginTop: 6},
  dotPurple: {color: '#7563FF', marginRight: 6},
  dotRed: {color: Colors.red, marginRight: 6},
  label: {
    marginRight: 6,
    color: Colors.txtColor,
    fontFamily: FontFamily.medium,
    fontSize: 14,
  },
  amount: {
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    fontSize: 14,
    flex: 1,
  },
  goal: {
    flex: 1,
    fontSize: 12,
    color: Colors.lightTxtColor,
    textAlign: 'right',
    fontFamily: FontFamily.regular,
  },
  onTrack: {
    fontSize: 12,
    textAlign: 'right',
    flex: 0.5,
    color: Colors.txtColor,
    FontFamily: FontFamily.regular,
    backgroundColor: Colors.bgColor,
    padding: 4,
    borderRadius: 100,
  },
  addButton: {
    backgroundColor: Colors.newLightgreen,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 100,
    marginBottom: 20,
  },
  addButtonText: {color: '#00796b', fontWeight: 'bold'},

  progressContainer: {
    width: '100%',
    height: 16,
    backgroundColor: '#eee',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 8,
  },
  headerRow: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AddGoals;
