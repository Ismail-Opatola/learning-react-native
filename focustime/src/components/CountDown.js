import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';

const minutesToMilliSeconds = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const CountDown = ({ minutes, isPaused, onProgress, onEnd }) => {
  const [millis, setMillis] = useState(minutesToMilliSeconds(minutes));
  const interval = useRef(null);

  useEffect(() => {
    setMillis(minutesToMilliSeconds(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      // don't count
      if (interval.current) clearInterval(interval.current); // clean up the setTimout
      return;
    }
    // start counting down
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current); // clean up the setTimout
  }, [isPaused]);

  /**
   * trigger everytime milliseconds changes
   * update progressBar
   * if milliseconds reaches zero
   * reset minutes to DEFAULT_TIME, progressBar, isStarted=false.
   *       then we want the phone to Vibrate
   */
  useEffect(() => {
    onProgress(millis / minutesToMilliSeconds(minutes));
    if (millis === 0) {
      return onEnd();
    }
  }, [millis]);

  /**
   * count down functuion
   * updates milliseconds state
   * if time i.e millis reaches Zero
   * stop counting, update milliseconds
   * else calculate what time is left
   * update milliseconds to time left
   */
  const countDown = () => {
    // count down
    // update timer state
    setMillis((time) => {
      if (time === 0) {
        // when timer reaches 0
        // CLEAR setInterval
        clearInterval(interval.current);
        return time;
      }
      // reduce by 1sec every interval
      const timeLeft = time - 1000;
      // update state
      return timeLeft;
    });
  };

  const min = Math.floor(millis / 1000 / 60) % 60;
  const sec = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(min)}:{formatTime(sec)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    padding: spacing.lg,
    color: colors.white,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});
