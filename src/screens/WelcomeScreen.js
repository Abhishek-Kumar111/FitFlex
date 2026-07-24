// src/screens/WelcomeScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import colors from '../constants/colors';

const WelcomeScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <View style={styles.content}>
        
        {/* Fitness Image Graphic */}
        <View style={styles.imageWrapper}>
          <Image
            source={require('../assets/images/fitness.png')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* App Information */}
        <View style={styles.textContainer}>
          <Text style={styles.badgeLabel}>PRO FITNESS TRACKER</Text>
          <Text style={styles.appName}>FitFlex</Text>
          <Text style={styles.description}>
            Transform your body with structured daily routines. Your journey to a healthier, stronger self starts today.
          </Text>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleGetStarted}
        >
          <Text style={styles.buttonText}>Get Started</Text>
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
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageWrapper: {
    width: '100%',
    height: 320,
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  badgeLabel: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  appName: {
    color: colors.textPrimary,
    fontSize: 38,
    fontWeight: '800',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: colors.primary,
    width: '100%',
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
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

export default WelcomeScreen;
