import React, { Component } from 'react';
import {
     StyleSheet, Text, View,TouchableOpacity,
     Image,ScrollView,BackHandler
} from 'react-native';
//import CalendarPicker from 'react-native-calendar-picker';
//import css from './styles';// Styling page
//const edit = require("../images/edit.png"); //Play image

import IconMat from 'react-native-vector-icons/MaterialIcons';
import Constants from "../../../constants";

import * as ScheduleActions from '../../../redux/modules/schedule';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import NavigationBar  from "react-native-navbar";
import DriverSchedule from '../../../components/driver/DriverSchedule';
import ToogleSwitch from '../../../components/common/ToggleSwitch';
import moment from 'moment';

import Icon from 'react-native-vector-icons/FontAwesome';
  

class DriverCalender extends Component {

    static navigationOptions = ({ navigation }) => ({
       header: null,
    });
    constructor(props) {
        super(props);
        console.log('DriverCalender::::::::::')
        console.log(moment(new Date(props.navigation.state.params.selectedDateObj || new Date())).format('YYYY-MM-DD'))
        console.log(new Date(props.navigation.state.params.selectedDateObj || new Date()).getDay())
        this.state = {
          selectedStartDate: moment(new Date(props.navigation.state.params.selectedDateObj || new Date())).format('YYYY-MM-DD'),
          selectedDay:new Date(props.navigation.state.params.selectedDateObj || new Date()).getDay(),
          availabilityStatus:props.driverAvailabilityStatus,
        };
        this.onDateChange = this.onDateChange.bind(this);
      }


  // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
  // Typically you would use the navigator here to go to the last state.

 componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
}

backPressed = () => {
    this.props.navigation.goBack();
    return true;
}
onDateChange(date) {
    this.setState({
      selectedStartDate: moment(new Date(date)).format('YYYY-MM-DD'),
      selectedDay:(new Date(date)).getDay()
    });
  }


    render() {

      const titleConfig = {
        title: "Calender",
        tintColor: "#fff",
        style:{fontSize:18,fontWeight:'600'}
      };

      const { selectedStartDate } = this.state;
      const { navigate,goBack } = this.props.navigation;
      console.log('driver-calendar-----selectedStartDate---------')
      console.log(selectedStartDate)

      console.log('driver-calendar-----moment(new Date()).format("YYYY-MM-DD")---------')
      console.log(moment(new Date()).format("YYYY-MM-DD"))

      const startDate = selectedStartDate ? selectedStartDate.toString() : moment(new Date()).format("YYYY-MM-DD");
      console.log('driver-calendar--------------')
      console.log(startDate)

        return (
           <View style={styles.background}>
           <NavigationBar
            statusBar={{hidden:true}}
            style={styles.navigationBar}
            title={titleConfig}
            rightButton={
              <View style={styles.rightButtonNav}>
                <TouchableOpacity onPress={()=>navigate('Settings')}>
                <Image source={Constants.Images.user.setting} style={styles.navIcons} resizeMode={'contain'}/>
                </TouchableOpacity>
                  <View style={{marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}} >
                    <ToogleSwitch availabilityStatus={this.state.availabilityStatus}/>
                </View>
              </View>
            }
            leftButton={
                <TouchableOpacity onPress={()=>goBack()}>
                  <Icon name="angle-left" size={40} color='white' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} />
                </TouchableOpacity>}
          />
            <ScrollView>
                <DriverSchedule   onRef={ref => (this.child = ref)}   navigationProps={navigate}/>
                </ScrollView>
         </View>
        )
    }

}

const styles = StyleSheet.create({
   mark2: {
    width:50,
    height: 50,
  },
    shedule:{marginLeft:15, marginTop:20, color:"#53bedf", fontSize:12, fontWeight:"400"},
    hours:{marginLeft:15, marginTop:10, color:"#204781", fontSize:10, fontWeight:"500"},
    timeDuration:{marginLeft:15,  color:'#000', fontSize:12, fontWeight:"300"},
    btnText:{color:"#204781", fontSize:13, fontWeight:"bold"},
    line:{marginTop:20,height:1, marginLeft:15, marginRight:15, backgroundColor:'#204781'},
    leftColumnText:{flexDirection:'row',marginLeft:15, justifyContent:'space-around', flex:1},
    row:{marginTop:0, height:20, width:'100%', flexDirection:'row'},
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height:'100%',
    width:'100%',
  },
  background: {
    height:'100%',
    width:'100%'
  },
  navigationBar:{
    backgroundColor:Constants.Colors.LightBlue,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 10,
    alignItems:'center'
  },
  navIcons:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 7
  },
  rightButtonNav:{
    flexDirection:'row',
    alignItems:'center'
  },
 
});

const mapStateToProps = state => (
  {
  //tokenforuser:state.user.userData.token,
  tokenforuser: (state.user.driverData != null) ? state.user.driverData.token : state.user.userData.token,
  listOfSchedule:state.schedule.scheduleList,
  propSelectedDate:state.schedule.scheduleSelectedDate,
  driverAvailabilityStatus: state.user.driverAvailabilityStatus,
  scheduleDatesList: state.schedule.scheduleDatesList,
  weeklySchedule:state.schedule.weeklySchedule,
  userData: (state.user && state.user.driverData) || (state.user && state.user.userData),
});

const mapDispatchToProps = dispatch => ({
  ScheduleActions: bindActionCreators(ScheduleActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DriverCalender);