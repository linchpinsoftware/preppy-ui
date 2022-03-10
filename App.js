import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  // @todo on load: pause for 1 sec(?) before loading main menu
  // @todo dashboard: food, water, and fuel for x days; water is LCDs

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
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
