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
  isReconnect,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.bankLogoWrapper}>
          <Image source={logo} style={styles.bankLogo} resizeMode="contain" />
        </View>
        <View style={styles.bankInfo}>
          <Text style={styles.bankTitle}>{bankName}</Text>
          <Text style={styles.bankBalance}>{totalBalance==='null AED'?'Session Expired':totalBalance}</Text>
        </View>

        <TouchableOpacity style={styles.deleteIcon} onPress={deletePress}>
          <DeleteIcon size={15} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.accountSection}>
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
                    {isReconnect && (
                      <View style={styles.refreshIcon}>
                        <Refresh size={12} color="green" />
                        <Text style={{fontSize:12}}>Reconnect</Text>
                      </View>
                    )}
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
    paddingTop: 4,
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
    width: 90,
    height: 20,
    borderRadius: 9,
    backgroundColor: Colors.lightestGreen,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
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
