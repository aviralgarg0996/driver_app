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
import ToogleSwitch from '../common/ToggleSwitch';

import Constants from "../../constants";
import NavigationBar  from "react-native-navbar";
import ScheduleOrder from './OrderHistory';
import Maps from '../common/Map';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { connect } from 'react-redux';
 class Orders extends Component<{}> {
  constructor(props){
    super(props);
    let propDate= props.navigation.state.params.selectedDateObj.dateString;
    this.state={
      availabilityStatus:props.driverAvailabilityStatus,
      displayDate:moment(propDate).format('MMMM DD, YYYY')
    }
  }


  componentWillReceiveProps(nextProps){
    this.setState({
      availabilityStatus:nextProps.driverAvailabilityStatus
    })
  }



  render() {
    const titleConfig = {
      title: "SCHEDULED ORDER",
      tintColor: "#fff",
      style:{fontSize:18,fontWeight:'600'}
    };


    const { navigate,goBack } = this.props.navigation;
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
              <ToogleSwitch availabilityStatus={this.state.availabilityStatus}/>
              </View>
            </View>
          }
          leftButton={
            <TouchableOpacity onPress={()=>{
              this.props.navigation.state.params.refreshCal();
            goBack()}}>
              <Icon name="angle-left" size={40} color='white' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} />
            </TouchableOpacity>
          }
        />
        <View style={styles.sectionHeaders}>
          <Text style={styles.textBlue}>{this.state.displayDate}</Text>
          <TouchableOpacity onPress={()=>navigate('ManageSchedule',{selectedDate:this.props.navigation.state.params.selectedDateObj.dateString || new Date()})}>
            <Text style={[styles.textOrange,{textDecorationLine:'underline'}]}>Manage Schedule</Text>
          </TouchableOpacity>
        </View>
        <Maps />
        <ScheduleOrder />
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
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 7
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
const mapStateToProps = state => ({
 
  driverAvailabilityStatus: state.user.driverAvailabilityStatus,
 
});

// const mapDispatchToProps = dispatch => ({
//   UserActions: bindActionCreators(UserActions, dispatch)
// });

export default connect(mapStateToProps, null)(Orders);