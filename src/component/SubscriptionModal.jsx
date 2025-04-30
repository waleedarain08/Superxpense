import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const plans = [
  {
    title: '1 Month',
    price: 'AED 36.99',
    sub: 'AED 8.54 / Week',
  },
  {
    title: '12 Month',
    price: 'AED 192.99',
    sub: 'AED 3.71 / Week',
    trial: '7 days free',
    mostPopular: true,
  },
  {
    title: 'Unlimited',
    price: 'AED 399.99',
    sub: 'One-off',
  },
];

const SubscriptionModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.handle} />
          <View style={styles.plansRow}>
            {plans.map((plan, index) => (
              <View
                key={index}
                style={[
                  styles.planCard,
                  plan.mostPopular && styles.popularCard,
                ]}>
                {plan.mostPopular && (
                  <View style={styles.popularHeader}>
                    <Text style={styles.popularHeaderText}>Most Popular</Text>
                  </View>
                )}
                <Text style={styles.planTitle}>{plan.title}</Text>
                <Text style={styles.planPrice}>{plan.price}</Text>
                <Text style={styles.planSub}>{plan.sub}</Text>
                {plan.trial && <Text style={styles.planTrial}>{plan.trial}</Text>}
              </View>
            ))}
          </View>

          <Text style={styles.modalText}>7 days free, then AED 192.99 / year</Text>
          <Text style={styles.modalSubText}>You can cancel anytime</Text>

          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>Try free & subscribe</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SubscriptionModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
  },
  handle: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 16,
  },
  plansRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  planCard: {
    width: '30%',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  popularCard: {
    backgroundColor: '#fff',
    borderColor: '#00C47C',
    borderWidth: 2,
  },
  popularHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00C47C',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingVertical: 6,
  },
  popularHeaderText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  planTitle: {
    marginTop: 24,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  planPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#000',
  },
  planSub: {
    fontSize: 12,
    color: '#666',
  },
  planTrial: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000',
  },
  modalSubText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#666',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#00C47C',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
