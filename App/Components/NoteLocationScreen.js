import React from 'react';
import { MapView, StyleSheet } from 'react-native';
import _ from 'lodash';

export default class NoteLocationScreen extends React.Component{
  render(){
    let locations = _.values(this.props.notes).map((note) => {
      return {
        latitude: note.location.coords.latitude,
        longitude: note.location.coords.longitude,
        hasLeftCallout: true,
        onLeftCalloutPress: this.props.onSelectNote.bind(this, note),
        title: note.title
      };
    });

    return (
      <MapView
        annotations={locations}
        showsUserLocation={true}
        style={styles.map}
      />
      );
  }
}

var styles = StyleSheet.create({
  map: {
    flex: 1,
    marginTop: 64
  }
});