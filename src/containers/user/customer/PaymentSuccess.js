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
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';

import Constants from "../../../constants";
import { scaleHeight, scaleWidth, normalizeFont } from '../../../constants/responsive';
import ShadowButton from '../../../components/common/ShadowButton';

class PaymentSuccess extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      paymentText: 'Your Payment has been \nprocessed successfully'
    }

  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image resizeMode='cover' style={[styles.checkIcon, { marginBottom: scaleHeight(24) }]} source={Constants.Images.customer.successCheck} />
        {/* <Text style={[styles.textStyle, { marginBottom: scaleHeight(24) }]}>{'Congratulations!'}</Text> */}
        <Text style={[styles.textStyle, { marginBottom: scaleHeight(24), fontSize: normalizeFont(20), color: Constants.Colors.WhiteUpd, fontWeight: '400' }]}>{this.state.paymentText}</Text>
        <Text style={[styles.textStyle, { marginBottom: scaleHeight(35), fontSize: normalizeFont(20), color: Constants.Colors.WhiteUpd, fontWeight: '600' }]}>Transaction ID: 5LR546R</Text>
        <ShadowButton
            onPress={() => {
              this.props.dispatch({ type: 'SET_SELECTED_FLAG', selectedTabFlag: 3 });
              navigate('Home_SelectDriver')}}
            text={'Select Driver'}
            style={[styles.buttonStyle]}
            textStyle={[styles.ButtonTextStyle]}
          />
        {/* <TouchableOpacity onPress={() => {
          this.props.dispatch({ type: 'SET_SELECTED_FLAG', selectedTabFlag: 3 });
          navigate('Home_SelectDriver')}}>
          <View style={styles.buttonStyle}>
            <Text style={styles.ButtonTextStyle}>
              {'Select Driver'}
            </Text>
          </View>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: Constants.Colors.LightBlue, justifyContent: 'center', alignItems: 'center'
  },
  flexRow: {
    flexDirection: 'row',
  },
  checkIcon: {
    height: scaleHeight(80),
    width: scaleHeight(80),
    borderRadius: scaleHeight(40)
  },
  textStyle: {
    fontSize: normalizeFont(22),
    color: Constants.Colors.White,
    fontWeight: '600'
  },
  buttonStyle: {
    width: scaleWidth(300),
    alignSelf: 'center',
    height: scaleHeight(50),
    borderRadius: scaleHeight(5),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Constants.Colors.DarkBlue,
  },
  ButtonTextStyle: {
    color: Constants.Colors.White,
    fontWeight: '600',
    fontSize: 20,
    fontFamily: Constants.CustomerFonts.bold.fontFamily,
  }
});
export default connect(state => ({ state: state.CustomerReducer }))(PaymentSuccess);
