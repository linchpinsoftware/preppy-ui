import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Dashboard(props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.text}>Food</Text>
          <MaterialCommunityIcons name="food-apple-outline" />
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>Water</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.text}>Fuel/energy</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>What else?</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
  row: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  cell: {
    borderColor: '#000',
    borderWidth: 1,
    borderStyle: 'solid',
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    textAlign: 'center',
  },
  card: {

  },
});
