/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';

import Constants from "../../constants";
import SubmitButton from "../../components/common/FormSubmitButton";


class SetDayOff extends Component<{}> {
  constructor(props){
    super(props);

  }

  // onPress()
  // {
  //     this.props.dispatch({type : 'DAYONOFF_VISIBILITY', visibility:false});
  // }

  render() {
    let {
      IsOff,
      setDayToGoOff,
      setDayToGoOn,
      SetDayOnOffModalVisible
    } = this.props;

    var Header=Constants.Strings.setDayOff.title;
    var SubHead = Constants.Strings.setDayOff.desc;
    var ButtonText = Constants.Strings.setDayOff.buttonText1;
    var ButtonText2 = Constants.Strings.setDayOff.buttonText2;
    if(IsOff)
    {
       Header=Constants.Strings.setDayOn.title;
       SubHead = Constants.Strings.setDayOn.desc;
       ButtonText = Constants.Strings.setDayOn.buttonText;
    }
//onPress={() => {this.props.dispatch({type : 'DAYONOFF_VISIBILITY', visibility:false})}}
    return (
      <View  style={[styles.modalOuter]}>
          <View  style={styles.modalInner}>
            <KeyboardAvoidingView behavior={'position'}>
              <TouchableOpacity style={[styles.btCloseModal]} onPress={() => SetDayOnOffModalVisible(false)}>
                <Image source={Constants.Images.driver.close} style={[styles.btnCloseModalIcon]}/>
               </TouchableOpacity>
               <View>
                   <View style={[styles.viewStyle]}>
                      <Text style={styles.Headertext}>{Header}</Text>
                      <Text style={styles.Subheadtext}>{SubHead}</Text>
                   </View>
                   { IsOff ?
                       <SubmitButton
                         onPress={() => setDayToGoOn()}
                         text={ButtonText}
                         style={[styles.ButtonStyle,{padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*20}]}
                       />

                     :
                       <View style={[{flexDirection:'row',marginBottom:10}]}>
                         <View style={[{flex : 0.5}]}>
                           <SubmitButton
                             onPress={() => setDayToGoOff()}
                             text={ButtonText}
                             style={[styles.ButtonStyle,{backgroundColor:'#53C8E5'}]}
                             textStyle={[{fontSize:15}]}
                           />
                         </View>
                         <View style={[{flex : 0.5}]}>
                           <SubmitButton
                             onPress={() => SetDayOnOffModalVisible(false)}
                             text={ButtonText2}
                             style={[styles.ButtonStyle]}
                             textStyle={[{fontSize:15}]}
                           />
                         </View>
                       </View>
                   }
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
      borderRadius:5
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
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*2
  },
  ButtonStyle: {
    borderWidth: 0,
    //padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    backgroundColor: "rgba(115,115,115,0.4)",
    borderColor: "rgba(115,115,115,0.4)",
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*3,
    borderRadius:0,
    marginBottom : 25,
    paddingLeft : 3,
    paddingRight : 3,
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

export default connect(state => ({modalstate: state.ModalHandleReducer}))(SetDayOff);
