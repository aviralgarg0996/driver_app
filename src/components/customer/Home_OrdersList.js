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
  FlatList,
  ImageBackground,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Constants from "../../constants";
import RestClient from '../../utilities/RestClient';
import moment from 'moment';


export default class Home_OrdersList extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      next: 1,
      prev: 0,
      OrdersList: [],
      // OrdersList : [{id:0,orderNo:'#9786',status:'ONGOING',amount:'$250',time:'3:50 PM',statusFlag:1,date:'Jun 28, 2018'},
      //              {id:1,orderNo:'#9787',status:'DELIVERED',amount:'$250',time:'3:50 PM',statusFlag:2,date:'Jun 28, 2018'},
      //              {id:2,orderNo:'#9734',status:'DELIVERED',amount:'$200',time:'3:00 PM',statusFlag:2,date:'Jun 28, 2018'},
      //              {id:3,orderNo:'#9722',status:'DELIVERED',amount:'$350',time:'1:10 PM',statusFlag:2,date:'Jun 28, 2018'},
      //              {id:4,orderNo:'#9767',status:'ONGOING',amount:'$150',time:'6:40 PM',statusFlag:1,date:'Jun 28, 2018'},
      //              {id:5,orderNo:'#9755',status:'ONGOING',amount:'$100',time:'2:00 PM',statusFlag:1,date:'Jun 28, 2018'},
      //              {id:6,orderNo:'#9784',status:'ONGOING',amount:'$150',time:'4:30 PM',statusFlag:1,date:'Jun 28, 2018'},
      //              {id:7,orderNo:'#9726',status:'ONGOING',amount:'$250',time:'3:30 PM',statusFlag:1,date:'Jun 28, 2018'},
      //             ],

    }
  }
  setStatusColor(value) {
    if (value == 'Pending')
      return [styles.itemStatus1, { marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }];
    else {
      return [styles.itemStatus2, { marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }];
    }
  }

  componentDidMount = () => {
    AsyncStorage.getItem("id").then((value) => {
      RestClient.get_New('myorders/my-orders/', {
        status: 'all',
        max: 6217708099,
        min: 0,
        page: 1,
        count: 30,
        datemin: 0,
        datemax: 1538223074000220000011,
        customerId: value,
      }, '').then((result) => {
        if (result.status == 1) {
          let orderArr = []
          for (var i = 0; i < result.data.length; i++) {
            var obj = result.data[i];
            let new_min = moment.utc(obj.minTime).format('HH:mm A');
            let new_max = moment.utc(obj.maxTime).format('HH:mm A');
            let new_date = moment.utc(obj.updatedAt, "YYYY-MM-DDTHH:mm:ss Z").format('DD/MM/YYYY');
            let objj = {
              order_id: obj.orderId,
              time: obj.time,
              orderStatus: obj.orderStatus == 'Available' ? 'Pending' : obj.orderStatus,
              expireTime: obj.orderPassingTime,
              date: new_date,
              maxTime: new_max,
              minTime: new_min,
              totalCharge: obj.totalCharge,
              _id: obj._id

            }
            orderArr.push(objj)
          }
          this.setState({
            OrdersList: orderArr
          })
        }
        else {

        }
      })
    })
  }

  navigateOrders = (item) => {
    // alert(JSON.stringify(item._id))
    // this.props.navigation.navigate('OrdersInfo', { detail_id: item._id })
  }


  DisplayOrdersList(item) {
    return (
      <View key={1} style={[styles.flexRow, { marginHorizontal: 10 }]}>
        <View style={styles.boxContainer}>
          <TouchableOpacity onPress={() => this.navigateOrders(item)}>
            <ImageBackground source={require("../../assets/images/customer/blue.png")} style={{ width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 35, padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4 }}>
              <View><Text style={styles.itemOrder}>#{item.order_id}</Text></View>
              <View><Text style={styles.itemTime}>{item.date}</Text></View>
              <View><Text style={styles.itemTime}>{item.minTime}</Text></View>
              <View><Text style={this.setStatusColor(item.orderStatus)}>{item.orderStatus.toUpperCase()}</Text></View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  Previous() {
    var index1 = this.state.prev;
    if (index1 > 0)
      index1--;
    this.setState({ prev: index1, next: index1 + 1 });
  }
  Next() {
    var index1 = this.state.next;
    if (index1 < this.state.OrdersList.length - 1)
      index1++;
    this.setState({ next: index1, prev: index1 - 1 });
  }

  render() {
    return (
      <View>
        <Text style={[styles.orderText]}>{' Recent Orders'}</Text>
        <View style={[styles.flexRow, { backgroundColor: Constants.Colors.BackgroundBlue, marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5, marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100, }]}>
          <FlatList data={this.state.OrdersList} renderItem={({ item }) => this.DisplayOrdersList(item)} horizontal={true} />

          {/* <TouchableOpacity onPress={() => this.Next()}>
            <Image source={Constants.Images.customer.next} style={[styles.arrowIconsNext,{flex : 0.2,marginTop: Constants.BaseStyle.DEVICE_WIDTH*8/100}]} resizeMode={'contain'}/>
            </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  boxContainer: {
    backgroundColor: Constants.Colors.DarkBlue,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 35
  },
  orderText: {
    color: Constants.Colors.WhiteUpd,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
    fontSize: Constants.CustomerFonts.BigSize.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
  },
  itemStatus1: {
    textAlign: 'center',
    color: Constants.Colors.Orange,
    flex: 0.7,
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
  },
  itemStatus2: {
    textAlign: 'center',
    color: Constants.Colors.LightBlue,
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
    flex: 0.7,
  },
  itemOrder: {
    textAlign: 'center',
    color: Constants.Colors.WhiteUpd,
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
    flex: 0.4,
  },
  itemTime: {
    textAlign: 'center',
    color: Constants.Colors.WhiteUpd,
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
    flex: 0.4
  },
  itemAmount: {
    textAlign: 'center',
    color: '#636464',
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
    flex: 0.4
  },
  verticalLine: {
    width: 1,
    backgroundColor: '#D7D7D7',
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
  },
  arrowIcons: {
    marginBottom: 10,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    //tintColor:Constants.Colors.BlurGrey,
  },
  arrowIconsNext: {
    marginBottom: 10,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    //tintColor:Constants.Colors.BlurGrey,
    //transform: [{rotate: '180deg'}],
  },

});
