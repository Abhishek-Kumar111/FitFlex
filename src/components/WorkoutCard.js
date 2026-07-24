// src/components/WorkoutCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const WorkoutCard = ({ workout, onPress }) => {
  const { name, duration, reps, category } = workout;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>🔥</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.workoutName}>{name}</Text>
          <View style={styles.metaRow}>
            {category && <Text style={styles.categoryBadge}>{category}</Text>}
            {reps && <Text style={styles.repsText}> • {reps}</Text>}
          </View>
        </View>
      </View>

      <View style={styles.rightSection}>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{duration} sec</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: colors.badgeBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iconText: {
    fontSize: 22,
  },
  details: {
    flex: 1,
  },
  workoutName: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBadge: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  repsText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  durationText: {
    color: colors.secondary,
    fontSize: 13,
    fontWeight: '700',
  },
  chevron: {
    color: colors.textSecondary,
    fontSize: 22,
    fontWeight: '400',
  },
});

export default WorkoutCard;
