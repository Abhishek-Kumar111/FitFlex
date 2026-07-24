// src/components/DayCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const DayCard = ({ day, title, subtitle, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.badge}>
        <Text style={styles.badgeText}>DAY {day}</Text>
      </View>
      
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle} numberOfLines={1}>
        {subtitle || 'Workout Session'}
      </Text>
      
      <View style={styles.footerRow}>
        <Text style={styles.actionText}>View Workout</Text>
        <Text style={styles.arrowIcon}>→</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 16,
    margin: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    justify: 'space-between',
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  badge: {
    backgroundColor: colors.badgeBg,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgeText: {
    color: colors.badgeText,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 16,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  actionText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  arrowIcon: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});

export default DayCard;
