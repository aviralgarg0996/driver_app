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
  ScrollView
} from "react-native";
import { Switch } from 'react-native-switch';
import { connect } from 'react-redux';

import Background from '../common/Background';
import Constants from "../../constants";
import NavigationBar from "react-native-navbar";
import MapViewWithCustomer from './MapViewWithCustomer';
import DeliveryDetails from './DeliveryDetails';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';

var OrderData = [
  {
    id: 1,
    type1: "Categories",
    type2: "Furniture",
    type3: "Urgency",
    type4: "Regular 6 hours",
  },
];
var CustomerDetail={
  id:1,
  name:'Mathew',
  age:'23 yrs',
  sex:'Male',
  phone : '+1-613-555-0112',
  address : '122 Walter Hardwick Ave 305, Vancouver BC V5Y OCY',
  img : Constants.Images.driver.customermale,
};

class OrderDelivered extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      OrderData,
      CustomerDetail,
      available: true,
    };
  }

  setAvailability() {
    this.setState({
      available: !this.state.available
    });
  }

  render() {
    const titleConfig = {
      title: "DELIVERED ORDER",
      tintColor: "#fff",
      style: { fontSize: 18, fontWeight: "600" }
    };

    const { navigate,goBack } = this.props.navigation;

    var _orderdisplay = this.state.OrderData.map((Val,i) =>
    {
      return (
        <View key={i} style={[{flexDirection:'row', marginTop:5,marginBottom:5}]}>
          <View key={i+1} style={{flex:0.50}}><Text style={styles.itemInBlue}>{Val.type1}{': '}{Val.type2}</Text></View>
          <View key={i+3} style={{flex:0.50}}><Text style={[styles.itemInBlue,{textAlign:'right'}]}>{Val.type3}{': '}{Val.type4}</Text></View>
        </View>
        )
    })
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
        <MapViewWithCustomer
          moneytitle=''
          money='$800 + $100'
          timeleft="0 Sec"
          id={this.props.orderstate.OrderData.idno}
          date={this.props.orderstate.OrderData.date}
          timeframe={this.props.orderstate.OrderData.timeframe}
          list={_orderdisplay}
          navigate={navigate}
          bottomText1=''
          bottomText2=''
          ButtonScreenNo='4'
          customerDetail={this.state.CustomerDetail}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar: {
    backgroundColor: Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    alignItems: "center"
  },
  rightButtonNav: {
    flexDirection: "row",
    alignItems: "center"
  },
  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
  itemInBlue: {
    fontSize: 12,
    color: Constants.Colors.Blue
  },

});
export default connect(state => ({orderstate: state.OrdersHandleReducer}))(OrderDelivered);
