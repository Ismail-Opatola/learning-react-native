import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';

export const Timing = ({ onChangeTime }) => {
  return (
    <>
      <View styles={styles.timingButton}>
        <RoundedButton size={60} title="10" onPress={() => onChangeTime(10)} />
      </View>
      <View styles={styles.timingButton}>
        <RoundedButton size={60} title="15" onPress={() => onChangeTime(15)} />
      </View>
      <View styles={styles.timingButton}>
        <RoundedButton size={60} title="20" onPress={() => onChangeTime(20)} />
      </View>
      <View styles={styles.timingButton}>
        <RoundedButton size={60} title="25" onPress={() => onChangeTime(25)} />
      </View>
      <View styles={styles.timingButton}>
        <RoundedButton size={60} title="30" onPress={() => onChangeTime(30)} />
      </View>
      <View styles={styles.timingButton}>
        <RoundedButton size={60} title="35" onPress={() => onChangeTime(35)} />
      </View>
      <View styles={styles.timingButton}>
        <RoundedButton size={60} title="40" onPress={() => onChangeTime(40)} />
      </View>
      <View styles={styles.timingButton}>
        <RoundedButton size={60} title="45" onPress={() => onChangeTime(45)} />
      </View>
      <View styles={styles.timingButton}>
        <RoundedButton size={60} title="50" onPress={() => onChangeTime(50)} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignItems: 'center',
  },
});
