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
  TouchableOpacity
} from "react-native";

import Background from "../../../components/common/Background";
import Constants from "../../../constants";
import NavigationBar from "react-native-navbar";
import DaysList from "../../../components/driver/DaysList";
import SubmitButton from "../../../components/common/FormSubmitButton";
import Icon from 'react-native-vector-icons/FontAwesome';

import * as ScheduleActions from '../../../redux/modules/schedule';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';



 class WeekSchedule extends Component<{}> {
  constructor(props) {
    super(props);
    //console.log('###################################weekschelue-----props')
    //console.log(props)
    this.state = {};
  }

  render() {
    const titleConfig = {
      title: " Week Schedule",
      tintColor: "#fff",
      style: { fontSize: 18, fontWeight: "600" }
    };
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <NavigationBar
          statusBar={{ hidden: true }}
          style={styles.navigationBar}
          title={titleConfig}
          leftButton={
            <TouchableOpacity onPress={()=>goBack()}>
              <Icon name="angle-left" size={40} color='white' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} />
            </TouchableOpacity>
          }
        />
        <DaysList navigate={navigate} />

        {/* <View style={[{flexDirection:'row',marginBottom:10}]}>
              <View style={[{flex : 1}]}>
                <SubmitButton
                  onPress={() => this.saveScheduleHours()}
                  text={'SAVE'}
                  style={[styles.ButtonStyle,{backgroundColor:'#53C8E5'}]}
                  textStyle={[{fontSize:15}]}
                />
              </View>
               
        </View> */}

      </View>
    );
  }

  saveScheduleHours()
  {
    //console.log('****************saveScheduleHours_________________________')
    
    let weekslots=this.props.defaultSchedule;
    let weekDataList=[];
    //console.log('****************weekslots________________________')
    //console.log(weekslots)
    let sendData={}
    sendData['navigate']=this.props.navigation.navigate

    for(let dayKey in  Object.keys(weekslots)){
     // let key of Object.keys(meals)
        let weekData={}
        weekData['day']=dayKey        

        if(weekslots[dayKey].length>0){
          //console.log('###################,,,,,,,,,,,,,,,=weekslots[dayKey][0].serving_city')
          //console.log(weekslots[dayKey][0].serving_city)
          weekData['lat']='77'
          weekData['lng']='12'
          weekData['radius']='12'
          weekData['geometry_type']='Point'
          weekData['helper']='true'
          weekData['scheduletype']=["Default"]
          weekData['equipment']='true'
          
          weekData['message']='www'
          weekData['serving_city']=weekslots[dayKey][0].serving_city
          weekData['location']=weekslots[dayKey][0].serving_city

          let weekDaySlots=weekslots[dayKey]

          var timeSlotsOnly = weekDaySlots.map(obj => ({ startTime: obj.startTime, endTime: obj.endTime }));

          //console.log('................timeSlotsOnly..........')
          //console.log(timeSlotsOnly)

        //   for (let i = 0; i < weekDaySlots.length; i++) {
        //     let slotItemObj=weekDaySlots[i]   
        // }
 

          weekData['time']=timeSlotsOnly  
          weekDataList.push(weekData)

        }
        // else{
        //   weekData['dayOff']= 'false'
        //   weekData['message']='www'          
        //   weekDataList.push(weekData)
        // }

    }

    let	requestObject = {
      driver_id:'5b5ab66b86e4295c2b519558',
      week:weekDataList,
      created_by:'DRIVER',
      timezone:'11',
      
      creater_id:'1222',
      serving_city:["noida","meerut"],
      sDate:new Date().toISOString(),      
      }
      sendData['requestObject']=requestObject

      //navigate:this.props.navigation.navigate,

      //console.log('****************requestObject ________________________')
      //console.log(sendData)
      let clean={msg:'clean'}
      clean['navigate']=this.props.navigation.navigate

    this.props.ScheduleActions.saveDefaultSchedule(sendData,this.props.tokenforuser)
    //this.props.ScheduleActions.cleanDaySlotSchedule(clean,this.props.tokenforuser)

    

  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  navigationBar: {
    backgroundColor: Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    alignItems: "center"
  },

  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  }
});



const mapStateToProps = state => (
  {
  //tokenforuser:state.user.userData.token,
  tokenforuser: (state.user.driverData != null) ? state.user.driverData.token : state.user.userData.token,
  listOfSchedule:state.schedule.scheduleList,
  propSelectedDate:state.schedule.scheduleSelectedDate,
  driverAvailabilityStatus: state.user.driverAvailabilityStatus,
  scheduleDatesList: state.schedule.scheduleDatesList,
  defaultSchedule:state.schedule.defaultSchedule,
});

const mapDispatchToProps = dispatch => ({
  ScheduleActions: bindActionCreators(ScheduleActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(WeekSchedule);