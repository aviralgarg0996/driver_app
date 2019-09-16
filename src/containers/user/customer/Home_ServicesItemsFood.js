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
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';

import Constants from "../../../constants";
import HeaderMenu from '../../../components/customer/HeaderMenu';
import HeaderBackground from '../../../components/customer/HeaderBackground';
import CustomerConnection from "../../../config/Connection";
import { scaleHeight, normalizeFont } from '../../../constants/responsive';
import { startLoading, stopLoading } from '../../../redux/modules/app';
import { ToastActionsCreators } from 'react-native-redux-toast';
import ShadowButton from '../../../components/common/ShadowButton';

class Home_Services extends Component<{}> {
  constructor(props) {
    super(props);
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
          //arr1.push({next:parseInt(val.next)-this.props.state.FoodRange,prev:parseInt(val.prev)-this.props.state.FoodRange});
          if (parseInt(val.prev) - this.props.state.FoodRange == 1) {
            arr1.push({ next: parseInt(val.next) - this.props.state.FoodRange, prev: parseInt(val.prev) - this.props.state.FoodRange, opacity: 1, activecolor: '#C3C1C0' });
            //this.setState({opacity:1,activecolor:'#C3C1C0'});
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
    this.props.dispatch({ type: 'SET_ITEMRANGE_ARRAY', array: arr1 });
  }

  itemList(data) {
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
              {'Number of Dishes'}
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
        </View>
      </View>
    )
  }

  CallUrgency() {
    let { navigate } = this.props.navigation;
    var strItems = [];
    var pickup = [];
    var drop = [];
    this.props.dispatch(startLoading());

    this.props.state.DisplayLocationAddress.map((val, i) => {
      if (!(val.address.indexOf('Choose') == 0)) {
        strItems[i] = val.next;
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
        'pickup': pickup,
        'drop_location': drop,
        'date': '05/06/2018',
        'time': '04:20PM',
        'quantity': strItems,
        'service_type': 1,
        "delivery_type_usf": 1

      }),
    }).then((response) => response.json())
      .then((result) => {
        if (result.status == true) {
          console.log("food result",result)
          this.props.dispatch(stopLoading());
          this.props.dispatch({ type: 'SET_VEHICLECOST', _data: result.data, id: 0 });
          navigate('UrgencyForFood');
        } else {
          this.props.dispatch(stopLoading());
          this.props.dispatch(ToastActionsCreators.displayInfo(result.message));
        }


      })
      .catch(error => {
        console.log("error=> ", error)
        this.props.dispatch(stopLoading());
      });
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    var arr1 = [];
    this.props.state.DisplayLocationAddress.map((val, i) => {
      if (!(val.address.indexOf('Choose') == 0))
        arr1.push(val);
    });

    return (
      <View style={{ flex: 1, backgroundColor: Constants.Colors.BackgroundBlue }}>
        <HeaderBackground navigation={navigate} goBack={goBack} />

        <HeaderMenu navigation={navigate} catId={2} />
        <ScrollView>
          <FlatList
            data={arr1}
            renderItem={this.itemList.bind(this)}
          />

        </ScrollView>
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
    marginRight: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1,
  },
  plusIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    tintColor: Constants.Colors.Blue,
  },
  plusIconWhite: {
    color: Constants.Colors.newOrange,
    fontSize: normalizeFont(30),
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
    marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    marginTop: 10,//10,
    marginLeft: 10,//10,
    marginRight: 10,//10,
  },
  ButtonTextStyleNext: {
    fontSize: Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
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
  IconWhite: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constants.Colors.WhiteUpd,
    borderRadius: 3,
    height: 40, width: 40,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default connect(state => ({ state: state.CustomerReducer }))(Home_Services);
