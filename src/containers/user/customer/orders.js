/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  animating,
  ActivityIndicator,
  ImageBackground,
  Modal
} from 'react-native';

import { Container, Tab, Tabs, ScrollableTab, Content, List, Left, Right, Text, Card, CardItem } from 'native-base'
import Constants from "../../../constants";
import HeaderBackground from '../../../components/customer/HeaderBackground';
import * as UserActions from '../../../redux/modules/user';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation'
import { bindActionCreators } from "redux";
import RestClient from '../../../utilities/RestClient';
import moment from 'moment';
import { scaleHeight, scaleWidth, normalizeFont } from '../../../constants/responsive';
// import { startLoading, stopLoading, showToast, hideToast } from '../../../redux/modules/app';
//import { startLoading, stopLoading } from '../../../redux/modules/app';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

class CustomerOrders extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
  constructor(props) {
    super(props);
    this.state = {
      pendData: [],
      order_id: '',
      time: '',
      expireTime: '',
      date: '',
      maxTime: '',
      minTime: '',
      totalCharge: '',
      pendingArray: [],
      scheduledDate: [],
      ongInfo: [],
      delivInfo: [],
      cancArray: [],
      draft: [],
      animating: false,
    }

    console.log(this.props.user)

  }

  componentDidMount() {
    this.pendingList()
  }

  pendingList() {
    this.setState({ animating: true })
    AsyncStorage.getItem("id").then((value) => {
      RestClient.get_New('myorders/my-orders/', {
        status: 'Available',
        max: 6217708099,
        min: 0,
        page: 1,
        count: 30,
        datemin: 0,
        datemax: 1538223074000220000011,
        customerId: value,
      }, '').then((result) => {
        if (result.status == 1) {
          this.setState({ animating: false })
          let pendingarr = []
          for (var i = 0; i < result.data.length; i++) {
            var obj = result.data[i];
            let new_min = moment.utc(obj.minTime).format('HH:mm A');
            let new_max = moment.utc(obj.maxTime).format('HH:mm A');
            let new_date = moment.utc(obj.updatedAt, "YYYY-MM-DDTHH:mm:ss Z").format('DD/MM/YYYY');
            let objj = {
              order_id: obj.orderId,
              time: obj.time,
              expireTime: obj.orderPassingTime,
              date: new_date,
              maxTime: new_max,
              minTime: new_min,
              totalCharge: obj.totalCharge,
              _id: obj._id

            }
            pendingarr.push(objj)
          }
          this.setState({
            pendData: pendingarr
          })
        }
        else {
          this.setState({ animating: false })
        }
      }).catch(error => {
        this.setState({ animating: false })
        console.log("error=> ", error)
      });
    })
  }

  pendingDetail(item) {
    this.props.navigation.navigate('Orders_Pending', { detail_id: item._id })
  }

  scheduleList() {
    this.setState({ animating: true })
    AsyncStorage.getItem("id").then((value) => {
      RestClient.get_New('myorders/my-orders/', {
        status: 'Schedule',
        max: 6217708099,
        min: 0,
        page: 1,
        count: 30,
        datemin: 0,
        datemax: 1538223074000220000011,
        customerId: value,
      }, '').then((result) => {
        if (result.status == 1) {
          this.setState({ animating: false })
          let scheInfo = []
          for (i = 0; i < result.data.length; i++) {
            var scheData = result.data[i]
            let new_min = moment.utc(scheData.minTime).format('HH:mm A');
            let new_max = moment.utc(scheData.maxTime).format('HH:mm A');
            let new_date = moment.utc(scheData.updatedAt, "YYYY-MM-DDTHH:mm:ss Z").format('DD/MM/YYYY');
            let obj = {
              order_id: scheData.orderId,
              time: scheData.time,
              expireTime: scheData.orderPassingTime,
              date: new_date,
              maxTime: new_max,
              minTime: new_min,
              totalCharge: scheData.totalCharge,
              _id: scheData._id
            }
            scheInfo.push(obj)
          }
          this.setState({
            scheduledDate: scheInfo
          })
        }
        else {
          this.setState({ animating: false })
        }
      }).catch(error => {
        this.setState({ animating: false })
        console.log("error=> ", error)
      });
    })
  }

  scheDetail(item) {
    this.props.navigation.navigate("Orders_Scheduled", { detail_id: item._id })
  }

  onGoingList() {
    AsyncStorage.getItem("id").then((value) => {
      this.setState({ animating: true })
      RestClient.get_New('myorders/my-orders/', {
        status: 'Ongoing',
        max: 6217708099,
        min: 0,
        page: 1,
        count: 30,
        datemin: 0,
        datemax: 1538223074000220000011,
        customerId: value,
      }, '').then((result) => {
        console.log('ongoing list+++++', result);

        if (result.status == 1) {
          this.setState({ animating: false })
          let ongData = []
          for (i = 0; i < result.data.length; i++) {
            var ong = result.data[i]
            let new_min = moment.utc(ong.minTime).format('HH:mm A');
            let new_max = moment.utc(ong.maxTime).format('HH:mm A');
            let new_date = moment.utc(ong.updatedAt, "YYYY-MM-DDTHH:mm:ss Z").format('DD/MM/YYYY');

            let obj = {
              order_id: ong.orderId,
              time: ong.time,
              expireTime: ong.orderPassingTime,
              date: new_date,
              maxTime: new_max,
              minTime: new_min,
              totalCharge: ong.totalCharge,
              _id: ong._id
            }
            ongData.push(obj)
          }
          this.setState({
            ongInfo: ongData
          })
        }
        else {
          this.setState({ animating: false })
        }
      }).catch(error => {
        this.setState({ animating: false })
        console.log("error=> ", error)
      });
    })
  }

  ongoingDetails(item) {
    this.props.navigation.navigate("Orders_OnGoing", { detail_id: item._id })
  }

  deliverList() {
    this.setState({ animating: true })
    AsyncStorage.getItem("id").then((value) => {
      RestClient.get_New('myorders/my-orders/', {
        status: 'Delivered',
        max: 6217708099,
        min: 0,
        page: 1,
        count: 30,
        datemin: 0,
        datemax: 1538223074000220000011,
        customerId: value,
      }, '').then((result) => {
        console.log('delivered list+++++', result);
        if (result.status == 1) {
          this.setState({ animating: false })
          let delyArr = []
          for (i = 0; i < result.data.length; i++) {
            var deliv = result.data[i];
            let new_min = moment.utc(deliv.minTime).format('HH:mm A');
            let new_max = moment.utc(deliv.maxTime).format('HH:mm A');
            let new_date = moment.utc(deliv.updatedAt, "YYYY-MM-DDTHH:mm:ss Z").format('DD/MM/YYYY');
            console.log("val is ---------", deliv)
            let obj = {
              order_id: deliv.orderId,
              time: deliv.time,
              expireTime: deliv.orderPassingTime,
              date: new_date,
              maxTime: new_max,
              minTime: new_min,
              totalCharge: deliv.totalCharge,
              _id: deliv._id

            }
            delyArr.push(obj)

          }
          this.setState({
            delivInfo: delyArr
          })
        }
        else {
          this.setState({ animating: false })
        }
      }).catch(error => {
        this.setState({ animating: false })
        console.log("error=> ", error)
      });
    })
  }

  delivered_details(item) {
    console.log("_id++", item)
    this.props.navigation.navigate('Orders_Delivered', { detail_id: item._id })
  }

  cancelList() {
    this.setState({ animating: true })
    AsyncStorage.getItem("id").then((value) => {
      RestClient.get_New('myorders/my-orders/', {
        status: 'Failed',
        max: 6217708099,
        min: 0,
        page: 1,
        count: 30,
        datemin: 0,
        datemax: 1538223074000220000011,
        customerId: value,
      }, '').then((result) => {
        if (result.status == 1) {
          this.setState({ animating: false })
          let cancelled = [];
          for (i = 0; i < result.data.length; i++) {
            var canInfo = result.data[i];
            let new_min = moment.utc(canInfo.minTime).format('HH:mm A');
            let new_max = moment.utc(canInfo.maxTime).format('HH:mm A');
            let new_date = moment.utc(canInfo.updatedAt, "YYYY-MM-DDTHH:mm:ss Z").format('DD/MM/YYYY');
            let obj = {
              order_id: canInfo.orderId,
              time: canInfo.time,
              expireTime: canInfo.orderPassingTime,
              date: new_date,
              maxTime: new_max,
              minTime: new_min,
              totalCharge: canInfo.totalCharge,
              _id: canInfo._id
            }
            cancelled.push(obj);
          }
          this.setState({
            cancArray: cancelled
          })
        }
        else {
          this.setState({ animating: false })
        }
      }).catch(error => {
        this.setState({ animating: false })
      });
    })
  }

  cancelDetail(item) {
    this.props.navigation.navigate('Orders_Canceled', { detail_id: item._id })
  }

  draftList() {
    this.setState({ animating: true })
    AsyncStorage.getItem("id").then((value) => {
      RestClient.get_New('place-order/draft-order', { customerId: value }, '').then((result) => {
        console.log("draft check++++", result)
        if (result.status == 1) {
          this.setState({ animating: false })
          let draftarr = []
          for (var i = 0; i < result.data.length; i++) {
            var obj = result.data[i];
            let new_min = moment.utc(obj.minTime).format('HH:mm A');
            let new_max = moment.utc(obj.maxTime).format('HH:mm A');
            let new_date = moment.utc(obj.updatedAt, "YYYY-MM-DDTHH:mm:ss Z").format('DD/MM/YYYY');
            let objj = {
              order_id: obj.orderId,
              time: obj.time,
              expireTime: obj.orderPassingTime,
              date: new_date,
              maxTime: new_max,
              minTime: new_min,
              totalCharge: obj.totalCharge,
              id: obj._id
            }
            draftarr.push(objj)
          }
          this.setState({
            draft: draftarr
          })

        }
        else {
          this.setState({ animating: false })
        }
      }).catch(error => {
        this.setState({ animating: false })
        console.log("error=> ", error)
      });
    })
  }

  draft_details(item) {
    console.log("_id++", item)
    this.props.navigation.navigate('Orders_Drafts', { detail_id: item.id })
  }

  tabIndex(i) {
    if (i == 0) {
      this.pendingList()
    }
    if (i == 1) {
      this.scheduleList()
    }
    if (i == 2) {
      this.onGoingList()
    } if (i == 3) {
      this.deliverList()
    } if (i == 4) {
      this.cancelList()
    } if (i == 5) {
      this.draftList()
    }
  }
  render() {
    return (
      <Container>
        <HeaderBackground></HeaderBackground>
        {/* Loader Start */}
        <Modal
          transparent={true}
          onRequestClose={() => null}
          visible={this.state.animating}>
          <View style={styles.transaparentView}>
            <ActivityIndicator size="large" color={Constants.Colors.White} />
          </View>
        </Modal>

        {/* Loader End */}
        <Tabs onChangeTab={({ i, ref, from }) => this.tabIndex(i)} renderTabBar={() => <ScrollableTab />} tabBarUnderlineStyle={{ borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: 'transparent' }}>
          <Tab heading="PENDING" tabStyle={{ backgroundColor: '#fff', borderWidth: .2, borderColor: Constants.Colors.DarkBlue, borderStyle: 'solid' }} textStyle={{ color: Constants.Colors.DarkGrey, fontFamily: Constants.CustomerFonts.bold.fontFamily, fontSize: Constants.CustomerFonts.bold.fontSize }} activeTabStyle={{ backgroundColor: Constants.Colors.DarkBlue, borderWidth: .2, borderColor: Constants.Colors.DarkBlue, borderStyle: 'solid' }} activeTextStyle={{ color: '#fff', fontFamily: Constants.CustomerFonts.bold.fontFamily, fontSize: Constants.CustomerFonts.bold.fontSize }} >
            {/* PENDING LIST START*/}
            <Container style={{ backgroundColor: Constants.Colors.LightBlue }}>
              <Content>
                <View style={styles.rowContainer}>
                  <View style={styles.searchContainer}>
                    <TextInput autoFocus={false} style={styles.txtInputSearch} underlineColorAndroid="transparent" />
                    <Image source={Constants.Images.customer.search} style={styles.searchContentIcon} resizeMode={'contain'} />
                  </View>
                  <View style={styles.rectViewIcon}>
                    <Image source={Constants.Images.customer.filter} style={[styles.filterIcon]} resizeMode={'center'} />
                  </View>
                  <View style={styles.rectViewPlus}>
                    <Text style={styles.plusIcon}>+</Text>
                  </View>
                </View>

                <List>
                  <FlatList
                    data={this.state.pendData}
                    renderItem={({ item }) =>
                      <TouchableOpacity activeOpacity={0.5} onPress={() => this.pendingDetail(item)}>
                        <ImageBackground resizeMode={'cover'} source={require("../../../assets/images/customer/blue.png")} style={styles.cardContainer}>
                          <View style={styles.textContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Text style={styles.minCSS}>{item.expireTime}</Text>
                              <Text style={styles.orderCSS}>Order ID #{item.order_id}</Text>
                            </View>
                            <Text style={styles.dateText}>Delivery Date: <Text style={styles.dateCSS}>{item.date}</Text></Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Text style={styles.timeFrameText}>Time-frame: <Text style={styles.timeFrameCSS}>{item.minTime} - {item.maxTime}</Text></Text>
                              <Text style={styles.dollarCSS}>${item.totalCharge}</Text>
                            </View>
                          </View>
                        </ImageBackground>

                        {/* <Card style={{ backgroundColor: "transpredarent" }}>
                          <CardItem>
                            <Left><Text style={{ color: '#53C8E5' }}>{item.expireTime} </Text></Left>
                            <Right><Text style={{ color: '#2662B1' }}>Order ID #{item.order_id}</Text></Right>
                          </CardItem>
                          <CardItem><Text style={{ color: '#A0A0A0', marginBottom: 0 }}>Delivery Date: {item.date}</Text></CardItem>
                          <CardItem cardBody>
                            <Left>
                              <Text style={styles.timeCss}>Time-frame: {item.minTime} - {item.maxTime}</Text>
                            </Left>
                            <Right>
                              <Text style={{ color: '#C9C9C9', marginRight: 14, marginBottom: 12 }}>${item.totalCharge}</Text>
                            </Right>
                          </CardItem>
                          </Card> */}

                      </TouchableOpacity>

                    }
                  />
                </List>
              </Content>
            </Container>
            {/* PENDING LIST END*/}
          </Tab>
          <Tab heading="SCHEDULED" tabStyle={{ backgroundColor: '#fff', borderWidth: .2, borderColor: Constants.Colors.DarkBlue, borderStyle: 'solid' }} textStyle={{ color: Constants.Colors.DarkGrey, fontFamily: Constants.CustomerFonts.bold.fontFamily, fontSize: Constants.CustomerFonts.bold.fontSize }} activeTabStyle={{ backgroundColor: Constants.Colors.DarkBlue, borderWidth: .2, borderColor: Constants.Colors.DarkBlue, borderStyle: 'solid' }} activeTextStyle={{ color: '#fff', fontFamily: Constants.CustomerFonts.bold.fontFamily, fontSize: Constants.CustomerFonts.bold.fontSize }} >
            {/* SHEDULED LIST START */}
            <Container style={{ backgroundColor: Constants.Colors.LightBlue }}>
              <Content>
                <View style={styles.rowContainer}>
                  <View style={styles.searchContainer}>
                    <TextInput autoFocus={false} style={styles.txtInputSearch} underlineColorAndroid="transparent" />
                    <Image source={Constants.Images.customer.search} style={styles.searchContentIcon} resizeMode={'contain'} />
                  </View>
                  <View style={styles.rectViewIcon}>
                    <Image source={Constants.Images.customer.filter} style={[styles.filterIcon]} resizeMode={'center'} />
                  </View>
                  <View style={styles.rectViewPlus}>
                    <Text style={styles.plusIcon}>+</Text>
                  </View>
                </View>
                <List>
                  <FlatList
                    data={this.state.scheduledDate}
                    renderItem={({ item }) =>
                      <TouchableOpacity activeOpacity={0.5} onPress={() => this.scheDetail(item)}>
                        <ImageBackground resizeMode={'cover'} source={require("../../../assets/images/customer/blue.png")} style={styles.cardContainer}>
                          <View style={styles.textContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Text style={styles.minCSS}>{item.expireTime}</Text>
                              <Text style={styles.orderCSS}>Order ID #{item.order_id}</Text>
                            </View>
                            <Text style={styles.dateText}>Delivery Date: <Text style={styles.dateCSS}>{item.date}</Text></Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Text style={styles.timeFrameText}>Time-frame: <Text style={styles.timeFrameCSS}>{item.minTime} - {item.maxTime}</Text></Text>
                              <Text style={styles.dollarCSS}>${item.totalCharge}</Text>
                            </View>
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                    }
                  />
                </List>
              </Content>
            </Container>
            {/* SHEDULED LIST END */}
          </Tab>
          <Tab heading="ONGOING" tabStyle={{ backgroundColor: '#fff', borderWidth: .2, borderColor: Constants.Colors.DarkBlue, borderStyle: 'solid' }} textStyle={{ color: Constants.Colors.DarkGrey, fontFamily: Constants.CustomerFonts.bold.fontFamily, fontSize: Constants.CustomerFonts.bold.fontSize }} activeTabStyle={{ backgroundColor: Constants.Colors.DarkBlue, borderWidth: .2, borderColor: Constants.Colors.DarkBlue, borderStyle: 'solid' }} activeTextStyle={{ color: '#fff', fontFamily: Constants.CustomerFonts.bold.fontFamily, fontSize: Constants.CustomerFonts.bold.fontSize }} >
            {/* ONGOING LIST START */}
            <Container style={{ backgroundColor: Constants.Colors.LightBlue }}>
              <Content>
                <View style={styles.rowContainer}>
                  <View style={styles.searchContainer}>
                    <TextInput autoFocus={false} style={styles.txtInputSearch} underlineColorAndroid="transparent" />
                    <Image source={Constants.Images.customer.search} style={styles.searchContentIcon} resizeMode={'contain'} />
                  </View>
                  <View style={styles.rectViewIcon}>
                    <Image source={Constants.Images.customer.filter} style={[styles.filterIcon]} resizeMode={'center'} />
                  </View>
                  <View style={styles.rectViewPlus}>
                    <Text style={styles.plusIcon}>+</Text>
                  </View>
                </View>

                <List>
                  <FlatList
                    data={this.state.ongInfo}
                    renderItem={({ item }) =>
                      <TouchableOpacity activeOpacity={0.5} onPress={() => this.ongoingDetails(item)}>
                        <ImageBackground resizeMode={'cover'} source={require("../../../assets/images/customer/blue.png")} style={styles.cardContainer}>
                          <View style={styles.textContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Text style={styles.minCSS}>{item.expireTime}</Text>
                              <Text style={styles.orderCSS}>Order ID #{item.order_id}</Text>
                            </View>
                            <Text style={styles.dateText}>Delivery Date: <Text style={styles.dateCSS}>{item.date}</Text></Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Text style={styles.timeFrameText}>Time-frame: <Text style={styles.timeFrameCSS}>{item.minTime} - {item.maxTime}</Text></Text>
                              <Text style={styles.dollarCSS}>${item.totalCharge}</Text>
                            </View>
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                    }
                  />
                </List>
              </Content>
            </Container>
            {/* ONGOING LIST END */}

          </Tab>
          <Tab heading="DELIVERED" tabStyle={{ backgroundColor: '#fff', borderWidth: .2, borderColor: Constants.Colors.DarkBlue, borderStyle: 'solid' }} textStyle={{ color: Constants.Colors.DarkGrey, fontFamily: Constants.CustomerFonts.bold.fontFamily, fontSize: Constants.CustomerFonts.bold.fontSize }} activeTabStyle={{ backgroundColor: Constants.Colors.DarkBlue, borderWidth: .2, borderColor: Constants.Colors.DarkBlue, borderStyle: 'solid' }} activeTextStyle={{ color: '#fff', fontFamily: Constants.CustomerFonts.bold.fontFamily, fontSize: Constants.CustomerFonts.bold.fontSize }} >

            {/* DELIVERED LIST START */}
            <Container style={{ backgroundColor: Constants.Colors.LightBlue }}>
              <Content>
                <View style={styles.rowContainer}>
                  <View style={styles.searchContainer}>
                    <TextInput autoFocus={false} style={styles.txtInputSearch} underlineColorAndroid="transparent" />
                    <Image source={Constants.Images.customer.search} style={styles.searchContentIcon} resizeMode={'contain'} />
                  </View>
                  <View style={styles.rectViewIcon}>
                    <Image source={Constants.Images.customer.filter} style={[styles.filterIcon]} resizeMode={'center'} />
                  </View>
                  <View style={styles.rectViewPlus}>
                    <Text style={styles.plusIcon}>+</Text>
                  </View>
                </View>
                <List>
                  <FlatList
                    data={this.state.delivInfo}
                    renderItem={({ item }) =>
                      <TouchableOpacity activeOpacity={0.5} onPress={() => this.delivered_details(item)}>
                        <ImageBackground resizeMode={'cover'} source={require("../../../assets/images/customer/blue.png")} style={styles.cardContainer}>
                          <View style={styles.textContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Text style={styles.minCSS}>{item.expireTime}</Text>
                              <Text style={styles.orderCSS}>Order ID #{item.order_id}</Text>
                            </View>
                            <Text style={styles.dateText}>Delivery Date: <Text style={styles.dateCSS}>{item.date}</Text></Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Text style={styles.timeFrameText}>Time-frame: <Text style={styles.timeFrameCSS}>{item.minTime} - {item.maxTime}</Text></Text>
                              <Text style={styles.dollarCSS}>${item.totalCharge}</Text>
                            </View>
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                    }
                  />
                </List>

              </Content>
            </Container>
            {/* DELIVERED LIST END */}
          </Tab>
          <Tab heading="CANCELLED" tabStyle={{ backgroundColor: '#fff', borderWidth: .2, borderColor: Constants.Colors.DarkBlue, borderStyle: 'solid' }} textStyle={{ color: Constants.Colors.DarkGrey, fontFamily: Constants.CustomerFonts.bold.fontFamily, fontSize: Constants.CustomerFonts.bold.fontSize }} activeTabStyle={{ backgroundColor: Constants.Colors.DarkBlue, borderWidth: .2, borderColor: Constants.Colors.DarkBlue, borderStyle: 'solid' }} activeTextStyle={{ color: '#fff', fontFamily: Constants.CustomerFonts.bold.fontFamily, fontSize: Constants.CustomerFonts.bold.fontSize }} >
            {/* CANCELLED LIST START */}
            <Container style={{ backgroundColor: Constants.Colors.LightBlue }}>
              <Content>
                <View style={styles.rowContainer}>
                  <View style={styles.searchContainer}>
                    <TextInput autoFocus={false} style={styles.txtInputSearch} underlineColorAndroid="transparent" />
                    <Image source={Constants.Images.customer.search} style={styles.searchContentIcon} resizeMode={'contain'} />
                  </View>
                  <View style={styles.rectViewIcon}>
                    <Image source={Constants.Images.customer.filter} style={[styles.filterIcon]} resizeMode={'center'} />
                  </View>
                  <View style={styles.rectViewPlus}>
                    <Text style={styles.plusIcon}>+</Text>
                  </View>
                </View>

                <List>
                  <FlatList
                    data={this.state.cancArray}
                    renderItem={({ item }) =>
                      <TouchableOpacity activeOpacity={0.5} onPress={() => this.cancelDetail(item)}>
                        <ImageBackground resizeMode={'cover'} source={require("../../../assets/images/customer/blue.png")} style={styles.cardContainer}>
                          <View style={styles.textContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Text style={styles.minCSS}>{item.expireTime}</Text>
                              <Text style={styles.orderCSS}>Order ID #{item.order_id}</Text>
                            </View>
                            <Text style={styles.dateText}>Delivery Date: <Text style={styles.dateCSS}>{item.date}</Text></Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Text style={styles.timeFrameText}>Time-frame: <Text style={styles.timeFrameCSS}>{item.minTime} - {item.maxTime}</Text></Text>
                              <Text style={styles.dollarCSS}>${item.totalCharge}</Text>
                            </View>
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                    }
                  />
                </List>

              </Content>
            </Container>
            {/* CANCELLED LIST END */}
          </Tab>
          <Tab heading="DRAFTS" tabStyle={{ backgroundColor: '#fff', borderWidth: .2, borderColor: Constants.Colors.DarkBlue, borderStyle: 'solid' }} textStyle={{ color: Constants.Colors.DarkGrey, fontFamily: Constants.CustomerFonts.bold.fontFamily, fontSize: Constants.CustomerFonts.bold.fontSize }} activeTabStyle={{ backgroundColor: Constants.Colors.DarkBlue, borderWidth: .2, borderColor: Constants.Colors.DarkBlue, borderStyle: 'solid' }} activeTextStyle={{ color: '#fff', fontFamily: Constants.CustomerFonts.bold.fontFamily, fontSize: Constants.CustomerFonts.bold.fontSize }} >
            {/* DRAFTS LIST START */}
            <Container style={{ backgroundColor: Constants.Colors.LightBlue }}>
              <Content>
                <View style={styles.rowContainer}>
                  <View style={styles.searchContainer}>
                    <TextInput autoFocus={false} style={styles.txtInputSearch} underlineColorAndroid="transparent" />
                    <Image source={Constants.Images.customer.search} style={styles.searchContentIcon} resizeMode={'contain'} />
                  </View>
                  <View style={styles.rectViewIcon}>
                    <Image source={Constants.Images.customer.filter} style={[styles.filterIcon]} resizeMode={'center'} />
                  </View>
                  <View style={styles.rectViewPlus}>
                    <Text style={styles.plusIcon}>+</Text>
                  </View>
                </View>
                <List>
                  <FlatList
                    data={this.state.draft}
                    renderItem={({ item }) =>
                      <TouchableOpacity activeOpacity={0.5} onPress={() => this.draft_details(item)}>
                        <ImageBackground resizeMode={'cover'} source={require("../../../assets/images/customer/blue.png")} style={styles.cardContainer}>
                          <View style={styles.textContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Text style={styles.minCSS}>{item.expireTime}</Text>
                              <Text style={styles.orderCSS}>Order ID #{item.order_id}</Text>
                            </View>
                            <Text style={styles.dateText}>Delivery Date: <Text style={styles.dateCSS}>{item.date}</Text></Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Text style={styles.timeFrameText}>Time-frame: <Text style={styles.timeFrameCSS}>{item.minTime} - {item.maxTime}</Text></Text>
                              <Text style={styles.dollarCSS}>${item.totalCharge}</Text>
                            </View>
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                    }
                  />
                </List>
              </Content>
            </Container >
            {/* DRAFTS LIST END */}
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  modalstate: state.ModalHandleReducer,
  deviceToken: state.user.deviceToken,
  ScheduleInfo: state.user.scheduleData,
  draftsInfo: state.user.draftsData,
  user:state.user
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    flexDirection: 'row',
    width: scaleWidth(245),
    borderRadius: scaleWidth(3),
    marginLeft: scaleWidth(15),
    marginTop: scaleHeight(15),
    marginBottom: scaleHeight(10)
  },
  timeCss: {
    color: '#A0A0A0', fontSize: 13,
    marginTop: 0,
    marginLeft: 14,
    marginBottom: 12,
    width: '110%'
  },
  searchContentIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    marginLeft: scaleWidth(220),
    position: 'absolute',
    marginTop: scaleHeight(5),
    marginBottom: scaleHeight(0)
  },
  filterIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    marginTop: scaleHeight(5),
    marginLeft: scaleHeight(12)
  },
  addIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6,
    marginLeft: scaleWidth(10),
    marginTop: scaleHeight(15)
  },
  txtInputSearch: {
    backgroundColor: '#fff',
    color: '#5D5D5D',
    fontSize: Constants.CustomerFonts.small.fontSize,
    marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2,
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 4,
  },
  ordercontainer: {
    flexDirection: 'row',
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
  },
  NewOrderStyle: {
    fontSize: Constants.CustomerFonts.normal.fontSize,
    //fontFamily: Constants.CustomerFonts.BigSize.fontFamily,
    color: '#53C8E5',
    textDecorationLine: 'underline',
    marginTop: 10,
    marginBottom: 10
  },
  rectViewIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    width: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    backgroundColor: Constants.Colors.White,
    marginTop: scaleHeight(15),
    marginLeft: scaleWidth(10),
    borderRadius: scaleWidth(3),

  },
  rectViewPlus: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    width: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    backgroundColor: Constants.Colors.Orange,
    marginTop: scaleHeight(15),
    marginLeft: scaleWidth(10),
    borderRadius: scaleWidth(3),

  },
  plusIcon: {
    fontSize: normalizeFont(30),
    fontWeight: '600',
    color: Constants.Colors.White,
    textAlign: 'center',
    marginBottom: scaleHeight(5)
  },
  rowContainer: {
    flex: 1, flexDirection: 'row', justifyContent: 'flex-start', marginBottom: scaleHeight(10)
  },
  cardContainer: {
    // backgroundColor: Constants.Colors.Orange,
    height: scaleHeight(115),
    width: '100%',
    //padding: scaleHeight(15),
    marginBottom: scaleHeight(10),
    marginTop: scaleHeight(5)
  },
  textContainer: {
    padding: scaleHeight(15),
  },
  minCSS: {
    color: Constants.Colors.SkyBlue,
    fontSize: normalizeFont(16),
    fontWeight: '400',
    marginBottom: scaleHeight(10)
  },
  orderCSS: {
    color: Constants.Colors.White,
    fontSize: normalizeFont(16),
    fontWeight: '400',
    marginLeft: scaleWidth(140),
    marginBottom: scaleHeight(10)

  },
  dateText: {
    color: Constants.Colors.LightGray,
    fontSize: normalizeFont(16),
    fontWeight: '400',
    marginBottom: scaleHeight(8)

  },
  dateCSS: {
    color: Constants.Colors.White,
    fontSize: normalizeFont(16),
    fontWeight: '400',
    marginBottom: scaleHeight(8)

  },
  timeFrameText: {
    color: Constants.Colors.LightGray,
    fontSize: normalizeFont(16),
    fontWeight: '400',
    marginBottom: scaleHeight(8)

  },
  timeFrameCSS: {
    color: Constants.Colors.White,
    fontSize: normalizeFont(16),
    fontWeight: '400',
    marginBottom: scaleHeight(8)

  },
  dollarCSS: {
    color: Constants.Colors.Orange,
    fontSize: normalizeFont(18),
    fontWeight: '600',
    textAlign: 'right',
    //marginLeft: scaleWidth(50),
    marginBottom: scaleHeight(8)
  },
  transaparentView: { flex: 1, backgroundColor: "rgba(0,0,0,0.2)", alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CustomerOrders));