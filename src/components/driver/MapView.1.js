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
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  DatePickerAndroid,
  TimePickerAndroid,
  TouchableHighlight,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';

import { connect } from 'react-redux';


import Constants from "../../constants";
import SubmitButton from "../../components/common/FormSubmitButton";

import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import { ToastActionsCreators } from 'react-native-redux-toast';
import PickUpLocation from './PickUpLocation';
import { BoxShadow } from 'react-native-shadow';

import Picker from 'react-native-wheel-picker'
var PickerItem = Picker.Item;

import moment from 'moment';
const LATITUDE_DELTA = 1;
const LONGITUDE_DELTA = 1;//LATITUDE_DELTA * ASPECT_RATIO;
var navigate = null;
var goBack = null;
var watchID: ?number = null;
var _key = 0;
class CustomerMapView extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      error: null,

      initialPosition:
      {
        latitude: 28.6139,
        longitude: 77.2090,
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
      markerPosition: {
        latitude: 28.6139,
        longitude: 77.2090,
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
      isVisible: false,
      selectedItem: 4,
      durationTime: ['3 hours', '4 hours', '5 hours', '6 hours', '7 hours', '8 hours', '9 hours', '10 hours', '11 hours', '12 hours', '13 hours', '14 hours', '15 hours', '16 hours', '17 hours', '18 hours',
        '19 hours', '20 hours', '21 hours', '22 hours', '23 hours', '24 hours'],
    }

    this.initialPosition = this.state.initialPosition;
    this.markerPosition = this.state.markerPosition;
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
      //this.props.dispatch({type:'SET_INITIALLOCATION',initialPosition:initialRegion,markerPosition:initialRegion});
      this.setState({ initialPosition: initialRegion });
      this.setState({ markerPosition: initialRegion });
      this.props.dispatch({ type: 'SET_INITIALLOCATION', initialPosition: this.state.initialPosition, markerPosition: this.state.markerPosition });
    },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 3000 },
    );

    this.watchID = navigator.geolocation.getCurrentPosition((position) => {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;

      var lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
      this.setState({ initialPosition: lastRegion });
      this.setState({ markerPosition: lastRegion });
    });

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }


  searchPlace(_flag) {
    var lendrop = this.props.state.dropArr.length - 1;
    var lenpick = this.props.state.pickupArr.length - 1;
    var addFlag = true;
    if (_flag == 1)//pickup
    {
      if (lenpick > 1) {
        if (lenpick == 3) {
          addFlag = false;
        }
        else if (lendrop == 1 && lenpick == 3) {
          addFlag = false;
        }
      }
      else if (lendrop > 1 && lenpick == 1) {
        addFlag = false;
      }
    }
    else if (_flag == 2) {
      if (lendrop > 1) {
        if (lendrop == 3) {
          addFlag = false;
        }
        else if (lenpick == 1 && lendrop == 3) {
          addFlag = false;
        }
      }
      else if (lendrop == 1 && lenpick > 1) {
        addFlag = false;
      }
    }



    if (addFlag) {
      this.props.dispatch({ type: 'SETPICKDROPFLAG', flag: _flag });
      this.props.dispatch({ type: 'PLACE_FINDER_MODAL', visibility: true });
    }
    else if (lendrop == 3 || lenpick == 3) {
      this.props.dispatch(ToastActionsCreators.displayInfo('You can enter max 3 pickup/drop locations.'));
      this.props.dispatch({ type: 'PLACE_FINDER_MODAL', visibility: false });
    }
    else {
      this.props.dispatch(ToastActionsCreators.displayInfo('You can enter multiple locations either for Pickups or for Drops.'));
      this.props.dispatch({ type: 'PLACE_FINDER_MODAL', visibility: false });
    }
  }

  vehicalList(item) {
    return (
      <View key={1} style={[{ backgroundColor: Constants.Colors.WhiteSmoke, height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 9.8, width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 25 }]}>
        <TouchableOpacity key={2} onPress={() => { this.setActiveTransport(item.tag) }}>
          <View key={3} style={{ alignItems: 'center', backgroundColor: item.backgroundColor, borderBottomColor: item.borderBottomColor, borderBottomWidth: item.borderBottomWidth }}>
            <Image key={4} source={item.displayimg} style={[styles.transportIcons, { alignItems: 'center' }]} resizeMode={'contain'} />
            <Text key={5} style={[styles.transportLabel]}>{item.header}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  setActiveTransport(id) {
    if (this.props.state.AddressCount > 0 || this.props.HourlyFlag != 0)
      this.props.dispatch({ type: 'ACTIVE_VEHICLE', tagid: id });
  }

  CallDatePicker() {
    //let context = this;
    DatePickerAndroid.open({
      date: new Date(this.props.state.HourlyServiceDate),
    }).then(({ action, year, month, day }) => {
      if (action !== DatePickerAndroid.dismissedAction) {
        var ss = new Date(year, month, day);
        var strDate = moment(ss).format('DD/MM/YYYY');
        this.props.dispatch({ type: 'SET_HOUR', displayDate: strDate, date: new Date(year, month, day) });
      }
    });
  }

  CallTimePicker() {
    //let context = this;
    var timeMoment = moment(this.props.state.HourlyServiceTime);
    TimePickerAndroid.open({
      hour: timeMoment.hour(),
      minute: timeMoment.minutes(),
      is24Hour: false,
    }).then(({ action, hour, minute, pm }) => {
      if (action !== DatePickerAndroid.dismissedAction) {
        var ss = moment().hour(hour).minute(minute).toDate();
        var strDate = moment(ss).format('hh:mm A');

        this.props.dispatch({ type: 'SET_TIME', displayTime: strDate, time: moment().hour(hour).minute(minute).toDate() });
      }
    });
  }

  setDurationTime() {
    this.props.dispatch({ type: 'SET_DURATION', displayDuration: this.state.durationTime[this.state.selectedItem] });
    this.setState({ isVisible: false });
  }


  clickOnEstimate() {
    //let { dispatch } = this.props.navigation;
    if (this.props.state.DeliveryServiceOpacity == 1 && this.props.state.HourlyFlag == 0) {
      this.props.dispatch({ type: 'SET_TABINDEX', index: 1 });
      this.props.dispatch({ type: 'SET_SELECTED_FLAG', selectedTabFlag: 1 });
      navigate('Home_Food');
      //  alert("TEST")
    }
    else if (this.props.state.HourlyServiceCount == 3 && this.props.state.HourlyFlag == 1) {
      var len = this.props.state.pickupArr.length;
      var pickup = [];
      var drop = [];

      this.props.state.Hourly_pickupArr.map((val, i) => {
        if (i < len - 1) {
          pickup[i] = val.lat + ',' + val.long;
        }
      });

      var len = this.props.state.Hourly_dropArr.length;
      this.props.state.Hourly_dropArr.map((val, i) => {
        if (i < len - 1) {
          drop[i] = val.lat + ',' + val.long;
        }
      });
      var duration = this.props.state.HourlyServiceDisplayDuration.toLowerCase().replace(' hours', '').replace(' hour', '');

      fetch('http://18.205.68.238:9000/api/place-order/vehiclecalculation/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'date': this.props.state.HourlyServiceDisplayDate,
          'time': this.props.state.HourlyServiceDisplayTime,
          'service_type': 0,
          'duration': duration,
        }),
      }).then((response) => response.json())
        .then((arr) => {
          this.props.dispatch({ type: 'SET_VEHICLECOST', _data: arr.data });
          this.props.dispatch({ type: 'SET_HOURLYSERVICE_TABINDEX', index: 1 });
          navigate('HourlyGetEstimate');
        })
        .catch((error) => {
          console.error(error);
        });



    }

  }


  onPickerSelect(index) {
    //this.props.dispatch({type:'SET_DURATION', displayDuration : this.state.durationTime[index]});
    this.setState({ selectedItem: index });
  }


  render() {
    navigate = this.props.navigation;
    goBack = this.props.navigation;
    const shadowForEstimate = {
      width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 95,
      height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7.2,
      color: "#000",
      border: 3,
      radius: 20,
      opacity: 0.1,
      x: 2,
      y: 2,
      style: {
        bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 23,
        marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2
      }
    };
    const shadowForPickup = {
      width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 95,
      height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6.4 * this.props.state.pickUpControlCount,
      color: "#000",
      border: 3,
      radius: 5,
      opacity: 0.1,
      x: 2,
      y: 2,
      style: {
        bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 91,
        marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
      }
    };
    const shadowForHour = {
      width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 95,
      height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 20.5,
      color: "#000",
      border: 3,
      radius: 5,
      opacity: 0.2,
      x: 2,
      y: 2,
      style: {
        bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 91,
        marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
      }
    };
    var vehiclePositions = null;

    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.rootContainer]}>

          <MapView

            style={{ height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 75, zIndex: 0 }}

          />





          {/* <MapView
              key={_key++}
              style={{height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 75,zIndex:0}}
              zoomEnabled={true}
              //initialRegion={this.props.state.initialPosition}
              region={this.props.state.initialPosition}
              showsUserLocation={true}
              followsUserLocation={true}
              pitchEnabled={false}
              rotateEnabled={false}
              //minZoomLevel={15}
              >
              <MapView.Circle
                center = { this.props.state.initialPosition }
                radius = { 50 }
                //strokeWidth = { 1 }
                strokeColor = { 'rgba(83,200,229,0.5)'}
                fillColor = { 'rgba(83,200,229,0.5)' }

                />

             
              {this.props.state.markerPositions.map((marker, i) => (
                    <MapView.Marker
                      coordinate={marker.coordinates}
                      title={marker.title}
                      image={marker.img}
                      key={marker.id}
                    />
                  ))}

            </MapView> */}
          <BoxShadow setting={shadowForEstimate}>
            <View style={[{ opacity: this.props.state.DeliveryServiceOpacity }]}>
              <TouchableHighlight underlayColor={Constants.Colors.WhiteSmoke}
                style={[styles.ButtonStyle, { backgroundColor: '#ffffff'/*this.props.state.EstimateButtonBackgroundColor*/, borderColor: '#ffffff'/*this.props.state.EstimateButtonBackgroundColor*/ }]}
                onPress={() => this.clickOnEstimate()}
              >
                <Text style={[styles.ButtonTextStyle, { color: this.props.state.EstimateColor, textAlign: "center", fontWeight: '900', fontSize: 18 }]}>
                  {'CONTINUE'}
                </Text>
              </TouchableHighlight>

            </View>
          </BoxShadow>

          <View style={[styles.subsubContainer, { opacity: 0.8/*this.props.state.DeliveryServiceOpacity*/ }]}>
            <FlatList data={this.props.state.TransportArr} renderItem={({ item }) => this.vehicalList(item)} horizontal={true} />
          </View>

          {this.props.HourlyFlag === 0 ?
            <BoxShadow setting={shadowForPickup}>
              <View style={[styles.ButtonPickupStyle, { opacity: 0.8/*this.props.state.DeliveryServiceOpacity*/, backgroundColor: '#ffffff'/*this.props.state.EstimateButtonBackgroundColor*/, borderColor: '#ffffff'/*this.props.state.EstimateButtonBackgroundColor*/ }]}>
                <PickUpLocation
                  onChangeText={() => this.searchPlace(1)}
                  onPress={() => this.searchPlace(1)}
                  PickDropFlag={1}
                  list={this.props.state.pickupArr}
                />
                <View style={[styles.horizontalLine, { marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 10 }]} />
                <PickUpLocation
                  onChangeText={() => this.searchPlace(2)}
                  onPress={() => this.searchPlace(2)}
                  PickDropFlag={2}
                  list={this.props.state.dropArr}
                  tintColor={[{ tintColor: '#F58436' }]}
                />
              </View>
            </BoxShadow>
            :
            <BoxShadow setting={shadowForHour}>
              <View style={[styles.ButtonPickupStyle, { opacity: 0.8/*this.props.state.DeliveryServiceOpacity*/, backgroundColor: '#ffffff'/*this.props.state.EstimateButtonBackgroundColor*/, borderColor: '#ffffff'/*this.props.state.EstimateButtonBackgroundColor*/ }]}>
                <TouchableOpacity onPress={() => this.CallDatePicker()}>
                  <View style={[styles.flexRow, { marginTop: 5, marginBottom: 5, alignItems: 'center' }]}>
                    <Image source={Constants.Images.customer.calendar} style={[styles.pickupIcons, { flex: 0.2 }]} resizeMode={'contain'} />
                    <Text style={styles.HourlyTextStyle}>
                      {'Date'}
                    </Text>
                    <Text style={[styles.HourlyRightText]}>
                      {this.props.state.HourlyServiceDisplayDate}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={[styles.horizontalLine]} />
                <TouchableOpacity onPress={() => this.CallTimePicker()}>
                  <View style={[styles.flexRow, { marginTop: 5, marginBottom: 5, alignItems: 'center' }]}>
                    <Image source={Constants.Images.customer.clock} style={[styles.pickupIcons, { flex: 0.2 }]} resizeMode={'contain'} />
                    <Text style={styles.HourlyTextStyle}>
                      {'Start Time'}
                    </Text>
                    <Text style={[styles.HourlyRightText]}>
                      {this.props.state.HourlyServiceDisplayTime}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={[styles.horizontalLine]} />
                <TouchableOpacity onPress={() => this.setState({ isVisible: true })}>
                  <View style={[styles.flexRow, { marginTop: 5, marginBottom: 5, alignItems: 'center' }]}>
                    <Image source={Constants.Images.customer.duration} style={[styles.pickupIcons, { flex: 0.2 }]} resizeMode={'contain'} />
                    <Text style={styles.HourlyTextStyle}>
                      {'Duration'}
                    </Text>
                    <Text style={[styles.HourlyRightText]}>
                      {this.props.state.HourlyServiceDisplayDuration}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={[styles.horizontalLine, { height: 0 }]} />
              </View>
            </BoxShadow>
          }

        </View>

        <Modal animationType={"fade"} transparent={true} visible={this.state.isVisible} onRequestClose={() => { this.setState({ isVisible: false }) }}>
          <View style={[styles.modalOuter]}>
            <View style={[styles.modalInner, { width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 80, borderRadius: 10, padding: 0 }]}>
              <View style={[styles.flexRow, { borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: '#EFEDED', borderBottomWidth: 1, borderBottomColor: '#969297', justifyContent: 'center', alignItems: 'center', height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5.5, }]}>
                <View style={{ flex: 1, justifyContent: 'flex-start', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }}>
                  <Text style={{ color: '#969297', fontFamily: Constants.CustomerFonts.semibold.fontFamily, fontSize: Constants.CustomerFonts.semibold.fontSize }}>{'Set Duration'}</Text>
                </View>
                <View style={[styles.flexRow, { justifyContent: 'flex-end' }]}>
                  <TouchableOpacity style={[styles.btCloseModal]} onPress={() => { this.setState({ isVisible: false }) }}>
                    <Image source={Constants.Images.customer.close} style={[styles.btnCloseModalIcon]} resizeMode={'contain'} />
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <View style={{ justifyContent: 'center', height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 30, marginBottom: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100, }}>
                  <Picker style={{ marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 30, width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 20, height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 15 }}
                    selectedValue={this.state.selectedItem}
                    itemStyle={{ color: '#081933', fontSize: 17 }}
                    onValueChange={(index) => this.onPickerSelect(index)}>
                    {this.state.durationTime.map((value, i) => (
                      <PickerItem label={value} value={i} key={"money" + value} />
                    ))}
                  </Picker>
                  <TouchableOpacity activeOpacity={0.5} style={[styles.OKButtonStyle]} onPress={() => this.setDurationTime()}>
                    <Text style={[styles.OKButtonTextStyle]}>
                      {'OK'}
                    </Text>
                  </TouchableOpacity>

                </View>
              </View>
            </View>
          </View>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constants.Colors.White,//'#F5FCFF'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalOuter: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 4,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInner: {
    margin: 10,
    padding: 3,
    backgroundColor: '#fff',
    position: 'relative',
  },
  btCloseModal: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  btnCloseModalIcon: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
  },
  durationViewStyle: {
    alignItems: 'center',
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 80,
  },

  flexRow: {
    flexDirection: 'row',
  },
  pickupIcons: {
    marginTop: 5,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
  },
  rootContainer: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 75,
    //width: Constants.BaseStyle.DEVICE_WIDTH,
    //marginHorizontal:10
  },
  subsubContainer: {
    bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 19,
    //marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
    //opacity: 0.87,
  },
  ButtonPickupStyle: {
    borderWidth: 1,
    borderRadius: 5,

    //bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 96,
    //marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
  },
  horizontalLine: {
    height: 2,
    backgroundColor: '#D7D7D7',
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
  },
  ButtonStyle: {
    borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 15,
    marginBottom: 10,
    marginTop: 0,//10,
    marginLeft: 0,//10,
    marginRight: 0,//10,
    borderRadius: 30,
  },
  ButtonTextStyle: {
    fontSize: Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
  },
  OKButtonStyle: {
    borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 15,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
    //width:Constants.BaseStyle.DEVICE_WIDTH/100*70,
    marginBottom: 3,
    marginTop: 20,//10,
    marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 20,//10,
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 20,//10,
    borderRadius: 30,
    backgroundColor: '#53C8E5',//Constants.Colors.White,
    borderColor: '#53C8E5',//Constants.Colors.White,
  },
  OKButtonTextStyle: {
    fontSize: Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.White,//'#53C8E5',
    textAlign: "center",
  },
  HourlyTextStyle: {
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    flex: 1,
    justifyContent: 'center',
    marginTop: 5,
    color: '#5D5D5D',
  },
  HourlyRightText: {
    flex: 1,
    textAlign: 'right',
    justifyContent: 'flex-end',
    marginTop: 5,
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
  },
  DurationListText: {
    textAlign: 'center',
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    color: '#081933',
    borderBottomWidth: 1,
    //borderTopWidth:1,
  },

  transportIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 15,
    padding: 0,
  },
  transportLabel: {
    textAlign: 'center',
    marginTop: 0,
    color: '#081933',
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
  },
});

export default connect(state => ({ state: state.CustomerReducer }))(CustomerMapView);
