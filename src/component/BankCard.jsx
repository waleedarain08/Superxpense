import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {ChevronRight, DeleteIcon, Refresh, ThreeDots} from '../icons';
import {Colors} from '../utilis/Colors';
import {FontFamily} from '../utilis/Fonts';

const BankCard = ({
  bankID,
  bankName,
  totalBalance,
  accounts,
  logo,
  onPress,
  deletePress,
}) => {
  return (
    <View style={styles.card}>
      {/* Top: Logo, Bank name, Balance, Options */}
      <View style={styles.topRow}>
        <View style={styles.bankLogoWrapper}>
          <Image source={logo} style={styles.bankLogo} resizeMode="contain" />
        </View>
        <View style={styles.bankInfo}>
          <Text style={styles.bankTitle}>{bankName}</Text>
          <Text style={styles.bankBalance}>{totalBalance}</Text>
        </View>
        {/* <TouchableOpacity>
          <ThreeDots size={20} color="black" />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.deleteIcon} onPress={deletePress}>
          <DeleteIcon size={15} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* Bottom: Accounts */}
      <View style={styles.accountSection}>
        {/* Timeline */}
        <View style={styles.timeline}>
          <View style={styles.timelineItem}>
            {accounts.map((_, index) => (
              <React.Fragment key={index}>
                <View style={styles.circleFilled}>
                  <Text style={styles.checkMark}>✓</Text>
                </View>
                {index !== accounts.length - 1 && <View style={styles.line} />}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Account details */}
        <View style={styles.accountDetails}>
          {accounts.map((account, index) => (
            <TouchableOpacity
              key={index}
              style={styles.mainContainer}
              onPress={() => onPress(account, bankID, bankName)}>
              <View>
                <View style={styles.accountRow}>
                  <View style={styles.accountLeft}>
                    <Text style={styles.accountType}>
                      {account.accountType}
                    </Text>
                    {/* <View style={styles.refreshIcon}>
                      <Refresh size={10} color="green" />
                    </View> */}
                  </View>
                </View>
                <View style={styles.accountRight}>
                  <Text style={styles.accountBalance}>
                    {account.accountBalance} AED
                  </Text>
                </View>
              </View>
              <ChevronRight size={12} color="black" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bankLogoWrapper: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: Colors.purple,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  bankLogo: {
    width: 35,
    height: 35,
    //tintColor: Colors.lightestGrayTwo,
  },
  bankInfo: {
    flex: 1,
  },
  bankTitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.lightestGrayTwo,
  },
  bankBalance: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    marginTop: 2,
    color: Colors.txtColor,
  },
  accountSection: {
    flexDirection: 'row',
    marginTop: 4,
  },
  timeline: {
    alignItems: 'center',
    marginRight: 12,
    flexShrink: 0,
    paddingTop: 4, // starts just below the top section
  },
  timelineItem: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  circleFilled: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8.5,
  },
  checkMark: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  line: {
    width: 2,
    height: 24,
    backgroundColor: '#ccc',
    marginBottom: 4,
  },
  accountDetails: {
    flex: 1,
  },
  accountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountType: {
    fontSize: 13,
    marginRight: 6,
  },
  refreshIcon: {
    width: 20,
    height: 20,
    borderRadius: 9,
    backgroundColor: Colors.lightestGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  accountBalance: {
    fontSize: 14,
    fontWeight: '600',
  },
  mainContainer: {
    marginBottom: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    alignSelf: 'center',
    backgroundColor: Colors.background,
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BankCard;
