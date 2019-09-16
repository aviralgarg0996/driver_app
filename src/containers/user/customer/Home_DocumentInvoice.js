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
import HeaderMenu from '../../../components/customer/HeaderMenu';
import HeaderBackground from '../../../components/customer/HeaderBackground';
import { BoxShadow } from 'react-native-shadow';
import { scaleHeight, scaleWidth, normalizeFont } from '../../../constants/responsive';
import SubmitButton from "../../../components/common/FormSubmitButton";
import ShadowButton from '../../../components/common/ShadowButton';

//import { ToastActionsCreators } from 'react-native-redux-toast';

class Home_DocumentInvoice extends Component<{}> {
  constructor(props) {
    super(props);
  }

  itemList(data) {
    let { item, index } = data;
    var arr1 = [];
    var len = this.props.state.DisplayLocationAddress.length;
    this.props.state.DisplayLocationAddress.map((val, i) => {
      if (!(val.address.indexOf('Choose') == 0))
        arr1.push(val);
    });

    const shadowOpt = {
      width: Constants.BaseStyle.DEVICE_WIDTH,
      height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
      color: "#000",
      border: 3,
      radius: 4,
      opacity: 0.2,
      x: 2,
      y: 2,
      style: { marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3 }
    };
    return (
      <BoxShadow setting={shadowOpt}>
        <View style={{ backgroundColor: '#ffffff', height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10 }}>
          <View style={[styles.flexRow, { marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100 }]}>
            <Text style={[styles.textStyle, { color: '#5D5D5D', flex: 0.3, justifyContent: 'flex-start', textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
              {this.props.state.LocationForService}{index + 1}{': '}
            </Text>
            <View style={[styles.flexRow, { flex: 1, justifyContent: 'flex-start', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 6, marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
              <Image source={this.props.state.LocationImgForService} style={[styles.pickupIcon]} resizeMode={'contain'} />
              <Text numberOfLines={1} style={[styles.textStyle, { textAlign: 'left', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                {arr1[index].address}
              </Text>
            </View>
          </View>

          <View style={[styles.flexRow, { marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100 }]}>
            <View style={{ flex: 0.5, justifyContent: 'flex-start' }}>
              <Text style={[styles.textStyle, { textAlign: 'left', marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                {'Delivery Cost'}
              </Text>
            </View>
            <View style={{ flex: 0.5, justifyContent: 'flex-end' }}>
              <Text style={[styles.textStyle, { color: '#5D5D5D', textAlign: 'right', marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                {'$'}{item.deliveryCharge}
              </Text>
            </View>
          </View>

          {/*<View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
            <View style={{flex:0.5,justifyContent:'flex-start'}}>
              <Text style={[styles.textStyle,{textAlign:'left',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                {item.header2}
              </Text>
            </View>
            <View style={{flex:0.5,justifyContent:'flex-end'}}>
              <Text style={[styles.textStyle,{color:'#5D5D5D',textAlign:'right',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                {item.item2}
              </Text>
            </View>
          </View>

          <View style={[styles.flexRow,{marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
            <View style={{flex:0.5,justifyContent:'flex-start'}}>
              <Text style={[styles.textStyle,{textAlign:'left',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                {item.header3}
              </Text>
            </View>
            <View style={{flex:0.5,justifyContent:'flex-end'}}>
              <Text style={[styles.textStyle,{color:'#5D5D5D',textAlign:'right',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                {item.item3}
              </Text>
            </View>
          </View>*/}

        </View>
      </BoxShadow>
    )
  }

  onClickProceed() {
    let { navigate } = this.props.navigation;

    this.props.dispatch({ type: 'SET_TABINDEX', index: 2 });
    this.props.dispatch({ type: 'SET_SELECTED_FLAG', selectedTabFlag: 2 });
    navigate('Home_PaymentProceed');
  }


  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={{ flex: 1, backgroundColor: Constants.Colors.LightBlue }}>
        <HeaderBackground navigation={navigate} goBack={goBack} />
        <HeaderMenu navigation={navigate} catId={3} />
        <View style={[styles.flexRow, { justifyContent: 'space-between', marginTop: scaleHeight(20), marginBottom: scaleHeight(20), marginLeft: scaleWidth(20), marginRight: scaleWidth(20) }]}>
          <Text style={styles.textStyleTop}>
            {'INVOICE'}
          </Text>
          <Text style={[{ fontFamily: Constants.CustomerFonts.bold.fontFamily, fontSize: Constants.CustomerFonts.BigSize.fontSize, color: Constants.Colors.White }]}>
            {'Pay ' + '$'}{this.props.state.InvoiceData.totalCharge && this.props.state.InvoiceData.totalCharge.toFixed(2)}
          </Text>
        </View>
        <ScrollView>
          {/* Pickup 1 */}
          {
            this.props.state.pickupArr[0].address ?
              <ImageBackground style={{ marginBottom: scaleHeight(20) }} source={require('../../../assets/images/customer/blue.png')}>
                <View style={[styles.flexRow, { marginLeft: scaleWidth(5), marginTop: scaleHeight(20) }]}>
                  <Image source={Constants.Images.customer.markerBlue} style={[styles.pickupIconStyle]} resizeMode={'contain'} />
                  <Text style={[styles.textStyle, { color: Constants.Colors.White, flex: 0.3, justifyContent: 'flex-start', textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }]}>
                    {'Pickup 1'}
                  </Text>
                </View>
                <View style={{ marginLeft: scaleWidth(30) }}>
                  <Text numberOfLines={1} style={[styles.textStyle, { textAlign: 'left', marginBottom: scaleHeight(10), color: Constants.Colors.LightGray }]}>
                    {this.props.state.pickupArr[0].address}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: scaleHeight(25), marginBottom: scaleHeight(20) }}>
                  <Text style={styles.textStyle}> {'Delivery Cost'} </Text>
                  <Text style={[styles.textStyle, { marginRight: scaleWidth(20) }]}> {'$ ' + this.props.state.Orders[0].deliveryCharge[0].toFixed(2)} </Text>
                </View>
              </ImageBackground> : null
          }
          {/* Pickup 2 */}
          {this.props.state.pickupArr[1].address && this.props.state.pickupArr[1].address !== 'Choose Another Pickup Location' ? <ImageBackground style={{ marginBottom: scaleHeight(20) }} source={require('../../../assets/images/customer/blue.png')}>
            <View style={[styles.flexRow, { marginLeft: scaleWidth(5), marginTop: scaleHeight(20) }]}>
              <Image source={Constants.Images.customer.markerBlue} style={[styles.pickupIconStyle]} resizeMode={'contain'} />
              <Text style={[styles.textStyle, { color: Constants.Colors.White, flex: 0.3, justifyContent: 'flex-start', textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }]}>
                {'Pickup 2'}
              </Text>
            </View>
            <View style={{ marginLeft: scaleWidth(30) }}>
              <Text numberOfLines={1} style={[styles.textStyle, { textAlign: 'left', marginBottom: scaleHeight(10), color: Constants.Colors.LightGray }]}>
                {this.props.state.pickupArr[1].address}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: scaleHeight(25), marginBottom: scaleHeight(20) }}>
              <Text style={styles.textStyle}> {'Delivery Cost'} </Text>
              <Text style={[styles.textStyle, { marginRight: scaleWidth(20) }]}> {'$ ' + this.props.state.Orders[0].deliveryCharge[1].toFixed(2)} </Text>
            </View>
          </ImageBackground> : null}
          {/* Pickup 3 */}
          {this.props.state.pickupArr.length == 3 && this.props.state.pickupArr[2].address !== 'Choose Another Pickup Location' && this.props.state.pickupArr.length == 3 ? <ImageBackground style={{ marginBottom: scaleHeight(20) }} source={require('../../../assets/images/customer/blue.png')}>
            <View style={[styles.flexRow, { marginLeft: scaleWidth(5), marginTop: scaleHeight(20) }]}>
              <Image source={Constants.Images.customer.markerBlue} style={[styles.pickupIconStyle]} resizeMode={'contain'} />
              <Text style={[styles.textStyle, { color: Constants.Colors.White, flex: 0.3, justifyContent: 'flex-start', textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }]}>
                {'Pickup 3'}
              </Text>
            </View>
            <View style={{ marginLeft: scaleWidth(30) }}>
              <Text numberOfLines={1} style={[styles.textStyle, { textAlign: 'left', marginBottom: scaleHeight(10), color: Constants.Colors.LightGray }]}>
                {this.props.state.pickupArr[2].address}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: scaleHeight(25), marginBottom: scaleHeight(20) }}>
              <Text style={styles.textStyle}> {'Delivery Cost'} </Text>
              <Text style={[styles.textStyle, { marginRight: scaleWidth(20) }]}> {'$ ' + this.props.state.Orders[0].deliveryCharge[2].toFixed(2)} </Text>
            </View>
          </ImageBackground> : null}
          <ImageBackground resizeMode='cover' source={require("../../../assets/images/customer/blue.png")} style={{ marginBottom: scaleHeight(20) }}>
            <View style={{ marginTop: scaleHeight(20) }}>
              <View style={[{ justifyContent: 'flex-start' }]}>
                <Text style={[styles.textStyle, { color: Constants.Colors.White, textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5, marginBottom: scaleHeight(5) }]}>
                  {'Other Services'}
                </Text>
              </View>

              <View style={[styles.flexRow, { marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100 }]}>
                <Text style={[styles.textStyle, { color: Constants.Colors.LightGray, flex: 1, justifyContent: 'flex-start', textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                  {'Help from driver'}
                </Text>
                <Text style={[styles.textStyle, { flex: 0.3, textAlign: 'center' }]}>
                  {''}
                </Text>
                <Text style={[styles.textStyle, { flex: 0.3, textAlign: 'center' }]}>
                  {''}
                </Text>

                {
                  this.props.state.InvoiceData.driver_help_cost ? <Text style={[styles.textStyle, { flex: 0.3, textAlign: 'right', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                    {'$'}{this.props.state.InvoiceData.driver_help_cost.toFixed(2)}
                  </Text> : <Text style={[styles.textStyle, { flex: 0.3, textAlign: 'right', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                      {'$'}{0.00}
                    </Text>
                }

              </View>
              <View style={[styles.flexRow, { marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100 }]}>
                <Text style={[styles.textStyle, { color: Constants.Colors.LightGray, flex: 1, justifyContent: 'flex-start', textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                  {'Extra Helper'}
                </Text>
                <Text style={[styles.textStyle, { flex: 0.3, textAlign: 'center' }]}>
                  {''}
                </Text>
                <Text style={[styles.textStyle, { flex: 0.3, textAlign: 'center' }]}>
                  {''}
                </Text>
                <Text style={[styles.textStyle, { flex: 0.3, textAlign: 'right', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                  {'$'}{this.props.state.InvoiceData.extra_help_cost?this.props.state.InvoiceData.extra_help_cost.toFixed(2):'0.00'}
                </Text>
              </View>
              <View style={[styles.horizontalLine]} />
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
                    {'$'}{this.props.state.InvoiceData.totalCharge && this.props.state.InvoiceData.totalCharge.toFixed(2)}
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
  },
  ButtonTextStyle: {
    fontSize: normalizeFont(20),
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
export default connect(state => ({ state: state.CustomerReducer }))(Home_DocumentInvoice);
