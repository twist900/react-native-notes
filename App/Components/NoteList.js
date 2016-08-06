import React from 'react';
import {View,
        ListView,
        Text,
        StyleSheet,
        TouchableHighlight,
      } from 'react-native';

export default class NoteList extends React.Component{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: this.ds.cloneWithRows([
            {title: "Note 1", body: "Body 1", id: 1},
            {title: "Note 2", body: "Body 2", id: 2}
          ])
    };
  }

  _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }

  _renderRow(rowData){
    return(
      <TouchableHighlight onPress={() => console.log(rowData.title)}>
        <View style={styles.row}>
          <Text style={styles.text}>{rowData.title}</Text>
        </View>
      </TouchableHighlight>
      );
  }

  render(){
    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        renderSeparator={this._renderSeparator}
      />
      );
  }
}

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },

  text: {
    flex: 1,
  },
});