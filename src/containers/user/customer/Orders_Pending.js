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
} from 'react-native';

import { connect } from 'react-redux';
import moment from 'moment';
import HeaderBackgroundWithBackButton from '../../../components/customer/HeaderBackgroundWithBackButton';
import Constants from "../../../constants";
import SelectDriverMapView from '../../../components/customer/SelectDriverMapView';
import Orders_DraftsGeneral from '../../../components/customer/Orders_GeneralDrafts';
import * as UserActions from '../../../redux/modules/user';
import { bindActionCreators } from "redux";
import SubmitButton from "../../../components/common/FormSubmitButton";
import { BoxShadow } from 'react-native-shadow';
import CustomerConnection from "../../../config/Connection";
import { Container, Card, CardItem, Body, Left, Right, Thumbnail, Content } from 'native-base'
import { scaleHeight, scaleWidth, normalizeFont } from '../../../constants/responsive';
import { NavigationActions } from 'react-navigation';


var strAddress = '228 Park Ave S, New York, NY 10003, USA';


class Orders_Pending extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      generalFlag: 1,
      locationFlag: 0,
      servicesFlag: 0,
      productFlag: 0,
      detailsInfo: '',
      params: '',
      orderId: '',
      date: '',
      maxTime: '',
      minTime: '',
      pickUpp: [],
      dropLocation: [],
      order_ID: '',
      miItems: [],
      miItems: [],
      productArray: [],
      noSelection: false,
      WhiteGlove: false,
      ExtraHelper: false,
      DriverHelp: false,
      TailGate: false,
      Residence: false,

    }
    // const { state } = this.props.navigation.state;
    // this.setState({
    //   orderIdd: state.detail_id
    // })
    // console.log("order id is+++", orderIdd)
    this.miItems = [
      {
        'test1': '1',
        'test2': '2'
      }
    ]
  }

  setControlTextColor(value) {
    if (value == 1)
      return [styles.textStyle, { color: Constants.Colors.White, marginBottom: scaleHeight(20) }];
    else {
      return [styles.textStyle];
    }
  }

  setViewColorOnClick(value) {
    if (value === 1) {
      return [styles.colIndexViewBlack];
    }
    else {
      return [styles.colIndexViewWhite];
    }
  }

  onClickGeneral() {
    this.setState({
      generalFlag: 1,
      locationFlag: 0,
      servicesFlag: 0,
      productFlag: 0,
    });

  }

  async onClickLocation() {
    let detailsInfo = this.props.orderDetails;
    console.log("pickup details++++++", detailsInfo);
    var ab = await detailsInfo.orders[0].pickup;
    let pickUp = [];
    for (var i = 0; i < ab.length; i++) {
      var mytest = ab[i]
      console.log("mytest data is:", mytest)
      let objj = {
        address: mytest.address,
        pickup_point: mytest.pickup_point
      }
      pickUp.push(objj)
    }
    let drop = await detailsInfo.orders[0].drop_location;
    let dropArr = [];
    for (i = 0; i < drop.length; i++) {
      var dl = drop[i];
      console.log('dl++', dl);
      let obj = {
        address: dl.address,
        drop_point: dl.drop_point
      }
      dropArr.push(obj)
    }
    this.setState({
      pickUpp: pickUp,
      dropLocation: dropArr,
      generalFlag: 0,
      locationFlag: 1,
      servicesFlag: 0,
      productFlag: 0,
    });
  }

  async onClickServices() {
    let detailsInfo = this.props.orderDetails;
    //console.log("pickup details++++++", detailsInfo);
    var ab = await detailsInfo.orders[0].pickup;
    let pickUp = [];
    for (var i = 0; i < ab.length; i++) {
      var mytest = ab[i]
      console.log("mytest data is:", mytest)
      let objj = {
        address: mytest.address,
        pickup_point: mytest.pickup_point
      }
      pickUp.push(objj)
    }
    let details = this.props.orderDetails;
    console.log("delivery name++", details.deliveryName);
    let dName = details.deliveryName
    if (dName == 'Documents' || dName == 'Food') {
      this.setState({
        pickUpp: pickUp,
        noSelection: true,
        generalFlag: 0,
        locationFlag: 0,
        servicesFlag: 1,
        productFlag: 0,
      })
    } else if (dName == 'Furniture & Appliances') {
      this.setState({
        pickUpp: pickUp,
        WhiteGlove: true,
        ExtraHelper: true,
        DriverHelp: true,
        generalFlag: 0,
        locationFlag: 0,
        servicesFlag: 1,
        productFlag: 0,
      })
    }
    else if (dName == 'Courier & Frieght') {
      this.setState({
        pickUpp: pickUp,
        WhiteGlove: true,
        // ExtraHelper: true,
        // DriverHelp: true,
        TailGate: true,
        Residence: true,
        generalFlag: 0,
        locationFlag: 0,
        servicesFlag: 1,
        productFlag: 0,
      })
    } else if (dName == 'Hourly Services') {
      this.setState({
        pickUpp: pickUp,
        WhiteGlove: false,
        ExtraHelper: true,
        DriverHelp: true,
        TailGate: false,
        Residence: false,
        generalFlag: 0,
        locationFlag: 0,
        servicesFlag: 1,
        productFlag: 0,
      })
    }
  }

  async onClickProducts() {
    let detailsInfo = await this.props.orderDetails;
    console.log("pickup details++++++", JSON.stringify(detailsInfo.orders[0].furniture[0]));
    var ab = detailsInfo.orders[0].pickup;
    let pickUp = [];
    for (let i = 0; i < ab.length; i++) {
      var mytest = ab[i];
      let objj = {
        address: mytest.address,
        pickup_point: mytest.pickup_point
      }
      pickUp.push(objj);
    }
    let fuTest = [];
    detailsInfo.orders[0].furniture.map((fur) => {
      console.log(' ==== furrrr ====', fur)
      fur.map((value) => {
        console.log(' ==== val =====', value)
        fuTest.push(value)
      })
    })
    this.setState({
      pickUpp: pickUp,
      productArray: fuTest,
      generalFlag: 0,
      locationFlag: 0,
      servicesFlag: 0,
      productFlag: 1
    });
  }

  async componentWillMount() {
    const { state } = await this.props.navigation;
    console.log("Callback data======" + JSON.stringify(state.params));
    var Order_IDD = state.params.detail_id;
    console.log("Param Value", Order_IDD)
    this.props.UserActions.Ordered_details(Order_IDD);
    // this.props.UserActions.Ordered_details('5bd9a8ecbf200c4479fa88f6');

  }


  componentWillReceiveProps(nextProps) {
    let detailsInfo = nextProps.orderDetails;
    console.log(JSON.stringify(detailsInfo));
    let new_min = moment.utc(detailsInfo.minTime).format('HH:mm A');
    let new_max = moment.utc(detailsInfo.maxTime).format('HH:mm A');
    let new_date = moment.utc(detailsInfo.updatedAt, "YYYY-MM-DDTHH:mm:ss Z").format('DD/MM/YYYY');
    this.setState({
      orderId: detailsInfo.orderId,
      date: new_date,
      maxTime: new_max,
      minTime: new_min
    })
  }





  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={[styles.container, { backgroundColor: Constants.Colors.White }]}>
        <HeaderBackgroundWithBackButton navigation={navigate} goBack={goBack} headerText={'Pending Order'} />

        <BoxShadow setting={{
          width: Constants.BaseStyle.DEVICE_WIDTH,
          height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 45,
          color: "#000",
          border: 3,
          radius: 5,
          opacity: 0.1,
          x: 0,
          y: 2,
          style: { marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1 }
        }}>
          <SelectDriverMapView navigation={navigate} height={48} controlVisible={false} />
        </BoxShadow>
        {/* <BoxShadow setting={{
          width: '100%',
          height: scaleHeight(40),
          color: "#000",
          border: 3,
          radius: 5,
          opacity: 0.1,
          x: 0,
          y: 2,
          style: {
            marginBottom: scaleHeight(5),
            marginVertical: scaleHeight(2)
          }
        }}> */}
        <View style={[styles.flexRow, { backgroundColor: '#ffffff', height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7, }]}>
          <TouchableOpacity onPress={() => this.onClickGeneral()} style={[styles.colorChange, this.setViewColorOnClick(this.state.generalFlag)]}>
            <Text style={this.setControlTextColor(this.state.generalFlag)}>{'General'}</Text>
          </TouchableOpacity>
          <View style={[styles.verticalLine, { marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 1 }]} />
          <TouchableOpacity onPress={() => this.onClickLocation()} style={[{ width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 22, justifyContent: 'center', alignItems: 'center' }, this.setViewColorOnClick(this.state.locationFlag)]}>
            <Text style={this.setControlTextColor(this.state.locationFlag)}>{'Locations'}</Text>
          </TouchableOpacity>
          <View style={[styles.verticalLine, { marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 1 }]} />
          <TouchableOpacity onPress={() => this.onClickServices()} style={[{ width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 22, justifyContent: 'center', alignItems: 'center' }, this.setViewColorOnClick(this.state.servicesFlag)]}>
            <Text style={this.setControlTextColor(this.state.servicesFlag)}>{'Services'}</Text>
          </TouchableOpacity>
          <View style={[styles.verticalLine, { marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 1 }]} />
          <TouchableOpacity onPress={() => this.onClickProducts()} style={[{ width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 22, justifyContent: 'center', alignItems: 'center' }, this.setViewColorOnClick(this.state.productFlag)]}>
            <Text style={this.setControlTextColor(this.state.productFlag)}>{'Products'}</Text>
          </TouchableOpacity>
        </View>
        {/* </BoxShadow> */}

        {
          this.state.generalFlag == 1 ?
            /********** DRAFT GENERAL ******/
            <ScrollView style={[styles.container, { backgroundColor: Constants.Colors.LightBlue }]}>
              <ImageBackground resizeMode='cover' source={require("../../../assets/images/customer/blue.png")} style={[styles.container, { backgroundColor: '#ffffff', height: scaleHeight(150), marginBottom: scaleHeight(15) }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  {
                    this.props.orderDetails.deliveryName == 'Food' ? <Image resizeMode='center' source={Constants.Images.customer.newFood} style={[styles.picSize]} /> : null
                  }
                  {
                    this.props.orderDetails.deliveryName == 'Documents' ? <Image resizeMode='center' source={Constants.Images.customer.newDocument} style={[styles.picSize]} /> : null
                  }
                  {
                    this.props.orderDetails.deliveryName == 'Courier & Frieght' ? <Image resizeMode='center' source={Constants.Images.customer.newCourier} style={[styles.picSize]} /> : null
                  }
                  {
                    this.props.orderDetails.deliveryName == 'Furniture & Appliances' ? <Image resizeMode='center' source={Constants.Images.customer.newFurniture} style={[styles.picSize]} /> : null
                  }
                  {
                    this.props.orderDetails.deliveryName == 'Hourly Services' ? <Image resizeMode='center' source={Constants.Images.customer.newHourly} style={[styles.picSize]} /> : null
                  }
                </View>
                <View>
                  <Text style={[styles.orderTextStyle, { textAlign: 'center', }]}>{'Order Id : '}{this.state.orderId}</Text>
                </View>
                <Text style={[styles.orderTextStyle, { textAlign: 'center', color: Constants.Colors.White, marginTop: scaleHeight(6) }]}><Text style={{ color: Constants.Colors.LightGray }}>{'Delivery Date: '}</Text>{this.state.date}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: scaleHeight(6) }}>
                  <Text style={[styles.orderTextStyle, { color: Constants.Colors.LightGray }]}>{'Time Window'}</Text>
                  <TouchableOpacity>
                    <Image source={Constants.Images.customer.info} style={[styles.infoimgSize]} resizeMode={'center'} />
                  </TouchableOpacity>
                  <Text style={[styles.orderTextStyle, { textAlign: 'center', color: Constants.Colors.White }]}> : {this.state.minTime} - {this.state.maxTime}</Text>
                </View>
              </ImageBackground>

              <View>
                <SubmitButton
                  onPress={() => {
                    this.props.navigation.dispatch({ type: 'SET_INVOICE', _data: this.props.orderDetails, _orders: this.props.orderDetails });
                    let routeName = 'Home_SelectDriver';
                    const resetAction1 = NavigationActions.navigate({
                      routeName: routeName
                    });
                    //this.props.navigation.dispatch(resetAction);
                    this.props.navigation.dispatch(resetAction1);
                  }}
                  text={'SELECT DRIVER'}
                  style={{ marginTop: scaleHeight(10), marginBottom: scaleHeight(20) }}
                />
              </View>
            </ScrollView>
            : this.state.locationFlag == 1 ?
              /********** DRAFT LOCATION ******/
              <ScrollView style={[styles.container, { backgroundColor: Constants.Colors.LightBlue/*,height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 18*/ }]}>

                <FlatList
                  data={this.state.pickUpp}
                  renderItem={({ item, index }) =>
                    <ImageBackground resizeMode='cover' source={require("../../../assets/images/customer/blue.png")} style={styles.pickView}>
                      <View style={{ padding: scaleHeight(20) }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Image resizeMode='center' style={styles.locImg} source={Constants.Images.customer.pickup} />
                          {
                            this.props.orderDetails.deliveryName == 'Hourly Services' ? <Text style={styles.pickTitle}>Start Location</Text> : <Text style={styles.pickTitle}>Pickup {index + 1}</Text>
                          }
                        </View>
                        <Text style={styles.addview}>{item.address}</Text>
                        <Text style={styles.person}>Incharge Person: </Text>
                        <View style={styles.buzView}>
                          <Text style={styles.buzNo}>Buzz No: </Text>
                          <Text style={styles.editText}>Edit</Text>
                        </View>
                      </View>
                    </ImageBackground>
                  }
                />
                <FlatList
                  data={this.state.dropLocation}
                  renderItem={({ item }) => <ImageBackground resizeMode='cover' source={require("../../../assets/images/customer/blue.png")} style={styles.dropView}>
                    <View style={{ padding: scaleHeight(20) }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Image resizeMode='center' style={styles.locImg} source={Constants.Images.customer.drop} />
                        {
                          this.props.orderDetails.deliveryName == 'Hourly Services' ? <Text style={[styles.pickTitle, { color: Constants.Colors.Orange }]}>End Location</Text> : <Text style={[styles.pickTitle, { color: Constants.Colors.Orange }]}>Drop-Off</Text>
                        }
                      </View>
                      <Text style={styles.addview}>{item.address}</Text>
                      <Text style={styles.person}>Incharge Person: </Text>
                      <View style={styles.buzView}>
                        <Text style={styles.buzNo}>Buzz No: </Text>
                        <Text style={styles.editText}>Edit</Text>
                      </View>
                    </View>
                  </ImageBackground>}
                />
              </ScrollView>
              : this.state.servicesFlag == 1 ?
                /********** DRAFT SERVICE ******/
                <ScrollView style={[styles.container, { backgroundColor: Constants.Colors.LightBlue }]}>
                  <FlatList
                    data={this.state.pickUpp}
                    renderItem={({ item, index }) =>
                      <ImageBackground resizeMode='cover' source={require("../../../assets/images/customer/blue.png")} style={styles.serviceView}>
                        <View style={{ padding: scaleHeight(20) }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Image resizeMode='center' style={styles.locImg} source={Constants.Images.customer.pickup} />
                            {
                              this.props.orderDetails.deliveryName == 'Hourly Services' ? <Text style={styles.pickTitle}>Start Location</Text> : <Text style={styles.pickTitle}>Pickup {index + 1}</Text>
                            }
                          </View>
                          <Text style={styles.addview}>{item.address}</Text>
                          <View style={styles.serveView}>
                            {
                              this.state.WhiteGlove ?
                                <View style={styles.joinText}>
                                  <Image style={styles.imgSize} source={Constants.Images.customer.white_glove} />
                                  <Text style={styles.servText}>White Glove</Text>
                                </View> : null
                            }
                            {
                              this.state.ExtraHelper ?
                                <View style={styles.joinText}>
                                  <Image style={styles.imgSize} source={Constants.Images.customer.extra_helper} />
                                  <Text style={styles.servText}>Extra Helper</Text>
                                </View> : null
                            }
                          </View>
                          <View style={[styles.serveView, { marginTop: scaleWidth(12) }]}>
                            {
                              this.state.Residence ?
                                <View style={styles.joinText}>
                                  <Image style={styles.imgSize} source={Constants.Images.customer.residential} />
                                  <Text style={styles.servText}>Residential</Text>
                                </View> : null
                            }
                            {
                              this.state.TailGate ?
                                <View style={styles.joinText}>
                                  <Image style={styles.imgSize} source={Constants.Images.customer.tailgate} />
                                  <Text style={styles.servText}>Tailgate</Text>
                                </View> : null
                            }
                          </View>
                          <View>
                            {
                              this.state.noSelection ?
                                <Text style={styles.noService}>No Service is Selected</Text>
                                : null
                            }
                          </View>
                        </View>
                      </ImageBackground>
                    }
                  />
                  <View style={{ marginBottom: scaleHeight(30), color: 'transparent' }} />
                </ScrollView>
                : this.state.productFlag == 1 ?
                  /********** DRAFT PRODUCT ******/
                  <ScrollView style={[styles.container, { backgroundColor: Constants.Colors.LightBlue }]}>
                    <FlatList
                      data={this.state.pickUpp}
                      renderItem={({ item, index }) =>
                        <ImageBackground resizeMode='cover' source={require("../../../assets/images/customer/blue.png")} style={styles.productView}>
                          <View style={{ padding: scaleHeight(20) }}>
                            <View style={{ flexDirection: 'row' }}>
                              <Image resizeMode='center' style={styles.locImg} source={Constants.Images.customer.pickup} />
                              {
                                this.props.orderDetails.deliveryName == 'Hourly Services' ? <Text style={styles.pickTitle}>Start Location</Text> : <Text style={styles.pickTitle}>Pickup {index + 1}</Text>
                              }
                            </View>
                            <Text style={styles.addview}>{item.address}</Text>

                            {
                              this.state.productArray.length == 0 ? <Text style={styles.noService}>No Product is Available</Text> : <FlatList
                                data={this.state.productArray}
                                renderItem={({ item }) =>
                                  <View style={styles.imgList}>
                                    <Image style={styles.imgSize1} source={{ uri: CustomerConnection.mediaURL() + item.imagePath }} />
                                    <View style={{ marginLeft: scaleWidth(5) }}>
                                      <Text style={{ fontSize: normalizeFont(18), color: Constants.Colors.White }}>{item.name}</Text>
                                      <Text style={{ fontSize: normalizeFont(14), marginTop: scaleHeight(6), color: Constants.Colors.LightGray }}>{item.description}</Text>
                                    </View>
                                    <Text style={{ fontSize: normalizeFont(18), color: Constants.Colors.White }}>{item.unit}</Text>
                                  </View>
                                }
                              />

                            }
                          </View>
                          {
                            this.state.productArray.length != 0 ? <View
                              style={{
                                borderBottomColor: Constants.Colors.LightGray,
                                borderBottomWidth: scaleWidth(2),
                              }}
                            /> : null
                          }
                        </ImageBackground>
                      }
                    />
                    <View style={{ marginBottom: scaleHeight(30), color: 'transparent' }} />
                  </ScrollView>
                  : null
        }
      </View >
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
  ButtonStyle: {
    borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 15,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
    marginBottom: 10,
    marginTop: 10,//10,
    marginLeft: 0,//10,
    marginRight: 0,//10,
    borderRadius: 5,
    backgroundColor: Constants.Colors.White,
    borderColor: Constants.Colors.White,
  },
  ButtonTextStyle: {
    fontSize: Constants.CustomerFonts.semibold.fontSize,
    //fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: '#53C8E5',
  },
  // verticalLine: {
  //   width: 2,
  //   backgroundColor: '#D7D7D7',
  //   marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
  // },
  textStyle: {
    fontSize: normalizeFont(16),
    //fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.DarkGrey,
    textAlign: 'center',
  },
  viewShadow: {
    borderBottomWidth: 5,
    backgroundColor: '#d9d9d9',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  imgSize: {
    width: scaleWidth(12),
    height: scaleWidth(12),
  },
  noService: {
    color: Constants.Colors.LightGray, fontFamily: Constants.CustomerFonts.semibold.fontFamily, textAlign: 'center', marginTop: scaleHeight(10)
  },
  imgSize1: {
    width: 50,
    height: 50,
  },
  picSize: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 16,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 9,
  },
  HeaderTextStyle: {
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: '#081933',
  },
  orderTextStyle: {
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.White,
  },
  infoimgSize: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    marginLeft: scaleWidth(3),
    marginRight: scaleHeight(3),
    marginTop: scaleHeight(-6)
  },
  ButtonStyle: {
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 20,
    borderRadius: 30,
    backgroundColor: Constants.Colors.LightBlue,
    borderColor: Constants.Colors.LightBlue,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    //opacity: 0.87,
  },
  ButtonTextStyle: {
    fontSize: Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.White,
  },
  colorChange: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 22, justifyContent: 'center', alignItems: 'center'
  },
  colIndexViewWhite: {
    backgroundColor: Constants.Colors.White,
  },
  colIndexViewBlack: {
    backgroundColor: Constants.Colors.DarkBlue,
    height: scaleHeight(70),
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
    width: scaleWidth(100)

  },
  colIndexLabelWhite: {
    fontSize: Constants.CustomerFonts.TopHeader.fontSize,
    fontFamily: Constants.CustomerFonts.TopHeader.fontFamily,
    color: "#4C4C4C",
    textAlign: "center",
  },
  colIndexLabelBlack: {
    fontSize: Constants.CustomerFonts.TopHeader.fontSize,
    fontFamily: Constants.CustomerFonts.TopHeader.fontFamily,
    color: Constants.Colors.White,
    textAlign: "center",
  },
  locImg: {
    height: scaleHeight(14),
    width: scaleWidth(10),
    marginBottom: scaleHeight(5),
    marginRight: scaleWidth(5)
  },
  pickTitle: {
    color: Constants.Colors.White, marginBottom: scaleHeight(5), marginLeft: scaleWidth(5)
  },
  addview: {
    color: Constants.Colors.LightGray, marginBottom: scaleHeight(5), marginLeft: scaleWidth(20)
  },
  person: {
    color: Constants.Colors.White, marginBottom: scaleHeight(5), marginLeft: scaleWidth(20)
  },
  buzView: {
    flexDirection: 'row', justifyContent: 'space-between', marginLeft: scaleWidth(20)
  },
  buzNo: {
    color: Constants.Colors.White
  },
  editText: {
    color: Constants.Colors.SkyBlue, textDecorationLine: 'underline', fontSize: normalizeFont(14),
  },
  dropView: {
    marginTop: scaleHeight(20), marginBottom: scaleHeight(30)
  },
  pickView: {
    marginTop: scaleHeight(20)
  },
  serviceView: {
    marginTop: scaleHeight(20)
  },
  serveView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: scaleHeight(20)
  },
  joinText: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  servText: {
    color: Constants.Colors.White,
    marginLeft: scaleWidth(8)
  },
  productView: {
    marginTop: scaleHeight(20)

  },
  imgList: {
    flexDirection: 'row',
    justifyContent: 'center'

  }
});
const mapStateToProps = state => ({
  modalstate: state.ModalHandleReducer,
  deviceToken: state.user.deviceToken,
  // draftsInfo: state.user.draftsData,
  orderDetails: state.user.orderDetails,
  locationData: state.location

});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders_Pending);
