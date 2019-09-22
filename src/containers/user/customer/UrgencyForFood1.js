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
import CustomerConnection from "../../../config/Connection";
import { scaleHeight, scaleWidth, normalizeFont } from '../../../constants/responsive';
import { ToastActionsCreators } from 'react-native-redux-toast';

import moment from 'moment';
import ShadowButton from '../../../components/common/ShadowButton';

class UrgencyForFood1 extends Component<{}> {
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
      isVisible: false,

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
        //if(context.props.state.IsStartTime && context.props.state.vehicleID > 0)
        //{
        context.props.dispatch({ type: 'IS_DELIVERYDATE', data: true });//,ActiveNextBackColor:'#53C8E5',ActiveNextTextColor:'#FFFFFF', ActiveButton:true})
        //}
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
      timeFrame: '1 Hour', ProgressWidth: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 90,
      PickerDate: new Date(ss.getFullYear(), ss.getMonth(), ss.getDate()),
      DeliveryDate: moment(ss).format('MMM-DD-YYYY')
    });

    this.props.dispatch({ type: 'IS_STARTUPTIME', data: true });
    this.props.dispatch({ type: 'IS_DELIVERYDATE', data: true });//,ActiveNextBackColor:'#53C8E5',ActiveNextTextColor:'#FFFFFF', ActiveButton:true})




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
        var strDate1 = moment(ss).add('hour', 1).format('hh:mm');
        var _ampm1 = moment(ss).add('hour', 1).format('A');

        context.setState({
          PickerTime: moment().hour(hour).minute(minute).toDate(),
          StartTime: strDate, StartAMPM: _ampm, EndTime: strDate1, EndAMPM: _ampm1,
          timeFrame: '1 Hour', ProgressWidth: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 90
        });
        context.props.dispatch({ type: 'IS_STARTUPTIME', data: true });
      }
    });
  }

  CallInvoice() {
    let context = this;
    let { dispatch } = this.props;
    let { navigate } = this.props.navigation;

    if (!context.props.state.ActiveButton) {
      this.props.dispatch(ToastActionsCreators.displayInfo('Please Select Vehicle..'));
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

      fetch(CustomerConnection.getTempUrl() + '/place-order/create/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "pickup": pickup,
          "drop_location": drop,
          "date": this.props.state.pickupdate,
          "time": this.props.state.pickupTime,
          "order_timestamp":this.props.state.PICKUPDATEUTC+this.props.state.PICKUPTIMEUTC,
          "quantity": strItems,
          "id": value,
          "vehicle": this.props.state.vehicleID,
          "service_type": 1,
          "delivery_type_usf": 1
        }),

       

      }).then((response) => response.json())
        .then((arr) => {
          orderID = arr.data && arr.data._id;
          this.setState({ showMap: false })
          this.props.dispatch({ type: 'SET_SELECTED_FLAG', selectedTabFlag: 2 });
          this.props.dispatch({ type: 'SET_INVOICE', _data: arr.data, _orders: arr.data.orders });
          navigate('Home_Invoice');
        })
        .catch((error) => {
          console.error(error);
        });
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

  onHelpDriverClick() {
    this.setState({ DriverHelp: !this.state.DriverHelp });
  }
  onExtraHelperClick() {
    this.setState({ ExtraHelper: !this.state.ExtraHelper });
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

  onPressInfo(id) {
    this.setState({ isVisible: true });
  }


  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={[styles.container, { backgroundColor: Constants.Colors.LightBlue }]}>
        <HeaderBackground navigation={navigate} goBack={goBack} />
        <HeaderMenu navigation={navigate} catId={2} />
        <View style={{ flex: 1 }}>
          {/* {<ServiceRegularMapView navigation={navigate} height={90} showList={true} />} */}
          <View style={{  marginBottom: scaleHeight(100) }}>
        
          <ShadowButton
          onPress={() => this.CallInvoice()}
          text="Next"
          style={[styles.ButtonStyle]}
          textStyle={[styles.ButtonTextStyle]}
          />
          </View>
          <View style={{ opacity: 0.8, backgroundColor: Constants.Colors.LightGray,bottom:0,position:'absolute' }}>
            <FlatList data={this.props.state.FilteredTransportArray} renderItem={({ item }) => this.vehicalList(item)} horizontal={true} />
          </View>
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
    color: '#081933',
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
  },
  transportCostStyle: {
    textAlign: 'center',
    //marginTop:0,
    color: Constants.Colors.DarkGrey,
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
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
  // ButtonStyle: {
  //   padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
  //   marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 15,
  //   marginBottom: 10,
  //   marginTop: 0,//10,
  //   marginLeft: 0,//10,
  //   marginRight: 0,//10,
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
  subsubContainer: {
    bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 11,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
    paddingVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
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
export default connect(state => ({ state: state.CustomerReducer, user: state.user }))(UrgencyForFood1);
