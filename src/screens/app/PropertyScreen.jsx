import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {HomePurple, LeftIcon} from '../../assets/svgs';
import CreateGoalModal from '../../component/CreateGoalModal';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeader from '../../component/MainHeader';
import PortHeader from '../../component/PorfolioHeader';

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

const PropertyScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../../assets/images/commonBack.png')}
      style={[styles.container, {flex: 1}]}
      imageStyle={{resizeMode: 'stretch', height: '140%'}}
      resizeMode="stretch">
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={{flex: 1, marginBottom: 10}}>
          <PortHeader
            navigation={navigation}
            largestTransaction={'100'}
            name={'sadas'}
          />
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default PropertyScreen;
