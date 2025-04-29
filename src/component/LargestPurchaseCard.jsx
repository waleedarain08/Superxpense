import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../utilis/Colors';
import {Wallet} from '../assets/svgs';
import {ChevronRight} from '../icons';
import {FontFamily} from '../utilis/Fonts';

const LargestPurchaseCard = ({largestAmount}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Largest purchase</Text>
      <Text style={styles.subtitle}>
        You can tap on a transaction to ignore it from your budget or spendings
      </Text>

      <TouchableOpacity style={styles.card} activeOpacity={0.7}>
        <View style={styles.iconWrapper}>
          <Wallet />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.cardTitle}>Debit card Purchase</Text>
          <Text style={styles.cardDate}>29 April 2024</Text>
        </View>
        <View style={styles.amountWrapper}>
          <Text style={styles.amount}>
            AED <Text style={{color: Colors.txtColor}}>{largestAmount}</Text>
          </Text>
          <ChevronRight />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 17,
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
    backgroundColor: Colors.white,
    borderRadius: 20,
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
