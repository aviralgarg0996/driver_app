/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert
} from 'react-native';
import moment from 'moment';
//import { Switch } from 'react-native-switch';
import Constants from "../../../constants";
import NavigationBar from "react-native-navbar";
import OrderHistory from '../../../components/driver/OrderHistory';
import DriverSchedule from '../../../components/driver/DriverSchedule';
//import BarChart from '../../../components/driver/BarChartScreen';
import VideoPlayer from '../../../components/driver/Video';
import ToogleSwitch from '../../../components/common/ToggleSwitch';
import { connect } from 'react-redux';
import DriverFormSubmit from '../../../components/driver/DriverFormSubmit';
import DriverFormReject from '../../../components/driver/DriverFormReject';
import LinearGradient from 'react-native-linear-gradient';
import * as UserActions from '../../../redux/modules/user';
import { bindActionCreators } from "redux";
import { ToastActionsCreators } from 'react-native-redux-toast';
import * as ScheduleActions from '../../../redux/modules/schedule';
import Header from "../../../components/driver/Header"
import RestClient from '../../../redux/modules/RestClient';

class Home extends Component {
  constructor(props) {

    super(props);
    this.onDateSelected = this.onDateSelected.bind(this);
    this.state = {
      location: null
    }
    if (props.scheduleDatesList.length > 0) {
      let datesData = props.scheduleDatesList;
      let newDatesData = {};
      let newScheduleDatesList = {}
      for (var dd in datesData) {
        if (datesData[dd].selected && datesData[dd].status == 'available') {
          newDatesData[dd] = datesData[dd]

          datesData[dd].marked = true
          datesData[dd].dotColor = 'red'
        }
      }

      this.state = {
        availabilityStatus: props.driverAvailabilityStatus,
        scheduleDatesList: newDatesData,
        driverId: props.userData.data._id,
        selectedStartDate: moment(new Date()).format('YYYY-MM-DD'),
      }

    } else {
      this.state = {
        availabilityStatus: props.driverAvailabilityStatus,
        scheduleDatesList: props.scheduleDatesList,
        driverId: props.userData.data._id,
        selectedStartDate: moment(new Date()).format('YYYY-MM-DD'),
      }
    }
  }

  async componentDidMount() {
    const { dispatch } = this.props.navigation;
    var status = this.props.userData.data.driverStatus;
    this.props.UserActions.setUserIdOnLcoation(this.props.userData.data);
    this.props.ScheduleActions.getCitiesList(this.props.tokenforuser)
    this.props.ScheduleActions.getWeeklySchedule({ ...this.state }, this.props.tokenforuser);
    if (this.props.driverAvailabilityStatus == true) {
      await navigator.geolocation.getCurrentPosition(
        position => {
          let requestObject = {
            "driverid": this.props.userData.data._id,
            "geometry": {
              "coordinates": { "type": [position.coords.latitude, position.coords.longitude] }
            },
            "distance": ""
          }
          RestClient.urlAdmin("/drivers/savedriverlatlng", requestObject).then((result) => {
            console.log('result availibility ******* ', result)
            if (result.status == 1) {
              console.log('location response ====', result)
            } else {
              console.log('location no response ====', result.data)
            }
          })
        },
      );
    }
  }

