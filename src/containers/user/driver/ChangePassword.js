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
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
  AsyncStorage
} from "react-native";

import Background from "../../../components/common/Background";
import Constants from "../../../constants";
import NavigationBar from "react-native-navbar";
import SubmitButton from "../../../components/common/FormSubmitButton";
import FormTextInput from "../../../components/common/FormTextInput";
import Icon from 'react-native-vector-icons/FontAwesome';
import RestClient from '../../../utilities/RestClient';
import Regex from '../../../utilities/Regex';
import { ToastActionsCreators } from 'react-native-redux-toast';
export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewPassword: true,
      showCurrentPassword: true,
      eyeCurrentPassword: false,
      eyeNewPassword: false,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword:"",
      eyeconfirmPassword:false,
      showConfirmPassword:true,
      email:"",
      userId:""
    };
  }
  componentDidMount = () => {
    AsyncStorage.getItem("email").then((value) => {
this.setState({email:value})
    })
    AsyncStorage.getItem("id").then((value) => {
this.setState({userId:value})
    })
  }
  
submitPassChange(){
  if(this.state.newPassword!=this.state.confirmNewPassword)
  {
    this.setState({
      newPassword:"",
      confirmNewPassword:""
    })
  ToastAndroid.show('Password Fields not same !', ToastAndroid.SHORT);
  }
  else if(!Regex.validatePassword(this.state.newPassword)){
    ToastAndroid.show('Password should be minimum 6 characters and must contain at least one capital letter, one special character, one numeric and one lower case letter', ToastAndroid.SHORT)
    return;
  }
  else{
    RestClient.post("admin/changePassword",{email:this.state.email,oldPassword:this.state.currentPassword,
      id:this.state.userId,password:this.state.newPassword,rpassword:this.state.confirmNewPassword}).then((result)=>{
       if(result.status==1)
       {
  ToastAndroid.show(result.message, ToastAndroid.SHORT);
         this.props.navigation.goBack();
       }
       else{
         alert(result.message)
       }
        console.log("result in change",result)
      })
    console.log("passwordChange",this.state.currentPassword,this.state.newPassword,this.state.confirmNewPassword)

  }
}
  currentPassword() {
    this.setState({
      showCurrentPassword: !this.state.showCurrentPassword
    });
  }
  newPassword() {
    this.setState({
      showNewPassword: !this.state.showNewPassword
    });
  }
confirmPassword(){
  this.setState({
    showConfirmPassword:!this.state.showConfirmPassword
  })
}
  newPassChange(newPassword) {
    {
      !newPassword
        ? this.setState({ eyeNewPassword: false ,newPassword})
        : this.setState({ eyeNewPassword: true ,newPassword});
    }
  }
  confirmPassChange(confirmPassword) {
    {
      !confirmPassword
        ? this.setState({ eyeconfirmPassword: false,confirmNewPassword:confirmPassword })
        : this.setState({ eyeconfirmPassword: true,confirmNewPassword:confirmPassword });
    }
  }
  currentPassChange(currentPassword) {
    {
      !currentPassword
        ? this.setState({ eyeCurrentPassword: false,currentPassword })
        : this.setState({ eyeCurrentPassword: true,currentPassword });
    }
  }
  render() {
    const titleConfig = {
      title: "Change Password",
      tintColor: "#fff",
      style: { fontSize: 18, fontWeight: "600" }
    };
    const { navigate ,goBack} = this.props.navigation;
    return (
      <View style={[styles.container, { backgroundColor: Constants.Colors.DarkBlue }]}>
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
          <KeyboardAvoidingView behavior={"position"}>
            <View style={styles.textInpuView}>
              <FormTextInput
                style={{
                  width: Constants.BaseStyle.DEVICE_WIDTH * 0.8,
                  marginTop: Constants.BaseStyle.DEVICE_HEIGHT * 0.01
                }}
                autoFocus={false}
                value={this.state.currentPassword}
                ref="CurrentPassword"
                placeHolderText="Current Password"
                placeHolderColor={Constants.Colors.WhiteUpd}
                secureText={this.state.showCurrentPassword}
                isPassword={false}
                showPassword={false}
                onChangeText={currentPassword =>
                  this.currentPassChange(currentPassword)
                }
              />

              {this.state.eyeCurrentPassword == true ? (
                <TouchableOpacity onPress={() => this.currentPassword()}>
                  <Image
                    source={Constants.Images.driver.eye}
                    style={[styles.eyeIcons]}
                    resizeMode={"contain"}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.textInpuView}>
              <FormTextInput
                style={{
                  width: Constants.BaseStyle.DEVICE_WIDTH * 0.8,
                  marginTop: Constants.BaseStyle.DEVICE_HEIGHT * 0.01
                }}
                autoFocus={false}
                value={this.state.newPassword}
                ref="SetNewPassword"
                placeHolderText="Set New Password"
                placeHolderColor={Constants.Colors.WhiteUpd}
                secureText={this.state.showNewPassword}
                isPassword={false}
                showPassword={true}
                onChangeText={newPassword => this.newPassChange(newPassword)}
              />

              {this.state.eyeNewPassword == true ? (
                <TouchableOpacity onPress={() => this.newPassword()}>
                  <Image
                    source={Constants.Images.driver.eye}
                    style={[styles.eyeIcons]}
                    resizeMode={"contain"}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.textInpuView}>
              <FormTextInput
                style={{
                  width: Constants.BaseStyle.DEVICE_WIDTH * 0.8,
                  marginTop: Constants.BaseStyle.DEVICE_HEIGHT * 0.01
                }}
                autoFocus={false}
                value={this.state.confirmNewPassword}
                ref="ConfirmNewPassword"
                placeHolderText="Confirm New Password"
                placeHolderColor={Constants.Colors.WhiteUpd}
                secureText={this.state.showConfirmPassword}
                isPassword={false}
                showPassword={true}
                onChangeText={confirmPassword => this.confirmPassChange(confirmPassword)}
              />

              {this.state.eyeconfirmPassword == true ? (
                <TouchableOpacity onPress={() => this.confirmPassword()}>
                  <Image
                    source={Constants.Images.driver.eye}
                    style={[styles.eyeIcons]}
                    resizeMode={"contain"}
                  />
                </TouchableOpacity>
              ) : null}
            </View>

            <SubmitButton
              onPress={() => this.submitPassChange()}
              text={"CHANGE PASSWORD"}
              style={[styles.ButtonStyle,{width:Constants.BaseStyle.DEVICE_WIDTH*60}]}
              textStyle={[{ fontSize: 15 }]}
            />
          </KeyboardAvoidingView>
        </View>
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

  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
  eyeIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6,
    position: "absolute",
    right: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3.5,
    top: -Constants.BaseStyle.DEVICE_WIDTH / 100 * 5.0
  },
  textInpuView: {
    flexDirection: "row",

    alignItems: "center"
  },

  ButtonStyle: {
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 10,
    width:(Constants.BaseStyle.DEVICE_WIDTH / 100) * 60,
    marginBottom: 10,
    backgroundColor:Constants.Colors.BackgroundBlue
  }
});
