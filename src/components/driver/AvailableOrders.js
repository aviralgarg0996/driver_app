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
import restClient from "../../utilities/RestClient";

import NavigationBar from "react-native-navbar";
import MapView from './MapView';
import DeliveryDetails from './DeliveryDetails';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import Header from "../driver/Header"
const constMonthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" 
];
  
var OrderData = [
  {
    id: 1,
    type1: "Categories",
    type2: "Furniture",
    type3: 'Urgency',
    type4: 'Regular 6 hours',
    type5: 'Distance',
    type6: '150 KM',
    type7 : 'Within KM',
    type8 : '10',
  },
];
var ScheduleData = [
  {
    id:1,
    schedule:'9:00 AM to 11:00 AM Brampton, ON',
  },
  {
    id:2,
    schedule:'11:30 AM to 11:00 PM Hamilton, ON',
  },
  {
    id:3,
    schedule:'2:00 PM to 3:00 PM Brampton, ON',
  },
];

class AvailableOrders extends Component {
  constructor(props) {
    super(props);
//    alert(JSON.stringify(this.props.userData.data._id)); 
   
    ScheduleData=this.props.orderstate.OrderData && this.props.orderstate.OrderData.placedOrderData && this.props.orderstate.OrderData.placedOrderData.driver_schedule;

    console.log('----' + ScheduleData);

    if(!ScheduleData)
      ScheduleData=[];


    this.state = {
      OrderData,
      ScheduleData,
      available: true,
    };


   // alert(JSON.stringify(this.props.orderstate.OrderData.placedOrderData.driver_schedule))

  
  }

  setAvailability() {
    this.setState({
      available: !this.state.available
    });
  }

  componentDidMount(){
    try{
    var lat_long=this.props.locationData.currentLocation.coords.latitude+','+this.props.locationData.currentLocation.coords.longitude;
   firstPickUp=this.props.orderstate.OrderData.placedOrderData.orders[0].pickup[0].pickup_point
    restClient.getFromGoogle(lat_long,firstPickUp).then((res)=>{

    }).catch(ex=>{

    });
    }
    catch(ex){
      console.log(ex)
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





  componentWillUnmount=()=>{

    const { navigation } = this.props;
    if(navigation.state.params.resetTab)
    {
     navigation.state.params.resetTab();
    }

  }

  
 

  render() {
    const titleConfig = {
      title: "AVAILABLE ORDER",
      tintColor: "#fff",
      style: { fontSize: 18, fontWeight: "600" }
    };


    val =this.props.orderstate.OrderData.placedOrderData; 


    const { navigate,goBack } = this.props.navigation; 

    var _orderdisplay = (function () 
    {
      return (
        <View key={0}>
          <View key={1} style={[{flexDirection:'row', marginTop:5,marginBottom:5}]}>
            <View key={2} style={{flex:1}}><Text style={styles.itemInBlue}>{'Categories'}{': '}{val.deliveryName}</Text></View>
            <View key={3} style={{flex:1}}><Text style={styles.itemInBlue}>{'Urgency'}{': '}{val.urgencyName}{' '} {val.delivery_type_usf}</Text></View>
          </View>
          <View key={4} style={[{flexDirection:'row', marginTop:5,marginBottom:5}]}>
            <View key={5} style={{flex:1}}><Text style={styles.itemInBlue}>{'Distance'}{': '}{parseFloat(val.totalDistance?val.totalDistance:0).toFixed(2)}</Text></View>
            {/* <View key={6} style={{flex:1}}><Text style={styles.itemInBlue}>{'Within KM'}{': '}{10}</Text></View> */}
          </View>
        </View>
      )
    }());
    var _schedule = this.state.ScheduleData.map((Val,i) =>
    {
      return (
          <View key={i} style={{flex:1}}>
            <Text style={styles.itemInBlue}>{Val}</Text>
          </View>
        )
    });

    return (
      <View style={styles.container}>
       <Header
        headerText="Available Orders"
        onClickSettings={()=>navigate('Settings')}
        onDrawerOpen={()=>navigate('DrawerOpen')}
        goBackIcon={true}
        toggleSwitch={false}
        navigation={this.props.navigation}
        />
      {console.log("propsinOrders",this.props)}
        <MapView
          moneytitle="You will receive: "
          money={this.props.orderstate.OrderData.price}
          timeleft={this.props.orderstate.OrderData.timeLeft}//{moment.utc(this.props.orderstate.OrderData.timeLeft).format('mm:ss')+ ' min'} 
          id={this.props.orderstate.OrderData.idno}
          date={this.props.orderstate.OrderData.date}
          timeframe={this.constructDate(new Date(this.props.orderstate.OrderData.placedOrderData.minTime),new Date(this.props.orderstate.OrderData.placedOrderData.maxTime))}
          list={_orderdisplay}
          navigate={navigate}
          bottomText1='Notes'
          bottomText2=''
          ButtonScreenNo='1'
          goBack={goBack}
          schedule={_schedule}
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





const mapStateToProps = state => ({
  orderstate: state.OrdersHandleReducer,
  userData: (state.user && state.user.driverData) || (state.user && state.user.userData),
});

  

export default connect(mapStateToProps, null)(AvailableOrders);
