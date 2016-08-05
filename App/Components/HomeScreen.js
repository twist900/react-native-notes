import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SimpleButton from './SimpleButton';

export default class HomeScreen extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.noNotesText}>You haven't created any notes!</Text>
        <SimpleButton
          customText="Create Note"
          onPress={() => {this.props.navigator.push({name: 'createNote'})}}
          style={styles.simpleButton}
          textStyle={styles.simpleButtonText}
         />
      </View>
      );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  noNotesText: {
    color: '#48209A',
    marginBottom: 10
  },

  simpleButton: {
    backgroundColor: '#5B29C1',
    borderColor: '#48209A',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: 'darkgrey',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },

  simpleButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});