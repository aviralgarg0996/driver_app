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
import Header from "../../components/driver/Header"
import _ from "underscore";
const constMonthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" 
];
let tempData;

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

class OnGoing extends Component<{}> {
  constructor(props) {
    super(props);
//console.log(JSON.stringify(this.props.orderstate.OrderData.placedOrderData))

    if( this.props.orderstate.OrderData.placedOrderData.userId!=null )
    { OrderData = [
      {
        id: 12,
        type1: "Categories",
        type2: this.props.orderstate.OrderData.placedOrderData.deliveryName+' '+ this.props.orderstate.OrderData.placedOrderData.delivery_type_usf,
        type3: "Urgency",
        type4: this.props.orderstate.OrderData.placedOrderData.urgencyName ,
      },
    ];
    if(this.props.orderstate.acceptedOrderData.userId)
     CustomerDetail={
      id:11111,
      name:this.props.orderstate.acceptedOrderData.userId.name,
      age:'23 yrs',
      sex:'Male',
      phone :this.props.orderstate.acceptedOrderData.userId.email+'\n'+this.props.orderstate.acceptedOrderData.userId.phone,
      address : this.props.orderstate.acceptedOrderData.userId.address,
      img : Constants.Images.driver.customermale,
    };
  }


    this.state = {
      OrderData,
      CustomerDetail,
      available: true,
      mapViewUpdated:false,
    };
  }


  componentDidMount(){

 
 //getCurrentRunnigOrderdeatils();


}


componentWillUnmount=()=>{

  const { navigation } = this.props;
  if(navigation.state.params && navigation.state.params.resetTab)
  {
   navigation.state.params.resetTab();
  }

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



  getCurrentRunnigOrderdeatils=(orderId)=>
  {

    if(this.props.locationData.nextPickUpLocation.length!=0)
{

    const { navigate,goBack } = this.props.navigation;
    if(this.props.orderstate.ongoingResult.ongoingOrders)
    if(!orderId && this.props.locationData.nextPickUpLocation[0])
    {
      orderData=_.findWhere(this.props.orderstate.ongoingResult.ongoingOrders, {orderId: this.props.locationData.nextPickUpLocation[0].order_id});
    }
    else
    orderData=_.findWhere(this.props.orderstate.ongoingResult.ongoingOrders, {orderId: orderId});
    console.log("orderDataaaaaa",orderData,this.props)
    tempData=(<MapViewWithCustomer
      moneytitle='You will receive: '
      money={'$'+orderData.totalCharge}
      timeleft={this.secondsToHms(new Date(orderData.maxTime).getTime()-new Date().getTime())}
      id={orderData.orderId}
      date={orderData.date}
      timeframe={this.constructDate(new Date(orderData.minTime),new Date(orderData.maxTime))}
      list={this.orderDisplayList}
      navigate={navigate}
      bottomText1=''
      bottomText2=''
      ButtonScreenNo='3'
      customerDetail={orderData.userId}
      />)

    return tempData;
}
else

{
return tempData;  
}
  }
orderDisplayList=()=>
{
  var _orderdisplay = this.state.OrderData.map((Val,i) =>
  {
    return (
      <View key={i} style={[{flexDirection:'row', marginTop:5,marginBottom:5}]}>
        <View key={i+1} style={{flex:0.50}}><Text style={styles.itemInBlue}>{Val.type1}{': '}{Val.type2}</Text></View>
        <View key={i+3} style={{flex:0.50}}><Text style={[styles.itemInBlue,{textAlign:'right'}]}>{Val.type3}{': '}{Val.type4}</Text></View>
      </View>
      )
  })
return _orderdisplay;
}

  setAvailability() {
    this.setState({
      available: !this.state.available
    });
  }

  render() {
    const titleConfig = {
      title: "ONGOING",
      tintColor: "#fff",
      style: { fontSize: 18, fontWeight: "600" }
    };

    const { navigate,goBack } = this.props.navigation;

    
    return (
      <View style={styles.container}>
      <Header
        headerText="Ongoing Orders"
        onClickSettings={()=>navigate('Settings')}
        onDrawerOpen={()=>navigate('DrawerOpen')}
        goBackIcon={true}
        toggleSwitch={false}
        navigation={this.props.navigation}
        />
        {
        
        this.getCurrentRunnigOrderdeatils()
      
        }
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






export default connect(state => ({orderstate: state.OrdersHandleReducer,
  locationData:state.location}))(OnGoing);
