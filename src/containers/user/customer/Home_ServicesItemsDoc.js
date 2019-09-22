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
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';

import { connect } from 'react-redux';

import Constants from "../../../constants";

import HeaderMenu from '../../../components/customer/HeaderMenu';
import HeaderBackground from '../../../components/customer/HeaderBackground';
import CustomerConnection from "../../../config/Connection";
import { startLoading, stopLoading } from '../../../redux/modules/app';
import { scaleHeight, scaleWidth, normalizeFont } from '../../../constants/responsive';
import ShadowButton from '../../../components/common/ShadowButton';

class Home_ServicesDoc extends Component<{}> {
  constructor(props) {
    super(props);
    Alert.alert("text")
    this.state = {
      opacity: 1,
      activecolor: '#C3C1C0',
    }

  }

  onClickSubtract(_index) {
    var arr1 = [];
    this.props.state.DisplayLocationAddress.map((val, i) => {
      if (i == _index) {
        if (parseInt(val.prev) - this.props.state.FoodRange >= 1) {
          if (parseInt(val.prev) - this.props.state.FoodRange == 1) {
            arr1.push({ next: parseInt(val.next) - this.props.state.FoodRange, prev: parseInt(val.prev) - this.props.state.FoodRange, opacity: 1, activecolor: '#C3C1C0' });
          }
          else {
            arr1.push({ next: parseInt(val.next) - this.props.state.FoodRange, prev: parseInt(val.prev) - this.props.state.FoodRange, opacity: val.opacity, activecolor: val.activecolor });
          }
        }
        else {
          arr1.push({ next: val.next, prev: val.prev, opacity: 1, activecolor: '#C3C1C0' });
        }
      }
      else {
        arr1.push(val);
      }
    });

    this.props.dispatch({ type: 'SET_ITEMRANGE_ARRAY', array: arr1 });
  }
  onClickAdd(_index) {
    var arr1 = [];
    this.props.state.DisplayLocationAddress.map((val, i) => {
      if (i == _index) {
        if (parseInt(val.next) + this.props.state.FoodRange <= 100)
          arr1.push({ next: parseInt(val.next) + this.props.state.FoodRange, prev: parseInt(val.prev) + this.props.state.FoodRange, opacity: 0.5, activecolor: Constants.Colors.Blue });
        else {
          arr1.push({ next: val.next, prev: val.prev, opacity: 0.5, activecolor: Constants.Colors.Blue });
        }
      }
      else {
        arr1.push(val);
      }
    });
    this.setState({ opacity: 0.5, activecolor: Constants.Colors.Blue });
    this.props.dispatch({ type: 'SET_ITEMRANGE_ARRAY', array: arr1 });
  }

  itemList=(data)=> {
    console.log("data=====>",data)
    let { item, index } = data;
    return (
      <View style={{
        width: Constants.BaseStyle.DEVICE_WIDTH,
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 23,
        marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
      }}>
        <View key={index + 2} style={{ backgroundColor: Constants.Colors.DarkBlue, height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 40 }}>
          <View style={{ width: "100%", height: 80, zIndex: -1, justifyContent: "flex-end", alignItems: "flex-end" }}>
            <Image style={{ width: 100, height: 80, resizeMode: "contain" }} source={Constants.Images.customer.documents} />
          </View>
          <View style={{ marginTop: -80 }}>
            <View key={index + 3} style={[styles.flexRow, { marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100, alignItems: "center" }]}>
              <Image key={index + 6} source={this.props.state.LocationImgForService} style={[styles.pickupIcon]} resizeMode={'contain'} />
              <Text key={index + 4}
                style={[styles.textStyle, { color: Constants.Colors.White, flex: 0.3, justifyContent: 'flex-start', textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2, marginTop: 5 }]}>
                {this.props.state.LocationForService}{index + 1}{': '}
              </Text>
            </View>

            <View key={index + 5}
              style={[styles.flexRow, { justifyContent: 'flex-start', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 6 }]}>
              <Text key={index + 7}
                numberOfLines={1} style={[styles.textStyle, { color: Constants.Colors.LightGray, textAlign: 'left', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }]}>
                {item.address}
              </Text>
            </View>
          </View>
          <View style={[styles.flexRow]}>
            <Text key={index + 9} style={[styles.textStyle,
            {
              color: Constants.Colors.White, flex: 2,
              justifyContent: 'flex-start', marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
              textAlign: 'left', fontSize: normalizeFont(18), marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 6
            }]}>
              {'Number of Documents'}
            </Text>
          </View>
          <View style={[styles.flexRow, {
            justifyContent: 'flex-end',
            marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2,
            marginTop: 10,
          }]}>
            <TouchableOpacity style={[styles.IconWhite, {
              marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 6
            }]}
              activeOpacity={item.opacity} onPress={() => this.onClickSubtract(index)}>
              <Text style={[styles.plusIconWhite, { fontSize: 33 }]}>-</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={[styles.textStyle, {
                fontSize: 24,
                fontFamily: Constants.CustomerFonts.bold.fontFamily,
              }]}>
                {item.prev}-{item.next}
              </Text>
            </View>
            <TouchableOpacity style={[styles.IconWhite, {
              marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 6
            }]} activeOpacity={0.5}
              onPress={() => this.onClickAdd(index)}>
              <Text style={[styles.plusIconWhite]}>+</Text>
            </TouchableOpacity>
          </View>
          <View key={index + 17} style={[styles.flexRow, { justifyContent: 'center', marginBottom: scaleHeight(15) }]}>
            <Text key={index + 18}
              style={[styles.textStyle, { color: Constants.Colors.White, textAlign: 'center', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 4 }]}>
              {'Upto '}{this.props.state.DocumentWeight}{' Pounds'}
            </Text>
          </View>

        </View>
      </View>
    )
  }

