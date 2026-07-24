// src/screens/HomeScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import DayCard from '../components/DayCard';
import daysData from '../data/days.json';
import colors from '../constants/colors';

const HomeScreen = ({ navigation }) => {
  const handleSelectDay = (item) => {
    navigation.navigate('Workout', { day: item.day, title: item.title });
  };

  const renderDayItem = ({ item }) => (
    <DayCard
      day={item.day}
      title={item.title}
      subtitle={item.subtitle}
      onPress={() => handleSelectDay(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>WORKOUT SCHEDULE</Text>
          <Text style={styles.title}>Weekly Plan</Text>
        </View>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>7 DAYS</Text>
        </View>
      </View>

      {/* Grid of Workout Days loaded from JSON */}
      <FlatList
        data={daysData}
        keyExtractor={(item) => item.day.toString()}
        renderItem={renderDayItem}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
    paddingTop: 20,
    paddingBottom: 12,
  },
  greeting: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
    marginTop: 2,
  },
  headerBadge: {
    backgroundColor: colors.cardBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  headerBadgeText: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
});

export default HomeScreen;
