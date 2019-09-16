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
  TouchableOpacity,
  TextInput
} from "react-native";


import Constants from "../../../constants";
import NavigationBar from "react-native-navbar";
import SubmitButton from "../../../components/common/FormSubmitButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { bindActionCreators } from "redux";
import * as SettingActions from '../../../redux/modules/settings';

 class DelgateSupport extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  onSave() {

this.props.SettingActions.supportMessage({...this.state},this.props.tokenforuser);

  }

  render() {
    const titleConfig = {
      title: "Delgate Support",
      tintColor: "#fff",
      style: { fontSize: 18, fontWeight: "600" }
    };
    const { navigate ,goBack} = this.props.navigation;
    return (
      <View style={styles.container}>
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
        <View style={styles.subcontainer}>
          <Text style={styles.headerTxt}>Get support from Delgate team</Text>

          <TextInput
            style={styles.messageTxt}
            onChangeText={text => this.setState({ msg: text })}
            placeholder={"Your Message"}
            placeholderTextColor={Constants.Colors.Gray}
            value={this.state.msg}
            multiline={true}
            numberOfLines={4}
            underlineColorAndroid='transparent'
            
          />

          <SubmitButton
            onPress={() => this.onSave()}
            text={"SEND"}
            style={[styles.ButtonStyle, { backgroundColor: "#53C8E5" }]}
            textStyle={[{ fontSize: 15 }]}
          />
          <Text style={[styles.headerTxt, { fontSize: 12 }]}>
            You can also get support from Delgate by calling at
          </Text>
          <Image source={Constants.Images.user.telephone} style={styles.image} resizeMode={'contain'} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subcontainer: {
    flex: 1,
    paddingHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5
  },
  navigationBar: {
    backgroundColor: Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    alignItems: "center"
  },
  headerTxt: {
    color: Constants.Colors.Gray,
    textAlign: "center",
    fontSize: 14,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
    padding: Constants.BaseStyle.PADDING * 0.8
  },
  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
  messageTxt: {
    paddingLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
    borderColor: Constants.Colors.Gray,
    borderWidth: 1,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 35,
    color: Constants.Colors.LightGray,
    textAlignVertical: "top"
  },
  numberStyle: {
    color: Constants.Colors.Blue,
    textAlign: "center",
    textDecorationLine: "underline"
  },
  ButtonStyle: {
    backgroundColor: "rgba(115,115,115,0.4)",

    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100,
    borderRadius: 5,
    shadowColor: Constants.Colors.LightGray,
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    borderRadius: 2
  },
  image: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 10,
    alignSelf:'center'
  },
});

const mapStateToProps = state => (
  {
  
  tokenforuser: (state.user.userData && state.user.userData.token) || (state.user.driverData && state.user.driverData.token),
  
 
});

const mapDispatchToProps = dispatch => ({
  SettingActions: bindActionCreators(SettingActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DelgateSupport);
