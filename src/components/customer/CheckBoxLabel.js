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
  TextInput,
  View,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

//import Background from '../../components/common/Background';
import Constants from "../../constants";

class CheckBoxLabel extends Component<{}> {
  constructor(props) {
    super(props);
  }



  render() {
    let {
      imgsource, text, MyTextStyle, isInfoImg, checkimgsize, infoimgSize, viewStyle
    } = this.props;
    return (

      <View style={[styles.flexRow, viewStyle]}>
        <TouchableOpacity activeOpacity={0.2} onPress={() => this.props.onPress()} style={[styles.flexRow, { alignItems: 'center' }]}>
          <Image source={imgsource} style={[styles.imgSize, checkimgsize]} resizeMode={'center'} />
          <Text style={[styles.textStyle, MyTextStyle]}>{text}</Text>
        </TouchableOpacity>
        {isInfoImg == true ?
          <TouchableOpacity onPress={() => this.props.onPressInfo()}>
            <Image source={Constants.Images.customer.info} style={[styles.infoimgSize, infoimgSize]} resizeMode={'center'} />
          </TouchableOpacity>
          :
          null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({

  flexRow: {
    flexDirection: 'row',
  },
  menuTrigger: {
    padding: 2,
  },
  menuOptionTitle: {
    padding: 10,
    backgroundColor: Constants.Colors.White
  },
  imgSize: {
    //marginTop: 5,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    marginRight: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1,
    //tintColor:Constants.Colors.Blue,
  },
  infoimgSize: {
    //marginTop: 5,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    //marginRight:Constants.BaseStyle.DEVICE_WIDTH/100 * 1,
    //tintColor:Constants.Colors.Blue,
  },
  textStyle: {
    fontSize: Constants.CustomerFonts.small_13.fontSize,//Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    marginRight: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1,
    color: Constants.Colors.WhiteUpd,
  },
});

export default connect(state => ({ state: state.CustomerReducer }))(CheckBoxLabel);
