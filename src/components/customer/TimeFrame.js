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
import { BoxShadow } from 'react-native-shadow';

class TimeFrame extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      ProgressWidth: 5,
      ProgressData: 0,
      OutputText: '1 Hour Time Window',
    }

  }

  render() {
    let {
      selectedItem
    } = this.props;

    return (
      <View style={{
        width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 90,
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
        marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
        marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100
      }}>

        <View style={[styles.flexRow, styles.viewstyle]}>
        {(selectedItem == 'economy') ?
            <TouchableOpacity style={[styles.leftStyle, styles.selectedBackStyle]} activeOpacity={0.5} onPress={() => this.props.onClickEconomy()}>
              <Text style={[styles.textStyle, styles.selectedTextStyle]}>
                {'Economy'}
              </Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={[styles.leftStyle]} activeOpacity={0.5} onPress={() => this.props.onClickEconomy()}>
              <Text style={[styles.textStyle]}>
                {'Economy'}
              </Text>
            </TouchableOpacity>
          }
                    {(selectedItem == 'regular') ?
            <TouchableOpacity style={[styles.centerStyle, styles.selectedBackStyle]} activeOpacity={0.5} onPress={() => this.props.onClickRegular()}>
              <Text style={[styles.textStyle, styles.selectedTextStyle]}>
                {'Regular'}
              </Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={[styles.centerStyle]} activeOpacity={0.5} onPress={() => this.props.onClickRegular()}>
              <Text style={[styles.textStyle]}>
                {'Regular'}
              </Text>
            </TouchableOpacity>
          }
          {(selectedItem == 'rush') ?
            <TouchableOpacity style={[styles.centerStyle, styles.selectedBackStyle]} activeOpacity={0.5} onPress={() => this.props.onClickRush()}>
              <Text style={[styles.textStyle, styles.selectedTextStyle]}>
                {'Rush'}
              </Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={[styles.centerStyle]} activeOpacity={0.5} onPress={() => this.props.onClickRush()}>
              <Text style={[styles.textStyle]}>
                {'Rush'}
              </Text>
            </TouchableOpacity>
          }

          {(selectedItem == 'direct') ?
            <TouchableOpacity style={[styles.rightStyle, styles.selectedBackStyle]} activeOpacity={0.5} onPress={() => this.props.onClickDirect()}>
              <Text style={[styles.textStyle, styles.selectedTextStyle]}>
                {'Direct'}
              </Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={[styles.rightStyle]} activeOpacity={0.5} onPress={() => this.props.onClickDirect()}>
              <Text style={[styles.textStyle]}>
                {'Direct'}
              </Text>
            </TouchableOpacity>
          }
          

          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  viewstyle: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#ffffff',
    borderRadius: 5,

  },
  leftStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constants.Colors.White,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  centerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constants.Colors.White
  },
  rightStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constants.Colors.White,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5
  },
  selectedBackStyle: {
    backgroundColor: '#53C8E5',
  },
  textStyle: {
    fontSize: Constants.CustomerFonts.small_13.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    textAlign: 'center',
    color: Constants.Colors.Black,
  },
  selectedTextStyle: {
    color: Constants.Colors.White,
  },

});
export default connect(state => ({ state: state.CustomerReducer }))(TimeFrame);
