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
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Followers extends Component<{}> {
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
      title: "FOLLOWERS",
      tintColor: "#fff",
      style:{fontSize:18,fontWeight:'600'}
    };


    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <NavigationBar
          statusBar={{hidden:true}}
          style={styles.navigationBar}
          title={titleConfig}
          rightButton={
            <View style={styles.rightButtonNav}>
              <TouchableOpacity onPress={()=>navigate('Settings')}>
                <Image
                  source={Constants.Images.user.setting}
                  style={styles.navIcons} resizeMode={'contain'}/>
              </TouchableOpacity>
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
          leftButton={
          <TouchableOpacity onPress={()=>goBack()}>
            <Icon name="angle-left" size={40} color='white' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} />
          </TouchableOpacity>
        }
        />

        <ScrollView>
          <FollowersList />
        </ScrollView>


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
  sectionHeaders:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:Constants.BaseStyle.PADDING * .5,
    alignItems:'center'
  },
  textBlue:{
    fontSize:16,
    fontWeight:'700',
    color:Constants.Colors.Blue
  },
  textOrange:{
    fontSize:16,
    fontWeight:'600',
    color:Constants.Colors.Orange
  },

});
