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
import SubmitButton from "../../components/common/FormSubmitButton";

//var navigator=null;

class NewUser extends Component<{}> {
  constructor(props){
    super(props);
  console.log('new user props ******* ',this.props)
  }

  onPress()
  {

      this.props.dispatch({type : 'NEWUSER_VISIBILITY', visibility:false});
    //  navigator('DriverForm');

      // this.props.navigation.navigate('DriverForm',{token:this.props.modalstate.tokenDriverForm});
  }

  render() {
    let {navigate} = this.props;
    navigator=navigate;

    return (
      <View  style={[styles.modalOuter]}>
          <View  style={styles.modalInner}>
            <KeyboardAvoidingView behavior={'position'}>
              <TouchableHighlight underlayColor={Constants.Colors.Orange} style={[styles.btCloseModal]}  onPress={() => this.props.dispatch({type : 'NEWUSER_VISIBILITY', visibility:false})}>
                <Image source={Constants.Images.driver.close} style={[styles.btnCloseModalIcon]}/>
               </TouchableHighlight>
               <View>
                   <View style={[styles.viewStyle]}>
                     <Text style={styles.Subheadtext}>{Constants.Strings.newuser.desc}</Text>
                   </View>
                       <SubmitButton
                         onPress={() => this.props.dispatch({type : 'NEWUSER_VISIBILITY', visibility:false})}
                         text={Constants.Strings.newuser.buttonText}
                         style={[styles.ButtonStyle]}
                       />
                 </View>
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
  modalOuter: {
			backgroundColor: 'rgba(0,0,0,0.8)',
			padding: 4,
			flex:1,
			alignItems:'center',
			justifyContent:'center',
		},
	modalInner:{
		margin: 10,
	  padding:3,
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
  Subheadtext:{
    fontSize:15,
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*2,
    fontWeight:'500',
    backgroundColor:'transparent',
    color:Constants.Colors.Blue,
    textAlign:'center'
  },

});

export default connect(state => ({modalstate: state.ModalHandleReducer}))(NewUser);
