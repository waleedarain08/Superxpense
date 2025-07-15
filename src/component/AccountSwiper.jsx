import React, {useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../utilis/Colors';
import {DirhamWhite} from '../assets/svgs';
import {FontFamily} from '../utilis/Fonts';
import {Refresh} from '../icons';

const {width} = Dimensions.get('window');

const bgImages = [
  require('../assets/images/redCard.png'),
  require('../assets/images/purpleCard.png'),
];

// Helper to assign a random background image to each account, but keep it consistent
function assignBgImagesToAccounts(accounts) {
  const assigned = {};
  accounts.forEach((acc, idx) => {
    // Use bankId if available, otherwise fallback to idx
    const key = acc.bankId || idx;
    if (!assigned[key]) {
      assigned[key] = bgImages[Math.floor(Math.random() * bgImages.length)];
    }
  });
  return assigned;
}

const AccountCard = ({
  data,
  bgImage,
  onReconnect,
  onPressAccount,
  onDelete,
}) => {
  const [showBlurOverlay, setShowBlurOverlay] = useState(false);

  const reconnectAccounts = data.accounts?.filter(
    acc => acc.status === 'RECONNECT_REQUIRED',
  );
  const hasReconnect = reconnectAccounts.length > 0;

  const toggleBlurOverlay = () => {
    setShowBlurOverlay(!showBlurOverlay);
  };

  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={bgImage}
        style={styles.card}
        imageStyle={{borderRadius: 20}}>
        <View style={styles.bankInfo}>
          <View
            style={{
              borderWidth: 1,
              borderColor: Colors.white,
              borderRadius: 100,
              width: 45,
              height: 45,
              marginRight: 10,
            }}>
            <Image source={{uri: data.bankIcon}} style={styles.logo} />
          </View>
          <Text style={styles.bankName}>{data.bankName}</Text>
          <TouchableOpacity onPress={() => onDelete(data)}>
            <Icon name="delete" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {data.accounts.map((acc, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.accountRow}
            onPress={() =>
              acc.status === 'RECONNECT_REQUIRED'
                ? onReconnect(acc, data.bankId, data.bankName)
                : onPressAccount(acc, data.bankId, data.bankName)
            }>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {acc.status === 'RECONNECT_REQUIRED' ? (
                  <View
                    style={{
                      backgroundColor: '#E3FFF2',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 100,
                      height: 20,
                      width: 20,
                    }}>
                    <Refresh size={17} />
                  </View>
                ) : (
                  <Icon
                    name={'check-circle-outline'}
                    size={20}
                    color={Colors.white}
                  />
                )}
                <Text style={styles.accountType}>{acc.accountType}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 8,
                  alignItems: 'center',
                }}>
                <DirhamWhite />
                <Text style={styles.amount}>{`${acc.accountBalance} AED`}</Text>
              </View>
            </View>
            <View>
              <Icon name="chevron-right" size={26} color="#fff" />
            </View>
          </TouchableOpacity>
        ))}

        {hasReconnect && (
          <Text style={styles.reconnectNote}>
            ⚠ Reconnect required for some accounts
          </Text>
        )}
      </ImageBackground>
      {/* Blur Overlay */}
      {showBlurOverlay && (
        <View style={styles.blurOverlay}>
          <Image
            source={require('../assets/images/blurImage.png')}
            style={styles.blurImage}
            resizeMode="cover"
          />
        </View>
      )}

      {/* Toggle Button */}
      <TouchableOpacity style={styles.toggleButton} onPress={toggleBlurOverlay}>
        <Text style={styles.toggleButtonText}>
          {showBlurOverlay
            ? 'Tab to hide card details'
            : 'Tab to show card details'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default function AccountSwiper({
  accounts,
  onReconnect,
  onDelete,
  onPressAccount,
}) {
  if (!accounts || accounts.length === 0) return null;

  // Dynamically set stackSize: 1 if 1 card, 2 if 2, max 5
  const stackSize = Math.min(accounts.length, 5);

  // Assign background images to each account only once
  const bgMap = useMemo(() => assignBgImagesToAccounts(accounts), [accounts]);

  return (
    <View style={styles.container}>
      <Swiper
        cards={accounts}
        renderCard={(card, idx) => (
          <AccountCard
            data={card}
            bgImage={bgMap[card.bankId || idx]}
            onReconnect={onReconnect}
            onDelete={onDelete}
            onPressAccount={onPressAccount}
          />
        )}
        cardIndex={0}
        stackSize={stackSize}
        infinite
        backgroundColor="transparent"
        showSecondCard
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 380,
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.24)',
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 20,
    marginHorizontal: 14,
  },
  card: {
    width: width * 0.75,
    height: 250,
    borderRadius: 20,
    padding: 20,
  },
  bankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  bankName: {
    fontSize: 16,
    color: Colors.cardTxt,
    fontWeight: 'bold',
    flex: 1,
  },
  accountRow: {
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  accountType: {
    color: Colors.cardTxt,
    fontSize: 14,
    fontFamily: FontFamily.regular,
    marginLeft: 4,
  },
  amount: {
    color: Colors.cardTxt,
    color: Colors.cardTxt,
    fontWeight: '600',
    marginLeft: 4,
  },
  reconnectNote: {
    color: '#ffc107',
    fontSize: 12,
    marginTop: 10,
    fontWeight: '500',
  },
  cardContainer: {
    position: 'relative',
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    zIndex: 1,
  },
  blurImage: {
    width: '83%',
    height: '80%',
    borderRadius: 20,
    marginTop: 50,
  },
  toggleButton: {
    position: 'absolute',
    top: 280,
    right: 150,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  toggleButtonText: {
    fontSize: 13,
    color: '#AFAFAF',
    fontWeight: '500',
  },
});
