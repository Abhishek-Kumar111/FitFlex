// src/screens/WorkoutScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import WorkoutCard from '../components/WorkoutCard';
import daysData from '../data/days.json';
import colors from '../constants/colors';

const WorkoutScreen = ({ route, navigation }) => {
  const { day = 1 } = route.params || {};

  // Retrieve current day workout data from local JSON
  const dayItem = daysData.find((item) => item.day === day) || daysData[0];
  const { title, subtitle, workouts = [] } = dayItem;

  // Calculate total duration in seconds
  const totalSeconds = workouts.reduce((sum, w) => sum + (w.duration || 0), 0);
  const totalMinutes = Math.ceil(totalSeconds / 60);

  const handleSelectWorkout = (index) => {
    navigation.navigate('WorkoutPlayer', {
      workouts,
      workoutIndex: index,
      dayTitle: title,
    });
  };

  const renderWorkoutItem = ({ item, index }) => (
    <WorkoutCard
      workout={item}
      onPress={() => handleSelectWorkout(index)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Top Header Navigation */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Day Overview Banner */}
      <View style={styles.heroSection}>
        <View style={styles.badgeRow}>
          <Text style={styles.dayBadge}>DAY {day}</Text>
          <Text style={styles.summaryBadge}>{workouts.length} Exercises • ~{totalMinutes} min</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {/* Workout List */}
      <View style={styles.listSection}>
        <Text style={styles.sectionHeader}>TODAY'S WORKOUTS</Text>
        
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderWorkoutItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    alignSelf: 'flex-start',
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
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayBadge: {
    backgroundColor: colors.badgeBg,
    color: colors.badgeText,
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  summaryBadge: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  listSection: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  sectionHeader: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
});

export default WorkoutScreen;
