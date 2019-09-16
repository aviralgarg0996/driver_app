import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';


import Constants from '../../constants';
 var navigate=null;
 var goBack=null;
export default class HeaderBackgroundWithBackButton extends Component<{}> {
  render() {
    let {
      headerText
    } = this.props;
    navigate = this.props.navigation;
    goBack= this.props.goBack;
        return(
          <LinearGradient colors={[Constants.Colors.LightBlue, Constants.Colors.LightBlue]} style={styles.navigationBarcontainer}>
              <View style={styles.navigationBar}>
                <TouchableOpacity onPress={()=>goBack()}>
                    <Image source={Constants.Images.customer.goback}
                      style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} resizeMode={'contain'}/>
                </TouchableOpacity>
                <View style={{justifyContent:'center',alignItems:'center',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}}>
                  <Text style={[styles.HeaderTextStyle]}>{headerText}</Text>
                </View>
                   <View style={styles.navBarRight}>
                       <TouchableOpacity>
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
    //flex  : 1,
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

  navIcons:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 3,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 4,
    marginTop:3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  settingIcon:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 7,
    marginTop:3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  HeaderTextStyle:{
    fontSize:Constants.CustomerFonts.small_13.fontSize,//Constants.CustomerFonts.semibold.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
    color:'#FFFFFF',
  },
});
