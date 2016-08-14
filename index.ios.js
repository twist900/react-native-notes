/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  AsyncStorage,
} from 'react-native';
import SimpleButton from './App/Components/SimpleButton';
import NoteScreen from './App/Components/NoteScreen';
import HomeScreen from './App/Components/HomeScreen';
import _ from 'lodash';

var NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState){
    switch(route.name){
      case 'createNote':
        return (
          <SimpleButton
            onPress={() => {navigator.pop()}} customText='Back'
            style={styles.navBarLeftButton}
            textStyle={styles.navBarButtonText}
            />
          );
        default: return null;
    }
  },

  RightButton: function(route, navigator, index, navState){
    switch(route.name){
      case 'home':
        return (
          <SimpleButton
            onPress={() => {navigator.push({
              name: 'createNote',
              passProps: {
                note: {
                  id: new Date().getTime(),
                  title: '',
                  body: '',
                }
              }
            })}}
            customText='Create Note'
            style={styles.navBarRightButton}
            textStyle={styles.navBarButtonText}/>
          );
      case 'createNote':
        if(route.passProps){
          return ( <SimpleButton
            onPress={
              () => {
                navigator.props.onDeleteNote(route.passProps.note);
                navigator.pop();
              }
            }
            customText='Delete'
            style={styles.navBarRightButton}
            textStyle={styles.navBarButtonText}
          /> );
        } else {
          return null;
        }
      default: return null;
    }
  },

  Title: function(route, navigator, index, navState){
    switch(route.name){
      case 'home':
        return (
          <Text style={styles.navBarTitleText}>React Notes</Text>
          );
      case 'createNote':
        return (
          <Text style={styles.navBarTitleText}>{route.passProps ? route.passProps.note.title : 'Create Note'}</Text>
          );
    }
  },
}
class ReactNotes extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedNote: {title: '', body: ''},
      notes: {
        1: {title: "Note 1", body: "Body 1", id: 1},
        2: {title: "Note 2", body: "Body 2", id: 2}
      }
    };
    this.loadNotes();
  }

  async saveNotes(notes){
    try{
      await AsyncStorage.setItem("@ReactNotes:notes", JSON.stringify(notes));
    }catch(error){
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  async loadNotes(){
    try{
      var notes = await AsyncStorage.getItem('@ReactNotes:notes');
      if(notes !== null){
        this.setState({notes: JSON.parse(notes)});
      }
    }catch(error){
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  updateNote(note){
    let newNotes = Object.assign({}, this.state.notes);
    note.isSaved = true;
    newNotes[note.id] = note;
    this.setState({notes: newNotes});
    this.saveNotes(newNotes);
  }

  deleteNote(note){
    let newNotes = Object.assign({}, this.state.notes);
    delete newNotes[note.id];
    this.setState({notes: newNotes});
    this.saveNotes(newNotes);
  }

  renderScene(route, navigator){
    switch (route.name) {
      case 'home':
        return (
          <HomeScreen
            navigator={navigator}
            notes={_.values(this.state.notes)}
            onSelectNote={(note) => navigator.push({
                name: 'createNote',
                passProps: {
                  note: {
                    id: note.id,
                    title: note.title,
                    body: note.body,
                }
              },
            })}
            />
      );
      case 'createNote':
       return (
         <NoteScreen {...route.passProps}
            onChangeNote={(note) => { this.updateNote(note)}}
          />
      );
    }

  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'home'}}
        renderScene={this.renderScene.bind(this)}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />
        }
        onDeleteNote={(note) => { this.deleteNote(note)}}
       />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  navContainer: {
    flex: 1,
  },
  navBar: {
    backgroundColor: '#5B29C1',
    borderBottomColor: '#48209A',
    borderBottomWidth: 1
  },
  navBarTitleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 9  // iOS
  // marginVertical: 16 // Android
  },
  navBarLeftButton: {
    paddingLeft: 10
  },
  navBarRightButton: {
    paddingRight: 10
  },
  navBarButtonText: {
    color: '#EEE',
    fontSize: 16,
    marginVertical: 10 // iOS
  // marginVertical: 16 // Android
  }
});

AppRegistry.registerComponent('ReactNotes', () => ReactNotes);
