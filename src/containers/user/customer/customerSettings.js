/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";

import Constants from "../../../constants";
import NavigationBar from "react-native-navbar";
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomerSettingsList from "../../../components/customer/CustomerSettingsList";
import HeaderBackground from "../../../components/customer/HeaderBackground";
import HeaderBackgroundWithBackButton from "../../../components/customer/HeaderBackgroundWithBackButton";

export default class customerSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const titleConfig = {
      title: " SETTINGS",
      tintColor: "#fff",
      style: { fontSize: 18, fontWeight: "600" }
    };
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        {/* <HeaderBackgroundWithBackButton navigation={navigate} goBack={goBack} headerText={'SETTINGS'} /> */}
        <NavigationBar
          statusBar={{ hidden: true }}
          style={styles.navigationBar}
          title={titleConfig}
          leftButton={
            <TouchableOpacity onPress={()=>goBack()}>
              <Icon name="angle-left" size={40} color='white' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} />
            </TouchableOpacity>
          }
        />
        <CustomerSettingsList navigate={navigate} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  navigationBar: {
    backgroundColor: Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    alignItems: "center"
  },

  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  }
});
