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
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from 'react-native';

import { connect } from 'react-redux';
import Constants from "../../../constants";
import ShadowButton from "../../../components/common/ShadowButton";
import HourlyServiceHeaderMenu from '../../../components/customer/HourlyServiceHeaderMenu';
import HeaderBackground from '../../../components/customer/HeaderBackground';
import { scaleHeight, scaleWidth, normalizeFont } from '../../../constants/responsive';
import RestClient from '../../../utilities/RestClient';

//import { ToastActionsCreators } from 'react-native-redux-toast';

class Hourly_Invoice extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      serviceType: "",
    }
  }

  componentDidMount() {
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
        this.setState({ serviceType: result.data.deliveryName })
      }
      else {
        console.log(result)
      }
    })
  }


  onClickProceed() {
    let { navigate } = this.props.navigation;
    this.props.dispatch({ type: 'SET_HOURLYSERVICE_TABINDEX', index: 2 });
    this.props.navigation.navigate('Hourly_PaymentProceed');
  }


  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={{ flex: 1, backgroundColor: Constants.Colors.LightBlue }}>
        <HeaderBackground navigation={navigate} goBack={goBack} />
        <HourlyServiceHeaderMenu navigation={navigate} />
        <View style={[styles.flexRow, { justifyContent: 'space-between', marginTop: scaleHeight(20), marginBottom: scaleHeight(20), marginLeft: scaleWidth(20), marginRight: scaleWidth(20) }]}>
          <Text style={styles.textStyleTop}>
            {'INVOICE'}
          </Text>
          <Text style={[{ fontFamily: Constants.CustomerFonts.bold.fontFamily, fontSize: Constants.CustomerFonts.BigSize.fontSize, color: Constants.Colors.White }]}>
            {'Pay ' + '$'}{this.props.state.InvoiceData.totalCharge}
          </Text>
        </View>
        <ScrollView>
          <ImageBackground style={{ marginBottom: scaleHeight(20) }} source={require('../../../assets/images/customer/blue.png')}>
            {/* Pickup 1 */}
            <View style={[styles.flexRow, { marginLeft: scaleWidth(5), marginTop: scaleHeight(20) }]}>
              <Image source={Constants.Images.customer.markerBlue} style={[styles.pickupIconStyle]} resizeMode={'contain'} />
              <Text style={[styles.textStyle, { color: Constants.Colors.White, flex: 0.3, justifyContent: 'flex-start', textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }]}>
                {'Start Location'}
              </Text>
            </View>
            <View style={{ marginLeft: scaleWidth(30) }}>
              <Text numberOfLines={1} style={[styles.textStyle, { textAlign: 'left', marginBottom: scaleHeight(10), color: Constants.Colors.LightGray }]}>
                {this.props.state.Hourly_pickupArr[0].address}
              </Text>
            </View>
            <View style={[styles.flexRow, { marginLeft: scaleWidth(5), marginTop: scaleHeight(0) }]}>
              <Image source={Constants.Images.customer.drop} style={[styles.pickupIconStyle]} resizeMode={'contain'} />
              <Text style={[styles.textStyle, { color: Constants.Colors.White, flex: 0.3, justifyContent: 'flex-start', textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }]}>
                {'End Location'}
              </Text>
            </View>
            <View style={{ marginLeft: scaleWidth(30) }}>
              <Text numberOfLines={1} style={[styles.textStyle, { textAlign: 'left', marginBottom: scaleHeight(10), color: Constants.Colors.LightGray }]}>
                {this.props.state.Hourly_dropArr[0].address}
              </Text>
            </View>

          </ImageBackground>
          <ImageBackground resizeMode='cover' source={require("../../../assets/images/customer/blue.png")} style={{ marginBottom: scaleHeight(20) }}>
            <View style={{ marginTop: scaleHeight(20) }}>
              <View style={[{ justifyContent: 'flex-start' }]}>
                <Text style={[styles.textStyle, { color: Constants.Colors.White, textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5, marginBottom: scaleHeight(5) }]}>
                  {'Service Details'}
                </Text>
              </View>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: scaleHeight(15), marginBottom: scaleHeight(10) }}>
                <Text style={[styles.textStyle, { color: Constants.Colors.LightGray }]}> {'Service Type'} </Text>
                <Text style={[styles.textStyle, { marginRight: scaleWidth(20) }]}> {'Hourly Services'} </Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: scaleHeight(15), marginBottom: scaleHeight(10) }}>
                <Text style={[styles.textStyle, { color: Constants.Colors.LightGray }]}> {'Hourly Duration'} </Text>
                <Text style={[styles.textStyle, { marginRight: scaleWidth(20) }]}> {this.props.state.HourlyItem} </Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: scaleHeight(15), marginBottom: scaleHeight(10) }}>
                <Text style={[styles.textStyle, { color: Constants.Colors.LightGray }]}> {'Delivery Cost'} </Text>
                <Text style={[styles.textStyle, { marginRight: scaleWidth(20) }]}> {'$' + this.props.state.InvoiceData.subTotal} </Text>
              </View>
           
              {
                this.state.serviceType == 'Documents' || this.state.serviceType == 'Courier & Frieght' || this.state.serviceType == 'Furniture & Appliances' || this.state.serviceType == 'Hourly Services' ? <View style={[styles.flexRow, { marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100 }]}>
                  <Text style={[styles.textStyle, { color: Constants.Colors.White, flex: 1, justifyContent: 'flex-start', textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                    {'Other Services'}
                  </Text>
                 
                  {
                    this.props.state.InvoiceData.driver_help ? <Text style={[styles.textStyle, { flex: 1, textAlign: 'right', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                      {'$'}{this.props.state.InvoiceData.driver_help}
                    </Text> : <Text style={[styles.textStyle, { flex: 0.7, textAlign: 'right', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                        {'Extra Helper'}
                      </Text>
                  }
                </View> : null
              }
              {
                this.state.serviceType == 'Documents' || this.state.serviceType == 'Courier & Frieght' || this.state.serviceType == 'Furniture & Appliances' || this.state.serviceType == 'Hourly Services' ? <View style={[styles.flexRow, { marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100 }]}>
                  <Text style={[styles.textStyle, { flex: 1, textAlign: 'right', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                    {'Help from driver'}
                  </Text>
                </View> : null
              }

              {
                this.state.serviceType == 'Documents' || this.state.serviceType == 'Courier & Frieght' || this.state.serviceType == 'Furniture & Appliances' || this.state.serviceType == 'Hourly Services' ? <View style={[styles.horizontalLine]} /> : null
              }
              <View style={[styles.flexRow, { marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100 }]}>
                <View style={{ flex: 0.5, justifyContent: 'flex-start' }}>
                  <Text style={[styles.textStyle, { textAlign: 'left', marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                    {'Sub Total'}
                  </Text>
                </View>
                <View style={{ flex: 0.5, justifyContent: 'flex-end' }}>
                  <Text style={[styles.textStyle, { color: Constants.Colors.White, textAlign: 'right', marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                    {'$'}{this.props.state.InvoiceData.subTotal}
                  </Text>
                </View>
              </View>

              <View style={[styles.flexRow, { marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2, marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100 }]}>
                <View style={{ flex: 0.5, justifyContent: 'flex-start' }}>
                  <Text style={[styles.textStyle, { textAlign: 'left', marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                    {'GST (%'}{this.props.state.InvoiceData.GST}{')'}
                  </Text>
                </View>
                <View style={{ flex: 0.5, justifyContent: 'flex-end' }}>
                  <Text style={[styles.textStyle, { color: Constants.Colors.White, textAlign: 'right', marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                    {'$'}{this.props.state.InvoiceData.gstAmt}
                  </Text>
                </View>
              </View>
              <View style={[styles.horizontalLine]} />
              <View style={[styles.flexRow, { marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100, marginBottom: Constants.BaseStyle.DEVICE_WIDTH * 3 / 100, marginBottom: scaleHeight(20) }]}>
                <View style={{ flex: 0.5, justifyContent: 'flex-start' }}>
                  <Text style={[styles.textStyle, { fontSize: Constants.CustomerFonts.BigSize.fontSize, textAlign: 'left', marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                    {'Total'}
                  </Text>
                </View>
                <View style={{ flex: 0.5, justifyContent: 'flex-end' }}>
                  <Text style={[styles.textStyle, { fontSize: Constants.CustomerFonts.BigSize.fontSize, textAlign: 'right', marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                    {'$'}{this.props.state.InvoiceData.totalCharge}
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
        <ShadowButton
          onPress={() => this.onClickProceed()}
          text={'Proceed to pay'}
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
    //marginTop: 5,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    marginRight: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1,
    //tintColor:Constants.Colors.Blue,
  },
  pickupIconStyle: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    marginLeft: scaleWidth(8),
    marginTop: scaleHeight(-5)
  },
  horizontalLine: {
    height: 2,
    backgroundColor: Constants.Colors.LightGray,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
  },
  textStyle: {
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    textAlign: 'center',
    color: Constants.Colors.White,
  },
  ButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: scaleHeight(30),
    borderRadius: 5,
  },
  ButtonTextStyle: {
    fontSize: normalizeFont(24),
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.White,
    textAlign: 'center',
  },
  textStyleTop: {
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    textAlign: 'center',
    color: Constants.Colors.LightGray,
  },

});
export default connect(state => ({ state: state.CustomerReducer }))(Hourly_Invoice);
