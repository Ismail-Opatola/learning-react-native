import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { fontSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  // return <Text style={styles.historyItem}>{item.subject}</Text>;
  return <Text style={styles(item.status).historyItem}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, setFocusHistory, onClear }) => {
  const clearHistory = () => onClear();
  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles().title}>Things we've focused on</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center'}}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles().clearContainer}>
              <RoundedButton
                size={75}
                title="Clear"
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = (status = 0) =>  
StyleSheet.create({
  historyItem: {
    color: status > 1 ? 'red' : 'green',
    fontSize: fontSizes.md,
    padding: spacing.sm,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 8,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  title: {
    color: 'white',
    fontSize: fontSizes.lg,
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
});
