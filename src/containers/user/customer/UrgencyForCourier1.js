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
import ServiceRegularMapView from '../../../components/customer/ServiceRegularMapView';
import HeaderMenu from '../../../components/customer/HeaderMenu';
import HeaderBackground from '../../../components/customer/HeaderBackground';
import TimeWindow from "../../../components/customer/TimeWindow";
import TimeFrame from "../../../components/customer/TimeFrame";
import CustomerConnection from "../../../config/Connection";
import CheckBoxLabel from '../../../components/customer/CheckBoxLabel';

import { ToastActionsCreators } from 'react-native-redux-toast';
import { BoxShadow } from 'react-native-shadow';
import moment from 'moment';
import { startLoading, stopLoading } from '../../../redux/modules/app';
import FormSubmitButton from '../../../components/common/FormSubmitButton';
import { scaleHeight, scaleWidth, normalizeFont } from '../../../constants/responsive';
import ShadowButton from '../../../components/common/ShadowButton';

class UrgencyForCourier1 extends Component<{}> {
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
      selectedItem: 'direct',//'direct',
      DriverHelp: false,
      ExtraHelper: false,
      Insurance: false,
      showMap: true,
      isVisible: false
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
        context.setState({ PickerDate: new Date(year, month, day), DeliveryDate: strDate });
        context.props.dispatch({ type: 'IS_DELIVERYDATE', data: true });
      }
    });
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

        if (context.state.timeFrameValue == 0)
          context.setState({ PickerTime: moment().hour(hour).minute(minute).toDate(), StartTime: strDate, StartAMPM: _ampm });
        else {
          context.props.dispatch({ type: 'IS_STARTUPTIME', data: true });
          context.setState({ PickerTime: moment().hour(hour).minute(minute).toDate(), StartTime: strDate, StartAMPM: _ampm, EndTime: strDate1, EndAMPM: _ampm1 });
        }

      }
    });
  }

  onHelpDriverClick() {
    this.setState({ DriverHelp: !this.state.DriverHelp },()=>{
      this.CallVehicalCost()
    });
  }
  onExtraHelperClick() {
    this.setState({ ExtraHelper: !this.state.ExtraHelper },()=>{
    this.CallVehicalCost()
    });
  }
  onInsuranceClick() {
    this.setState({ Insurance: !this.state.Insurance });
  }
  setDriverHelpImage() {
    if (this.state.DriverHelp) {
      return Constants.Images.customer.check;
    }
    else {
      return Constants.Images.customer.uncheck;
    }
  }
  CallVehicalCost() {
    var strItems = [];
    var strWeight = [];
    var pickup = [];
    var drop = [];
    this.props.state.DisplayLocationAddress.map((val, i) => {
      if (!(val.address.indexOf('Choose') == 0)) {
        strItems[i] = val.courieritems;
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
        }
      }
    });
    this.props.dispatch(startLoading())
    fetch(CustomerConnection.getTempUrl() + 'place-order/vehiclecalculation/', {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'item': strItems,
        'weight': strWeight,
        'service_type': 3,
        'delivery_type_usf':this.props.state.Delivery_type_usf,
        'time_frame': 1,
        'pickup': pickup,
        'drop_location': drop,
        "extraHelper": this.state.ExtraHelper,
        "driverHelp": this.state.DriverHelp,
        "residential": [
          1
        ],
        "tailgate": [
          1
        ]
      }),



    }).then((response) => response.json())
      .then((arr1) => {
        console.log("response in arr1", arr1)
        this.props.dispatch(stopLoading())

        this.props.dispatch({ type: 'SET_VEHICLECOST', _data: arr1.data, id: this.props.state.vehicleID });
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
        <TouchableOpacity onPress={() => { this.setActiveTransport(item.tag) }}>
          <View style={{ alignItems: 'center', backgroundColor: item.backgroundColor, borderBottomColor: item.borderBottomColor, borderBottomWidth: item.borderBottomWidth }}>
            <Text style={[styles.transportCostStyle]}>{item.cost}</Text>
            <Image source={{ uri: item.displayimg }} style={[styles.transportIcons, { alignItems: 'center' }]} resizeMode={'contain'} />
            <Text style={[styles.transportLabel]}>{item.header}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  setActiveTransport(id) {
    this.props.dispatch({ type: 'ACTIVE_VEHICLE_FILTER', tagid: id });
  }

  setExtraHelpImage() {
    if (this.state.ExtraHelper) {
      return Constants.Images.customer.check;
    }
    else {
      return Constants.Images.customer.uncheck;
    }
  }
  setInsuranceImage() {
    if (this.state.Insurance) {
      return Constants.Images.customer.check;
    }
    else {
      return Constants.Images.customer.uncheck;
    }
  }
  CallInvoice() {
    let context = this;
    let { dispatch } = this.props.navigation;
    let { navigate } = this.props.navigation;

    if (!context.props.state.ActiveButton) {
      this.props.dispatch(ToastActionsCreators.displayInfo('Please Select Vehicle..'));
      return;
    }

    var strItems = [];
    var pickup = [];
    var drop = [];
    if (context.state.timeFrameValue == 1)
      urgencyStr = 'direct';
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
    this.props.state.DisplayLocationAddress.map((val, i) => {
      if (!(val.address.indexOf('Choose') == 0)) {
        var arr1 = [];
        if (val.courieritems.length == 0)
          itemValidForPickup = false;
        for (var x = 0; x < val.courieritems.length; x++) {
          arr1.push({
            "name": val.courieritems[x].name,
            "size": val.courieritems[x].size,
            "weight": val.courieritems[x].weight,
            "quantity": val.courieritems[x].quantity,
            "height": val.courieritems[x].height,
            "width": val.courieritems[x].width,
            "depth": val.courieritems[x].depth,
            "isSkid": val.courieritems[x].isSkid
          });
        }
        strItems.push(arr1);
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


    AsyncStorage.getItem("id").then((value) => {
      this.props.dispatch(startLoading())
      fetch(CustomerConnection.getTempUrl() + 'place-order/create', {

        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "pickup": pickup,
          "drop_location": drop,
          "item": strItems,
          "date": this.props.state.pickupdate,
          "time": this.props.state.pickupTime,
          "order_timestamp":this.props.state.PICKUPDATEUTC+this.props.state.PICKUPTIMEUTC,
          "id": value,
          "service_type": 3,
          "vehicle": this.props.state.vehicleID,
          "delivery_type_usf": 4,
          "driverHelp": this.state.DriverHelp,
          "extraHelper": this.state.ExtraHelper,
          "residential": [
            0
          ],
          "tailgate": [
            0
          ]
        }),
      }).then((response) => response.json())
        .then((arr) => {
          console.log("invoice",arr)
          this.props.dispatch(stopLoading())
          this.setState({ showMap: false })

          this.props.dispatch({ type: 'SET_SELECTED_FLAG', selectedTabFlag: 2 });
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



    this.setState({
      PickerTime: moment().hour(hour).minute(minute).toDate(),
      StartTime: strDate, StartAMPM: _ampm, EndTime: strDate1, EndAMPM: _ampm1,
      timeFrame: '1 Hour', ProgressWidth: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 90,
      PickerDate: new Date(ss.getFullYear(), ss.getMonth(), ss.getDate()),
      DeliveryDate: moment(ss).format('MMM-DD-YYYY')
    });

    this.props.dispatch({ type: 'IS_STARTUPTIME', data: true });
    this.props.dispatch({ type: 'IS_DELIVERYDATE', data: true });//,ActiveNextBackColor:'#53C8E5',ActiveNextTextColor:'#FFFFFF', ActiveButton:true})
  }
  onPressInfo(id) {
    this.setState({ isVisible: true });
  }

  render() {

    const { navigate, goBack } = this.props.navigation;

    return (
      <View style={[styles.container, { backgroundColor: Constants.Colors.LightBlue }]}>
        <HeaderBackground navigation={navigate} goBack={goBack} />

        <HeaderMenu navigation={navigate} catId={2} />
        <ImageBackground resizeMode='cover' source={require('../../../assets/images/customer/blue.png')} style={{ height: scaleHeight(130) }}>
          <Text style={{ color: Constants.Colors.LightGray, fontSize: normalizeFont(16), marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5, marginTop: scaleHeight(8) }}>SERVICES</Text>
          <CheckBoxLabel
            viewStyle={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }}
            imgsource={this.setDriverHelpImage()}
            onPress={() => this.onHelpDriverClick()}
            onPressInfo={() => this.onPressInfo(1)}
            text={'Help from driver'}
            isInfoImg={true}
          />
          <CheckBoxLabel
            viewStyle={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }}
            imgsource={this.setExtraHelpImage()}
            onPress={() => this.onExtraHelperClick()}
            onPressInfo={() => this.onPressInfo(2)}
            text={'Extra Helper'}
            isInfoImg={true}
          />
          <CheckBoxLabel
            viewStyle={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5, marginBottom: scaleHeight(5) }}
            imgsource={this.setInsuranceImage()}
            onPress={() => this.onInsuranceClick()}
            onPressInfo={() => this.onPressInfo(3)}
            text={'Buy Insurance'}
            isInfoImg={true}
          />
        </ImageBackground>

        {this.state.showMap && <ServiceRegularMapView navigation={navigate} height={90} showList={true} />}
        <View style={{  marginBottom: scaleHeight(100) }}>
        
        <ShadowButton
          onPress={() => this.CallInvoice()}
          text={'Next'}
          style={styles.ButtonStyle}
          textStyle={styles.ButtonTextStyle}
              />
              </View>
        <View style={{ opacity: 0.8, backgroundColor: Constants.Colors.LightGray,bottom:0,position:"absolute" }}>
          <FlatList data={this.props.state.FilteredTransportArray} renderItem={({ item }) => this.vehicalList(item)} horizontal={true} />
        </View>
        <Modal animationType={"fade"} transparent={true} visible={this.state.isVisible} onRequestClose={() => { this.setState({ isVisible: false }) }}>
          <View style={styles.headerColor}>
            <Text style={styles.headText}>Content</Text>
            <TouchableOpacity onPress={() => { this.setState({ isVisible: false }) }}>
              <Image source={Constants.Images.customer.close} style={styles.closeicon} resizeMode={'contain'} />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  ButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ButtonTextStyle: {
    fontSize: normalizeFont(20),
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

  transportIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 14,
    padding: 0,
  },
  headerColor: {
    marginTop: scaleHeight(0), height: scaleHeight(60), width: '100%', borderTopRightRadius: scaleWidth(5), backgroundColor: '#EFEDEE', borderTopLeftRadius: scaleWidth(5), marginBottom: scaleHeight(10),
    flexDirection: 'row'
  },
  closeicon: {
    backgroundColor: 'transparent',
    height: scaleHeight(25),
    width: scaleWidth(25),
    marginTop: scaleHeight(18),
    marginLeft: scaleWidth(200),
  },
  headText: {
    marginLeft: scaleWidth(20),
    color: 'grey',
    fontSize: normalizeFont(20),
    width: scaleWidth(80),
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    marginTop: scaleHeight(15)
  },
});
export default connect(state => ({ state: state.CustomerReducer, user: state.user }))(UrgencyForCourier1);
