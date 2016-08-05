import React from 'react';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';

export default class NoteScreen extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <TextInput
          ref="title"
          autoFocus={true}
          placeholder="Untitled"
          style={styles.title}
          onEndEditing={(text) => {this.refs.body.focus()}} />
        <TextInput
          ref="body"
          placeholder="Start typing"
          style={styles.body}
          multiline={true} />
      </View>
      );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 64,
  },

  title: {
    height: 40,
  },

  body: {
    flex: 1,
  },
})