  CallUrgency() {
    let { navigate } = this.props;
    var strItems = [];
    var strWeight = [];
    var pickup = [];
    var drop = [];
    this.props.state.pickupArr.map((val, i) => {
      if (!(val.address.indexOf('Choose') == 0)) {
        pickup[i] = {

          "pickup_point": val.lat + ',' + val.long,
          "address": val.address,
          "pickup_status": 0,
          "priority": 0,
          "arrive_status": 0,
        };
      }
    });

    var len = this.props.state.dropArr.length;
    this.props.state.dropArr.map((val, i) => {
      if (!(val.address.indexOf('Choose') == 0)) {
        drop[i] = {

          "drop_point": val.lat + ',' + val.long,
          "address": val.address,
          "drop_status": 0,
          "arrive_status": 0,
          type: 'drop'
        }
      }
    });
this.props.state.DisplayLocationAddress.map((val, i) => {
      if (!(val.address.indexOf('Choose') == 0)) {
        strItems[i] = val.next;
        strWeight[i] = 3;
      }
    });




    var timeframe = 1;
    this.props.dispatch(startLoading())
    fetch(CustomerConnection.getTempUrl() + 'place-order/vehiclecalculation/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'date': '2018/06/05',
        'time': '04:20PM',
        'quantity': strItems,
        'pickup': pickup,
        'drop_location': drop,
        "service_type": 2,
        "delivery_type_usf": 1
      }),

    }).then((response) => response.json())
      .then((arr1) => {
        this.props.dispatch(stopLoading())

        this.props.dispatch({ type: 'SET_VEHICLECOST', _data: arr1.data, id: 0 });
        //this.props.dispatch({type:'ACTIVE_VEHICLE', tagid:0});
        navigate('UrgencyForDoc');
      })
      .catch((error) => {
        this.props.dispatch(stopLoading())
        console.error(error);
      });
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    var arr1 = [];
    console.log("props1111",this.props)
    this.props.state.DisplayLocationAddress.map((val, i) => {
      if (!(val.address.indexOf('Choose') == 0))
        arr1.push(val);
    });
    console.log("arr1======>",arr1)
    return (
      <View style={{ flex: 1, backgroundColor: Constants.Colors.BackgroundBlue }}>
        <HeaderBackground navigation={navigate} goBack={goBack} />
        <HeaderMenu navigation={navigate} catId={2} />
        <View style={{ height: scaleHeight(20), backgroundColor: 'transparent' }} />
          <FlatList
            data={arr1}
            renderItem={this.itemList}
          />


        <ShadowButton
          onPress={() => this.CallUrgency()}
          text='Continue'
          style={styles.ButtonStyle}
          textStyle={styles.ButtonTextStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  pickupIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1,
  },
  plusIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    tintColor: Constants.Colors.Blue,
  },
  textStyle: {
    fontSize: Constants.CustomerFonts.BigSize.fontSize,
    fontFamily: Constants.CustomerFonts.content.fontFamily,
    textAlign: 'center',
    color: Constants.Colors.White,
  },

  ButtonStyleNext: {
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 15,
    marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    marginTop: 10,//10,
    marginLeft: 10,//10,
    marginRight: 10,//10,
  },


  ButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: scaleHeight(20),
    borderRadius: 5,
  },
  ButtonTextStyle: {
    fontSize: 23,
    color: Constants.Colors.White,
    textAlign: 'center',
  },
  ButtonTextStyleNext: {
    fontSize: Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    fontSize: 18,
  },
  ButtonTextStyle: {
    fontSize: Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.White,

  },
  IconWhite: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constants.Colors.WhiteUpd,
    borderRadius: 3,
    height: 40, width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  plusIconWhite: {
    color: Constants.Colors.newOrange,
    fontSize: 30,
  }
});
export default connect(state => ({ state: state.CustomerReducer }))(Home_ServicesDoc);
