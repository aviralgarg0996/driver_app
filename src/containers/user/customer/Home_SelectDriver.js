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
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ListView,
  ImageBackground,
  Modal,
  AsyncStorage,
  Dimensions,
  Alert,
  StatusBar,
  //  Switch,
  ToastAndroid,
  KeyboardAvoidingView
} from 'react-native';

import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import HeaderBackground from '../../../components/customer/HeaderBackground';
import Constants from "../../../constants";
import HeaderMenu from '../../../components/customer/HeaderMenu';
let { width, height } = Dimensions.get('window');

//import SelectDriverMapView from '../../../components/customer/SelectDriverMapView';
import CustomerMapView from '../../../components/customer/MapView1';
import Home_SelectDriverList from '../../../components/customer/Home_SelectDriverList';
import Driver_ListView from '../../../components/customer/Driver_ListView';
import { startLoading, stopLoading } from '../../../redux/modules/app';
import RestClient from '../../../utilities/RestClient';
import { StackActions, NavigationActions } from 'react-navigation';
import CustomerConnection from "../../../config/Connection";
import { scaleHeight, scaleWidth, normalizeFont } from "../../../constants/responsive";
let mediaUrl = CustomerConnection.mediaURL() + '/';
import LinearGradient from 'react-native-linear-gradient';
import ShadowButton from "../../../components/common/ShadowButton";



const resetAction = StackActions.reset({
  index: 0,
  key: null,
  actions: [NavigationActions.navigate({ routeName: 'CustomerHomeNewx' })],
});

import { ToastActionsCreators } from 'react-native-redux-toast';
import { BoxShadow } from 'react-native-shadow';
import Carousel from 'react-native-snap-carousel';
import Toast, { DURATION } from 'react-native-easy-toast'
var strAddress = '228 Park Ave S, New York, NY 10003, USA';
import ToogleSwitch from '../../../components/common/ToggleSwitch';
import { Switch } from 'react-native-switch';


