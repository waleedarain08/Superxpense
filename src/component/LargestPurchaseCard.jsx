import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../utilis/Colors';
import {Wallet} from '../assets/svgs';
import {ChevronRight} from '../icons';
import {FontFamily} from '../utilis/Fonts';
import LinearGradient from 'react-native-linear-gradient';

const LargestPurchaseCard = ({largestAmount, date, category}) => {
  return (
    <LinearGradient
      colors={['#bae4e0', '#BDECE8']}
      style={styles.gradientBackground}>
      <View style={styles.container}>
        {/* <View style={styles.container}> */}
        <Text style={styles.title}>Largest purchase</Text>
        {/*  <Text style={styles.subtitle}>
        You can tap on a transaction to ignore it from your budget or spendings
            </Text> */}

        <TouchableOpacity style={styles.card} activeOpacity={0.7}>
          <View style={styles.iconWrapper}>
            <Wallet />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.cardTitle}>{category.replace(/_/g, ' ')}</Text>
            <Text style={styles.cardDate}>{date}</Text>
          </View>
          <View style={styles.amountWrapper}>
            <Text style={styles.amount}>
              AED <Text style={{color: Colors.txtColor}}>{largestAmount}</Text>
            </Text>
            {/* <ChevronRight /> */}
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 17,
  },
  gradientBackground: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.white,
    marginTop: 15,
  },
  title: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.lightTxtColor,
    fontFamily: FontFamily.regular,
    marginTop: 8,
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 20,
    marginTop: 20,
  },
  iconWrapper: {
    backgroundColor: Colors.background,
    padding: 10,
    borderRadius: 12,
    marginRight: 12,
  },
  textWrapper: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
  },
  cardDate: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: Colors.seventyBlack,
  },
  amountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 14,
    FontFamily: FontFamily.semiBold,
    color: Colors.lightTxtColor,
    marginRight: 4,
  },
});

export default LargestPurchaseCard;
