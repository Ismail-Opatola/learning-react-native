import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';
import { CountDown } from '../../components/CountDown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';

const DEFAULT_TIME = 1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  /**
   * keep phone screen awake while Timer is rendered
   */
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => setProgress(progress);

  /**
   * incrase minutes by the timing btns - 10, 15, 20mins.
   * reset the progress.
   * stop counting.
   * @params {min}
   */
  const handleChangeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  /**
   * Anytime the timer ends,
   * Then we want the phone to Vibrate for 10sec.
   * reset minutes to DEFAULT_TIME, progressBar, isStarted.
   * revert to home screen.
   */
  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  /**
   * vibrate for 10secs
   */
  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      // android
      Vibration.vibrate(10000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl, flex: 1}}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
        <View style={{ paddingTop: spacing.sm }}>
          <ProgressBar
            progress={progress}
            color="#5E84E2"
            style={{ height: 10 }}
          />
        </View>
        <View style={[styles.buttonWrapper, {flex: 1, marginTop: spacing.sm, justifyContent: "space-evenly", flexWrap: "wrap" }]}>
          <Timing onChangeTime={handleChangeTime} />
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="||" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="GO" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  countdown: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
