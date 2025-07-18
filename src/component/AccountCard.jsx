import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Colors} from '../utilis/Colors';
import {Dirham, ReloadSvg} from '../assets/svgs';
import {FontFamily} from '../utilis/Fonts';

const BankAccountCard = ({
  bankName,
  lastSynced,
  image,
  accounts = [],
  onDelete,
  reloadPressed,
  onReconnect,
  onPressAccount,
}) => {
  // Filter only "Current Account"
  const filteredAccounts = accounts.filter(
    acc => acc.accountType === 'Current Account',
  );

  const hasReconnect = filteredAccounts.some(
    acc => acc.status === 'RECONNECT_REQUIRED',
  );

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.row}>
        <View style={styles.bankInfo}>
          <Image source={{uri: image}} style={styles.logo} />
          <Text style={styles.bankName}>{bankName}</Text>
        </View>
      </View>

      {/* Accounts List */}
      <FlatList
        data={filteredAccounts}
        keyExtractor={(item, index) => index.toString()}
        style={{marginTop: 12}}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.accountItem}
            onPress={() =>
              item.status === 'RECONNECT_REQUIRED'
                ? onReconnect?.(item)
                : onPressAccount?.(item)
            }>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
              {item.status === 'RECONNECT_REQUIRED' ? (
                <View style={styles.reconnectIcon}>
                  <ReloadSvg width={12} height={12} />
                </View>
              ) : null}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                  alignItems: 'center',
                }}>
                <View style={{marginTop: 16}}>
                  <Text style={styles.label}>last synced</Text>
                  <View style={styles.syncRow}>
                    <Text style={styles.syncText}>{lastSynced}</Text>
                    <TouchableOpacity
                      style={styles.refreshBtn}
                      onPress={reloadPressed}>
                      <ReloadSvg width={8} height={8} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <Text style={styles.accountType}>{item.accountType}</Text>
                  <View style={styles.balanceRow}>
                    <Dirham />
                    <Text style={styles.amount}>{item.accountBalance}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Reconnect Warning */}
      {hasReconnect && (
        <Text style={styles.reconnectNote}>
          ⚠ Reconnect required for some accounts
        </Text>
      )}

      {/* Divider */}
      <View style={styles.divider} />

      {/* Delete Button */}
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    padding: 16,
    margin: 16,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 50,
  },
  bankName: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
  infoRow: {
    marginTop: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.grayIcon,
    marginBottom: 12,
  },
  syncRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  syncText: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
  refreshBtn: {
    marginLeft: 8,
    backgroundColor: '#28A08C1A',
    height: 16,
    width: 16,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  accountItem: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reconnectIcon: {
    backgroundColor: '#E3FFF2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 18,
    width: 18,
    marginRight: 4,
  },
  accountType: {
    fontSize: 13,
    marginLeft: 4,
    color: Colors.txtColor,
    fontFamily: FontFamily.regular,
  },
  balanceRow: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
    gap: 4,
  },
  amount: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.newButtonBack,
    marginLeft: 4,
  },
  reconnectNote: {
    color: '#ffc107',
    fontSize: 12,
    marginTop: 10,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.white,
    marginBottom: 16,
  },
  deleteButton: {
    backgroundColor: '#FFC7C7',
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
  },
  deleteText: {
    color: '#D31B1B',
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
  },
});

export default BankAccountCard;
