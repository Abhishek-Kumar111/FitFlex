// src/screens/WorkoutPlayerScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import colors from '../constants/colors';

const WorkoutPlayerScreen = ({ route, navigation }) => {
  const { workout = {}, dayTitle = 'Workout' } = route.params || {};
  const {
    name = 'Exercise',
    duration = 30,
    reps = '15 reps',
    category = 'Fitness',
    instructions,
  } = workout;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{dayTitle}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Exercise Visual Header */}
        <View style={styles.displayCard}>
          <View style={styles.iconCircle}>
            <Text style={styles.heroIcon}>🏋️</Text>
          </View>
          <Text style={styles.exerciseName}>{name}</Text>
        </View>

        {/* Category, Duration & Reps Detail Grid */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>CATEGORY</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{category}</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>DURATION</Text>
              <Text style={styles.statValue}>{duration} sec</Text>
            </View>
            
            <View style={[styles.statBox, styles.statBoxRight]}>
              <Text style={styles.statLabel}>REPS / SET</Text>
              <Text style={styles.statValueAlt}>{reps}</Text>
            </View>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>INSTRUCTIONS</Text>
          <Text style={styles.instructionsText}>
            {instructions ||
              'Focus on controlled motion and proper form throughout the set. Breathe rhythmically and keep your core engaged.'}
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  backArrow: {
    color: colors.primary,
    fontSize: 18,
    marginRight: 6,
    fontWeight: '700',
  },
  backText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  headerTitle: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  displayCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginVertical: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.badgeBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  heroIcon: {
    fontSize: 36,
  },
  exerciseName: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  detailLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  categoryBadge: {
    backgroundColor: colors.badgeBg,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 16,
    marginRight: 6,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  statBoxRight: {
    marginRight: 0,
    marginLeft: 6,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 6,
  },
  statValue: {
    color: colors.secondary,
    fontSize: 22,
    fontWeight: '800',
  },
  statValueAlt: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: '800',
  },
  instructionsCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  instructionsTitle: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  instructionsText: {
    color: colors.textPrimary,
    fontSize: 15,
    lineHeight: 24,
  },
});

export default WorkoutPlayerScreen;
