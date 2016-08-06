import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import SimpleButton from './SimpleButton';
import NoteList from './NoteList';

export default class HomeScreen extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <NoteList />
        <View style={styles.buttonContainer}>
          <Text style={styles.noNotesText}>You haven't created any notes!</Text>
          <SimpleButton
            customText="Create Note"
            onPress={() => {this.props.navigator.push({name: 'createNote'})}}
            style={styles.simpleButton}
            textStyle={styles.simpleButtonText}
           />
        </View>
      </View>
      );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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