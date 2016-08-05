import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class HomeScreen extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
      </View>
      );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});