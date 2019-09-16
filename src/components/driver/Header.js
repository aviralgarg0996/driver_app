import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Switch,
  AsyncStorage
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Constants from '../../constants';
import ToogleSwitch from '../common/ToggleSwitch';
import Connection from "../../config/Connection"
 var navigate=null;
 var goBack=null;
export default class Header extends Component {
  state={
    profilePic:""
  }
  componentDidMount = () => {
    AsyncStorage.getItem("profilePic").then((profile) => {
      this.setState({
        profilePic:profile
      })
    })
  }
  
  render() {
    navigate = this.props.navigation;
    goBack= ()=>this.props.navigation.goBack();
        return(
            <LinearGradient colors={['#396CB3', '#396CB3']} style={[styles.navigationBarcontainer,{borderWdth:3}]}>
            <View style={styles.navigationBar}>
                  {!this.props.goBackIcon? <TouchableOpacity onPress={this.props.onDrawerOpen}>
                  <Image source={{uri:`${Connection.getBaseUrl()}/${this.state.profilePic}`}} 
                  style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 4}]} resizeMode={'contain'}/>
                </TouchableOpacity>:<TouchableOpacity onPress={()=>goBack()}>
                       <Image source={Constants.Images.customer.androidBack}
                         style={[styles.navIconsGoBack,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} resizeMode={'contain'}/>
                   </TouchableOpacity>}
                   <View style={{justifyContent:'center',alignItems:'center',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}}>
                     <Text style={[styles.HeaderTextStyle]}>{this.props.headerText}</Text>
                   </View>
                      <View style={styles.navBarRight}>
                      <View style={{marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}} >
                      {this.props.toggleSwitch? <ToogleSwitch availabilityStatus={this.props.availabilityStatus}/>:<View></View> 
                //       <Switch
                // onValueChange={this.props.switchValueChange}
                // value={this.props.value}
                // barHeight={Constants.BaseStyle.DEVICE_HEIGHT/100 * 5}
                // backgroundActive={Constants.Colors.Blue}
                // backgroundInactive={Constants.Colors.Gray}
                // circleActiveColor={Constants.Colors.White}
                // circleInActiveColor={Constants.Colors.WhiteBlur}
                // changeValueImmediately={true}
                // />
                }
                   </View>
                          <TouchableOpacity 
                          onPress={this.props.onClickSettings}
                          >
                            <Image
                              source={Constants.Images.customer.setting}
                              style={styles.settingIcon} resizeMode={'contain'}/>
                          </TouchableOpacity>
                     </View>
                 </View>
                 </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
  container:{
    flex  : 1,
    width : Constants.BaseStyle.DEVICE_WIDTH
  },
  navigationBarcontainer:{
    width : Constants.BaseStyle.DEVICE_WIDTH,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 8,
  },
  navigationBar:{
    backgroundColor:'transparent',//Constants.Colors.LightBlue,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
  },
  navBarRight:{
      flex:1,
      flexDirection:'row',
      height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
      //marginTop:0,
      alignItems:'center',
      justifyContent:'flex-end',
      backgroundColor:'transparent',
      marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,
    },
  rightButtonNav:{
    flexDirection:'row',
    alignItems:'center',
    marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,
  },

  navIconsGoBack:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 3,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 4,
    marginTop:3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  navIcons:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 10,
    width: Constants.BaseStyle.DEVICE_HEIGHT/100 * 10,
    marginTop:3.5,
    borderRadius:Constants.BaseStyle.DEVICE_HEIGHT/100 * 30
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  settingIcon:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 7,
    marginTop:3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  HeaderTextStyle:{
    fontSize:16,//Constants.CustomerFonts.semibold.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
    color:'#FFFFFF',
    alignSelf:"center"
  },
});
