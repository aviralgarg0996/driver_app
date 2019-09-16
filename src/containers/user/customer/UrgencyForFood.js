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
  FlatList,
  ListView,
  ImageBackground,
  Modal,
  TextInput,
  DatePickerAndroid,
  TimePickerAndroid,
  AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';

import Constants from "../../../constants";
import ShadowButton from "../../../components/common/ShadowButton";
import ServiceRegularMapView from '../../../components/customer/ServiceRegularMapView';
import HeaderMenu from '../../../components/customer/HeaderMenu';
import HeaderBackground from '../../../components/customer/HeaderBackground';
import TimeWindow from "../../../components/customer/TimeWindow";
import CustomerConnection from "../../../config/Connection";
import DateTimePicker from 'react-native-modal-datetime-picker';
import Calendar from '../../../components/calendar/Calendar';
import { scaleHeight, scaleWidth, normalizeFont } from '../../../constants/responsive';


import { ToastActionsCreators } from 'react-native-redux-toast';
import { BoxShadow } from 'react-native-shadow';

import moment from 'moment';
import FormSubmitButton from '../../../components/common/FormSubmitButton';

class UrgencyForFood extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      ProgressWidth: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,//90,//50,
      PickerDate: new Date(),
      DeliveryDate: 'Delivery Date',//moment().format('MMM-DD-YYYY'),
      PickerTime: new Date(),
      StartTime: 'Start Time',//moment().format('hh:mm'),
      StartAMPM: '',//moment().format('A'),
      EndTime: 'End Time',//moment(new Date()).add('hour',1).format('hh:mm'),
      EndAMPM: '',//moment().format('A'),
      timeFrame: '',//'1 Hour',
      showMap: true,
      isDateTimePickerVisible: false,
      isTimePickerVisible: false
    }
  }




  CallDatePicker() {
    let context = this;
    DatePickerAndroid.open({
      date: new Date(context.state.PickerDate),
    }).then(({ action, year, month, day }) => {
      if (action !== DatePickerAndroid.dismissedAction) {
        var ss = new Date(year, month, day);
        var strDate = moment(ss).format('MMM-DD-YYYY');
        context.setState({ PickerDate: new Date(year, month, day), DeliveryDate: strDate })
        context.props.dispatch({ type: 'IS_DELIVERYDATE', data: true });//,
      }
    });
  }
  onselectDate = (date) => {
    var strDate = moment(new Date(date)).format('MMM-DD-YYYY');
    this.setState({ PickerDate: new Date(date), DeliveryDate: strDate });
    this.props.dispatch({ type: 'IS_DELIVERYDATE', data: true });
    this.props.dispatch({ type: 'PICKUPDATE', data: strDate });
    this.props.dispatch({ type: 'PICKUPDATEUTC', data:  new Date(date).setHours(0,0,0,0) });


    
  }

  onSelectDateIOS = (data: Moment) => {
    this.onselectDate(data)
  }

  componentDidMount() {

    var ss = new Date();
    var hour = ss.getHours();
    var minute = ss.getMinutes()
    var strDate = moment(new Date()).format('hh:mm');
    var _ampm = moment(ss).format('A');
    var strDate1 = moment(ss).add('hour', 1).format('hh:mm');
    var _ampm1 = moment(ss).add('hour', 1).format('A');


    let time=''
    if(_ampm=="PM")
    time=(parseInt(strDate.split(":")[0])+12)+":"+strDate.split(":")[1];
    else
    time=strDate;

    this.props.dispatch({ type: 'PICKUPTIME', data: time });
     var newstrDate = moment(new Date()).format('MMM-DD-YYYY');
    this.props.dispatch({ type: 'PICKUPDATE', data: newstrDate });

     this.props.dispatch({ type: 'PICKUPDATEUTC', data:  new Date().setHours(0,0,0,0) });
     var selectedtime =(ss.getHours()*60+ss.getMinutes())*60000;
     this.props.dispatch({ type: 'PICKUPTIMEUTC', data: selectedtime });



  }


  _handleDatePicked = (date) => {
    var strDate = moment(date).format('MMM-DD-YYYY');
    this.setState({
      //PickerDate: new Date(year, month, day),
      DeliveryDate: strDate
    })
    this.props.dispatch({ type: 'IS_DELIVERYDATE', data: true });
    console.log('A date has been picked: ', strDate);
    this._hideDateTimePicker();
  };


  CallTimePicker() {
    let context = this;
    var timeMoment = moment(context.state.PickerTime);
    TimePickerAndroid.open({
      hour: timeMoment.hour(),
      minute: timeMoment.minutes(),
      is24Hour: false,
    }).then(({ action, hour, minute, pm }) => {
      if (action !== DatePickerAndroid.dismissedAction) {
        var ss = moment().hour(hour).minute(minute).toDate();
        var strDate = moment(ss).format('hh:mm');
        var _ampm = moment(ss).format('A');
        var strDate1 = moment(ss).add('hour', 1).format('hh:mm');
        var _ampm1 = moment(ss).add('hour', 1).format('A');

      console.log(ss.getTime() + ' '+ ss.getHours() +'    ' + ss.getMinutes())

     
  

     var selectedtime =(ss.getHours()*60+ss.getMinutes())*60000;
     this.props.dispatch({ type: 'PICKUPTIMEUTC', data: selectedtime });

      let time=''
        if(_ampm=="PM")
        time=(parseInt(strDate.split(":")[0])+12)+":"+strDate.split(":")[1];
        else
        time=strDate;

        this.props.dispatch({ type: 'PICKUPTIME', data: time });

        context.setState({
          PickerTime: moment().hour(hour).minute(minute).toDate(),
          StartTime: strDate, StartAMPM: _ampm, EndTime: strDate1, EndAMPM: _ampm1,
          timeFrame: '1 Hours', ProgressWidth: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 90
        });
        context.props.dispatch({ type: 'IS_STARTUPTIME', data: true });//,
      }
    });
  }



  componentDidMount() {
    var ss = new Date();
    var hour = ss.getHours();
    var minute = ss.getMinutes()
    var strDate = moment(new Date()).format('hh:mm');
    var _ampm = moment(ss).format('A');
    var strDate1 = moment(ss).add('hour', 1).format('hh:mm');
    var _ampm1 = moment(ss).add('hour', 1).format('A');
    this.setState({
      PickerTime: moment().hour(hour).minute(minute).toDate(),
      StartTime: strDate, StartAMPM: _ampm, EndTime: strDate1, EndAMPM: _ampm1,
      timeFrame: '1 Hours', ProgressWidth: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 90,
      PickerDate: new Date(ss.getFullYear(), ss.getMonth(), ss.getDate()),
      DeliveryDate: moment(ss).format('MMM-DD-YYYY')
    });

    this.props.dispatch({ type: 'IS_STARTUPTIME', data: true });
    this.props.dispatch({ type: 'IS_DELIVERYDATE', data: true });//,ActiveNextBackColor:'#53C8E5',ActiveNextTextColor:'#FFFFFF', ActiveButton:true})
  }




  CallInvoice() {
    let context = this;
    let { dispatch } = this.props.navigation;
    let { navigate } = this.props.navigation;

    if (!context.props.state.ActiveButton) {
      return;
    }

    var len = this.props.state.pickupArr.length;
    var strItems = [];
    var strWeight = [];
    var pickup = [];
    var drop = [];
    var urgencyStr = 'regular';

    this.props.state.pickupArr.map((val, i) => {
      if (!(val.address.indexOf('Choose') == 0)) {
        pickup[i] = {

          "pickup_point": val.lat + ',' + val.long,
          "address": val.address,
          "pickup_status": 0,
          "priority": 0,
          type: 'pickup'
        };
      }
    });
    var len = this.props.state.DisplayLocationAddress.length;
    this.props.state.DisplayLocationAddress.map((val, i) => {
      if (!(val.address.indexOf('Choose') == 0)) {
        strItems[i] = val.next;
      }
    });

    var len = this.props.state.dropArr.length;
    this.props.state.dropArr.map((val, i) => {
      if (!(val.address.indexOf('Choose') == 0)) {
        drop[i] = {

          "drop_point": val.lat + ',' + val.long,
          "address": val.address,
          "drop_status": 0,
          "priority": 0,
          type: 'drop'
        }

      }
    });

    console.log(this.props.state.pickupArr)
    console.log(this.props.state.dropArr)

    AsyncStorage.getItem("id").then((value) => {
      console.log(JSON.stringify({
        "pickup": pickup,
        "drop_location": drop,
        "date": this.state.DeliveryDate,
        "time": this.state.StartTime,
        "quantity": strItems,
        "id": value,
        "vehicle": this.props.state.vehicleID,
        "service_type": 1,
        "delivery_type_usf": 1
      }));

      fetch(CustomerConnection.getTempUrl() + '/place-order/create/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "pickup": pickup,
          "drop_location": drop,
          "date": this.state.DeliveryDate,
          "time": this.state.StartTime,
          "quantity": strItems,
          "id": value,
          "vehicle": this.props.state.vehicleID,
          "service_type": 1,
          "delivery_type_usf": 1
        }),
      }).then((response) => response.json())
        .then((arr) => {
          //     orderID = arr.data._id;

          // orderID = arr.data._id;

          this.setState({ showMap: false })

          console.log('response array : ========', arr)

          dispatch({ type: 'SET_INVOICE', _data: arr.data, _orders: arr.data.orders });
          navigate('Home_Invoice');
        })
        .catch((error) => {
          console.error(error);
        });
    })
  }

  _showTimePicker = () => this.setState({ isTimePickerVisible: true });
  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

  _handleTimePicked = (time) => {
    let context = this;
    let strDate = moment(time).format('hh:mm');

    let _ampm = moment(time).format('A');
    let strDate1 = moment(time).add('hour', 1).format('hh:mm');
    let _ampm1 = moment(time).add('hour', 1).format('A');

    context.setState({
      PickerTime: moment().hour('hour').minute('mm').toDate(),
      StartTime: strDate, StartAMPM: _ampm, EndTime: strDate1, EndAMPM: _ampm1,
      timeFrame: '1 hours',
      ProgressWidth: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 90
    });
    context.props.dispatch({ type: 'IS_STARTUPTIME', data: true });
    this._hideTimePicker();
  }

  vehicalList(item) {
    var width = 100 / this.props.state.FilteredTransportArray.length;
    return (
      <View style={[{ backgroundColor: Constants.Colors.LightGray, width: Constants.BaseStyle.DEVICE_WIDTH / 100 * width }]}>
        {/* <TouchableOpacity onPress={() => { this.setActiveTransport(item.tag) }}> */}
          <View style={{ alignItems: 'center', backgroundColor: item.backgroundColor, borderBottomColor: item.borderBottomColor, borderBottomWidth: item.borderBottomWidth }}>
            <Text style={[styles.transportCostStyle]}>{item.cost}</Text>
            <Image source={{ uri: item.displayimg }} style={[styles.transportIcons, { alignItems: 'center' }]} resizeMode={'contain'} />
            <Text style={[styles.transportLabel]}>{item.header.toUpperCase()}</Text>
          </View>
        {/* </TouchableOpacity> */}
      </View>
    )
  }


  setActiveTransport(id) {
    this.props.dispatch({ type: 'ACTIVE_VEHICLE_FILTER', tagid: id });
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    return (

      <View style={[styles.container, { backgroundColor: Constants.Colors.BackgroundBlue }]}>
        <View style={{ flex: 1, marginTop: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100, backgroundColor: Constants.Colors.BackgroundBlue }}>
          <HeaderBackground navigation={navigate} goBack={goBack} />
          <HeaderMenu navigation={navigate} catId={2} />
          <ScrollView style={{ flex: 1}}>
            <View style={{
              width: Constants.BaseStyle.DEVICE_WIDTH,
              height:Constants.BaseStyle.DEVICE_HEIGHT*0.4,
            }}>
              {
                Platform.OS === 'android' ? <TimeWindow
                  OutputText={'Window'}
                  ProgressWidth={this.state.ProgressWidth}
                  startTime={this.state.StartTime}
                  startAMPM={this.state.StartAMPM}
                  endTime={this.state.EndTime}
                  endAMPM={this.state.EndAMPM}
                  timeFrame={this.state.timeFrame}
                  DeliveryDate={this.state.DeliveryDate}
                  onChangeDate={() => this.CallDatePicker()}
                  onChangeTime={(data) => this.CallTimePicker(data)}
                  onSelectDate={(data) => this.onselectDate(data)}
                /> : null
              }
              {
                Platform.OS === 'ios' ? <View style={[styles.completePercent,{paddingTop:25}]}>
                    <Calendar onSelectDate={() => this.onSelectDateIOS()} />
                  <View style={{ alignItems: "center", justifyContent: "center", marginTop: scaleHeight(10) }}>
                   <View style={{flexDirection:"row"}}>
                   <Text style={{textAlign:"center",marginRight:10,color:Constants.Colors.LightGray,alignSelf:"center",fontSize:16}}>Start Time</Text>
                    <TouchableOpacity onPress={() => this._showTimePicker()}
                      style={{
                        justifyContent: 'center', 
                        alignSelf: "center",
                        backgroundColor: Constants.Colors.WhiteUpd, 
                        width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 25,
                        borderRadius:5,
                        paddingHorizontal:5,
                        flexDirection:"row"
                      }}>
                      <Text style={[styles.TimeText, { textAlign: 'center' }]}>
                        {this.state.StartTime.split(":")[0]}
                      </Text>
                      <View style={{borderWidth:1,borderColor:Constants.Colors.LightBlue}}></View>
                        <Text style={[styles.TimeText]}>
                        {this.state.StartTime.split(":")[1]}
                        </Text>
                        <View style={{borderWidth:1,borderColor:Constants.Colors.LightBlue}}></View>
                        <Text style={[styles.TimeText]}>
                          {this.state.StartAMPM}
                        </Text>
                    </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={{ justifyContent: 'center', marginTop: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 4 }}>
                      <Text style={[styles.progressText, { textAlign: 'center' }]}>{this.state.timeFrame} {'Window'}</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    isVisible={this.state.isTimePickerVisible}
                    onConfirm={this._handleTimePicked}
                    onCancel={this._hideTimePicker}
                    mode='time'
                  />
                </View>
                  : null
              }
            </View>
          
            <View style={{ marginTop: scaleHeight(0), marginBottom: scaleHeight(25),flex:1 }}>
              <ShadowButton
                onPress={() => this.props.navigation.navigate("UrgencyForFood1")}
                text={'Next'}
                style={styles.ButtonStyle}
                textStyle={styles.ButtonTextStyle}
              />
            </View>
            <View style={{ opacity: 0.8, backgroundColor: Constants.Colors.LightGray,bottom:0}}>
              <FlatList data={this.props.state.FilteredTransportArray} renderItem={({ item }) => this.vehicalList(item)} horizontal={true} />
            </View>
          </ScrollView>
        </View>
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
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 9,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 9,
    marginTop: 3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  settingIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7,
    marginTop: 3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  horizontalLine: {
    height: 2,
    backgroundColor: '#D7D7D7',
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexCol: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colIndex: {
    flex: 1,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transportIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 14,
    padding: 0,
  },
  transportLabel: {
    textAlign: 'center',
    marginTop: 0,
    marginBottom: scaleHeight(8),
    color: '#081933',
    fontSize: Constants.CustomerFonts.BigSize.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
  },
  transportCostStyle: {
    textAlign: 'center',
    //marginTop:0,
    // color: ,
    fontSize: Constants.CustomerFonts.BigSize.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    marginVertical:5
  },
  ButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
  },
  ButtonTextStyle: {
    fontSize: normalizeFont(24),
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.White,
    textAlign: 'center',
  },
  // ButtonStyle: {
  //   padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
  //   marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 10,
  //   width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 80,
  //   marginBottom: 10,
  // },
  // ButtonTextStyle: {
  //   fontSize: Constants.CustomerFonts.semibold.fontSize,
  //   fontFamily: Constants.CustomerFonts.semibold.fontFamily,
  //   color: Constants.Colors.White,
  //   textAlign: 'center',
  // },

  imgSize: {
    //marginTop: 5,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    marginRight: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1,
    //tintColor:Constants.Colors.Blue,
  },
  infoimgSize: {
    //marginTop: 5,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    //marginRight:Constants.BaseStyle.DEVICE_WIDTH/100 * 1,
    //tintColor:Constants.Colors.Blue,
  },
  textStyle: {
    fontSize: 13,//Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    marginRight: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1,
    color: '#5D5D5D',
  },
  inputStyle: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#B1B1B1',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
  },

  // timeframe css start
  flexRow: {
    flexDirection: 'row',
  },
  completePercent: {
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
    backgroundColor: Constants.Colors.DarkBlue,
    flex:2
  },
  progressLineWrap: {
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 90 - (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,//Constants.BaseStyle.DEVICE_WIDTH-30,
    backgroundColor: '#C3C1C0',
    height: 2,
    borderRadius: 5,
  },
  progressLine: {
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 90,//Constants.BaseStyle.DEVICE_WIDTH-30,
    backgroundColor: '#53C8E5',
    height: 2,
    //height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 1,
    borderRadius: 5
  },
  progressCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16477C',
    borderWidth: 1,
    borderColor: '#16477C',
  },
  progressText: {
    fontSize: Constants.CustomerFonts.BigSize.fontSize,
    fontFamily: Constants.CustomerFonts.content.fontFamily,
    color: '#C3C1C0',
  },
  TimeText: {
    fontSize: Constants.CustomerFonts.BigSize.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.Black,
    marginHorizontal:5,
    marginVertical:5
  },
  transportIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 14,
    padding: 0,
  },

});
export default connect(state => ({ state: state.CustomerReducer, user: state.user }))(UrgencyForFood);
