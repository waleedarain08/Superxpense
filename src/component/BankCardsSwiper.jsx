import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { BlurView } from '@react-native-community/blur';

const { width } = Dimensions.get('window');

const cards = [
  {
    id: 1,
    bankName: 'Abu Dhabi Islamic Bank',
    backgroundColor: ['#A18CD1', '#FBC2EB'],
    // logo: require('./assets/adib.png'), // Replace with actual image path
    logo: '',
  },
  {
    id: 2,
    bankName: 'First Abu Dhabi Bank',
    backgroundColor: ['#F43B47', '#453A94'],
    // logo: require('./assets/fab.png'), // Replace with actual image path
    logo: '',
  },
];

const BankCard = ({ bank, showBalance, onToggleBalance }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={[styles.card, { backgroundColor: '#fff' }]}> {/* background container */}
        <View style={styles.layerCard(bank.backgroundColor)}>
          <Image source={bank.logo} style={styles.logo} />
          <Text style={styles.bankName}>{bank.bankName}</Text>
        </View>

        <View style={styles.overlayCard}>
          <TouchableOpacity onPress={onToggleBalance}>
            <Text style={styles.hideText}>{showBalance ? 'Hide balance 🕶️' : 'Show balance 👁️'}</Text>
          </TouchableOpacity>
          {showBalance ? (
            <Text style={styles.balance}>₫ 35,000.00</Text>
          ) : (
            <BlurView
              style={styles.blurView}
              blurType="light"
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            >
              <Text style={styles.balance}>₫ 35,000.00</Text>
            </BlurView>
          )}
          <Text style={styles.netWorth}>Net Worth</Text>
        </View>
      </View>
    </View>
  );
};

const BankCardsSwiper = () => {
  const [showBalanceArr, setShowBalanceArr] = useState(cards.map(() => true));
  const [cardIndex, setCardIndex] = useState(0);
  const [swipedStack, setSwipedStack] = useState([]);
  const swiperRef = useRef(null);

  // Only allow swipe if more than 1 card left
  const canSwipe = cards.length - cardIndex > 1;

  // Toggle show/hide for a specific card
  const handleToggleBalance = (idx) => {
    setShowBalanceArr((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  // Handle swipe forward
  const handleSwiped = (i) => {
    setSwipedStack((prev) => [...prev, i]);
    setCardIndex(i + 1);
  };

  // Handle undo swipe
  const handleUndo = () => {
    if (swiperRef.current && swipedStack.length > 0) {
      swiperRef.current.swipeBack();
      setSwipedStack((prev) => prev.slice(0, -1));
      setCardIndex((prev) => prev - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bank Accounts</Text>
      <Swiper
        ref={swiperRef}
        cards={cards}
        cardIndex={cardIndex}
        renderCard={(card, idx) => {
          const realIdx = cardIndex + idx;
          return (
            <View style={styles.outerCardWrap}>
              <View style={styles.cardBorder}>
                <BankCard
                  key={card.id}
                  bank={card}
                  showBalance={showBalanceArr[realIdx]}
                  onToggleBalance={() => handleToggleBalance(realIdx)}
                />
              </View>
            </View>
          );
        }}
        backgroundColor="transparent"
        stackSize={2}
        stackSeparation={18}
        cardHorizontalMargin={0}
        cardVerticalMargin={20}
        verticalSwipe={false}
        disableBottomSwipe
        disableTopSwipe
        disableLeftSwipe={!canSwipe}
        disableRightSwipe={!canSwipe}
        onSwiped={handleSwiped}
        onSwipedAll={() => setCardIndex(cards.length - 1)}
        overlayLabels={{}}
      />
      {/* Undo swipe button */}
      {swipedStack.length > 0 && (
        <TouchableOpacity
          style={styles.undoButton}
          onPress={handleUndo}
        >
          <Text style={styles.undoButtonText}>Undo Swipe</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  cardContainer: {
    alignItems: 'center',
  },
  outerCardWrap: {
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 10,
  },
  cardBorder: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  card: {
    width: width * 0.9,
    height: 250,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  layerCard: (colors) => ({
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '65%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors[1],
    padding: 20,
  }),
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  bankName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  overlayCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderTopWidth: 1,
    borderColor: '#eee',
    borderRadius: 20,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
  },
  hideText: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  balance: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  netWorth: {
    fontSize: 14,
    color: '#555',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  undoButton: {
    marginTop: 16,
    alignSelf: 'center',
    backgroundColor: 'rgba(40,160,140,0.12)',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  undoButtonText: {
    color: '#28A08C',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BankCardsSwiper;
