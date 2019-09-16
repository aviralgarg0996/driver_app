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
  TouchableHighlight,
  KeyboardAvoidingView,
  Button,
  ScrollView,
  TextInput,TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import Background from '../../components/common/Background';
import Constants from "../../constants";
import FormTextInput from "../../components/common/FormTextInput";
import SubmitButton from "../../components/common/FormSubmitButton";
import { ToastActionsCreators } from 'react-native-redux-toast';
import { bindActionCreators } from "redux";
import * as UserActions from '../../redux/modules/user';
import PasswordStrengthInput from "../../components/common/PasswordStrengthInput";
import _ from "lodash";
import Regex from "../../utilities/Regex"

class ResetPassword extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      email:props.email,
      password:'',
      otp:props.otp,
      secureEntry:true,
      passwordEye:false
    }
    console.log("Testing");
  }

  onPress()
  {
    //let { dispatch } = this.props.navigation;
    let { password } = this.state;

    console.log("reset password",password)

    if(_.isEmpty(password.value)) {
      //alert(enterPassword);
      alert('Please enter your password')
      return;
    }
    if(!Regex.validatePassword(password.value)){
      alert('Password should be minimum 6 characters and must contain at least one capital letter, one special character, one numeric and one lower case letter')
      return;
    }
    
    this.props.UserActions.resetPassword({...this.state});
  }

  render() {
    // Enable too short
    const tooShort = {
      enabled: true,
      label: 'Too short',
      labelColor: 'red'
    };
    return (
            <View  style={styles.modalOuter}>
              <View  style={styles.modalInner}>
                <KeyboardAvoidingView behavior={'position'}>
                  <TouchableHighlight underlayColor={Constants.Colors.Orange}onPress={() => {this.props.dispatch.dispatch({type : 'RESET_PASSWORD_VISIBILITY', visibility:false})}}>
                    <Image source={Constants.Images.driver.close} style={[styles.btnCloseModalIcon]}/>
                  </TouchableHighlight>

                        <Image source={Constants.Images.driver.unlocked} style={styles.logo} resizeMode={'contain'} />
                        <Text style={styles.Headertext}>{Constants.Strings.resetpassword.title}</Text>
                        <PasswordStrengthInput
                        minLength={4}
                        ruleNames="lowerCase|symbols|words"
                        minLevel={0}
                        tooShort={tooShort}
                        barWidthPercent={65}
                        showBarOnEmpty={true}
                          secureTextEntry={this.state.secureEntry}
                          onChangeText={(password, isValid) => this.setState({ password: { value: password, isValid: isValid } })}
                          //inputWrapperStyle={{}}
                        />
                        {this.state.password != '' && <TouchableOpacity
                            style={{position:'absolute',right:Constants.BaseStyle.DEVICE_WIDTH/100*5,bottom:Constants.BaseStyle.DEVICE_HEIGHT/100*19}}
                            onPress={()=>this.setState({secureEntry:!this.state.secureEntry,passwordEye:!this.state.passwordEye})}>
                              <Image source={this.state.passwordEye ? Constants.Images.driver.crossEye : Constants.Images.driver.eye} style={[{width:20, height:20}]} style={styles.eye} resizeMode="contain" />
                            </TouchableOpacity>}
                        <SubmitButton
                          onPress={() => this.onPress()}
                          text={Constants.Strings.resetpassword.buttonText}
                          style={[styles.ButtonStyle]}
                        />
                </KeyboardAvoidingView>

              </View>
            </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row : {
			flexDirection: 'row',
			padding: 0,
		},
  col:{
    flex:1,
  },
  logo: {
    height: 50,
    width: 50,
    alignSelf:'center',
    //marginBottom:15,
  },
  icon: {
    height: 30,
    width: 30,
    alignSelf:'center',
  },
  text:{
    fontSize:22,
    fontWeight:'900',
    backgroundColor:'transparent',
    color:Constants.Colors.Blue,
    textAlign:'center'
  },
  modalOuter: {
    flex:1,
    backgroundColor:'rgba(255,255,255,.5)',
    justifyContent:'center'
  },
	modalInner:{
    //height:Constants.BaseStyle.DEVICE_HEIGHT/100*50,
    backgroundColor:Constants.Colors.White,
    marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*5,
    borderRadius:5,
	},
  btnCloseModalIcon:{
		width:20,
		height:20,
	},
  inputTextViewStyle: {
    borderBottomWidth: 0,
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*2
  },
  ButtonStyle: {
    borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    backgroundColor: "rgba(115,115,115,0.4)",
    borderColor: "rgba(115,115,115,0.4)",
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*15,
    borderRadius:5,
    marginBottom : 25
  },
  inputStyle: {
    fontSize:15,
  },

  Headertext:{
    fontSize:20,
    // marginBottom:15,
    // paddingLeft : 40,
    // paddingRight : 40,
    fontWeight:'900',
    backgroundColor:'transparent',
    color:Constants.Colors.Blue,
    textAlign:'center'
  },
  Subheadtext:{
    fontSize:15,
    fontWeight:'500',
    backgroundColor:'transparent',
    color:Constants.Colors.Blue,
    textAlign:'center'
  },
  eye:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100*4,
    width:Constants.BaseStyle.DEVICE_WIDTH/100*6
  }

});

const mapStateToProps = state => ({
  modalstate: state.ModalHandleReducer,
  otp: state.user.otp,
  email:state.user.email,
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(ResetPassword);
