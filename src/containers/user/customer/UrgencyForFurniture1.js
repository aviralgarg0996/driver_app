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
  FlatList,
  ImageBackground,
  Modal,
  DatePickerAndroid,
  TimePickerAndroid,
  AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';

import Constants from "../../../constants";
import ServiceRegularMapView from '../../../components/customer/ServiceRegularMapView';
import HeaderMenu from '../../../components/customer/HeaderMenu';
import HeaderBackground from '../../../components/customer/HeaderBackground';
import CheckBoxLabel from '../../../components/customer/CheckBoxLabel';
import CustomerConnection from "../../../config/Connection";
import { scaleHeight, scaleWidth, normalizeFont } from '../../../constants/responsive';


import { ToastActionsCreators } from 'react-native-redux-toast';
import moment from 'moment';
import { startLoading, stopLoading } from '../../../redux/modules/app';
import ShadowButton from '../../../components/common/ShadowButton';

class UrgencyForFurniture1 extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      ProgressWidth: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,//50,
      PickerDate: new Date(),
      DeliveryDate: 'Delivery Date',//moment().format('MMM-DD-YYYY'),
      PickerTime: new Date(),
      StartTime: 'Start Time',//moment().format('hh:mm'),
      StartAMPM: '',//moment().format('A'),
      EndTime: 'End Time',//moment(new Date()).add('hour',1).format('hh:mm'),
      EndAMPM: '',//moment().format('A'),
      timeFrame: '',//'1 Hour',
      timeFrameValue: 0,//1,
      mapHeight: 30,

      selectedItem: 'direct',
      DriverHelp: false,
      ExtraHelper: false,
      Insurance: false,
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
        context.props.dispatch({ type: 'IS_DELIVERYDATE', data: true });
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
      this.CallVehicelCost()
    });
  }
  onExtraHelperClick() {
    this.setState({ ExtraHelper: !this.state.ExtraHelper },()=>{
    this.CallVehicelCost()
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

  onPressInfo() {
    this.setState({ isVisible: true });
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
    var strWhiteGlove = [];
    var strTailgate = [];
    var strResidential = [];
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
    /* var len = this.props.state.DisplayLocationAddress.length;
     this.props.state.DisplayLocationAddress.map((val, i) => {
       if (!(val.address.indexOf('Choose') == 0)) {
         var arr1 = [];
         for (var x = 0; x < val.furnitureitems.length; x++) {
           qty = parseFloat(val.furnitureitems[x].quantity);
           arr1.push({ "quantity": 5, "catID": 1, "productId": 2, "productName": "sofa" });//qty;
         }
         strItems.push(arr1);
         if (val.IsService)
           strWhiteGlove[i] = 1;
         else {
           strWhiteGlove[i] = 0;
         }
         if (val.IsTailgate)
           strTailgate[i] = 1;
         else {
           strTailgate[i] = 0;
         }
         if (val.IsResidential)
           strResidential[i] = 1;
         else {
           strResidential[i] = 0;
         }
       }
     });*/


    var furnitureId = [];
    var itemData = [];



    var len = this.props.state.DisplayLocationAddress.length;
    this.props.state.DisplayLocationAddress.map((val, i) => {

      if (!(val.address.indexOf('Choose') == 0)) {
        var arr1 = [];

        console.log(JSON.stringify(val))



        let SubfurnitureId = [];
        let qunatityData = [];


        for (var x = 0; x < val.furnitureitems.length; x++) {

          qty = parseFloat(val.furnitureitems[x].quantity);
          SubfurnitureId.push(val.furnitureitems[x].id)
          qunatityData.push(qty);
          arr1.push({ "quantity": 5, "catID": 1, "productId": 2, "productName": "sofa" });//qty;
        }
        furnitureId.push(SubfurnitureId);
        itemData.push(qunatityData);
        strItems.push(arr1);



        if (val.IsService)
          strWhiteGlove[i] = 1;
        else
          strWhiteGlove[i] = 0;

        if (val.IsTailgate)
          strTailgate[i] = 1;
        else
          strTailgate[i] = 0;

        if (val.IsResidential)
          strResidential[i] = 1;
        else
          strResidential[i] = 0;





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
      this.props.dispatch(startLoading())
      fetch(CustomerConnection.getTempUrl() + 'place-order/create/', {


        //     fetch(CustomerConnection.getTempUrl()+'place-order/create/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "pickup": pickup,
          "drop_location": drop,
         // "date": this.state.DeliveryDate,
          //"time": this.state.StartTime,

          "date": this.props.state.pickupdate,
          "time": this.props.state.pickupTime,
          "order_timestamp":this.props.state.PICKUPDATEUTC+this.props.state.PICKUPTIMEUTC,
    
          furnitureId: furnitureId,
          item: itemData,
          "id": this.props.user.userData.data._id,
          "vehicle": "5b8ff064047cc20efd9d1dad",
          "service_type": 4,
          "delivery_type_usf": this.props.state.Delivery_type_usf,
          "whiteGlove": 2,
          "driverHelp": this.state.DriverHelp,
          "extraHelper": this.state.ExtraHelper,
          "tailgate": strTailgate,
          "residential": strResidential
        }),
      }).then((response) => response.json())
        .then((arr) => {
          this.props.dispatch(stopLoading())
          //   orderID = arr.data.orderId;
          orderID = arr.data._id;
          this.setState({ showMap: false })
          this.props.dispatch({ type: 'SET_INVOICE', _data: arr.data, _orders: arr.data.orders });
          //navigate('Home_DocumentInvoice');
          this.props.dispatch({ type: 'SET_SELECTED_FLAG', selectedTabFlag: 2 });
          navigate('Home_FurnitureInvoice');
        })
        .catch((error) => {
          this.props.dispatch(stopLoading())
          console.error(error);
        });
    })
  }

  CallVehicelCost() {
    let { dispatch } = this.props;
    var strItems = [];
    var strWeight = [];
    var pickup = [];
    var drop = [];
 this.props.state.DisplayLocationAddress.map((val, i) => {
      if (!(val.address.indexOf('Choose') == 0)) {
        strItems[i] = val.furnitureitems;
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

       let furnitureitems=[]
      strItems.map((value)=>{
        let items=[]
        value.map((item)=>items.push(item.id))
        furnitureitems.push(items)
      })
      let furniturequantity=[]
      strItems.map((value)=>{
        let quantity=[]
        value.map((item)=>quantity.push(item.quantity))
        furniturequantity.push(quantity)
      })
   
    this.props.dispatch(startLoading())
    fetch(CustomerConnection.getTempUrl() + 'place-order/vehiclecalculation/', {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'furnitureId':furnitureitems ,
        'item': furniturequantity,
        'service_type': 4,
        'delivery_type_usf':this.props.state.Delivery_type_usf,
        'pickup': pickup,
        'drop_location': drop,
        "driverHelp":this.state.DriverHelp,
        "extraHelper":this.state.ExtraHelper 
      }),



    }).then((response) => response.json())
      .then((arr1) => {
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
      <View style={[{ backgroundColor: Constants.Colors.LightGray, height: scaleHeight(70), width: Constants.BaseStyle.DEVICE_WIDTH / 100 * width }]}>
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
 
              <View style={{ marginTop: scaleHeight(0), marginBottom: scaleHeight(25) }}>
              <ShadowButton
                onPress={() => this.CallInvoice()}
                text={'Next'}
                style={styles.ButtonStyle}
                textStyle={styles.ButtonTextStyle}
              />
            </View>
        <View style={{ opacity: 0.8, backgroundColor: Constants.Colors.LightGray }}>
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
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
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
  colIndexViewWhite: {
    backgroundColor: Constants.Colors.White,
  },
  colIndexViewBlack: {
    backgroundColor: Constants.Colors.LightBlue,
  },
  colIndexLabelWhite: {
    fontSize: 12,//Constants.CustomerFonts.TopHeader.fontSize,
    fontFamily: Constants.CustomerFonts.TopHeader.fontFamily,
    color: Constants.Colors.LightBlue,
    textAlign: "center",
  },
  colIndexLabelBlack: {
    fontSize: 12,//Constants.CustomerFonts.TopHeader.fontSize,
    fontFamily: Constants.CustomerFonts.TopHeader.fontFamily,
    color: Constants.Colors.White,
    textAlign: "center",
  },
  TimeWindowStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'left',
    marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
    fontSize: 13,//Constants.CustomerFonts.TopHeader.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
  },

  TimeHourStyle: {
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
  },
  ButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: scaleHeight(20),
    borderRadius: 5,
    
  },
  ButtonTextStyle: {
    fontSize: normalizeFont(20),
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.White,
    textAlign: 'center',
  },

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
  modalOuter: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 4,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInner: {
    margin: 10,
    padding: 3,
    backgroundColor: '#fff',
    position: 'relative',
  },
  btCloseModal: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  btnCloseModalIcon: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
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
export default connect(state => ({ state: state.CustomerReducer, user: state.user }))(UrgencyForFurniture1);
