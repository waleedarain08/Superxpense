import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  ImageBackground,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import Header from '../../component/Header';
import {
  Bill,
  Shopping,
  GoalSvg,
  Document,
  Shield,
  Bank,
  Subscription,
} from '../../assets/svgs';

const AlertNotificationScreen = ({navigation}) => {
  const [billReminders, setBillReminders] = useState(false);
  const [spendingAlerts, setSpendingAlerts] = useState(false);
  const [goalProgress, setGoalProgress] = useState(true);
  const [monthlySummary, setMonthlySummary] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(false);
  const [bankConnectionIssues, setBankConnectionIssues] = useState(false);
  const [subscriptionPayments, setSubscriptionPayments] = useState(false);

  const SettingItem = ({
    icon,
    title,
    description,
    hasToggle = true,
    toggleValue,
    onToggleChange,
    disabled = false,
  }) => (
    <View style={styles.settingItem}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.textContainer}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      {hasToggle && (
        <Switch
          value={toggleValue}
          onValueChange={onToggleChange}
          trackColor={{
            false: Colors.lightGray,
            true: Colors.newButtonBack,
          }}
          thumbColor={Colors.white}
          disabled={disabled}
          style={disabled ? styles.disabledSwitch : null}
        />
      )}
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/greenishBackground.png')}
      style={styles.container}
      imageStyle={{resizeMode: 'cover'}}>
      <Header
        ScreenName="Alert & Notification"
        mainContainer={{marginTop: 40}}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {marginTop: 0}]}>Reminders</Text>
          <View style={styles.sectionContainer}>
            <SettingItem
              icon={<Bill width={24} height={24} />}
              title="Bill Reminders"
              description="Get notified before your upcoming bills"
              toggleValue={billReminders}
              onToggleChange={setBillReminders}
              disabled={true}
            />

            <SettingItem
              icon={<Shopping width={24} height={24} />}
              title="Spending Alerts"
              description="Set limits to avoid overspending"
              toggleValue={spendingAlerts}
              onToggleChange={setSpendingAlerts}
            />

            <SettingItem
              icon={<GoalSvg width={24} height={24} />}
              title="Goal Progress"
              description="Notify me on goal milestones"
              toggleValue={goalProgress}
              onToggleChange={setGoalProgress}
            />

            <SettingItem
              icon={<Document width={24} height={24} />}
              title="Monthly Summary"
              description="Summary of your spending, savings, and finance"
              toggleValue={monthlySummary}
              onToggleChange={setMonthlySummary}
            />
          </View>

          <View>
            <Text style={styles.sectionTitle}>Account & Security</Text>
            <View style={styles.sectionContainer}>
              <SettingItem
                icon={<Shield width={24} height={24} />}
                title="Security & Login Activity"
                description="Alert me for new logins or suspicious activity"
                toggleValue={securityAlerts}
                onToggleChange={setSecurityAlerts}
              />

              <SettingItem
                icon={<Bank width={24} height={24} />}
                title="Bank Connection Issues"
                description="Stay aware if your account can't be updated"
                toggleValue={bankConnectionIssues}
                onToggleChange={setBankConnectionIssues}
              />

              <SettingItem
                icon={<Subscription width={24} height={24} />}
                title="Subscription Payments"
                description="Remind me before subscriptions renew"
                toggleValue={subscriptionPayments}
                onToggleChange={setSubscriptionPayments}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginBottom: 12,
    marginTop: 24,
  },
  sectionContainer: {},
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 10,
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
  },
  disabledSwitch: {
    opacity: 0.5,
  },
});

export default AlertNotificationScreen;
