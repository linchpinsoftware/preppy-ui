import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function UserProfile(props) {
  let banner = null;
  if (props.incomplete || false) {
    banner = <Text style={styles.banner}>Please complete your profile</Text>;
  }
  return (
    <View>
      {banner}
      <Text>User profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#f00',
  }
});