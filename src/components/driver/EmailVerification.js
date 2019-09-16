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
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import Background from '../../components/common/Background';
import Constants from "../../constants";
import FormTextInput from "../../components/common/FormTextInput";
import SubmitButton from "../../components/common/FormSubmitButton";
import { ToastActionsCreators } from 'react-native-redux-toast';
import { bindActionCreators } from "redux";
import * as UserActions from '../../redux/modules/user';
import Regex from '../../utilities/Regex';
import _ from "lodash";

class EmailVerification extends Component {
  constructor(props){
    super(props);
    this.state={
      code:'',
      email:props.email.email
    }
    //console.log('props email verification ******** ',props)
  }
 
  
  onSubmitOtp=()=>
  {
    let context = this;
    let { code, id } = this.state;
   // let { dispatch } = this.props.dispatch;
    console.log(this.props)

    if(_.isEmpty(code.trim())) {
      //alert(enterEmail);
      alert(Constants.i18n.enterCode)
      return;
    }
    this.props.UserActions.emailVerification({...this.state},(data)=>{
      this.props.dispatch.dispatch({ type: 'EMAILVERIFICATION_VISIBILITY', visibility: false })
      if(data=="CUSTOMER")
      {
      this.props.dispatch.navigate("customerprofile")
      }
    });
  }

  resendOtp(){
    this.props.UserActions.resendEmailApi(this.state.email);
  }

  render() {
    return (
        <View  style={[styles.modalOuter]}>
            <View  style={styles.modalInner}>
              <KeyboardAvoidingView behavior={'position'}>
                <TouchableHighlight underlayColor={Constants.Colors.Orange} style={[styles.btCloseModal]} 
                
                onPress={() => {                
                  this.props.cb();
                 
                  }}>
                  <Image source={Constants.Images.driver.close} style={[styles.btnCloseModalIcon]}/>
                 </TouchableHighlight>
                 <View>
                     <View style={[styles.viewStyle]}>
                       <Image source={Constants.Images.driver.email} style={styles.logo} resizeMode={'contain'} />
                       <Text style={styles.Headertext}>{Constants.Strings.email.title}</Text>
                       <Text style={styles.Subheadtext}>{Constants.Strings.email.desc}</Text>
                       <FormTextInput
                         autoFocus={false}
                         ref='email'
                         placeHolderText={Constants.Strings.email.placeholderText}
                         placeHolderColor={Constants.Colors.Blue}
                         style = {styles.inputTextViewStyle}
                         inputStyle={styles.inputStyle}
                         secureText={false}
                         isPassword={false}
                         showPassword={false}
                         onChangeText={(code)=>this.setState({code})}
                       />
                     </View>
                         <SubmitButton
                           onPress={() => this.onSubmitOtp()}
              // onPress={()=>{alert("hi")
              //   console.log("EmailVerification",this.props)
              //   this.props.dispatch.navigate("customerprofile")} }
                         
                          text={Constants.Strings.email.buttonText}
                           style={[styles.ButtonStyle]}
                         />
                   </View>
              </KeyboardAvoidingView>

              <Text 
              onPress={()=>this.resendOtp()}               
              style={styles.recieveMsg}>{Constants.i18n.common.resendCode}</Text>
              </View>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 50,
    width: 50,
    alignSelf:'center',
    marginBottom:15,
  },
  text:{
    fontSize:22,
    fontWeight:'900',
    backgroundColor:'transparent',
    color:Constants.Colors.Blue,
    textAlign:'center'
  },
  modalOuter: {
      // backgroundColor: 'rgba(255,255,255,0.6)',
      backgroundColor:"#ffffff10",
      padding: Constants.BaseStyle.PADDING * .5,
      flex:1,
      alignItems:'center',
      justifyContent:'center',
    },
  modalInner:{
    margin: 10,
    padding:Constants.BaseStyle.PADDING * .2,
    backgroundColor:'#fff',
    position: 'relative',
    borderRadius:5,
  },
  btCloseModal:{
			width: 20,
			height:20,
			borderRadius:20,
	},
  btnCloseModalIcon:{
		width:20,
		height:20,
	},

  viewStyle: {
    borderBottomColor: Constants.Colors.White,
    borderBottomWidth: 1,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH/100)*7,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*2
  },
  inputTextViewStyle: {
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
  },
  inputStyle: {
    fontSize:18,
  },

  Headertext:{
    fontSize:20,
    marginBottom:15,
    fontWeight:'900',
    backgroundColor:'transparent',
    color:Constants.Colors.Blue,
    textAlign:'center'
  },
  Subheadtext:{
    fontSize:16,
    backgroundColor:'transparent',
    color:Constants.Colors.Blue,
    textAlign:'center'
  },
  recieveMsg:{
    fontSize:16,
    fontWeight:'900',
    backgroundColor:'transparent',
    color:Constants.Colors.Orange,
    textAlign:'center',
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100 *2,
    marginBottom : 10,
    textDecorationLine:'underline'
  },

});

const mapStateToProps = state => ({
  modalstate: state.ModalHandleReducer,
  email: state.user.phone,
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification);
