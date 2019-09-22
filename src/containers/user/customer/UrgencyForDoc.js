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
  FlatList,
  ImageBackground,
  DatePickerAndroid,
  TimePickerAndroid,
  AsyncStorage,
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';

import Constants from "../../../constants";
import ShadowButton from "../../../components/common/ShadowButton";
import HeaderMenu from '../../../components/customer/HeaderMenu';
import HeaderBackground from '../../../components/customer/HeaderBackground';
import TimeWindow1 from "../../../components/customer/TimeWindow1";
import TimeFrame from "../../../components/customer/TimeFrame";
import CustomerConnection from "../../../config/Connection";
import DateTimePicker from 'react-native-modal-datetime-picker';
import Calendar from '../../../components/calendar/Calendar';
import { scaleHeight, normalizeFont } from '../../../constants/responsive';
import moment from 'moment';
import { startLoading, stopLoading } from '../../../redux/modules/app';
import { Delivery_Type_USF } from '../../../constants/Constants';

class UrgencyForDoc extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      ProgressWidth: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
      PickerDate: new Date(),
      DeliveryDate: 'Delivery Date',//moment().format('MMM-DD-YYYY'),
      PickerTime: new Date(),
      StartTime: 'Start Time',//moment().format('hh:mm'),
      StartAMPM: '',//moment().format('A'),
      EndTime: 'End Time',//moment(new Date()).add('hour',1).format('hh:mm'),
      EndAMPM: '',//moment().format('A'),
      timeFrame: '',//'1 Hour',
      timeFrameValue: 0,
      mapHeight: 30,
      selectedItem: 'regular',
      DriverHelp: false,
      ExtraHelper: false,
      showMap: true,
      isDateTimePickerVisible: false,
      isTimePickerVisible: false,

    }
    this.onClickRegular();
  }

  CallDatePicker() {
    let context = this;
    DatePickerAndroid.open({
      date: new Date(context.state.PickerDate),
    }).then(({ action, year, month, day }) => {
      if (action !== DatePickerAndroid.dismissedAction) {
        var ss = new Date(year, month, day);
        var strDate = moment(ss).format('MMM-DD-YYYY');
        context.setState({ PickerDate: new Date(year, month, day), DeliveryDate: strDate });
        context.props.dispatch({ type: 'IS_DELIVERYDATE', data: true });
      }
    });
  }
  onselectDate = (date) => {
    var strDate = moment(new Date(date)).format('MMM-DD-YYYY');
    this.setState({ PickerDate: new Date(date), DeliveryDate: strDate });
    this.props.dispatch({ type: 'IS_DELIVERYDATE', data: true });
    this.props.dispatch({ type: 'PICKUPDATE', data: strDate });
    this.props.dispatch({ type: 'PICKUPDATEUTC', data: new Date(date).setHours(0, 0, 0, 0) });

  }

  onSelectDateIOS = (data: Moment) => {
    this.onselectDate(data)
  }
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
        var strDate1 = moment(ss).add('hour', context.state.timeFrameValue).format('hh:mm');
        var _ampm1 = moment(ss).add('hour', context.state.timeFrameValue).format('A');

        var selectedtime = (ss.getHours() * 60 + ss.getMinutes()) * 60000;
        this.props.dispatch({ type: 'PICKUPTIMEUTC', data: selectedtime });


        let time = ''
        if (_ampm == "PM")
          time = (parseInt(strDate.split(":")[0]) + 12) + ":" + strDate.split(":")[1];
        else
          time = strDate;

        this.props.dispatch({ type: 'PICKUPTIME', data: time });

        if (context.state.timeFrameValue == 0)
          context.setState({ PickerTime: moment().hour(hour).minute(minute).toDate(), StartTime: strDate, StartAMPM: _ampm });
        else {
          context.props.dispatch({ type: 'IS_STARTUPTIME', data: true });
          context.setState({ PickerTime: moment().hour(hour).minute(minute).toDate(), StartTime: strDate, StartAMPM: _ampm, EndTime: strDate1, EndAMPM: _ampm1 });
        }

      }
    });
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
      timeFrame: '1 hour',
      ProgressWidth: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 90
    });
    context.props.dispatch({ type: 'IS_STARTUPTIME', data: true });
    this._hideTimePicker();
  }


  async onClickDirect() {
   await this.props.dispatch({type:'SET_DELIVERY_TYPE_USF',data:Delivery_Type_USF.DIRECT})
   await this.setState({
      ProgressWidth: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 10,
      selectedItem: 'direct', timeFrame: '1 Hour', timeFrameValue: 1,
      EndTime: moment(this.state.PickerTime).add('hour', 1).format('hh:mm'),
      EndAMPM: moment(this.state.PickerTime).format('A')
    });
    this.CallVehicelCost(1);
    this.props.dispatch({ type: 'ACTIVE_VEHICLE_FILTER', tagid: undefined });
  }
  async onClickRush() {
  await this.props.dispatch({type:'SET_DELIVERY_TYPE_USF',data:Delivery_Type_USF.RUSH})
  await  this.setState({
      ProgressWidth: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 30,
      selectedItem: 'rush', timeFrame: '2 Hours', timeFrameValue: 2,
      EndTime: moment(this.state.PickerTime).add('hour', 2).format('hh:mm'),
      EndAMPM: moment(this.state.PickerTime).format('A')
    });
    this.CallVehicelCost(2);
    this.props.dispatch({ type: 'IS_STARTUPTIME', data: true });
    this.props.dispatch({ type: 'ACTIVE_VEHICLE_FILTER', tagid: undefined });
  }

  async onClickRegular() {
    await this.props.dispatch({type:'SET_DELIVERY_TYPE_USF',data:Delivery_Type_USF.REGULAR})
    await this.setState({
      ProgressWidth: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 60,
      selectedItem: 'regular', timeFrame: '4 Hours', timeFrameValue: 4,
      EndTime: moment(this.state.PickerTime).add('hour', 4).format('hh:mm'),
      EndAMPM: moment(this.state.PickerTime).format('A')
    });
    this.CallVehicelCost(4);
    this.props.dispatch({ type: 'IS_STARTUPTIME', data: true });
    this.props.dispatch({ type: 'ACTIVE_VEHICLE_FILTER', tagid: undefined });
  }
   async onClickEconomy() {
    await this.props.dispatch({type:'SET_DELIVERY_TYPE_USF',data:Delivery_Type_USF.ECONOMY})
    await this.setState({
      ProgressWidth: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 90,
      selectedItem: 'economy', timeFrame: '6 Hours', timeFrameValue: 6,
      EndTime: moment(this.state.PickerTime).add('hour', 6).format('hh:mm'),
      EndAMPM: moment(this.state.PickerTime).format('A')
    });
    this.CallVehicelCost(6);
    this.props.dispatch({ type: 'IS_STARTUPTIME', data: true });
    this.props.dispatch({ type: 'ACTIVE_VEHICLE_FILTER', tagid: undefined });
  }
  onHelpDriverClick() {
    this.setState({ DriverHelp: !this.state.DriverHelp });
  }
  onExtraHelperClick() {
    this.setState({ ExtraHelper: !this.state.ExtraHelper });
  }
  setDriverHelpImage() {
    if (this.state.DriverHelp) {
      return Constants.Images.customer.check;
    }
    else {
      return Constants.Images.customer.uncheck;
    }
  }

  setExtraHelpImage() {
    if (this.state.ExtraHelper) {
      return Constants.Images.customer.check;
    }
    else {
      return Constants.Images.customer.uncheck;
    }
  }

  CallInvoice() {
    let context = this;
    let { dispatch } = this.props;
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
    if (context.state.timeFrameValue == 1)
      urgencyStr = 'direct';
    /*else if(context.state.timeFrameValue == 2)
    {
      urgencyStr='rush';
    }
    else if(context.state.timeFrameValue == 4)
    {
      urgencyStr='faster';
    }*/
    else {
      urgencyStr = 'regular';
    }

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
        strWeight[i] = 3;
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


    var timeframe = context.state.timeFrameValue;
    AsyncStorage.getItem("id").then((value) => {




      fetch(CustomerConnection.getTempUrl() + 'place-order/create/', {

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
          "service_type": 2,
          "delivery_type_usf": 1

        }),
      }).then((response) => response.json())
        .then((arr) => {
          this.props.dispatch(stopLoading())
          // orderID = arr.data.orderId;
          // orderID = arr.data._id;
          this.setState({ showMap: false })


          dispatch({ type: 'SET_INVOICE', _data: arr.data, _orders: arr.data.orders });

          navigate('Home_DocumentInvoice');
        })
        .catch((error) => {
          this.props.dispatch(stopLoading())

          console.error(error);
        });
    })

  }


  componentDidMount() {

    var ss = new Date();
    var hour = ss.getHours();
    var minute = ss.getMinutes()
    var strDate = moment(new Date()).format('hh:mm');
    var _ampm = moment(ss).format('A');
    var strDate1 = moment(ss).add('hour', 1).format('hh:mm');
    var _ampm1 = moment(ss).add('hour', 1).format('A');





    let time = ''
    if (_ampm == "PM")
      time = (parseInt(strDate.split(":")[0]) + 12) + ":" + strDate.split(":")[1];
    else
      time = strDate;

    this.props.dispatch({ type: 'PICKUPTIME', data: time });
    var newstrDate = moment(new Date()).format('MMM-DD-YYYY');
    this.props.dispatch({ type: 'PICKUPDATE', data: newstrDate });



    this.setState({
      PickerTime: moment().hour(hour).minute(minute).toDate(),
      StartTime: strDate, StartAMPM: _ampm, EndTime: strDate1, EndAMPM: _ampm1,
      timeFrame: '1 Hour', ProgressWidth: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 90,
      PickerDate: new Date(ss.getFullYear(), ss.getMonth(), ss.getDate()),
      DeliveryDate: moment(ss).format('MMM-DD-YYYY')
    });

    this.props.dispatch({ type: 'IS_STARTUPTIME', data: true });
    this.props.dispatch({ type: 'IS_DELIVERYDATE', data: true });//,ActiveNextBackColor:'#53C8E5',ActiveNextTextColor:'#FFFFFF', ActiveButton:true})




    this.props.dispatch({ type: 'PICKUPDATEUTC', data: new Date().setHours(0, 0, 0, 0) });
    var selectedtime = (ss.getHours() * 60 + ss.getMinutes()) * 60000;
    this.props.dispatch({ type: 'PICKUPTIMEUTC', data: selectedtime });

  }



  CallVehicelCost() {
    let { dispatch } = this.props;
    var strItems = [];
    var strWeight = [];
    var pickup = [];
    var drop = [];
 
    this.props.state.DisplayLocationAddress.map((val, i) => {
      if (!(val.address.indexOf('Choose') == 0)) {
        strItems[i] = val.next;
        strWeight[i] = 3;
      }
    });
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

    fetch(CustomerConnection.getTempUrl() + 'place-order/vehiclecalculation/', {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'quantity': strItems,
        'weight': strWeight,
        'service_type': 2,
        'delivery_type_usf': this.props.state.Delivery_type_usf,
        'time_frame': 1,
        'pickup': pickup,
        'drop_location': drop,
      }),



    }).then((response) => response.json())
      .then((arr1) => {
        console.log("data in arr1",arr1)
        this.props.dispatch(stopLoading())
        dispatch({ type: 'SET_VEHICLECOST', _data: arr1.data, id: this.props.state.vehicleID });
      })
      .catch((error) => {
        this.props.dispatch(stopLoading())

        console.error(error);
      })
  }
  vehicalList(item) {
    var width = 100 / this.props.state.FilteredTransportArray.length;
    return (
      <View style={[{ backgroundColor: Constants.Colors.LightGray, width: Constants.BaseStyle.DEVICE_WIDTH / 100 * width }]}>
          <View style={{ alignItems: 'center', backgroundColor: item.backgroundColor, borderBottomColor: item.borderBottomColor, borderBottomWidth: item.borderBottomWidth }}>
            <Text style={[styles.transportCostStyle]}>{item.cost}</Text>
            <Image source={{ uri: item.displayimg }} style={[styles.transportIcons, { alignItems: 'center' }]} resizeMode={'contain'} />
            <Text style={[styles.transportLabel]}>{item.header}</Text>
          </View>
      </View>
    )
  }

  setActiveTransport(id) {
    this.props.dispatch({ type: 'ACTIVE_VEHICLE_FILTER', tagid: id });
  }


  render() {
    const { navigate, goBack } = this.props.navigation;

    return (
      <View style={[styles.container, { backgroundColor: Constants.Colors.LightBlue }]}>
        <HeaderBackground navigation={navigate} goBack={goBack} />
        <HeaderMenu navigation={navigate} catId={2} />
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>

            {
              Platform.OS === 'android' ? <TimeWindow1
                ProgressWidth={this.state.ProgressWidth}
                startTime={this.state.StartTime}
                startAMPM={this.state.StartAMPM}
                endTime={this.state.EndTime}
                endAMPM={this.state.EndAMPM}
                DeliveryDate={this.state.DeliveryDate}
                onChangeDate={() => this.CallDatePicker()}
                onChangeTime={() => this.CallTimePicker()}
                onSelectDate={(data) => this.onselectDate(data)}
              /> : null
            }
            {
              Platform.OS === 'ios' ? <View style={[styles.completePercent,{paddingTop:25}]}>
                <Calendar onSelectDate={() => this.onSelectDateIOS()} />
                <View style={{flexDirection:"row",alignSelf:"center",marginVertical:20}}>
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
                <DateTimePicker
                  isVisible={this.state.isTimePickerVisible}
                  onConfirm={this._handleTimePicked}
                  onCancel={this._hideTimePicker}
                  mode='time'
                />
              </View>
                : null
            }
            <ImageBackground style={{ alignItems: "center", justifyContent: "center"}} source={require('../../../assets/images/customer/blue2.png')}>
              <Text style={[styles.TimeText, { color: Constants.Colors.White, marginBottom: scaleHeight(10), marginTop: scaleHeight(10) }]}>Choose a Priority</Text>
              <TimeFrame
                onClickDirect={() => this.onClickDirect()}
                onClickRush={() => this.onClickRush()}
                onClickEconomy={() => this.onClickEconomy()}
                onClickRegular={() => this.onClickRegular()}
                selectedItem={this.state.selectedItem}
              />
              <TouchableOpacity
                style={{ justifyContent: 'center', marginTop: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3, marginBottom: scaleHeight(20) }}>
                <Text style={[styles.progressText, { textAlign: 'center' }]}>{this.state.timeFrame} {'Window'}</Text>
              </TouchableOpacity>
            </ImageBackground>
            
            <View style={{ marginTop: scaleHeight(0), marginBottom: scaleHeight(25) }}>
              <ShadowButton
                onPress={() => this.props.navigation.navigate("UrgencyForDoc1")}
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
  flexRow: {
    flexDirection: 'row',
  },
  flexCol: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  textStyle: {
    fontSize: 13,//Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    marginRight: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1,
    color: '#5D5D5D',
  },
  completePercent: {
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
    backgroundColor: Constants.Colors.DarkBlue
  },
  progressText: {
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.White
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
  transportLabel: {
    textAlign: 'center',
    marginTop: 0,
    marginBottom: scaleHeight(8),
    color: '#081933',
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
  },
  // timeframe css end
});
export default connect(state => ({ state: state.CustomerReducer, user: state.user }))(UrgencyForDoc);
