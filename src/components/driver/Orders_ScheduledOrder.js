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
const constMonthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" 
];
import Header from "../../components/driver/Header"


class Orders_ScheduledOrder extends Component<{}> {
  constructor(props) {
    super(props);


    OrderData=[
      {
        id: 1,
        type1: "Categories",
        type2: 'Test',
        type3: "Urgency",
        type4: 'Test',

      }
    ]

    CustomerDetail={
      id:11111,
      name:'tesr',
      age:'23 yrs',
      sex:'Male',
      phone :'testM',
      address : 'tttttt',
      img : Constants.Images.driver.customermale,
    }
    
if(this.props.orderstate.acceptedOrderData.userId!=null)
    {

      OrderData = [
        {
          id: 12,
          type1: "Categories",
          type2: this.props.orderstate.OrderData.placedOrderData.deliveryName,
          type3: "Urgency",
          type4: this.props.orderstate.OrderData.placedOrderData.urgencyName ,
        }];

     CustomerDetail={
      id:11111,
      name:this.props.orderstate.acceptedOrderData.userId.name,
      age:'23 yrs',
      sex:'Male',
      // phone :this.props.orderstate.acceptedOrderData.userId.email+'\n'+this.props.orderstate.acceptedOrderData.userId.phone,
      phone :this.props.orderstate.acceptedOrderData.userId.phone,
      address : this.props.orderstate.acceptedOrderData.userId.address,
      img : Constants.Images.driver.customermale,
    };
  }
    
    
    this.state = {
      OrderData,
      CustomerDetail,
      available: true
    };

//alert(JSON.stringify( this.props.orderstate.acceptedOrderData.userId));      
  
 


  }


  secondsToHms=(d)=> {
 
    d = Number(d);
  
    if(d<0)
    return '0';
   
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
  
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  
  
    return hDisplay + mDisplay + sDisplay; 
  }
  
  
  
  constructDate=(min,max)=>{ 
    var toStr='';
    var fromStr='';
    minTimeStr=min.getHours()>=12 ?min.getHours()-12+':'+min.getMinutes()+' PM ':min.getHours()-12+':'+min.getMinutes()+' AM '; 
    maxTimeStr=max.getHours()>=12 ?max.getHours()-12+':'+max.getMinutes()+' PM ':max.getHours()-12+':'+max.getMinutes()+' AM '; 
  if(min.getDate()==max.getDate())
   { 
     toStr= min.getDate()+' '+ constMonthArray[min.getMonth()]+' '+ min.getFullYear()%100 + ' ' + minTimeStr; 
     fromStr='To ' + maxTimeStr; 
   }
   else
   {
     toStr= min.getDate()+' '+ constMonthArray[min.getMonth()]+' '+ min.getFullYear()%100 + ' ' + minTimeStr; 
     fromStr= max.getDate()+' '+ constMonthArray[max.getMonth()]+' '+ max.getFullYear() + ' ' + maxTimeStr; 
   }
   return toStr +' to ' +fromStr; 
  }



  componentWillUnmount=()=>{

    const { navigation } = this.props;
    if(navigation.state.params && navigation.state.params.resetTab)
    {
     navigation.state.params.resetTab();
    }

  }

  setAvailability() {
    this.setState({
      available: !this.state.available
    });
  }

  render() {
    const titleConfig = {
      title: "SCHEDULED ORDER",
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
      <Header
        headerText="Scheduled Orders"
        onClickSettings={()=>navigate('Settings')}
        onDrawerOpen={()=>navigate('DrawerOpen')}
        goBackIcon={true}
        toggleSwitch={false}
        navigation={this.props.navigation}
        />

        <MapViewWithCustomer
          moneytitle='You will receive: '
          money={this.props.orderstate.OrderData.price}
        //  timeleft={this.props.orderstate.OrderData.time}
          timeleft={this.props.orderstate.OrderData.timeLeft}
          id={this.props.orderstate.OrderData.idno}
          date={this.props.orderstate.OrderData.date}
//          timeframe={this.props.orderstate.OrderData.timeframe}
        timeframe={this.constructDate(new Date(this.props.orderstate.OrderData.placedOrderData.minTime),new Date(this.props.orderstate.OrderData.placedOrderData.maxTime))}
list={_orderdisplay}
          navigate={navigate}
          bottomText1=''
          bottomText2=""
          ButtonScreenNo='2'
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
export default connect(state => ({orderstate: state.OrdersHandleReducer}))(Orders_ScheduledOrder);   
  