  componentWillMount() {
    // if (this.props.driverAvailabilityStatus == true) {
    //   this.locationOn()
    // } else {
    //   this.locationOff()
    // }
    this.props.ScheduleActions.getSchedule({ ...this.state }, this.props.tokenforuser);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  locationOn = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        alert(JSON.stringify(position.coords))
        let requestObject = {
          "driverid": this.props.userData.data._id,
          "geometry": {
            "coordinates": { "type": [position.coords.latitude, position.coords.longitude] }
          },
          "distance": ""
        }
        RestClient.urlAdmin("/drivers/savedriverlatlng", requestObject).then((result) => {
          console.log('result availibility ******* ', result)
          if (result.status == 1) {
            console.log('location response ====', result)
          } else {
            console.log('location no response ====', result.data)
          }
        })
      },
    );
  }


  locationOff = () => {
    alert('Location is Off')
    console.log('location is Off')
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.scheduleDatesList.length > 0) {
      let datesData = this.props.scheduleDatesList;
      let newDatesData = {};
      let newScheduleDatesList = {}
      for (var dd in datesData) {
        if (datesData[dd].selected && datesData[dd].status == 'available') {
          newDatesData[dd] = datesData[dd]

          datesData[dd].marked = true
          datesData[dd].dotColor = 'red'
        }
      }

      this.setState({
        availabilityStatus: nextProps.driverAvailabilityStatus,
        scheduleDatesList: newDatesData
      })
    } else {
      this.setState({
        availabilityStatus: nextProps.driverAvailabilityStatus,
      })
    }

    // //console.log('next props ***********', nextProps )
    // var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    // var firstDay = new Date(y, m, 1);
    // var lastDay = new Date(y, m + 1, 0);

    // firstDay = moment(firstDay).format("YYYY-MM-DD");
    // lastDay = moment(lastDay).format("YYYY-MM-DD");
    // this.setState({
    //   startDate:firstDay,
    //   endDate:lastDay,
    //   scheduleDatesList: nextProps.scheduleDatesList
    //   },()=>{
    //     //console.log('isnide componet will mount home ********* ',{...this.state},this.props.tokenforuser)
    //     this.props.ScheduleActions.scheduledDateList({...this.state},this.props.tokenforuser);
    // })
    //this.forceUpdate()
  }
  // refreshCalendor=()=>{
  //   //console.log('refreshCalendor' )

  //  // this.refs.child.calendorUpdate();



  // }
  homeSchedule() {
    this.props.navigation.navigate('Home_ScheduleOrder', { selectedDateObj: new Date(), refreshCal: this.refreshCalFunction })
  }

  refreshCalFunction = () => {

    //console.log('refreshCalendor')

    this.child.calendorUpdate();


  }


  onDateSelected(date) {
    this.setState({
      selectedStartDate: moment(new Date(date.dateString)).format('YYYY-MM-DD'),

    }, () => {
      //console.log('189-this.props....',this.props)
      let orders = [];
      if (Object.keys(this.props.scheduleDatesList).length > 0 && this.props.scheduleDatesList[this.state.selectedStartDate].orders !== undefined) {
        orders = this.props.scheduleDatesList[this.state.selectedStartDate].orders
        this.props.navigation.navigate('ManageOrders', { selectedDateObj: this.state.selectedStartDate })

      } else {
        this.props.navigation.navigate('ManageSchedule', { selectedDateObj: this.state.selectedStartDate })
      }

    });


  }


  render() {
    const titleConfig = {
      title: "HOME",
      tintColor: "#fff",
      style: { fontSize: 14, fontWeight: '400' }
    };
    const { navigate } = this.props.navigation;

    if (this.props.scheduleDatesList.length > 0) {
      let datesData = this.props.scheduleDatesList;
      let newDatesData = {};
      let newScheduleDatesList = {}
      // //console.log('----iteraing data-----------')
      for (var dd in datesData) {
        if (datesData[dd].selected && datesData[dd].status == 'available') {
          newDatesData[dd] = datesData[dd]

          datesData[dd].marked = true
          datesData[dd].dotColor = 'red'
          //datesData[dd].activeOpacity= 0
        }
      }
      this.state = {
        scheduleDatesList: newDatesData
      }
    }


    return (
      <View style={styles.container}>
        <Header
          headerText="Home"
          onClickSettings={() => navigate('Settings')}
          onDrawerOpen={() => navigate('DrawerOpen')}
          availabilityStatus={this.props.driverAvailabilityStatus}
          goBackIcon={false}
          toggleSwitch={true}
          navigation={this.props.navigation}
        />
        <ScrollView>
          <View style={styles.sectionHeaders}>
            <Text style={styles.textBlue}>Order History</Text>
            <TouchableOpacity onPress={() => navigate('Orders')}>
              <Text style={[styles.textOrange, { textDecorationLine: 'underline' }]}>View all Orders</Text>
            </TouchableOpacity>
          </View>

          <OrderHistory />

          <View style={styles.sectionHeaders}>
            <Text style={styles.textBlue}>Your Schedule</Text>

            {/* <TouchableOpacity onPress={()=>{
                let orders=[];
                if( this.props.scheduleDatesList.length>0 && this.props.scheduleDatesList[this.state.selectedStartDate].orders!==undefined){
                  orders=this.props.scheduleDatesList[this.state.selectedStartDate].orders
                  this.props.navigation.navigate('ManageOrders',{selectedDateObj:this.state.selectedStartDate})
                  
                }else{
                  this.props.navigation.navigate('ManageSchedule',{selectedDateObj:this.state.selectedStartDate})
                }
                
              }
            }>
                <Text style={[styles.textOrange,{textDecorationLine:'underline'}]}>Manage Schedule</Text>
              </TouchableOpacity> */}

          </View>

          <DriverSchedule onRef={ref => (this.child = ref)} onDateSelected={this.onDateSelected} navigationProps={navigate} />
          {/* onClick={() => this.handleClick(id) */}
          {/* <View style={styles.sectionHeaders}>
            <Text style={styles.textBlue}>Reports</Text>
            <TouchableOpacity onPress={()=>navigate('Home_ScheduleOrder')}>
            <Text style={[styles.textOrange,{textDecorationLine:'underline'}]}>More Reports</Text>
            </TouchableOpacity>
            </View> */}
          {/*<BarChart barStyle={{height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 40}} />
            <View style={styles.reportSection}>
            <Text style={styles.textBlue}>Training</Text>
            </View>*/}

          <View style={styles.sectionHeaders}>
            <Text style={styles.textBlue}>Training</Text>
          </View>

          <VideoPlayer videoStyle={{ height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 40, margin: 10 }} />
          {/* {this.props.userData && this.props.userData.data.driverStatus == 'pending' &&
              <Modal animationType={"fade"} transparent={true} visible={this.props.modalstate.FormSubmitModalVisible} onRequestClose={() => {this.props.navigation.dispatch({type:'FORMSUBMIT_VISIBILITY',visibility:false})}}>
                <DriverFormSubmit navigation={this.props.navigation} dispatch={this.props.navigation} />
              </Modal>
            }
            {this.props.userData && this.props.userData.data.driverStatus == 'rejected' &&
              <Modal animationType={"fade"} transparent={true} visible={this.props.modalstate.FormRejectModalVisible} onRequestClose={() => {this.props.navigation.dispatch({type:'FORMREJECT_VISIBILITY',visibility:false})}}>
                <DriverFormReject navigation={this.props.navigation} dispatch={this.props.navigation} />
              </Modal>
            } */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar: {
    backgroundColor: 'transparent',//Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navigationBarcontainer: {
    //flex  : 1,
    width: Constants.BaseStyle.DEVICE_WIDTH,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 8,
  },
  rightButtonNav: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
  sectionHeaders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Constants.BaseStyle.PADDING * .5,
    alignItems: 'center'
  },
  textBlue: {
    fontSize: 22,
    fontWeight: '700',
    color: Constants.Colors.Blue
  },
  textOrange: {
    fontSize: 16,
    fontWeight: '600',
    color: Constants.Colors.Orange
  },
  reportSection: {
    padding: Constants.BaseStyle.PADDING * .5
  },
  navBarRight: {
    flex: 1,
    flexDirection: 'row',
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    //marginTop:0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
  },
  rightButtonNav: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
  },

  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    marginTop: 3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  settingIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7,
    marginTop: 3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  HeaderTextStyle: {
    fontSize: Constants.CustomerFonts.small_13.fontSize,//Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    color: '#FFFFFF',
  },
});

const mapStateToProps = state => ({
  tokenforuser: (state.user.driverData && state.user.driverData.token) || (state.user.userData && state.user.userData.token),
  modalstate: state.ModalHandleReducer,
  driverAvailabilityStatus: state.user.driverAvailabilityStatus,
  userData: (state.user && state.user.driverData) || (state.user && state.user.userData),
  scheduleDatesList: state.schedule.scheduleDatesList,
  driverStatus: state.user.driverStatus,
  newdriverStatus: state.user.newdriverStatus,
  //scheduleDatesList: state.schedule.scheduleDatesList,
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch),
  ScheduleActions: bindActionCreators(ScheduleActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
