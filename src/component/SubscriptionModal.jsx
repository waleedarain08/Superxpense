import React from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity,ActivityIndicator} from 'react-native';

const SubscriptionModal = ({
  visible,
  onClose,
  products,
  onBuyProduct,
  onSelectProduct,
  loading
}) => {
  const [selectedPlan, setSelectedPlan] = React.useState(
    products.find(plan => plan.productId === 'yearly') || null,
  );

  const handleSelectPlan = plan => {
    console.log('Selected plan:', plan);
    const newSelectedPlan = selectedPlan === plan ? null : plan;
    setSelectedPlan(newSelectedPlan);
    onSelectProduct(newSelectedPlan);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <View style={styles.plansRow}>
            {products.map((plan, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.planCard,
                  selectedPlan === plan && {
                    borderColor: '#0D2D2D',
                    borderWidth: 1.5,
                  },
                ]}
                onPress={() => handleSelectPlan(plan)}>
                {plan.productId === 'yearly' && (
                  <View style={styles.popularHeader}>
                    <Text style={styles.popularHeaderText}>Most Popular</Text>
                  </View>
                )}
                <Text style={styles.planTitle}>{plan.productId}</Text>
                <Text style={styles.planPrice}>{plan.localizedPrice}</Text>
                <Text style={styles.planDesc}>{plan.description}</Text>
                {plan.trial && (
                  <Text style={styles.planTrial}>{plan.trial}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.modalText}>Choose subscription plan</Text>
          <Text style={styles.modalSubText}>Unlock the full potential of our app by selecting the plan that best fits your needs. Enjoy premium features, enhanced performance, and priority support—tailored to help you get the most out of your experience.</Text>

          <TouchableOpacity style={styles.modalButton} onPress={onBuyProduct}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.modalButtonText}>Subscribe</Text>
            )}
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
    justifyContent: 'space-around',
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
  planDesc: {
    fontSize: 9,
    marginVertical: 4,
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: 4,
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
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 50,
    padding: 5,
    backgroundColor: '#ffffff',
  },
  closeButtonText: {
    fontSize: 18,
    backgroundColor: '#fff',
  },
});
