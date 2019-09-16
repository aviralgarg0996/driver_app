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
  Dimensions
} from 'react-native';

import { connect } from 'react-redux';


import Constants from "../../constants";
import SubmitButton from "../../components/common/FormSubmitButton";
import MapView from 'react-native-maps';
import { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import { ToastActionsCreators } from 'react-native-redux-toast';
import PickUpLocation from './PickUpLocation';
import { BoxShadow } from 'react-native-shadow';
const colors1 = require('../../assets/images/customer/Vehicle_icons/Top/a.png');
//const colors2=require('../../assets/images/customer/Vehicle_icons/Top/a1.png');

import Picker from 'react-native-wheel-picker'
var PickerItem = Picker.Item;

import moment from 'moment';

var navigate = null;
var goBack = null;
var watchID: ?number = null;
var _key = 0;



let { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const ASPECT_RATIO = width / height;
let LATITUDE = 28.669;
let LONGITUDE = 77.380311;
const LATITUDE_DELTA = 0.25;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class CustomerMapView extends Component<{}> {
  constructor(props) {
    super(props);



    this.state = {
      error: null,

      initialPosition:
      {
        latitude: this.props.loc[0].lat,
        longitude: this.props.loc[0].long,
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
      markerPosition: {
        latitude: this.props.loc[0].lat,
        longitude: this.props.loc[0].long,
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
      isVisible: false,
      selectedItem: 4,
      markers: [],//this.genrateRandomMarker(),
      durationTime: ['3 hours', '4 hours', '5 hours', '6 hours', '7 hours', '8 hours', '9 hours', '10 hours', '11 hours', '12 hours', '13 hours', '14 hours', '15 hours', '16 hours', '17 hours', '18 hours',
        '19 hours', '20 hours', '21 hours', '22 hours', '23 hours', '24 hours'],
    }

    this.initialPosition = this.state.initialPosition;
    this.markerPosition = this.state.markerPosition;
  }





  componentDidMount() {
    this.getDriverData();
    //  this.navigat

    /* navigator.geolocation.getCurrentPosition((position) => {
       var lat = position.coords.latitude;
       var long = position.coords.longitude;
 
         var initialRegion={
           latitude : lat,
           longitude : long,
           latitudeDelta : LATITUDE_DELTA,
           longitudeDelta : LONGITUDE_DELTA,
         }   
         //this.props.dispatch({type:'SET_INITIALLOCATION',initialPosition:initialRegion,markerPosition:initialRegion});
       this.setState({initialPosition:initialRegion});
       this.setState({markerPosition:initialRegion});
     
       this.getDriverData();
       //  this.props.dispatch({type:'SET_INITIALLOCATION',initialPosition:this.state.initialPosition,markerPosition:this.state.markerPosition});
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 30000, maximumAge: 3000 },
     ); 
 
     this.watchID = navigator.geolocation.getCurrentPosition((position) => {
       var lat = position.coords.latitude;
       var long = position.coords.longitude;
 
       var lastRegion={
         latitude : lat,
         longitude : long,
         latitudeDelta : LATITUDE_DELTA,
         longitudeDelta : LONGITUDE_DELTA,
       }
 
       this.setState({initialPosition:lastRegion,markerPosition:lastRegion});
     //  this.setState({markerPosition:lastRegion});
 
 //alert(JSON.stringify(position));
 
     });  */

  }

  componentWillUnmount() {
    //    navigator.geolocation.clearWatch(this.watchID);
  }


  getDriverData = (data) => {


    fetch('http://3.17.28.223:8283/api/users/getactivedrivers', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },

    }).then((response) => response.json())
      .then((arr1) => {

        //  alert(JSON.stringify(arr1));

        if (arr1.data.length > 0) {
          var marker = this.state.markers;
          const map1 = arr1.data.map(element => {



            marker.push(
              {



                coordinates: {
                  latitude: this.props.loc[0].lat + Math.random() / 20,
                  longitude: this.props.loc[0].long + Math.random() / 20
                },
                title: element.firstName + ' ' + element.lastName,
                key: element._id,
                pinColor: 'blue',
                image: (element.profilePic && element.profilePic.path) ? 'http://3.17.28.223:8283/' + element.profilePic.path : 'https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg'


              });




          });

          this.setState({ markers: marker });
        }

        //   dispatch({type : 'SET_VEHICLECOST', _data : arr1.data,id:this.props.state.vehicleID});
        //    this.setState({DriverHelp : helpValue});
      })
      .catch((error) => {
        console.error(error);
      })



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
            key={_key++}
            style={{ height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 75, zIndex: 0 }}
            zoomEnabled={true}
            //   initialRegion={this.props.state.initialPosition}
            //  region={this.props.state.initialPosition}
            showsUserLocation={true}
            followsUserLocation={true}
            pitchEnabled={false}
            rotateEnabled={false}
          //minZoomLevel={15}
          >

            <Circle
              center={this.state.initialPosition}
              radius={10 * 1000}
              fillColor="#80808090"
              strokeColor="red"

            />

            {this.props.state.markerPositions.map((marker, i) => (
              <MapView.Marker
                coordinate={marker.coordinates}
                title={marker.title}
                image={marker.img}
                key={marker.id}
              />
            ))}

            {this.state.markers.map(marker => (
              <Marker
                coordinate={marker.coordinates}
                title={marker.title}
                key={marker.key}
                image={colors1}

                // } 
                onPress={(e) => { e.stopPropagation(); /*this.onMarkerPress(e,marker.key)*/ }}
              >

              </Marker>
            ))}

          </MapView>




        </View>



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