class Home_SelectDriver extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: false,
      scheduledDate: [],
      order_id: '',
      time: '',
      expireTime: '',
      date: '',
      maxTime: '',
      minTime: '',
      totalCharge: '',
      orderStatus: '',
      modalVisible: false,
      scheduleStatus: '',
      pendingStatus: '',
      additionalInfo: false,
      switchValue: false,
      markerData: undefined,
      driverdata: undefined,
      buttonFlag: false,
      valy: 180,
      showList: false,
      amount: "",
      flagCheck: true,
      check1: false,
      check2: false,
      check3: false,
      check4: false
    };
    this.driverListObj = null;
  }
  clickOnSelect = () => {
    this.setState({ modalVisible: false }, () => this.props.navigation.navigate('Home_SelectDriver'))
  }

  placeInPool = () => {
    if (this.props.state.InvoiceData._id) {
      this.orderID = this.props.state.InvoiceData._id
    } else {
      if (this.props.state.Orders._id) {
        this.orderID = this.props.state.Orders._id
      }
    }
    this.setState({ additionalInfo: true })
    //let orderID = '5bfd7b34a6feab0ba6887bc6'
    this.props.dispatch(startLoading())
    fetch(CustomerConnection.getTempUrl() + 'place-order/placeinpool', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "orderId": this.orderID })
      // body: JSON.stringify({ "orderId": '5c2d96df6c6c4a1fcafc8823' })

    }).then((response) => {
      console.log("response place in pool", response)
      response.json()
    }).then((arr) => {
      this.setState({
        buttonFlag: true
      })
      var intervalId = setInterval(() => {
        this.setState({ valy: this.state.valy - 1 });
        if (this.state.valy == 0) {
          this.setState({
            buttonFlag: false
          })
          clearInterval(intervalId)
        }
      }, 1000);
      this.props.dispatch(stopLoading())
      this.refs.toast.show('Your order is successfully placed in pool.', DURATION.LENGTH_LONG);
      this.checkPlaceInPool();
      //this.props.navigation.dispatch(resetAction);
    }).catch((error) => {
      this.props.dispatch(stopLoading())
      //alert(error);
    });
  }

  checkPlaceInPool = () => {
    if (this.props.state.Orders._id) {
      this.orderID = this.props.state.Orders._id;
    } else {
      if (this.props.state.InvoiceData._id) {
        this.orderID = this.props.state.InvoiceData._id;
      }
    }
    RestClient.get_New_Patch('place-order/orderDetails/' + this.orderID).then((result) => {
      console.log('order_details++', result);
      if (result.status == true) {
        if (this.props.state.Orders.orderId) {
          if (this.props.state.draft1 || this.props.state.draft2 || this.props.state.draft3) {
            let routeName = 'CustomerOrders';
            this.setState({ modalVisible: false }, () => this.props.navigation.navigate(routeName));
          } else {
            this.setState({ modalVisible: false }, () => this.props.navigation.navigate('DraftPick'))

          }
        } else {
          if (this.props.state.InvoiceData.orderId || this.props.state.Hourly_pickupArr[0].address !== 'Choose Start Location') {
            if (this.props.state.pick1 || this.props.state.pick2 || this.props.state.pick3) {
              let routeName = 'CustomerOrders';
              this.setState({ modalVisible: false }, () => this.props.navigation.navigate(routeName));
            } else {
              this.setState({ modalVisible: false }, () => this.props.navigation.navigate('NotesPick'))
            }
          }
        }
        let that = this;
        var timeCheck = setTimeout(function () {
          if (result.data.orderStatus == 'Available') {
            that.setState({ modalVisible: true });
            clearTimeout(timeCheck)
          }
        }, 180000)
        var timeCheck = setTimeout(function () {
          if (result.data.orderStatus == 'Schedule') {
            that.refs.toast.show('Congrats! Your order is accepted.', DURATION.LENGTH_LONG);
            that.props.navigation.dispatch(resetAction);
            clearTimeout(timeCheck)
          }
        }, 180000)
      }
      else {
        console.log('check status again')
      }
    }).catch(error => {
      console.log("error=> ", error)
    });
  }

  closeOnSelect = () => {
    this.setState({ modalVisible: false });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  ShowAlert(value) {
    //   alert("switch state");
  }

  checkStatus() {
    if (this.props.state.Orders._id) {
      this.orderID = this.props.state.Orders._id;
    } else {
      if (this.props.state.InvoiceData._id) {
        this.orderID = this.props.state.InvoiceData._id;
      }
    }
    RestClient.get_New_Patch('place-order/orderDetails/' + this.orderID).then((result) => {
      console.log('order_details++', result);
      if (result.status == true) {
        let that = this;
        var timeCheck = setTimeout(function () {
          if (result.data.orderStatus == 'Available') {
            that.setState({ modalVisible: true });
            clearTimeout(timeCheck)
          }
        }, 180000)
        var timeCheck = setTimeout(function () {
          if (result.data.orderStatus == 'Schedule') {
            that.refs.toast.show('Congrats! Your order is accepted.', DURATION.LENGTH_LONG);
            that.props.navigation.dispatch(resetAction);
            clearTimeout(timeCheck)
          }
        }, 180000)
      }
      else {
        console.log('check status again')
      }
    }).catch(error => {
      console.log("error=> ", error)
    });
  }


  selectDriver = () => {
    if (this.props.state.InvoiceData._id) {
      this.orderID = this.props.state.InvoiceData._id
    } else {
      if (this.props.state.Orders._id) {
        this.orderID = this.props.state.Orders._id
      }
    }
    this.setState({ additionalInfo: true })
    //let orderID = '5bfd7b34a6feab0ba6887bc6'
    this.props.dispatch(startLoading())
    fetch(CustomerConnection.getTempUrl() + 'place-order/placeinpool', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "orderId": this.orderID })
      // body: JSON.stringify({ "orderId": '5c2d96df6c6c4a1fcafc8823' })

    }).then((response) => {
      console.log("response place in pool", response)
      response.json()
    }).then((arr) => {
      this.setState({
        buttonFlag: true
      })
      var intervalId = setInterval(() => {
        this.setState({ valy: this.state.valy - 1 });
        if (this.state.valy == 0) {
          this.setState({
            buttonFlag: false
          })
          clearInterval(intervalId)
        }
      }, 1000);
      this.props.dispatch(stopLoading())
      this.refs.toast.show('Your order is successfully placed in pool.', DURATION.LENGTH_LONG);
      this.checkStatus();
      this.additionalInfo();
      //this.props.navigation.dispatch(resetAction);
    }).catch((error) => {
      this.props.dispatch(stopLoading())
      //alert(error);
    });
  }



  additionalInfo() {
    if (this.props.state.Orders.orderId) {
      var draftAr = this.props.state.Orders.orders
      for (i = 0; i < draftAr.length; i++) {
        var draftArray = draftAr[i].pickup
        var draftDrop = draftAr[i].drop_location
        this.props.navigation.dispatch({ type: 'DRAFT_PICKUP', _data: draftArray });
        this.props.navigation.dispatch({ type: 'DRAFT_DROP', _data: draftDrop });
      }
      this.props.navigation.navigate("DraftPick")
    } else if (this.props.state.InvoiceData.orderId && this.props.state.Hourly_pickupArr[0].address == 'Choose Start Location') {
      this.props.navigation.navigate("NotesPick")
    } else if (this.props.state.Hourly_pickupArr[0].address !== 'Choose Start Location') {
      this.props.navigation.navigate("NotesHourly")
    }
  }


  onMarkerClick = (markerData) => {
    this.isChanged = true;
    this.setState({ markerData })
    // 
  }

  onDriverDataGet = (driverdata) => {
    this.mapObj = this.refs[driverdata];
    this.setState({ driverdata: driverdata, isChanged: true })
    let element = driverdata[0];
    //    this.driverListObj.setData(driverdata);

    loc = this.props.state.pickupArr;

    var ImagePath = (element.profilePhoto) ? mediaUrl + element.profilePhoto : 'https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg'
    var viechlePath = (element.vechile) ? mediaUrl + element.vechile : 'https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg'

    var viechleImagePath = (element.vechilecategory && element.vechilecategory.imagePath) ? mediaUrl + element.vechilecategory.imagePath : 'https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg'

    markerData = (
      {
        coordinates: {
          latitude: loc[0].lat + Math.random() / 20,
          longitude: loc[0].long + Math.random() / 20
        },
        title: element.firstName + ' ' + element.lastName,
        key: element._id,
        pinColor: 'blue',
        image: ImagePath,
        index: 0,
        viechlePath: viechlePath,
        viechleImagePath: viechleImagePath
      });

    // this.setState({ markerData })
    // 
  }


  filterDriverList = (data) => {

    this.driverListObj.callTest(data);
  }

  conditionCheck() {
    if (this.state.buttonFlag) {
      var timeCheck = setTimeout(function () {
        clearTimeout(timeCheck)
      }, 180000)
    }
  }

  checkPayment = () => {
    const { amount } = this.state;
    if (this.state.check1 == true || this.state.check2 == true || this.state.check3 == true || this.state.check4 == true) {
      this.setState({ amount: 10 })
    } else {
      this.setState({ amount: "" })
    }
    if (amount == "" || amount == null) {
      this.refs.toast.show('Please enter tip amount', DURATION.LENGTH_LONG);
    } else {
      this.setState({ modalVisible: false }, () => this.props.navigation.navigate('Home_PaymentProceed'))
    }
  }
  render() {
    const shadowOpt = {
      width: Constants.BaseStyle.DEVICE_WIDTH,
      height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7.6,
      color: "#000",
      border: 3,
      radius: 1,
      opacity: 0.1,
      x: 0,
      y: 2,
      style: { zIndex: 1 }
    };
    //debugger;
    const { navigate, goBack } = this.props.navigation;


    //console.log(this.props.state.pickupArr)



    return (
      <View style={[styles.container]}>

        <StatusBar
          backgroundColor="#396CB3"
          barStyle="light-content"
        />

        {/* <Text onPress={()=>goBack()}> GO BACK GO BACK </Text> */}
        <HeaderBackground navigation={navigate} goBack={goBack} />
        <HeaderMenu navigation={navigate} catId={3} />
        <View style={styles.searchContainer}>
          <View style={{
            flexDirection: 'row', flex: 3, marginLeft: 10, backgroundColor: "#fff",
            alignContent: 'center', justifyContent: 'center',
            borderRadius: 5,
          }}>
            {this.state.switchValue && <TextInput autoFocus={false} onChangeText={(text) => this.filterDriverList(text)} style={styles.txtInputSearch} placeholder={''} underlineColorAndroid="transparent" />}
            {this.state.switchValue && <Image source={Constants.Images.customer.search} style={styles.searchContentIcon} resizeMode={'contain'} />}
          </View>

          <View style={{
            flexDirection: 'row', flex: 2,
            alignContent: 'center', justifyContent: 'center'
          }}>

            <Text style={styles.headTextHeader}>Map</Text>
            <Switch
              onValueChange={


                () => {


                  if (!this.state.switchValue) {
                    this.listContainer.setNativeProps({
                      style: { height: height * .6 }
                    })

                    this.mapContainer.setNativeProps({
                      style: { height: 0 }
                    })

                  }
                  else {
                    this.listContainer.setNativeProps({
                      style: { height: '0%' }
                    })

                    this.mapContainer.setNativeProps({
                      style: { height: height * .6 }
                    })

                    this.mapView.setNativeProps({
                      style: { height: height * .6 }
                    })

                  }
                  this.setState({ switchValue: !this.state.switchValue, markerData: undefined })
                }
              }
              value={this.state.switchValue}
              barHeight={30}
              backgroundActive={Constants.Colors.Blue}
              backgroundInactive={Constants.Colors.Gray}
              circleActiveColor={Constants.Colors.White}
              circleInActiveColor={Constants.Colors.WhiteBlur}
              changeValueImmediately={true}
              innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
              circleSize={20}
              barHeight={24}
              circleBorderWidth={1}
              barWidth={120}
            />
            <Text style={styles.headTextHeader}>List</Text>
          </View>

        </View>
        <ScrollView>
          <View ref={component => this.mapContainer = component}>
            <CustomerMapView HourlyFlag={6} navigation={navigate} goBack={goBack}
              onMarkerClick={this.onMarkerClick}
              onDriverDataGet={this.onDriverDataGet}
              ondidMount={component => this.mapView = component}
              loc={this.props.state.pickupArr} />
            {this.state.markerData && <Home_SelectDriverList data={this.state.markerData} />
            }
          </View>

          <View ref={component => { this.listContainer = component }} style={{ height: 0 }}>
            {this.state.driverdata && this.state.switchValue &&
              <Driver_ListView data={this.state.driverdata ? this.state.driverdata : []}
                buttonFlag={this.state.buttonFlag}
                selectDriver={this.selectDriver}
                onRef={ref => (this.driverListObj = ref)}
              />
            }
          </View>
          <TouchableOpacity style={[{
            backgroundColor: Constants.Colors.DarkBlue, borderRadius: 5,
            width: '90%', margin: 15, alignItems: 'center', marginLeft: '5%',
            height: scaleHeight(50), justifyContent: 'center'
          }]} disabled={true ? this.state.buttonFlag : false} onPress={() => this.selectDriver()}>
            <Text style={[styles.SelectTextStyle]}>
              {'Place in the pool'}
            </Text>
          </TouchableOpacity>
          {/*
            <View style={[styles.container]}>
              {
                this.state.additionalInfo || this.props.state.flagChange == 'flagStatus' || this.state.buttonFlag ?
                  <TouchableOpacity style={[{
                    backgroundColor: Constants.Colors.LightBlue, margin: 10, borderRadius: 5,
                    width: '90%', margin: 10, alignItems: 'center', marginLeft: '5%',
                    height: 50, justifyContent: 'center'
                  }]} onPress={() => this.additionalInfo()}>
                    <Text style={[styles.SelectTextStyle]}>
                      {'Additional Information'}
                    </Text>
                  </TouchableOpacity>
                  : null}
            </View>*/
          }
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <KeyboardAvoidingView style={styles.transaparentView} behavior={(Platform.OS === 'ios') ? "padding" : null}>
              <ScrollView style={{ flex: 1 }}>
                <View style={styles.centerView}>
                  <LinearGradient colors={[Constants.Colors.LightBlue, Constants.Colors.LightBlue]} style={styles.navigationBarcontainer}>
                    <View style={styles.navigationBar}>
                      <View style={[styles.navBarCenter, { marginLeft: scaleWidth(20) }]}>
                        <TouchableOpacity activeOpacity={0.9} style={[{ flexDirection: 'row' }]}
                        >
                          <Image
                            source={Constants.Images.customer.itshere}
                            style={styles.mapIcon} resizeMode={'contain'} />
                        </TouchableOpacity>
                      </View>

                      <View style={[styles.navBarRight]}>
                        <TouchableOpacity onPress={() => this.closeOnSelect()}>
                          <Image resizeMode='center' source={Constants.Images.customer.close} style={styles.closeicon} resizeMode={'contain'} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </LinearGradient>

                  <ImageBackground resizeMode='cover' style={{ height: scaleHeight(310), width: '100%' }} source={require('../../../assets/images/customer/blue.png')}>
                    <Text style={styles.topText}>{'OOPS!'}</Text>
                    <Text style={[styles.desc, { fontFamily: Constants.CustomerFonts.semibold.fontFamily }]}>{'No one accepted your order.'}</Text>
                    <ShadowButton
                      onPress={() => this.placeInPool()}
                      text={'Place in the pool'}
                      style={[styles.ButtonStyle, { marginBottom: scaleHeight(0) }]}
                      textStyle={styles.ButtonTextStyle}
                    />
                    <ShadowButton
                      onPress={() => this.clickOnSelect()}
                      text={'Select driver again'}
                      style={[styles.ButtonStyle, { marginBottom: scaleHeight(10) }]}
                      textStyle={styles.ButtonTextStyle}
                    />
                  </ImageBackground>
                  <TouchableOpacity onPress={() => this.setState({ showList: true, flagCheck: !this.state.flagCheck })}>
                    {
                      this.state.flagCheck ? <Text style={[styles.desc, { color: Constants.Colors.SkyBlue, fontSize: normalizeFont(20), marginBottom: scaleHeight(20), marginTop: scaleHeight(20), fontFamily: Constants.CustomerFonts.semibold.fontFamily }]}>{'Add tip to attract driver/s.'}</Text> : null
                    }
                  </TouchableOpacity>
                  {
                    this.state.showList ? <ImageBackground resizeMode='cover' style={{ height: scaleHeight(350), width: '100%', marginTop: scaleHeight(15) }} source={require('../../../assets/images/customer/blue.png')}>
                      <View style={{ marginBottom: scaleHeight(20), marginTop: scaleHeight(20), }}>
                        <Text style={[styles.desc, { color: Constants.Colors.LightGray, fontSize: normalizeFont(20), marginBottom: scaleHeight(20), fontFamily: Constants.CustomerFonts.semibold.fontFamily }]}>{'Add tip to attract driver/s.'}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: scaleWidth(20), marginRight: scaleWidth(20), }}>
                          {
                            this.state.check1 ? <TouchableOpacity onPress={() => this.setState({ check1: false })}>
                              <View style={styles.circleLogo1}>
                                <Text style={styles.textPercent1}>{'10%'}</Text>
                              </View>
                            </TouchableOpacity> : <TouchableOpacity onPress={() => this.setState({ check1: true, check2: false, check3: false, check4: false })}>
                                <View style={styles.circleLogo}>
                                  <Text style={styles.textPercent}>{'10%'}</Text>
                                </View>
                              </TouchableOpacity>
                          }
                          {
                            this.state.check2 ? <TouchableOpacity onPress={() => this.setState({ check2: false })}>
                              <View style={styles.circleLogo1}>
                                <Text style={styles.textPercent1}>{'15%'}</Text>
                              </View>
                            </TouchableOpacity> : <TouchableOpacity onPress={() => this.setState({ check2: true, check1: false, check3: false, check4: false })}>
                                <View style={styles.circleLogo}>
                                  <Text style={styles.textPercent}>{'15%'}</Text>
                                </View>
                              </TouchableOpacity>
                          }
                          {
                            this.state.check3 ? <TouchableOpacity onPress={() => this.setState({ check3: false })}>
                              <View style={styles.circleLogo1}>
                                <Text style={styles.textPercent1}>{'20%'}</Text>
                              </View>
                            </TouchableOpacity> : <TouchableOpacity onPress={() => this.setState({ check3: true, check1: false, check2: false, check4: false })}>
                                <View style={styles.circleLogo}>
                                  <Text style={styles.textPercent}>{'20%'}</Text>
                                </View>
                              </TouchableOpacity>
                          }
                          {
                            this.state.check4 ? <TouchableOpacity onPress={() => this.setState({ check4: false })}>
                              <View style={styles.circleLogo1}>
                                <Text style={styles.textPercent1}>{'25%'}</Text>
                              </View>
                            </TouchableOpacity> : <TouchableOpacity onPress={() => this.setState({ check4: true, check1: false, check2: false, check3: false })}>
                                <View style={styles.circleLogo}>
                                  <Text style={styles.textPercent}>{'25%'}</Text>
                                </View>
                              </TouchableOpacity>
                          }
                        </View>
                      </View>
                      <View style={{ marginTop: scaleHeight(20), marginLeft: scaleWidth(15), marginRight: scaleWidth(15) }}>

                        <TextInput
                          style={styles.input}
                          underlineColorAndroid="transparent"
                          placeholder="ENTER TIP AMOUNT"
                          placeholderTextColor={Constants.Colors.LightGray}
                          onChangeText={(value) => this.setState({ amount: value })}
                          keyboardType='number-pad'
                          returnKeyType='done'
                          editable={(this.state.check1 || this.state.check2 || this.state.check3 || this.state.check4) ? false : true}
                          value={this.state.amount}
                        />
                        <ShadowButton
                          onPress={() => this.checkPayment()}
                          text={'Proceed to pay'}
                          style={[styles.ButtonStyle, { marginBottom: scaleHeight(0) }]}
                          textStyle={styles.ButtonTextStyle}
                        />
                      </View>
                    </ImageBackground> : null
                  }
                  <View style={{ height: scaleHeight(40), backgroundColor: 'transparent' }} />
                  <Toast
                    ref="toast"
                    style={{ backgroundColor: '#D6511F' }}
                    position='top'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: 'white' }}
                  />
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </Modal >
          <Toast
            ref="toast"
            style={{ backgroundColor: '#D6511F' }}
            position='center'
            positionValue={200}
            fadeInDuration={750}
            fadeOutDuration={5000}
            opacity={0.8}
            textStyle={{ color: 'white' }}
          />
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4d6cb0'
  },

  settingIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7,
    marginTop: 3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  searchContainer: {
    backgroundColor: '#396CB3',
    justifyContent: 'center',
    height: Constants.BaseStyle.HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    //paddingLeft: 10,
    //paddingRight:10,
    //marginLeft: 15,

    // marginRight: 15,

    //marginTop:10,
    //   marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,

  },
  searchContentIcon: {
    //tintColor:'#898988',
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    marginRight: 10,
  },
  txtInputSearch: {
    backgroundColor: '#fff',
    color: '#5D5D5D',
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    //paddingRight:10,
    //paddingTop:3,
    //paddingBottom:3,
    flex: 1,
    marginLeft: 5,
    marginTop: 2,
    marginBottom: 2
    //marginLeft: (Constants.BaseStyle.DEVICE_WIDTH/100)*2,
  },
  ButtonStyle1: {
    borderWidth: .5,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 15,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
    marginBottom: scaleHeight(12),
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: scaleWidth(5),
  },
  SelectTextStyle: {
    fontSize: Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    // color: '#53C8E5',
    textAlign: "center",
    //width:Constants.BaseStyle.DEVICE_WIDTH*.8, 
    fontSize: 20,
    color: 'white',
    //    backgroundColor:'blue'
  },
  ButtonTextStyle1: {
    fontSize: Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.White,
  },
  transaparentView: { flex: 1, backgroundColor: Constants.Colors.LightBlue },

  centerView: { height: '100%', width: '100%', borderRadius: 5, backgroundColor: Constants.Colors.LightBlue, alignSelf: 'center', alignItems: 'center' },

  topText: { textAlign: 'center', fontSize: normalizeFont(22), fontWeight: '600', color: Constants.Colors.White, margin: scaleWidth(15), fontFamily: Constants.CustomerFonts.bold.fontFamily },

  desc: { textAlign: 'center', fontSize: normalizeFont(18), color: Constants.Colors.LightGray, fontFamily: Constants.CustomerFonts.normal.fontFamily },

  closeicon: {
    backgroundColor: 'transparent',
    height: scaleHeight(20),
    width: scaleWidth(20),
  },
  navigationBar: {
    backgroundColor: 'transparent',//Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navigationBarcontainer: {
    //flex  : 1,
    width: Constants.BaseStyle.DEVICE_WIDTH,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 8,
  },
  mapIcon: {
    height: 100,
    width: 100,
    marginTop: 3.5,
    alignItems: 'center',
    marginLeft: 0,
    marginRight: 22
  },
  navBarRight: {
    flex: 0.5,
    flexDirection: 'row',
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    marginRight: scaleWidth(20),
  },
  ButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: scaleHeight(0),
    borderRadius: 5,
  },
  ButtonTextStyle: {
    fontSize: normalizeFont(24),
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.White,
    textAlign: 'center',
  },
  outerCircle: {
    borderRadius: scaleWidth(30),
    width: scaleWidth(60),
    height: scaleHeight(60),
    borderColor: Constants.Colors.White,
    borderWidth: scaleWidth(1)
  },
  innerCircle: {
    fontSize: normalizeFont(24),
    fontWeight: '600',
    marginTop: scaleHeight(14),
    marginBottom: scaleHeight(10),
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    textAlign: 'center',
    color: Constants.Colors.White
  },
  input: {
    height: scaleHeight(48), borderColor: Constants.Colors.LightGray, borderWidth: scaleWidth(1.5), backgroundColor: Constants.Colors.White, fontSize: normalizeFont(17), marginBottom: scaleHeight(0), paddingHorizontal: 20,
  },
  textPercent: {
    fontSize: normalizeFont(22),
    color: Constants.Colors.White,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: scaleHeight(15)
  },
  circleLogo: {
    height: scaleHeight(70),
    width: scaleHeight(70),
    borderRadius: scaleHeight(70) / 2,
    borderColor: Constants.Colors.LightGray,
    borderWidth: 1
  },
  textPercent1: {
    fontSize: normalizeFont(22),
    color: Constants.Colors.Orange,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: scaleHeight(15)
  },
  circleLogo1: {
    height: scaleHeight(70),
    width: scaleHeight(70),
    borderRadius: scaleHeight(70) / 2,
    borderColor: Constants.Colors.LightGray,
    backgroundColor: Constants.Colors.White,
    borderWidth: 1
  }
});
export default connect(state => ({ state: state.CustomerReducer }))(Home_SelectDriver);
