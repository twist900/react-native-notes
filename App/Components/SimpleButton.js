import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class SimpleButton extends React.Component{
  render(){
    return (
      <TouchableOpacity onPress={ this.props.onPress }>
        <View>
          <Text>{ this.props.customText || 'Simple Button' }</Text>
        </View>
      </TouchableOpacity>
      );
  }
}

SimpleButton.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  customText: React.PropTypes.string
}