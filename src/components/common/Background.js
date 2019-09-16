import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground
} from 'react-native';

import Constants from '../../constants';

export default class Background extends Component {
  render() {
    return (
      <View 
        // source={Constants.Images.user.background} 
        style={[styles.container, this.props.style]}>
          {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex  : 1,
    width : Constants.BaseStyle.DEVICE_WIDTH,
    backgroundColor:"rgb(53,110,174)"
  },
});
