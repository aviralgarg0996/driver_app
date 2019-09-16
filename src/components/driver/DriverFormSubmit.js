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
  TextInput,
  Linking
} from 'react-native';
import { connect } from 'react-redux';

import Background from '../../components/common/Background';
import Constants from "../../constants";
import SubmitButton from "../../components/common/FormSubmitButton";
//var navigator=null;

class DriverFormSubmit extends Component<{}> {
  constructor(props){
    super(props);

  }


  onPress()
  {
      this.props.dispatch({type : 'FORMSUBMIT_VISIBILITY', visibility:false});
      console.log('this.props ************ ',this.props)
      this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View  style={[styles.modalOuter]}>
          <View  style={styles.modalInner}>
            <KeyboardAvoidingView behavior={'position'}>
              <TouchableHighlight underlayColor={Constants.Colors.Orange} style={[styles.btCloseModal]} onPress={() => {this.onPress()}}>
                <Image source={Constants.Images.driver.close} style={[styles.btnCloseModalIcon]}/>
               </TouchableHighlight>
               <View>
                   <View style={[styles.viewStyle]}>
                      <Text style={styles.Headertext}>{Constants.Strings.OnSubmit.title}</Text>
                      <Text style={styles.Subheadtext}>{Constants.Strings.OnSubmit.desc}<Text style={{color: Constants.Colors.Orange}} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=a3ICNMQW7Ok')}>https://www.youtube.com/watch?v=a3ICNMQW7Ok</Text> </Text>
                      
                   </View>
                   <SubmitButton
                         onPress={() => this.onPress()}
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
    borderRadius:5
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
    marginVertical: Constants.BaseStyle.DEVICE_HEIGHT*6/100,
    //marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*2,
    //paddingTop : Constants.BaseStyle.DEVICE_WIDTH*6/100,
    paddingBottom : Constants.BaseStyle.DEVICE_WIDTH*6/100,
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
  Headertext:{
    fontSize:20,
    marginBottom:15,
    fontWeight:'900',
    backgroundColor:'transparent',
    color:Constants.Colors.Blue,
    textAlign:'center'
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

export default connect(state => ({modalstate: state.ModalHandleReducer}))(DriverFormSubmit);
