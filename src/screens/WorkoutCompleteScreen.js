// src/screens/WorkoutCompleteScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import colors from '../constants/colors';

const WorkoutCompleteScreen = ({ route, navigation }) => {
  const { dayTitle = 'Day 1', totalExercises = 3 } = route.params || {};

  const handleReturnHome = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <View style={styles.content}>
        {/* Trophy & Badge */}
        <View style={styles.badgeContainer}>
          <Text style={styles.trophyIcon}>🏆</Text>
        </View>

        <Text style={styles.congratsTag}>WORKOUT COMPLETED!</Text>
        <Text style={styles.heading}>Awesome Job!</Text>
        <Text style={styles.subheading}>
          You have successfully finished all {totalExercises} exercises for {dayTitle}. Keep up the great momentum!
        </Text>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalExercises}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>Target Met</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleReturnHome}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.badgeBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  trophyIcon: {
    fontSize: 54,
  },
  congratsTag: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  heading: {
    color: colors.textPrimary,
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 12,
    textAlign: 'center',
  },
  subheading: {
    color: colors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 12,
  },
  statsCard: {
    backgroundColor: colors.cardBg,
    width: '100%',
    borderRadius: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 40,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: colors.secondary,
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: colors.cardBorder,
  },
  button: {
    backgroundColor: colors.primary,
    width: '100%',
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '700',
    marginRight: 8,
  },
  buttonArrow: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '800',
  },
});

export default WorkoutCompleteScreen;
