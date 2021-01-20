import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Header } from 'react-native-elements';

export default class ReadStoryScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'Reading Hub',
            style: { color: 'white', fontSize: 20, fontWeight: 'bold' },
          }}
          backgroundColor={'purple'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});