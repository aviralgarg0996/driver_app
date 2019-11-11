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
  AsyncStorage,
  ImageBackground,
  KeyboardAvoidingView,
  Alert,
  Modal,
} from 'react-native';

import { connect } from 'react-redux';
import SubmitButton from "../../../components/common/FormSubmitButton";
import Constants from "../../../constants";
import HeaderMenu from '../../../components/customer/HeaderMenu';
import HeaderBackground from '../../../components/customer/HeaderBackground';
import RestClient from '../../../redux/modules/RestClient';
import { scaleHeight, scaleWidth, normalizeFont } from '../../../constants/responsive';
//import Modal from "react-native-modal";
import ShadowButton from "../../../components/common/ShadowButton";
import Toast, { DURATION } from 'react-native-easy-toast'
import { ToastActionsCreators } from 'react-native-redux-toast';

class Home_PaymentProceed extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      WalletBorderColor: 'transparent',
      PaypalBorderColor: 'transparent',
      ActivePayBackColor: Constants.Colors.DarkBlue,
      ActivePayTextColor: Constants.Colors.LightGray,
      ActiveButton: false,
      visibleModal: null,
      modalVisible: false,
      saveCard: false,
      unsaveCard: false,
      saveCard: false,
      cardNo: "",
      month: "",
      year: "",
      cvvCode: "",
      name: "",
      WalletborderWidth: 0,
      WalletMarginBottom: scaleHeight(20),
      WalletborderWidth1: 0,
      WalletBorderColor1: 'transparent',
      WalletActive: false,
      PaypalActive: false
      //WalletHeight: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 18
    }

  }

  onClickWallet() {
    this.setState({
      WalletborderWidth: 2,
      WalletBorderColor: Constants.Colors.SkyBlue, PaypalBorderColor: 'transparent',
      ActivePayBackColor: Constants.Colors.DarkBlue, ActivePayTextColor: '#FFFFFF',
      ActiveButton: true, WalletActive: true, PaypalActive: false

    });
  }

  onClickPaypal() {
    this.setState({
      WalletborderWidth1: 2,
      WalletBorderColor1: Constants.Colors.SkyBlue, PaypalBorderColor: 'transparent',
      ActivePayBackColor: Constants.Colors.DarkBlue, ActivePayTextColor: '#FFFFFF',
      ActiveButton: true, WalletActive: false, PaypalActive: true
    });
  }

  onClickPay() {

    let { navigate } = this.props.navigation;
    if (this.state.ActiveButton) {
      navigate('PaymentSuccess');

      //this.props.dispatch(ToastActionsCreators.displayInfo('Your Payment has been completed ...'));
      if (this.props.state.Orders.orderId || this.props.state.InvoiceData.orderId) {
        this.checkPaymentInfo()
      } else {
        navigate('PaymentSuccess');
      }
    }
    else
    this.props.dispatch(ToastActionsCreators.displayInfo('Please Select Payment method'));


  }

  check = () => {
    this.setState({ saveCard: !this.state.saveCard })
  }

  checkPaymentInfo = () => {
    if (this.props.state.Orders.orderId) {
      this.orderID = this.props.state.Orders.orderId;
      var draftAr = this.props.state.Orders.orders
      for (i = 0; i < draftAr.length; i++) {
        var draftArray = draftAr[i].pickup
        var draftDrop = draftAr[i].drop_location
        this.props.navigation.dispatch({ type: 'DRAFT_PICKUP', _data: draftArray });
        this.props.navigation.dispatch({ type: 'DRAFT_DROP', _data: draftDrop });
      }
    } else {
      if (this.props.state.InvoiceData.orderId) {
        this.orderID = this.props.state.InvoiceData.orderId;
      }
    }
    let { navigate } = this.props.navigation;
    AsyncStorage.getItem("id").then((value) => {
      let obj = {
        "orderId": this.orderID,
        "customerId": value
      }
      console.log('obj----', obj)
      RestClient.post("place-order/payment", obj).then((result) => {
        console.log("result===>",result)
        if (result.status == true) {
          navigate('PaymentSuccess');
        } else {
          console.log("data getting")
        }
      }).catch(error => {
        console.log("result of type eror", error)
      });
    })
  }

  addCard(visible) {
    this.setState({ modalVisible: visible });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  cardPay() {
    //Alert.alert('Under Development')
    const { cardNo, month, year, cvvCode, name } = this.state;
    if (cardNo == "" || cardNo == null) {
      this.refs.toast.show('Please enter card number.', DURATION.LENGTH_LONG)
    } else if (month == "" || month == null) {
      this.refs.toast.show('Please enter month.', DURATION.LENGTH_LONG)
    } else if (year == "" || year == null) {
      this.refs.toast.show('Please enter year.', DURATION.LENGTH_LONG)
    } else if (cvvCode == "" || cvvCode == null) {
      this.refs.toast.show('Please enter cvv code.', DURATION.LENGTH_LONG)
    } else if (name == "" || name == null) {
      this.refs.toast.show('Please enter name.', DURATION.LENGTH_LONG)
    } else {
      // this.setState({ modalVisible: false }, () => this.props.navigation.navigate('Home_SelectDriver'))
      this.setState({ modalVisible: false })
    }
  }



  handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };

  handleScrollTo = p => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };

  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={{ flex: 1, backgroundColor: Constants.Colors.LightBlue }}>
        <HeaderBackground navigation={navigate} goBack={goBack} />
        <HeaderMenu navigation={navigate} />
        <View style={[styles.flexRow, { justifyContent: 'space-between', marginTop: scaleHeight(20), marginBottom: scaleHeight(20), marginLeft: scaleWidth(20), marginRight: scaleWidth(20) }]}>
          <Text style={styles.textStyleTop}>
            {'AMOUNT TO BE PAID '}
          </Text>
          <Text style={[{ fontFamily: Constants.CustomerFonts.bold.fontFamily, fontSize: Constants.CustomerFonts.BigSize.fontSize, color: Constants.Colors.White }]}>
            {'$'}{this.props.state.InvoiceData.totalCharge.toFixed(2)}
          </Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <ImageBackground resizeMode='cover' style={{ marginBottom: scaleHeight(20) }} source={require("../../../assets/images/customer/blue.png")} >
            <View style={{ marginTop: scaleHeight(20), marginBottom: scaleHeight(20), marginLeft: scaleWidth(20), marginRight: scaleWidth(20) }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.textStyle, { color: Constants.Colors.White }]}>
                  {'Credit & Debit Cards'}
                </Text>
                <TouchableOpacity activeOpacity={0.4} onPress={() => { this.setState({ modalVisible: true }) }}>
                  <Text style={[styles.textStyle, { color: Constants.Colors.SkyBlue, textDecorationLine: 'underline' }]}>
                    {'Add New Card'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.flexRow, { marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100 }]}>
              <View style={[styles.flexRow, { flex: 0.7, justifyContent: 'flex-start', alignItems: 'center', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                <Image source={Constants.Images.customer.visa} style={[styles.PayIcon]} resizeMode={'contain'} />
                <Text style={[styles.textStyle, { textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 1, color: Constants.Colors.White }]}>
                  {'4280-XXXXXXXX-4578'}
                </Text>
              </View>
              <View style={[styles.flexRow, { flex: 0.2, justifyContent: 'space-between' }]}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder='CVV'
                  multiline={false}
                  maxLength={4}
                  style={styles.inputStyle}
                />
              </View>
            </View>
            <View style={[styles.horizontalLine]} />
            <View style={[styles.flexRow, { marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100, marginBottom: scaleWidth(40) }]}>
              <View style={[styles.flexRow, { flex: 0.7, justifyContent: 'flex-start', alignItems: 'center', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                <Image source={Constants.Images.customer.mastercard} style={[styles.PayIcon]} resizeMode={'contain'} />
                <Text style={[styles.textStyle, { textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 1, color: Constants.Colors.White }]}>
                  {'9658-XXXXXXXX-4578'}
                </Text>
              </View>
              <View style={[styles.flexRow, { flex: 0.2, justifyContent: 'space-between' }]}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder='CVV'
                  multiline={false}
                  maxLength={4}
                  style={styles.inputStyle}
                />
              </View>
            </View>
          </ImageBackground>
          {/* Wallet Active */}
          {
            this.state.WalletActive ? <TouchableOpacity activeOpacity={0.5} style={{ borderWidth: 2, borderColor: Constants.Colors.SkyBlue, marginBottom: this.state.WalletMarginBottom }} onPress={() => this.onClickWallet()}>
              <ImageBackground resizeMode='cover' style={{ marginBottom: scaleHeight(0) }} source={require("../../../assets/images/customer/blue.png")} >
                <View style={[styles.flexRow, { marginTop: scaleHeight(10), marginBottom: scaleHeight(10) }]}>
                  <View style={{ flex: 0.5, justifyContent: 'flex-start' }}>
                    <Text style={[styles.textStyle, { textAlign: 'left', marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5, color: Constants.Colors.White }]}>
                      {'Pay By Wallet'}
                    </Text>
                  </View>
                </View>

                <View style={[styles.flexRow, { marginBottom: scaleHeight(20) }]}>
                  <View style={[styles.flexRow, { flex: 0.7, justifyContent: 'flex-start', alignItems: 'center', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                    <Image source={Constants.Images.customer.wallet} style={[styles.PayIcon]} resizeMode={'contain'} />
                    <View>
                      <Text style={[styles.textStyleSmall, { textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3, marginBottom: scaleHeight(5) }]}>
                        {'$250'}
                      </Text>
                      <Text style={[styles.textStyleSmall, { color: Constants.Colors.White, textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3 }]}>
                        {'Pay $60 by your DelGate wallet'}
                      </Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity> : <TouchableOpacity activeOpacity={0.5} style={{ borderWidth: 0, borderColor: 'transparent', marginBottom: this.state.WalletMarginBottom }} onPress={() => this.onClickWallet()}>
                <ImageBackground resizeMode='cover' style={{ marginBottom: scaleHeight(0) }} source={require("../../../assets/images/customer/blue.png")} >
                  <View style={[styles.flexRow, { marginTop: scaleHeight(10), marginBottom: scaleHeight(10) }]}>
                    <View style={{ flex: 0.5, justifyContent: 'flex-start' }}>
                      <Text style={[styles.textStyle, { textAlign: 'left', marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5, color: Constants.Colors.White }]}>
                        {'Pay By Wallet'}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.flexRow, { marginBottom: scaleHeight(20) }]}>
                    <View style={[styles.flexRow, { flex: 0.7, justifyContent: 'flex-start', alignItems: 'center', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                      <Image source={Constants.Images.customer.wallet} style={[styles.PayIcon]} resizeMode={'contain'} />
                      <View>
                        <Text style={[styles.textStyleSmall, { textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3, marginBottom: scaleHeight(5) }]}>
                          {'$250'}
                        </Text>
                        <Text style={[styles.textStyleSmall, { color: Constants.Colors.White, textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3 }]}>
                          {'Pay $60 by your DelGate wallet'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
          }

          {/* Paypal Active */}

          {
            this.state.PaypalActive ? <TouchableOpacity activeOpacity={0.5} style={{ borderWidth: 2, borderColor: Constants.Colors.SkyBlue }} onPress={() => this.onClickPaypal()}>
              <ImageBackground resizeMode='cover' style={{ marginBottom: scaleHeight(0) }} source={require("../../../assets/images/customer/blue.png")} >
                <View style={[styles.flexRow, { marginTop: scaleHeight(10), marginBottom: scaleHeight(10) }]}>
                  <View style={{ flex: 0.5, justifyContent: 'flex-start' }}>
                    <Text style={[styles.textStyle, { textAlign: 'left', marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5, color: Constants.Colors.White }]}>
                      {'Pay By PayPal'}
                    </Text>
                  </View>
                </View>
                <View style={[styles.flexRow, { marginBottom: scaleHeight(20) }]}>
                  <View style={[styles.flexRow, { flex: 0.7, justifyContent: 'flex-start', alignItems: 'center', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                    <Image source={Constants.Images.customer.paypal} style={[styles.PaypalIcon]} resizeMode={'contain'} />
                    <View>
                      <Text style={[styles.textStyleSmall, { textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3, marginBottom: scaleHeight(5) }]}>
                        {'PayPal'}
                      </Text>
                      <Text style={[styles.textStyleSmall, { color: Constants.Colors.White, textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3 }]}>
                        {'Pay $60 by your PayPal wallet'}
                      </Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity> : <TouchableOpacity activeOpacity={0.5} style={{ borderWidth: 0, borderColor: 'transparent' }} onPress={() => this.onClickPaypal()}>
                <ImageBackground resizeMode='cover' style={{ marginBottom: scaleHeight(0) }} source={require("../../../assets/images/customer/blue.png")} >
                  <View style={[styles.flexRow, { marginTop: scaleHeight(10), marginBottom: scaleHeight(10) }]}>
                    <View style={{ flex: 0.5, justifyContent: 'flex-start' }}>
                      <Text style={[styles.textStyle, { textAlign: 'left', marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5, color: Constants.Colors.White }]}>
                        {'Pay By PayPal'}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.flexRow, { marginBottom: scaleHeight(20) }]}>
                    <View style={[styles.flexRow, { flex: 0.7, justifyContent: 'flex-start', alignItems: 'center', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                      <Image source={Constants.Images.customer.paypal} style={[styles.PaypalIcon]} resizeMode={'contain'} />
                      <View>
                        <Text style={[styles.textStyleSmall, { textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3, marginBottom: scaleHeight(5) }]}>
                          {'PayPal'}
                        </Text>
                        <Text style={[styles.textStyleSmall, { color: Constants.Colors.White, textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3 }]}>
                          {'Pay $60 by your PayPal wallet'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
          }
        </ScrollView>

        <View>
          <ShadowButton
            onPress={() => this.onClickPay()}
            text={'Proceed to pay'}
            style={[styles.ButtonStyle]}
            textStyle={[styles.ButtonTextStyle, { color: this.state.ActivePayTextColor, }]}
          />
          {/* <SubmitButton
            onPress={() => this.onClickPay()}
            text={'Proceed to pay'}
            style={[styles.ButtonStyle, { backgroundColor: this.state.ActivePayBackColor, borderColor: this.state.ActivePayBackColor, }]}
            textStyle={[styles.ButtonTextStyle, { color: this.state.ActivePayTextColor, }]}
          /> */}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <KeyboardAvoidingView style={styles.transaparentView} behavior={(Platform.OS === 'ios') ? "padding" : null}>
            <ScrollView style={{ flex: 1 }}>
              <View style={styles.modalContent} >
                <KeyboardAvoidingView style={styles.centerView} behavior={(Platform.OS === 'ios') ? "padding" : null}>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: scaleHeight(10) }}>
                    {/* <Text style={{ color: Constants.Colors.DarkGrey, fontSize: normalizeFont(18), fontWeight: '400' }}>Add Card</Text> */}
                    <TouchableOpacity activeOpacity={0.2} onPress={() => { this.setState({ modalVisible: false }) }}>
                      <Text style={{ fontWeight: '600', fontSize: scaleHeight(30), color: Constants.Colors.Orange, marginTop: scaleHeight(-8) }}>x</Text>
                    </TouchableOpacity>
                  </View>
                  {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: scaleHeight(15) }}>
          <View style={{ height: scaleHeight(80), width: scaleWidth(80), borderRadius: scaleHeight(40), backgroundColor: Constants.Colors.LightGray }}>
            <Image resizeMode='center' style={styles.cardImage} source={Constants.Images.customer.newCard} />
          </View>
        </View> */}
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={styles.circleLogo}>
                      <Image
                        resizeMode='center'
                        style={styles.imgCont}
                        source={Constants.Images.customer.newCard}
                      />
                    </View>
                  </View>
                  <Text style={{ color: Constants.Colors.DarkBlue, fontSize: normalizeFont(22), fontWeight: '400', textAlign: 'center', marginBottom: scaleHeight(15) }}>Add Card</Text>
                  <Text style={[styles.textView, { marginBottom: scaleHeight(20) }]}>{'Credit & Debit Cards'}</Text>
                  <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    placeholderTextColor="#9C9C9C"
                    multiline={false}
                    maxLength={16}
                    keyboardType={'number-pad'}
                    returnKeyType='done'
                    onChangeText={(value) => this.setState({ cardNo: value })}
                    value={this.state.cardNo}
                  />
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: scaleHeight(20) }}>
                    <Text style={styles.textView}>Valid Through</Text>
                    <Text style={[styles.textView, { marginLeft: scaleWidth(60) }]}>CVV</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: scaleHeight(12) }}>
                    <TextInput
                      style={[styles.input, { width: scaleWidth(70) }]}
                      underlineColorAndroid="transparent"
                      placeholder="MM"
                      placeholderTextColor="#9C9C9C"
                      multiline={false}
                      maxLength={2}
                      keyboardType={'number-pad'}
                      returnKeyType='done'
                      onChangeText={(value) => this.setState({ month: value })}
                      value={this.state.month}
                    />
                    <TextInput
                      style={[styles.input, { width: scaleWidth(70), marginLeft: scaleWidth(10) }]}
                      underlineColorAndroid="transparent"
                      placeholder="YYYY"
                      placeholderTextColor="#9C9C9C"
                      multiline={false}
                      maxLength={4}
                      keyboardType={'number-pad'}
                      returnKeyType='done'
                      onChangeText={(value) => this.setState({ year: value })}
                      value={this.state.year}
                    />
                    <TextInput
                      style={[styles.input, { width: scaleWidth(160), marginLeft: scaleWidth(10) }]}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#9C9C9C"
                      multiline={false}
                      maxLength={4}
                      returnKeyType='done'
                      onChangeText={(value) => this.setState({ cvvCode: value })}
                      value={this.state.cvvCode}
                    />
                  </View>
                  <Text style={[styles.textView, { marginBottom: scaleHeight(20) }]}>{'Name on Card'}</Text>
                  <TextInput
                    style={[styles.input, { marginBottom: scaleHeight(20) }]}
                    underlineColorAndroid="transparent"
                    placeholder="ENTER NAME"
                    placeholderTextColor="#9C9C9C"
                    multiline={false}
                    returnKeyType='done'
                    onChangeText={(value) => this.setState({ name: value })}
                    value={this.state.name}
                  />

                  <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: scaleHeight(20) }} onPress={() => this.check()}>
                    <Image source={this.state.saveCard ? Constants.Images.customer.rectCheckOn : Constants.Images.customer.rectCheckOff} style={[{ width: 20, height: 20, borderColor: Constants.Colors.DarkGrey, borderWidth: scaleHeight(1.5) }]} resizeMode={'contain'} />
                    <Text style={[styles.textView, { marginLeft: scaleWidth(10) }]}>Save this card</Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={.5} style={styles.button} onPress={() => this.cardPay()}>
                    <Text style={[styles.textView, { fontWeight: '600', color: Constants.Colors.DarkGrey, fontSize: normalizeFont(22) }]}>{'Proceed to Pay'}</Text>
                  </TouchableOpacity>
                </KeyboardAvoidingView>
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
        </Modal>

      </View >
    );
  }
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  PayIcon: {
    //marginTop: 5,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 10,
    //marginRight:Constants.BaseStyle.DEVICE_WIDTH/100 * 1,
    //tintColor:Constants.Colors.Blue,
  },
  PaypalIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 10,
  },
  PayTitleIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 9,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 18,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: Constants.Colors.LightGray,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
  },
  textStyleTop: {
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    textAlign: 'center',
    color: Constants.Colors.LightGray,
  },
  textStyle: {
    fontSize: Constants.CustomerFonts.small_13.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    textAlign: 'center',
    color: '#081933',
    fontSize: normalizeFont(16)
  },
  textStyleSmall: {
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    textAlign: 'center',
    color: Constants.Colors.LightGray,
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
  inputStyle: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: Constants.Colors.White,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
    height: scaleHeight(40),
    width: scaleWidth(150),
    backgroundColor: Constants.Colors.White
  },

  textView: {
    color: Constants.Colors.DarkGrey, fontSize: normalizeFont(16)
  },
  input: {
    height: scaleHeight(48), borderColor: Constants.Colors.LightGray, borderWidth: scaleWidth(1), backgroundColor: '#FFFFFF', fontSize: normalizeFont(17), marginBottom: scaleHeight(20), paddingHorizontal: 10,
  },
  button: {
    width: scaleWidth(320),
    alignSelf: 'center',
    height: scaleHeight(50),
    borderRadius: scaleHeight(5),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: scaleHeight(10),
    backgroundColor: Constants.Colors.LightGray,
  },
  centerView: { borderRadius: 5, backgroundColor: '#fff', },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    height: scaleHeight(25),
    width: scaleWidth(25)
  },
  circleLogo: {
    height: scaleHeight(85),
    width: scaleHeight(85),
    borderRadius: scaleHeight(42.5),
    backgroundColor: Constants.Colors.LightGray,
    marginBottom: scaleHeight(15)
  },
  imgCont: {
    width: scaleWidth(45),
    height: scaleHeight(45),
    marginLeft: scaleWidth(18),
    marginTop: scaleHeight(20)
  },
  transaparentView: { flex: 1, backgroundColor: Constants.Colors.LightBlue },
});

export default connect(state => ({ state: state.CustomerReducer }))(Home_PaymentProceed);
