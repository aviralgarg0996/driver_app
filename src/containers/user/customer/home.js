/* eslint-disable no-undef */
/* eslint-disable radix */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  ImageBackground,
  Share,
  AsyncStorage,
} from 'react-native';

import {connect} from 'react-redux';
import HeaderBackground from '../../../components/customer/HeaderBackground';
import Constants from '../../../constants';
import CustomerMapView from '../../../components/customer/MapView';
import Home_OrdersList from '../../../components/customer/Home_OrdersList';
import SearchPlace from '../../../components/customer/SearchPlace';
import SearchPlace_Hourly from '../../../components/customer/SearchPlace_Hourly';

class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DeliveryFlag: 1,
      HourlyFlag: 0,
      OrdersList: [],
      flag: true,
    };
  }

  setViewColorOnClick(value) {
    if (value === 1) {
      return [styles.colIndexViewBlack];
    } else {
      return [styles.colIndexViewWhite];
    }
  }

  onVechileChange = ref => {
    setTimeout(() => {
  //    ref.updateSocketParams();
    }, 5000);
  };

  setTextColorOnClick(value) {
    if (value === 1) {
      return [styles.colIndexLabelBlack];
    } else {
      return [styles.colIndexLabelWhite];
    }
  }

  onPressInfo(value) {
    if (parseInt(value) === 1) {
      this.props.dispatch({
        type: 'SET_SERVICEFLAG',
        deliveryFlag: 1,
        hourlyFlag: 0,
      });
    } else {
      this.props.dispatch({
        type: 'SET_SERVICEFLAG',
        deliveryFlag: 0,
        hourlyFlag: 1,
      });
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'RESET_DETAILS',
      deliveryFlag: 0,
      hourlyFlag: 1,
    });
  }

  shareItem = async () => {
    try {
      const result = await Share.share({
        title: 'Its Here',
        message:
          'Refer your friend and get 10$ on adding money by your friend, Link: https://play.google.com/store/apps/details?id=com.itshere',
        url: 'https://play.google.com/store/apps/details?id=com.itshere',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        dismissedAction();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  DisplayOrdersList(item) {
    return (
      <View style={[styles.flexRow, {marginHorizontal: 10}]}>
        <View style={styles.boxContainer}>
          <TouchableOpacity onPress={() => this.navigateOrders(item)}>
            <ImageBackground
              source={require('../../../assets/images/customer/blue.png')}
              style={{
                width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 35,
                padding: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 4,
              }}>
              <View>
                <Text style={styles.itemOrder}>#{item.order_id}</Text>
              </View>
              <View>
                <Text style={styles.itemTime}>{item.date}</Text>
              </View>
              <View>
                <Text style={styles.itemTime}>{item.minTime}</Text>
              </View>
              <View>
                <Text style={this.setStatusColor(item.orderStatus)}>
                  {item.orderStatus.toUpperCase()}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  componentWillMount = () => {
    AsyncStorage.getItem('id').then(value => {
      RestClient.get_New(
        'myorders/my-orders/',
        {
          status: 'all',
          max: 6217708099,
          min: 0,
          page: 1,
          count: 30,
          datemin: 0,
          datemax: 1538223074000220000011,
          customerId: value,
        },
        '',
      ).then(result => {
        if (result.status == 1) {
          let orderArr = [];
          for (var i = 0; i < result.data.length; i++) {
            var obj = result.data[i];
            let new_min = moment.utc(obj.minTime).format('HH:mm A');
            let new_max = moment.utc(obj.maxTime).format('HH:mm A');
            let new_date = moment
              .utc(obj.updatedAt, 'YYYY-MM-DDTHH:mm:ss Z')
              .format('DD/MM/YYYY');
            let objj = {
              order_id: obj.orderId,
              time: obj.time,
              orderStatus:
                obj.orderStatus == 'Available' ? 'Pending' : obj.orderStatus,
              expireTime: obj.orderPassingTime,
              date: new_date,
              maxTime: new_max,
              minTime: new_min,
              totalCharge: obj.totalCharge,
              _id: obj._id,
            };
            orderArr.push(objj);
          }
          this.setState({
            OrdersList: orderArr,
          });
        } else {
        }
      });
    });
  };

  render() {
    const {navigate, goBack} = this.props.navigation;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: Constants.Colors.BackgroundBlue},
        ]}>
        <HeaderBackground navigation={this.props.navigation} />
        <View
          style={{
            width: Constants.BaseStyle.DEVICE_WIDTH,
            height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 8,
            zIndex: 4,
          }}>
          <View style={[styles.flexRow]}>
            <TouchableOpacity
              onPress={() => this.onPressInfo(1)}
              style={[
                styles.colIndex,
                this.setViewColorOnClick(this.props.state.DeliveryFlag),
              ]}>
              <Text
                style={this.setTextColorOnClick(this.props.state.DeliveryFlag)}>
                {'Delivery Service'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onPressInfo(2)}
              style={[
                styles.colIndex,
                this.setViewColorOnClick(this.props.state.HourlyFlag),
              ]}>
              <Text
                style={this.setTextColorOnClick(this.props.state.HourlyFlag)}>
                {'Hourly Service'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={{
            flex: 1,
            bottom: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 1,
            backgroundColor: Constants.Colors.BackgroundBlue,
          }}>
          <CustomerMapView
            HourlyFlag={this.props.state.HourlyFlag}
            navigation={navigate}
            goBack={goBack}
            onVechileChange={this.onVechileChange}
          />
          <View
            style={[
              styles.horizontalLine,
              {
                marginTop: (Constants.BaseStyle.DEVICE_WIDTH * 2) / 100,
                marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
              },
            ]}
          />
          <Home_OrdersList navigation={navigate} />
          <View
            style={[
              styles.horizontalLine,
              {marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5},
            ]}
          />
          <TouchableOpacity
            style={[styles.cardView]}
            onPress={() => {
              this.shareItem();
            }}>
            <View style={styles.flexRow}>
              <View style={{flex: 0.4}}>
                <Image
                  source={Constants.Images.customer.invitefriendhome}
                  style={styles.inviteFriendIcon}
                  resizeMode={'contain'}
                />
              </View>
              <View style={{flex: 0.8, justifyContent: 'center'}}>
                <Text style={[styles.inviteFriendHeader]}>
                  {'Invite Friends'}
                </Text>
                <Text style={[styles.inviteFriendText]}>
                  {
                    'Refer your friends and get 10$ on adding money by your friend.'
                  }
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={[
              styles.horizontalLine,
              {marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5},
            ]}
          />
          <Modal
            animationType={'fade'}
            transparent={true}
            visible={this.props.state.placeModalVisibility}
            onRequestClose={() => {
              this.props.dispatch({
                type: 'PLACE_FINDER_MODAL',
                visibility: false,
              });
            }}>
            <SearchPlace
              navigation={navigate}
              dispatch={this.props.navigation}
            />
          </Modal>
          <Modal
            animationType={'fade'}
            transparent={true}
            visible={this.props.state.placeModalVisibility_hourly}
            onRequestClose={() => {
              this.props.dispatch({
                type: 'PLACE_FINDER_MODAL_HOURLY',
                visibility: false,
              });
            }}>
            <SearchPlace_Hourly
              navigation={navigate}
              dispatch={this.props.navigation}
            />
          </Modal>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  navigationBar: {
    backgroundColor: 'transparent', //Constants.Colors.LightBlue,
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navBarRight: {
    flex: 1,
    flexDirection: 'row',
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 7,
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
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 9,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 9,
    marginTop: 3.5,
  },
  settingIcon: {
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 7,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 7,
    marginTop: 3.5,
  },
  horizontalLine: {
    height: 2,
    backgroundColor: '#B1B1B1',
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3,
    marginVertical: (Constants.BaseStyle.DEVICE_WIDTH * 1) / 100,
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
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colIndexViewWhite: {
    backgroundColor: Constants.Colors.White,
  },
  colIndexViewBlack: {
    backgroundColor: Constants.Colors.DarkBlue,
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 8,
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
  },
  colIndexLabelWhite: {
    fontSize: Constants.CustomerFonts.TopHeader.fontSize,
    fontFamily: Constants.CustomerFonts.TopHeader.fontFamily,
    color: '#4C4C4C',
    textAlign: 'center',
  },
  colIndexLabelBlack: {
    fontSize: Constants.CustomerFonts.TopHeader.fontSize,
    fontFamily: Constants.CustomerFonts.TopHeader.fontFamily,
    color: Constants.Colors.White,
    textAlign: 'center',
  },
  cardView: {
    backgroundColor: Constants.Colors.WhiteSmoke,
    borderRadius: 15,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
    marginVertical: (Constants.BaseStyle.DEVICE_WIDTH * 1.5) / 100,
    justifyContent: 'center',
  },
  inviteFriendIcon: {
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 18,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 22,
    marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
  },
  inviteFriendHeader: {
    fontSize: Constants.CustomerFonts.bold.fontSize,
    fontFamily: Constants.CustomerFonts.bold.fontFamily,
    textAlign: 'left',
    color: '#081933',
  },
  inviteFriendText: {
    color: '#969297',
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    textAlign: 'left',
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
  },
  ReportStyle: {
    color: Constants.Colors.WhiteUpd,
    fontSize: Constants.CustomerFonts.BigSize.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    //paddingVertical: Constants.BaseStyle.PADDING * 0.4,
    marginVertical: (Constants.BaseStyle.DEVICE_WIDTH * 1) / 100,
  },
  MoreReportStyle: {
    color: Constants.Colors.LightBlue,
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    marginVertical: (Constants.BaseStyle.DEVICE_WIDTH * 1) / 100,
    textDecorationLine: 'underline',
  },
  boxContainer: {
    backgroundColor: Constants.Colors.DarkBlue,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 35,
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
    marginVertical: (Constants.BaseStyle.DEVICE_WIDTH * 1) / 100,
  },
  itemStatus2: {
    textAlign: 'center',
    color: Constants.Colors.LightBlue,
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    marginVertical: (Constants.BaseStyle.DEVICE_WIDTH * 1) / 100,
    flex: 0.7,
  },
  itemOrder: {
    textAlign: 'center',
    color: Constants.Colors.WhiteUpd,
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    marginVertical: (Constants.BaseStyle.DEVICE_WIDTH * 1) / 100,
    flex: 0.4,
  },
  itemTime: {
    textAlign: 'center',
    color: Constants.Colors.WhiteUpd,
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    marginVertical: (Constants.BaseStyle.DEVICE_WIDTH * 1) / 100,
    flex: 0.4,
  },
  itemAmount: {
    textAlign: 'center',
    color: '#636464',
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    marginVertical: (Constants.BaseStyle.DEVICE_WIDTH * 1) / 100,
    flex: 0.4,
  },
  verticalLine: {
    width: 1,
    backgroundColor: '#D7D7D7',
    marginVertical: (Constants.BaseStyle.DEVICE_WIDTH * 1) / 100,
  },
  arrowIcons: {
    marginBottom: 10,
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 4,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 4,
    //tintColor:Constants.Colors.BlurGrey,
  },
  arrowIconsNext: {
    marginBottom: 10,
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 4,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 4,
    //tintColor:Constants.Colors.BlurGrey,
    //transform: [{rotate: '180deg'}],
  },
});

export default connect(state => ({
  state: state.CustomerReducer,
  user: state.user,
}))(CustomerHome);
