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
  ScrollView
} from 'react-native';


import Background from '../../../components/common/Background';
import Constants from "../../../constants";
import HeaderBackground from '../../../components/customer/HeaderBackground';
export default class CustomerMessages extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      available: true
    }
  }

  setAvailability() {
    this.setState({
      available: !this.state.available
    })
  }

  render() {
    const titleConfig = {
      title: "HOME",
      tintColor: "#fff",
      style: { fontSize: 18, fontWeight: '600' }
    };
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <HeaderBackground navigation={navigate} />
        <ScrollView>
          <Text>{'Messages'}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar: {
    backgroundColor: Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    alignItems: 'center'
  },
  rightButtonNav: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
  sectionHeaders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Constants.BaseStyle.PADDING * .5,
    alignItems: 'center'
  },
  textBlue: {
    fontSize: 22,
    fontWeight: '700',
    color: Constants.Colors.Blue
  },
  textOrange: {
    fontSize: 16,
    fontWeight: '600',
    color: Constants.Colors.Orange
  },
  reportSection: {
    padding: Constants.BaseStyle.PADDING * .5
  },
});
