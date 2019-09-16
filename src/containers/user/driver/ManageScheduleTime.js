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
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Switch } from 'react-native-switch';
import Background from '../../../components/common/Background';
import Constants from "../../../constants";
import NavigationBar  from "react-native-navbar";
import FollowersList from '../../../components/driver/FollowersList';
import Calendar from '../../../components/common/CalendarStrip';


export default class ManageScheduleTime extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      available:true
    }
  }

  setAvailability(){
    this.setState({
      available:!this.state.available
    })
  }



  render() {
    const titleConfig = {
      title: "MANAGE SCHEDULE",
      tintColor: "#fff",
      style:{fontSize:18,fontWeight:'600'}
    };


    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <NavigationBar
          statusBar={{hidden:true}}
          style={styles.navigationBar}
          title={titleConfig}
          rightButton={
            <View style={styles.rightButtonNav}>
              <Image
                source={Constants.Images.user.setting}
                style={styles.navIcons} resizeMode={'contain'}/>
                <View style={{marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}} >
                  <Switch
                    onValueChange={()=>this.setAvailability()}
                    value={this.state.available}
                    barHeight={Constants.BaseStyle.DEVICE_HEIGHT/100 * 5}
                    backgroundActive={Constants.Colors.Blue}
                    backgroundInactive={Constants.Colors.Gray}
                    circleActiveColor={Constants.Colors.White}
                    circleInActiveColor={Constants.Colors.WhiteBlur}
                    changeValueImmediately={true}
                    />
                </View>
            </View>
          }
          leftButton={<Image source={Constants.Images.driver.back} style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2,tintColor:Constants.Colors.White}]} resizeMode={'contain'}/>}
        />

        <Calendar/>
        <View style={{flexDirection:'row', marginTop:10}}>
          <View  style={{alignItems:'center',justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}}>
              <Text  style={{fontSize:14,fontWeight:'700',textAlign:'left'}}>{'April 17, 2018'}</Text>
          </View>

          <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}}>
            <Image source={Constants.Images.driver.unchecked} style={[{width:10, height:10,marginRight:5}]} resizeMode={'contain'} />
            <Text style={[{color:Constants.Colors.Blue,fontSize:12,fontWeight:"900"}]}>{'Set day off'}</Text>
          </View>
        </View>

        {/*<View style={{alignItems:'center',justifyContent:'center',marginVertical: Constants.BaseStyle.DEVICE_WIDTH*30/100}}>
          <Text  style={{fontSize:16,fontWeight:'700',textAlign:'center',alignItems:'center',justifyContent:'center'}}>{'No Schedule Available!!\r\nGo ahead and manage\r\navailable slots.'}</Text>
        </View>
        <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}}>
          <TouchableOpacity underlayColor={Constants.Colors.Orange} style={[styles.btCloseModal]} onPress={() => {console.log('Hello')}}>
            <Image source={Constants.Images.driver.circleplus} style={[styles.btnCloseModalIcon]}/>
          </TouchableOpacity>
        </View>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar:{
    backgroundColor:Constants.Colors.LightBlue,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 10,
    alignItems:'center'
  },
  rightButtonNav:{
    flexDirection:'row',
    alignItems:'center'
  },
  navIcons:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 6,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 6
  },
  btCloseModal:{
			width: 40,
			height:40,
			borderRadius:40,
      backgroundColor:Constants.Colors.Orange,

	},
  btnCloseModalIcon:{
		width:20,
		height:20,
    margin:10,
    tintColor:'white',

	},


});
