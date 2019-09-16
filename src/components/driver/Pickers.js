/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';


import Background from '../../components/common/Background';
import Constants from "../../constants";

export default class Pickers extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      focusColor  : Constants.Colors.BlurGrey,
      IcontintColor : Constants.Colors.BlurGrey,
      modalVisible:false,

    }
  }
  onPress()
  {
    this.setState({focusColor : Constants.Colors.Blue,IcontintColor : Constants.Colors.Blue});
    if(this.props.onPress){
      this.props.onPress();
    }
  }

  render() {
    let {
      textStyle,styleRow,text,img,styleRowIcon,listItems
    } = this.props;
    return (
      <TouchableOpacity style={[styles.container]} onPress={() => {this.onPress()}}>
          <View style={[{borderBottomColor:this.state.focusColor},styleRow]}>
              <Text style={[styles.rowText,{color : this.state.focusColor},textStyle]}>
                {text}
              </Text>
              <Image source={img} style={[{tintColor:this.state.IcontintColor},styleRowIcon]} resizeMode={'contain'} />
          </View>

      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
    },
    rowText : {
      marginTop:15,
      marginBottom : 10,
      flexDirection:'row',
      flex : 1,
    },
    itemValue: {
      flex:0.45,
      //color:Constants.Colors.Blue,
      fontWeight:'800',
      fontSize:14,
      textAlign:'center'
    },

});
