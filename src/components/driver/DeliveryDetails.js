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
  View,
  Linking,
  Image,
  TouchableHighlight,
  KeyboardAvoidingView,
  Button,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal
} from 'react-native';
import { connect } from 'react-redux';

import Background from '../../components/common/Background';
import Constants from "../../constants";
import FormTextInput from "../../components/common/FormTextInput";
import SubmitButton from "../../components/common/FormSubmitButton";
import * as UserActions from '../../redux/modules/user';
import ProductDetails from "../../components/driver/ProductDetails"
let NavData = require("../../assets/images/v.png");
let test;


//import schedule from "../../../redux/modules/schedule";
//import orderTest from "../../../redux/modules/orders";

import { bindActionCreators } from "redux";
var navigator = null;
let that = null;
onGoingPage = false;

var strButtonText = ['I\'VE ARRIVED', 'PICK', 'NEXT STOP', 'DROP OFF'];
class DeliveryDetails extends Component {

  componentWillUnmount() {

    onGoingPage = false;

  }

  componentDidMount() {
    //  this.props.changeAnnotation();
    if (this.props.test)
      this.props.test();
  }


  deg2rad = (deg) => {
    return deg * (Math.PI / 180)
  }


  getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2 - lat1) * (Math.PI / 180);  // deg2rad below
    var dLon = (lon2 - lon1) * (Math.PI / 180);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((Math.PI / 180) * (lat1)) * Math.cos((Math.PI / 180) * (lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d * 1000;
  }

  convertInMeter = (dist) => {
    if (dist.split(" ")[1] == 'km')
      return dist.split(" ")[0] * 1000
    else
      return dist.split(" ")[0]

  }


  constructor(props) {
    super(props);
    let pick = '';
    let drop = '';
    order = this.props.orderstate.OrderData.placedOrderData;
    orderData = order.orders
    //locationData:state.reducer 

    that = this;

    dropAddress = '';
    pickupAddress = '';

    if (orderData.length > 0) {
      this.props.orderstate.OrderData.placedOrderData.orders.map(data => {


        data.drop_location.map(mark => {
          dropAddress = dropAddress + mark.address + " ";
        })

        data.pickup.map(mark => {
          pickupAddress = pickupAddress + mark.address + " ";
        })

      });

      pick = '- Pick from -' + pickupAddress;
      drop = '- Drop to -' + dropAddress;
    }


    this.state = {
      code: '',
      ButtonText: strButtonText[0],
      ButtonState: 0,
      pick: pick,
      drop: drop,
      range: that.props.locationData.nextPickUpLocation != null && that.props.locationData.nextPickUpLocation[0] ? this.convertInMeter(that.props.locationData.nextPickUpLocation[0].distance.text) : 0,
      orderId: order._id,
      currentStatus: that.props.locationData.nextPickUpLocation != null && that.props.locationData.nextPickUpLocation[0] ? that.props.locationData.nextPickUpLocation[0].type : '',
      end_address: that.props.locationData.nextPickUpLocation != null && that.props.locationData.nextPickUpLocation[0] ? "Navigate To " + that.props.locationData.nextPickUpLocation[0].end_address : '',
      ProductDetailsModalVisibility: false
    }

    var test;
    if (that.props.locationData.nextPickUpLocation != null && that.props.locationData.nextPickUpLocation[0]) {
      this.setState({ end_address: that.props.locationData.nextPickUpLocation[0].end_address })

      test = setInterval(function () {
        if (that.props.locationData.nextPickUpLocation[0]) {
          let currentLocation = that.props.locationData.currentLocation;
          try {
            if (currentLocation != null) {
              coords = currentLocation.coords
              that.setState({
                range: that.getDistanceFromLatLonInKm(that.props.locationData.nextPickUpLocation[0].end_location.lat
                  , that.props.locationData.nextPickUpLocation[0].end_location.lng, coords.latitude, coords.longitude)
              })
              //alert(that.state.range);

            }
          }
          catch (ex) {
            clearInterval(test);
          }
        }
        else {
          clearInterval(test);
        }
      }, 8000);
    }

    //    alert(pick)

  }



  ScreenNo1() {
    // alert(this.props.userData.data._id)
    return (
      <View style={[{ flexDirection: 'row', marginBottom: 10 }]}>
        {<View style={[{ flex: 1 }]}>
          <SubmitButton
            onPress={() => {

              var lat_long = this.props.locationData.currentLocation.coords.latitude + ',' + this.props.locationData.currentLocation.coords.longitude;

              this.props.UserActions.acceptOrder({
                orderId: this.state.orderId,
                driverId: this.props.userData.data._id, lat_long: lat_long
              }).then((response) => {
                navigator('Orders_ScheduledOrder')
              }).catch((data) => {

              })
            }
            }
            text={'ACCEPT'}
            style={[styles.ButtonStyle, { backgroundColor: Constants.Colors.DarkBlue }]}
            textStyle={[{ fontSize: 15 }]}
          />

          <SubmitButton
            onPress={() => {
              var lat_long = this.props.locationData.currentLocation.coords.latitude + ',' + this.props.locationData.currentLocation.coords.longitude;
              console.log({
                orderId: this.state.orderId,
                driverId: this.props.userData.data._id
              });
              this.props.UserActions.rejectOrder({
                orderId: this.props.orderstate.OrderData.placedOrderData.orderId,
                driverId: this.props.userData.data._id
              }).then((response) => {

                this.props.goBack();

              }).catch((response) => {
                console.log("reponse in catch", response)


              })
            }
            }
            text={'REJECT'}
            style={[styles.ButtonStyle, { backgroundColor: Constants.Colors.DarkBlue }]}
            textStyle={[{ fontSize: 15 }]}
          />

        </View>
        }
      </View>
    )
  }

  ScreenNo2() {


    return (
      <View style={[{ flexDirection: 'row', marginBottom: 10 }]}>
        {<View style={[{ flex: 1 }]}>
          <SubmitButton
            onPress={() => {
              var lat_long = this.props.locationData.currentLocation.coords.latitude + ',' + this.props.locationData.currentLocation.coords.longitude;
              this.props.UserActions.scheduledOrder({
                orderId: this.state.orderId,
                driverId: this.props.userData.data._id, lat_long: lat_long
              }).then((response) => {
                if (response && response.length > 0)
                  navigator('OnGoing');
                else {
                  alert("No route found..");
                }
              })
            }
            }
            text={'START'}
            style={[styles.ButtonStyle, { backgroundColor: Constants.Colors.DarkBlue }]}
            textStyle={[{ fontSize: 15 }]}
          />
        </View>}


      </View>
    )
  }

  setButtonText() {
    var count = this.state.ButtonState + 1;
    if (count < 4)
      this.setState({ ButtonState: count, ButtonText: strButtonText[count] });
    else {
      navigator('OrderDelivered');
    }
  }



  ScreenNo3() {

    let showButton = false;
    onGoingPage = true;
    if (that.props.locationData.nextPickUpLocation != null && that.props.locationData.nextPickUpLocation[0])
      showButton = true;

    return (
      <View style={[{ flexDirection: 'column', marginBottom: 10 }]}>
        { /*this.state.range<200*/  showButton && <View style={[{ flex: 1 }]}>
          <SubmitButton
            onPress={() => {
              this.markPickUpArrived()
            }
            }
            text={this.state.ButtonText}
            style={[styles.ButtonStyle, { backgroundColor: Constants.Colors.DarkBlue }]}
            textStyle={[{ fontSize: 15 }]}
          />
        </View>

        }

        {that.props.locationData.nextPickUpLocation != null && that.props.locationData.nextPickUpLocation[0] && <SubmitButton
          onPress={() => {
            navigator('PickUpPrioirty', {
              itemId: 86,
              changeRoute: () => {
                this.changeRoute();
              }


            });

          }}
          text={'Change Pickup/Dropoff Priority'}
          style={[styles.ButtonStyle, { backgroundColor: Constants.Colors.DarkBlue }]}
          textStyle={[{ fontSize: 15 }]}
        />

        }


        {that.props.locationData.nextPickUpLocation != null && that.props.locationData.nextPickUpLocation[0] &&

          <SubmitButton
            onPress={() => {

              Linking.openURL('google.navigation:q=' + this.props.locationData.nextPickUpLocation[0].end_location.lat
                + ',' + this.props.locationData.nextPickUpLocation[0].end_location.lng)

            }}
            text={this.state.end_address + ' ' + parseFloat(this.state.range).toFixed(2) + ' mtr left'}
            style={[styles.ButtonStyle, { backgroundColor: Constants.Colors.DarkBlue }]}
            textStyle={[{ fontSize: 15 }]}
          />

        }

      </View>
    )
  }




  changeRoute = () => {

    var lat_long = this.props.locationData.currentLocation.coords.latitude + ',' + this.props.locationData.currentLocation.coords.longitude;


    this.props.UserActions.scheduledOrder({
      driverId: this.props.userData.data._id, lat_long: lat_long
    }).then((response) => {

      this.setState({
        range: that.props.locationData.nextPickUpLocation != null ? this.convertInMeter(that.props.locationData.nextPickUpLocation[0].distance.text) : 0,
        currentStatus: that.props.locationData.nextPickUpLocation != null ? that.props.locationData.nextPickUpLocation[0].type : '',
        end_address: that.props.locationData.nextPickUpLocation != null ? "Navigate To " + that.props.locationData.nextPickUpLocation[0].end_address : '',
        ButtonText: 'I\'VE ARRIVED'

      })
    })



  }


  markPickUpArrived = () => {

    var lat_long = this.props.locationData.currentLocation.coords.latitude + ',' + this.props.locationData.currentLocation.coords.longitude;


    if (this.state.currentStatus == 'Completed')
      return;
    if (this.state.ButtonText == 'DROP OFF') {
      this.props.UserActions.dropDone({
        dropupId: this.props.locationData.nextPickUpLocation[0]._id,
        orderId: this.props.locationData.nextPickUpLocation[0].order_id
      }).then((response) => {
        if (response.ok == 1)
          this.setState({
            ButtonText: 'NEXT STOP',
            currentStatus: ''
          });

      });
      return;

    }

    if (this.state.currentStatus == 'dropoff') {
      this.props.UserActions.dropArrive({
        dropupId: this.props.locationData.nextPickUpLocation[0]._id,
        orderId: this.props.locationData.nextPickUpLocation[0].order_id
      }).then((response) => {
        if (response.ok == 1)
          this.setState({ ButtonText: 'DROP OFF' });

      });
      return;
    }
    if (this.state.ButtonText == 'NEXT STOP') {
      this.props.UserActions.scheduledOrder({
        driverId: this.props.userData.data._id, lat_long: lat_long
      }).then((response) => {
        if (!response) {
          alert("Your Order Completed Successfully.");

          this.setState({
            range: 0,
            currentStatus: 'Completed',
            ButtonText: 'Order Completed Successfully',
          })

          return;
        }
        this.setState({
          range: that.props.locationData.nextPickUpLocation != null ? this.convertInMeter(that.props.locationData.nextPickUpLocation[0].distance.text) : 0,
          currentStatus: that.props.locationData.nextPickUpLocation != null ? that.props.locationData.nextPickUpLocation[0].type : '',
          end_address: that.props.locationData.nextPickUpLocation != null ? "Navigate To " + that.props.locationData.nextPickUpLocation[0].end_address : '',
          ButtonText: 'I\'VE ARRIVED'

        })
      })
      if (this.props.test)
        this.props.test();
      return;
    }


    if (this.state.ButtonText == 'PICK') {



      this.props.UserActions.pickUpDone({ pickupId: this.props.locationData.nextPickUpLocation[0]._id }).then((response) => {

        if (response.ok == 1) {
          if (this.state.currentStatus == 'pickup') {
            this.setState({ ButtonText: 'NEXT STOP' });
          }
          else if (this.state.currentStatus == 'dropoff') {

          }
          else {
          }
        }


      });
      return;
    }


    this.props.UserActions.markArrive({ pickupId: this.props.locationData.nextPickUpLocation[0]._id }).then((response) => {
      // alert(JSON.stringify(response) +'   ' +this.state.currentStatus);
      if (response.ok == 1) {

        if (this.state.currentStatus == 'pickup') {
          this.setState({ ButtonText: 'PICK' });
        }
        else if (this.state.currentStatus == 'dropUp') {

        }
      }


    });


  };


  render() {
    let {
      navigate, ButtonScreenNo
    } = this.props;

    navigator = navigate;


    var BottomButtons = null;
    if (parseInt(ButtonScreenNo) == 1) {
      BottomButtons = this.ScreenNo1();
    }
    else if (parseInt(ButtonScreenNo) == 2) {
      BottomButtons = this.ScreenNo2();
    }
    else if (parseInt(ButtonScreenNo) == 3) {
      BottomButtons = this.ScreenNo3();
    }
    console.log("this.props", this.props)
    return (
      <View style={{}}>
        {(this.props.orderstate.ScreenMaxFlag === true) ?
          (this.state.ButtonState < 2) ?
            (parseInt(ButtonScreenNo) == 4) ?
              <View >
                <View style={[styles.row, { marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3, justifyContent: 'flex-start' }]}>
                  <Image style={[styles.smallIcon]} source={Constants.Images.driver.service} />
                  <Text style={[styles.itemInBlue, { fontSize: 14, fontWeight: '900', alignSelf: 'center' }]}>{'Delivery Details'}</Text>
                </View>
                <View style={[{ borderTopWidth: 1, borderBottomWidth: 1, borderBottomColor: Constants.Colors.BlurGrey, borderTopColor: Constants.Colors.Blue }]}>
                  <View>
                    <View style={[styles.row, { marginBottom: 10, marginTop: 5, marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3 }]}>
                      <View style={{ flex: 2 }}><Text style={[styles.itemInBlue, { fontSize: 11 }]}>{this.state.pick}</Text></View>
                      <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => this.setState({ ProductDetailsModalVisibility: false })}
                      >
                        <View >

                          <Text style={[styles.itemInOrange, { fontSize: 11, textAlign: 'right', textDecorationLine: 'underline' }]}>{'Product Detail'}</Text>
                        </View>
                      </TouchableOpacity>

                      <View style={{ flex: 1 }}><Text style={[styles.itemInBlue, { fontSize: 11, textAlign: 'right' }]}>{'ORDER PICKED'}</Text></View>
                    </View>
                    <View style={[styles.row, { marginBottom: 10, marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3 }]}>
                      <View style={{ flex: 2 }}><Text style={[styles.itemInBlue, { fontSize: 11 }]}>{this.state.drop}</Text></View>
                      <View style={{ flex: 1 }}><Text style={[styles.itemInOrange, { fontSize: 11, textAlign: 'right' }]}>{''}</Text></View>
                      <View style={{ flex: 1 }}><Text style={[styles.itemInBlue, { fontSize: 11, textAlign: 'right' }]}>{'ORDER DELIVERED'}</Text></View>
                    </View>
                    <Modal animationType={"fade"} transparent={true} visible={this.state.ProductDetailsModalVisibility}
                    // onRequestClose={() => {this.props.navigation.dispatch({type:'PHONEVERIFICATION_VISIBILITY',visibility:false})}}
                    >
                      <ProductDetails navigation={navigate} dispatch={this.props.navigation} closeModal={() => {
                        this.setState({ ProductDetailsModalVisibility: false })
                      }} />
                    </Modal>
                  </View>
                  {BottomButtons}
                </View>
              </View>
              :
              <View style={{}}>
                <View style={[styles.row, { marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3, justifyContent: 'flex-start' }]}>
                  <Image style={[styles.smallIcon]} source={Constants.Images.driver.service} />
                  <Text style={[styles.itemInBlue, { fontSize: 14, fontWeight: '900', alignSelf: 'center' }]}>{'Delivery Details'}</Text>
                </View>
                <View style={[{ borderTopWidth: 1, borderBottomWidth: 1, borderBottomColor: Constants.Colors.BlurGrey, borderTopColor: Constants.Colors.Blue }]}>
                  <View>
                    <View style={[styles.row, { marginBottom: 10, marginTop: 5, marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3 }]}>
                      <View style={{ flex: 0.70 }}><Text style={[styles.itemInBlue, { color: Constants.Colors.LightGray, fontSize: 12 }]}>{this.state.pick}</Text></View>
                      <TouchableOpacity
                        onPress={() => this.setState({ ProductDetailsModalVisibility: false })}

                      >
                        <View style={{ flex: 0.30 }}><Text style={[styles.itemInOrange, { fontSize: 12, textAlign: 'right', textDecorationLine: 'underline' }]}>{'Product Detail'}</Text></View>
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.row, { marginBottom: 10, marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3 }]}>
                      <View style={{ flex: 0.70 }}><Text style={[styles.itemInBlue, { color: Constants.Colors.LightGray, fontSize: 12 }]}>{this.state.drop}</Text></View>
                      <View style={{ flex: 0.30 }}><Text style={[styles.itemInOrange, { fontSize: 12, textAlign: 'right' }]}>{' '}</Text></View>
                    </View>

                  </View>
                  {BottomButtons}
                </View>
                <Modal animationType={"fade"} transparent={true} visible={this.state.ProductDetailsModalVisibility}
                // onRequestClose={() => {this.props.navigation.dispatch({type:'PHONEVERIFICATION_VISIBILITY',visibility:false})}}
                >
                  <ProductDetails navigation={navigate} dispatch={this.props.navigation} closeModal={() => {
                    this.setState({ ProductDetailsModalVisibility: false })
                  }} />
                </Modal>
              </View>
            :
            <View style={{}}>
              <View style={[styles.row, { marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3, justifyContent: 'flex-start' }]}>
                <Image style={[styles.smallIcon]} source={Constants.Images.driver.service} />
                <Text style={[styles.itemInBlue, { fontSize: 14, fontWeight: '900', alignSelf: 'center' }]}>{'Delivery Details'}</Text>
              </View>
              <View style={[{ borderTopWidth: 1, borderBottomWidth: 1, borderBottomColor: Constants.Colors.BlurGrey, borderTopColor: Constants.Colors.Blue }]}>
                <View>
                  <View style={[styles.row, { marginBottom: 10, marginTop: 5, marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3 }]}>
                    <View style={{ flex: 2 }}><Text style={[styles.itemInBlue, { fontSize: 11 }]}>{'- Pick from Subway, block B, Edmonton'}</Text></View>
                    <TouchableOpacity
                      onPress={() => this.setState({ ProductDetailsModalVisibility: false })}
                    >  <View style={{ flex: 1 }}><Text style={[styles.itemInOrange, { fontSize: 11, textAlign: 'right', textDecorationLine: 'underline' }]}>{'Product Detail'}</Text></View></TouchableOpacity>
                    <View style={{ flex: 1 }}><Text style={[styles.itemInBlue, { fontSize: 11, textAlign: 'right' }]}>{'ORDER PICKED'}</Text></View>
                  </View>
                  <View style={[styles.row, { marginBottom: 10, marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3 }]}>
                    <View style={{ flex: 2 }}><Text style={[styles.itemInBlue, { color: Constants.Colors.Gray, fontSize: 12 }]}>{'- Drop to 9923, Edmonton Canada'}</Text></View>
                    <View style={{ flex: 1 }}><Text style={[styles.itemInOrange, { fontSize: 11, textAlign: 'right' }]}>{''}</Text></View>
                    <View style={{ flex: 1 }}><Text style={[styles.itemInBlue, { fontSize: 11, textAlign: 'right' }]}>{' '}</Text></View>
                  </View>

                </View>
                {BottomButtons}
              </View>
              <Modal animationType={"fade"} transparent={true} visible={this.state.ProductDetailsModalVisibility}
              // onRequestClose={() => {this.props.navigation.dispatch({type:'PHONEVERIFICATION_VISIBILITY',visibility:false})}}
              >
                <ProductDetails navigation={navigate} dispatch={this.props.navigation} closeModal={() => {
                  this.setState({ ProductDetailsModalVisibility: false })
                }} />
              </Modal>
            </View>
          :
          <View>
            {BottomButtons}
          </View>
        }
        <View>
          {onGoingPage
            &&
            <ScrollView style={{ flexDirection: 'row', zIndex: -1, height: 100 }}
              horizontal={true} alwaysBounceHorizontal={true} showsHorizontalScrollIndicator={false}>
              {this.props.orderstate.ongoingResult.ongoingOrders &&
                this.props.orderstate.ongoingResult.ongoingOrders.map(ongoingOrder => {

                  return (<SubmitButton
                    onPress={() => {

                    }
                    }
                    text={ongoingOrder.orderId}
                    style={[styles.ButtonStyle, { backgroundColor: Constants.Colors.DarkBlue, width: 80, height: 60 }]}
                    textStyle={[{ fontSize: 15 }]}
                    key={ongoingOrder.orderId}
                  />)

                })}


            </ScrollView>}
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardView: {
    backgroundColor: '#fff',
    borderColor: Constants.Colors.BlurGrey,
    borderWidth: 0.5,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 5,
  },
  smallIcon: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1,
    //transform: [{rotate: '180deg'}],
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flex: 1,
  },

  itemRight: {
    flexDirection: "row",
    //height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3,
    alignItems: "center",
    justifyContent: 'flex-end'
  },

  clockIcon: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1
  },
  itemInBlue: {
    fontSize: 12,
    color: Constants.Colors.Blue
  },
  itemInOrange: {
    fontSize: 16,
    fontWeight: '900',
    color: Constants.Colors.Orange
  },
  ButtonStyle: {
    borderWidth: 0,
    borderRadius: 5,
  },


});


const mapStateToProps = state => ({
  modalstate: state.ModalHandleReducer,
  orderstate: state.OrdersHandleReducer,
  userData: (state.user && state.user.driverData) || (state.user && state.user.userData),
  locationData: state.location
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryDetails);



