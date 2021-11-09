import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  // @todo on load: pause for 1 sec(?) before loading main menu
  // @todo dashboard: food, water, and fuel for x days; water is LCDs

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Preppy</Text>
      <Text style={styles.subtitle}>Don't be scared, be prepared</Text>
      <View style={styles.buttonWrapper}>
        <Button style={styles.button} title="Profile"/>
        <Button style={styles.button} title="Inventory"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '48%',
  },
  buttonWrapper: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10,
  },
  subtitle: {
    marginBottom: 20,
  },
  titleText: {
    flexDirection: 'row',
    fontSize: 24,
  },
});
