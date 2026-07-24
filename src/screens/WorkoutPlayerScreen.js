// src/screens/WorkoutPlayerScreen.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const {
    workouts = [],
    workoutIndex = 0,
    workout: fallbackWorkout = {},
    dayTitle = 'Workout',
  } = route.params || {};

  // Track active exercise index in the day's workout list
  const [currentIndex, setCurrentIndex] = useState(workoutIndex);
  
  // Resolve current active workout object
  const currentWorkout =
    workouts.length > 0 ? workouts[currentIndex] : fallbackWorkout;
  
  const {
    name = 'Exercise',
    duration = 30,
    reps = '15 reps',
    category = 'Fitness',
    instructions,
  } = currentWorkout || {};

  // Timer states
  const [timeLeft, setTimeLeft] = useState(duration);
  const [timerState, setTimerState] = useState('idle'); // 'idle' | 'running' | 'paused' | 'completed'

  const timerRef = useRef(null);
  const autoAdvanceRef = useRef(null);

  // Helper to format seconds into MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
    const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;
    return `${formattedMins}:${formattedSecs}`;
  };

  // Clear running timer interval
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Clear auto-advance timeout
  const clearAutoAdvance = useCallback(() => {
    if (autoAdvanceRef.current) {
      clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
  }, []);

  // Reset timer when active workout changes
  useEffect(() => {
    stopTimer();
    clearAutoAdvance();
    setTimeLeft(duration);
    setTimerState('idle');
  }, [currentIndex, duration, stopTimer, clearAutoAdvance]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      stopTimer();
      clearAutoAdvance();
    };
  }, [stopTimer, clearAutoAdvance]);

  // Next workout / Complete navigation
  const handleNextWorkout = useCallback(() => {
    stopTimer();
    clearAutoAdvance();

    if (currentIndex < workouts.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Last workout completed
      navigation.replace('WorkoutComplete', {
        dayTitle,
        totalExercises: workouts.length > 0 ? workouts.length : 1,
      });
    }
  }, [currentIndex, workouts.length, dayTitle, navigation, stopTimer, clearAutoAdvance]);

  // Countdown effect
  useEffect(() => {
    if (timerState === 'running') {
      stopTimer();
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            stopTimer();
            setTimerState('completed');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      stopTimer();
    }
  }, [timerState, stopTimer]);

  // Auto-advance 2 seconds after completion
  useEffect(() => {
    if (timerState === 'completed') {
      autoAdvanceRef.current = setTimeout(() => {
        handleNextWorkout();
      }, 2000);
    }
  }, [timerState, handleNextWorkout]);

  // Control Handlers
  const handleStart = () => {
    setTimerState('running');
  };

  const handlePause = () => {
    setTimerState('paused');
  };

  const handleResume = () => {
    setTimerState('running');
  };

  const handleReset = () => {
    stopTimer();
    clearAutoAdvance();
    setTimeLeft(duration);
    setTimerState('idle');
  };

  const handlePreviousWorkout = () => {
    if (currentIndex > 0) {
      stopTimer();
      clearAutoAdvance();
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSkipWorkout = () => {
    handleNextWorkout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Header Bar with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            stopTimer();
            clearAutoAdvance();
            navigation.goBack();
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {dayTitle} ({currentIndex + 1}/{workouts.length || 1})
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Workout Name Header */}
        <View style={styles.displayCard}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{category.toUpperCase()}</Text>
          </View>
          <Text style={styles.exerciseName}>{name}</Text>
          <Text style={styles.repsSubtitle}>{reps}</Text>
        </View>

        {/* Large Countdown Timer Display */}
        <View style={styles.timerCard}>
          <Text style={styles.timerLabel}>
            {timerState === 'completed'
              ? 'STATUS'
              : timerState === 'running'
              ? 'COUNTDOWN'
              : timerState === 'paused'
              ? 'PAUSED'
              : 'READY'}
          </Text>

          {timerState === 'completed' ? (
            <View style={styles.completedBadge}>
              <Text style={styles.completedBadgeText}>Workout Completed!</Text>
              <Text style={styles.autoAdvanceText}>Moving to next exercise in 2s...</Text>
            </View>
          ) : (
            <Text style={styles.timerDigits}>{formatTime(timeLeft)}</Text>
          )}
        </View>

        {/* Action Controls (Start, Pause, Resume, Reset, Skip, Previous) */}
        <View style={styles.controlsSection}>
          
          {/* Main Action Button (Start / Pause / Resume) */}
          {timerState === 'idle' && (
            <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.8} onPress={handleStart}>
              <Text style={styles.btnPrimaryText}>Start</Text>
            </TouchableOpacity>
          )}

          {timerState === 'running' && (
            <TouchableOpacity style={styles.btnWarning} activeOpacity={0.8} onPress={handlePause}>
              <Text style={styles.btnWarningText}>Pause</Text>
            </TouchableOpacity>
          )}

          {timerState === 'paused' && (
            <View style={styles.pausedRow}>
              <TouchableOpacity style={[styles.btnPrimary, { flex: 1, marginRight: 8 }]} activeOpacity={0.8} onPress={handleResume}>
                <Text style={styles.btnPrimaryText}>Resume</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnSecondary, { flex: 1, marginLeft: 8 }]} activeOpacity={0.8} onPress={handleReset}>
                <Text style={styles.btnSecondaryText}>Reset</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Secondary Controls (Previous, Reset, Skip) */}
          <View style={styles.navControlsRow}>
            <TouchableOpacity
              style={[styles.btnNav, currentIndex === 0 && styles.btnDisabled]}
              disabled={currentIndex === 0}
              onPress={handlePreviousWorkout}
              activeOpacity={0.7}
            >
              <Text style={[styles.btnNavText, currentIndex === 0 && styles.textDisabled]}>
                ‹ Previous
              </Text>
            </TouchableOpacity>

            {timerState !== 'paused' && (
              <TouchableOpacity style={styles.btnResetSmall} onPress={handleReset} activeOpacity={0.7}>
                <Text style={styles.btnResetSmallText}>Reset</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.btnNav}
              onPress={handleSkipWorkout}
              activeOpacity={0.7}
            >
              <Text style={styles.btnNavText}>Skip ›</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* Instructions */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>INSTRUCTIONS</Text>
          <Text style={styles.instructionsText}>
            {instructions ||
              'Keep your core engaged, maintain controlled breathing, and focus on proper form throughout.'}
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
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  displayCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  categoryBadge: {
    backgroundColor: colors.badgeBg,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  exerciseName: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  repsSubtitle: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  timerCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  timerLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  timerDigits: {
    color: colors.textPrimary,
    fontSize: 58,
    fontWeight: '900',
    letterSpacing: 2,
    fontVariant: ['tabular-nums'],
  },
  completedBadge: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  completedBadgeText: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
  },
  autoAdvanceText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  controlsSection: {
    marginBottom: 20,
  },
  btnPrimary: {
    backgroundColor: colors.primary,
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  btnPrimaryText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '800',
  },
  btnWarning: {
    backgroundColor: '#F59E0B',
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  btnWarningText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '800',
  },
  pausedRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  btnSecondary: {
    backgroundColor: colors.cardBg,
    height: 54,
    borderRadius: 16,
    justify: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  btnSecondaryText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  navControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnNav: {
    backgroundColor: colors.cardBg,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  btnNavText: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: '700',
  },
  btnResetSmall: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  btnResetSmallText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  btnDisabled: {
    opacity: 0.4,
  },
  textDisabled: {
    color: colors.textSecondary,
  },
  instructionsCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  instructionsTitle: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  instructionsText: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 22,
  },
});

export default WorkoutPlayerScreen;
