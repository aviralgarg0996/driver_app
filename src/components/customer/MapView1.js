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
  Dimensions,
  ImageBackground,
  ToastAndroid,
  Switch
} from 'react-native';


import { connect } from 'react-redux';
import Constants from "../../constants";
import SubmitButton from "../../components/common/FormSubmitButton";
//import  from 'react-native-maps';
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import { ToastActionsCreators } from 'react-native-redux-toast';
import PickUpLocation from './PickUpLocation';
import { BoxShadow } from 'react-native-shadow';
const colors1 = require('../../assets/images/customer/Vehicle_icons/Top/a.png');
//import Carousel from 'react-native-snap-carousel';
import CustomerConnection from "../../config/Connection";
//const colors2=require('../../assets/images/customer/Vehicle_icons/Top/a1.png');
import RestClient from '../../utilities/RestClient';
import { scaleHeight, scaleWidth, normalizeFont } from "../../constants/responsive";
import Toast, { DURATION } from 'react-native-easy-toast'
import Picker from 'react-native-wheel-picker'
var PickerItem = Picker.Item;
var updateMarker = false;
import MapViewDirections from 'react-native-maps-directions';
let mediaUrl = CustomerConnection.mediaURL() + '/';
let GOOGLE_MAPS_APIKEY = Constants.distanceAPIMatrix;
const DEFAULT_PADDING = { top: 140, right: 140, bottom: 140, left: 140 };



import moment from 'moment';
import { compose } from 'redux';

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
let LATITUDE_DELTA = 0.25;
let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class CustomerMapView extends Component {



  constructor(props) {
    super(props);
    if(this.props.loc[0].address=='Choose Pickup Location')
    {
    
      this.props.state.markerPositions.map((element, i) => {

        if(element.title=='Pickup 1')
        {
               this.props.loc[0].lat=element.coordinates.latitude
                this.props.loc[0].long=element.coordinates.longitude
         
        }

      });
    
    }
  
    this.state = {
      error: null,
      driverList: [],
      initialPosition:
      {
        latitude: this.props.loc[0].lat,
        longitude: this.props.loc[0].long,
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
      initialPositionCircle: {
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
      modalVisible: false,
      selectedItem: 4,
      selectdeDriver: 1,
      markers: undefined,//this.genrateRandomMarker(),
      durationTime: ['3 hours', '4 hours', '5 hours', '6 hours', '7 hours', '8 hours', '9 hours', '10 hours', '11 hours', '12 hours', '13 hours', '14 hours', '15 hours', '16 hours', '17 hours', '18 hours',
        '19 hours', '20 hours', '21 hours', '22 hours', '23 hours', '24 hours'],
    }
  }



  componentDidMount() {
    updateMarker = true;

    this.props.ondidMount(this._root)
    try {
      this.getDriverData();
    }
    catch (ex) {
      alert(ex)
    }

    setTimeout(() => {
      this.fitAllMarkers(this.props.state.markerPositions);

    }, 300);

  }

  clickOnSelect = () => {
    this.setState({ modalVisible: false }, () => this.props.navigation.navigate('Home_SelectDriver'))
  }

  closeOnSelect = () => {
    this.setState({ modalVisible: false });
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  checkStatus() {
    this.props.state.Orders.orderId || this.props.state.InvoiceData.orderId
    if (this.props.state.Orders.orderId) {
      this.props.navigation.navigate("DraftPick")
    } else {
      if (this.props.state.InvoiceData.orderId || this.props.state.Hourly_pickupArr[0].address !== 'Choose Start Location') {
        this.props.navigation.navigate("NotesPick")
      }
    }
  }



  fitAllMarkers(data) {

    var marker = [];

    data.forEach(element => {
      marker.push(element.coordinates);
    });

    if (data.length == 0)
      return;

    //    alert("gggggg")



    if (this.map)


      this.map.fitToCoordinates(marker, {
        edgePadding: DEFAULT_PADDING,
        animated: true,
      });
  }


  selectDriver = (item) => {
    if (this.props.state.Orders._id) {
      this.orderID = this.props.state.Orders._id;
    } else {
      if (this.props.state.InvoiceData._id) {
        this.orderID = this.props.state.InvoiceData._id;
      }
    }
    fetch(CustomerConnection.getTempUrl() + 'driver/save/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "driverId": item.id, "orderId": this.orderID })
    }).then((response) => {
      response.json()
    }).then((arr) => {
      this.refs.toast.show('Your order is placed successfully.', DURATION.LENGTH_LONG);
      this.checkStatus();
    }).catch((error) => {
      console.error(error);
    });
  }



  getDriverData = (data) => {

    if (this.props.state.vehicleID) {
      this.vehicalId = this.props.state.vehicleID
    } else {
      if (this.props.state.Orders.vehicleType._id) {
        this.vehicalId = this.props.state.Orders.vehicleType._id
      }
    }
    //   this.vehicalId='5b969f2ac9aa4c7ae37ef40f';

    var latLng = [];
    var str = "["
    this.props.loc.map((element, i) => {
      str = str + '[' + element.long + ',' + element.lat + '],'
    });

    str = str.substr(0, str.length - 1)
    str = str + ']';

    //alert(str)

    latLng.push('[[-123.03221591,49.31434887]]');


    RestClient.getUrlAdmin('/users/getactivedrivers2', {
      vechileid: this.vehicalId,
      latlng: str
    }, '').then((arr1) => {
      if (arr1.data.length > 0) {
        var marker = [];
        this.props.onDriverDataGet(arr1.data);
        var driverList = [];


        const map1 = arr1.data.map((element, i) => {


          var ImagePath = (element.profilePhoto) ? mediaUrl + element.profilePhoto : 'https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg'
          var viechlePath = (element.vechile) ? mediaUrl + element.vechile : 'https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg'
          var viechleImagePath = (element.vechilecategory && element.vechilecategory.imagePath) ? mediaUrl + element.vechilecategory.imagePath : 'https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg'
          marker.push(
            {
              coordinates: {
                latitude:element.geometry.coordinates[1],
                longitude:element.geometry.coordinates[0],
              },
              title: element.firstName + ' ' + element.lastName,
              key: element._id,
              pinColor: 'blue',
              image: ImagePath,
              index: i,
              viechlePath: viechlePath,
              viechleImagePath: viechleImagePath,
            });

          //   if (ImagePath.indexOf('.jpg') > 0)
          driverList.push({ id: element._id, img: ImagePath, followerFlag: 0, name: element.firstName + ' ' + element.lastName })
        });
        updateMarker = true;
        this.setState({ markers: marker, driverList: driverList });

      
      } else {
        if (arr1.data.length == 0) {

          updateMarker = true;
          this.setState({ markers: [] })
          this.refs.toast.show('No Driver is Available', DURATION.LENGTH_LONG);


        }
      }
    }).catch(error => {
      console.log("error=> ", error)
    })
  }



  onRegionChange = (region) => {
    LATITUDE_DELTA = region.latitudeDelta;
    LONGITUDE_DELTA = region.longitudeDelta;
    //LATITUDE_DELTA =region.latitudeDelta
    //LONGITUDE_DELTA = region.longitude
    //  this.setState({ region });
  }


  displayDriversData = ({ item, index }) => {
    const shadowForItem = {
      width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 78,
      height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 50,
      color: "#000",
      border: 1,
      radius: 5,
      opacity: 0.1,
      x: 1,
      y: 1,
      style: {
        backgroundColor: Constants.Colors.White,
        marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
        bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
        //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1.5/100,
      }
    };
    return (
      <BoxShadow setting={shadowForItem}>
        <View style={[styles.container, { width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 76 }]}>
          <View style={styles.rootContainer}>
            <ImageBackground source={Constants.Images.customer.drivercover} style={styles.imageCover} resizeMode={'contain'}>
            </ImageBackground>
            <View style={styles.subContainer}>
              <Image style={styles.imageProfile} source={{ uri: item.img }} resizeMode={'contain'} />
              <View>
                <Text style={[styles.nameText]}>{item.name}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.reviewText, { color: Constants.Colors.LightBlue, textDecorationLine: 'underline' }]}>
                    45 REVIEWS
                  </Text>
                  <Text style={[styles.reviewText, { color: '#969297', marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1, marginRight: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3 }]}>
                    50 FOLLOWERS
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2, marginTop: Constants.BaseStyle.DEVICE_WIDTH * 4 / 100 }}>
            <StarRating
              rating={"5"}
              iconWidth={Constants.BaseStyle.DEVICE_WIDTH / 100 * 5}
              iconHeight={Constants.BaseStyle.DEVICE_WIDTH / 100 * 5}
            />
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 0.5, marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100, }}>
                <Text style={[styles.orangeText]}>{'78 '}
                  <Text style={[styles.reviewText, { color: Constants.Colors.LightGray, fontSize: 14, }]}>
                    {'Orders Delivered'}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <BoxShadow setting={{
            width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 70,
            height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6.8,
            color: "#000",
            border: 3,
            radius: 20,
            opacity: 0.1,
            x: 0,
            y: 2,
            style: {
              marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
              marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2
            }
          }}>
            <TouchableOpacity activeOpacity={0.2} style={[styles.ButtonStyle]} onPress={() => this.selectDriver(item)}>
              <Text style={[styles.SelectTextStyle]}>
                {'SELECT DRIVER'}
              </Text>
            </TouchableOpacity>
          </BoxShadow>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <View style={styles.transaparentView}>
              <View style={styles.centerView}>
                <View style={styles.headerColor}>
                  <Text style={styles.headText}>OOPS!</Text>
                  <TouchableOpacity onPress={() => this.closeOnSelect()}>
                    <Image source={Constants.Images.customer.close} style={styles.closeicon} resizeMode={'contain'} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.topText}>Your Order has not been accepted by drivers.</Text>
                <Text style={styles.desc}>1.
                                You can place it in the pool so that it can be seen by drivers. </Text>
                <Text style={styles.desc1}>2.
                                You can select another driver.</Text>
                <TouchableOpacity style={styles.nextBtn} onPress={() => this.clickOnSelect()}>
                  <Text style={styles.nextText}>SELECT DRIVER AGAIN</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </BoxShadow>
    )
  }

  //  shouldComponentUpdate(nextProp,)



  onRegionChange = (region) => {

    //  console.log(region);

    //  LATITUDE_DELTA = region.latitudeDelta;
    //  LONGITUDE_DELTA = region.longitudeDelta;

    //LATITUDE_DELTA =region.latitudeDelta
    //LONGITUDE_DELTA = region.longitude
    //  this.setState({ region });
  }


  shouldComponentUpdate() {

    if (updateMarker) {
      updateMarker = false;
      return true;
    }
    return false;

  }



  render() {

    navigate = this.props.navigation;
    goBack = this.props.navigation;

    wayPoints = [];



    this.props.state.markerPositions.map((marker, i) => {
      if (marker.title != '') {
        //    newRegion = marker.coordinates;
        wayPoints.push(marker.coordinates);
      }
    });
    if (wayPoints.length > 0) {
      origin = wayPoints[0];
      destination = wayPoints[wayPoints.length - 1];
    }


    return (

      <View ref={component => this._root = component}
        style={{ height: height * .6, zIndex: 0 }}>

        {this.props.locationData.showmap.Home_SelectDriver &&
          this.state.markers
          && <MapView
            key={_key++}
            ref={ref => { this.map = ref; }}

            style={{ height: '100%', zIndex: 0 }}
            zoomEnabled={true}
            initialRegion={this.state.initialPosition}
            region={this.state.initialPosition}
            pitchEnabled={false}
            showsUserLocation={true}
          //   customMapStyle={Constants.St}
          //  onRegionChange={this.onRegionChange}
          //   customMapStyle={Constants.MapStyle.default}

          >
            <Circle
              center={this.state.initialPositionCircle}
              radius={50 * 1000}
              fillColor="#80808090"
              strokeColor="red"
            />

            {this.props.state.markerPositions.map((marker, i) => (
              <MapView.Marker
                coordinate={marker.coordinates}
                title={marker.title}
                image={marker.img}
                key={marker.id}
                onPress={(e) => { }}
              />
            ))}

            {this.state.markers.map(marker => (

              <Marker
                coordinate={marker.coordinates}
                title={marker.title}
                key={marker.key}
                // } 
                onPress={(e) => {

                  this._root.setNativeProps({
                    style: { height: height * 0.4 }
                  })
                  this.props.onMarkerClick(marker);
                }}
              >


                <ImageBackground style={{
                  width:
                    60, height: 60, backgroundColor: '',
                }}>



                  <Image style={{ width: 60, height: 60, resizeMode: 'contain' }}
                    source={{ uri: marker.viechleImagePath }
                    }

                  />
                </ImageBackground>




              </Marker>
            ))}


            {wayPoints.length > 1 &&
              <MapViewDirections
                origin={origin}
                waypoints={wayPoints}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="#809fff"
              />}


          </MapView>}


        <View style={[{ height: height * .42 }, {
          zIndex: 1,
          position: 'absolute', top: height * .27
        }]}>

        </View>
        <Toast
          ref="toast"
          style={{ backgroundColor: Constants.Colors.Orange }}
          position='top'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={5000}
          opacity={0.8}
          textStyle={{ color: 'white' }}
        />
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


  driverText: {
    color: '#081933',
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
    fontSize: Constants.CustomerFonts.BigSize.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1.5 / 100,
  },
  flexRow: {
    flexDirection: 'row',
  },
  rootContainer: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 26,
    //width: Constants.BaseStyle.DEVICE_WIDTH,
    //marginHorizontal:10
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    //position: "absolute",
    bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 9,
    //marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7,
  },
  imageCover: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 22,
    //width: Constants.BaseStyle.DEVICE_WIDTH/100*80,
  },
  imageProfile: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 15,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 25,
    borderWidth: 2,
    borderColor: Constants.Colors.White,
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 10,
  },
  nameText: {
    color: '#0D4A7C',
    fontSize: 19,//Constants.CustomerFonts.BigSize.fontSize,
    fontWeight: '900',//Constants.CustomerFonts.BigSize.fontFamily,
    paddingHorizontal: Constants.BaseStyle.PADDING * 0.1,
    paddingVertical: Constants.BaseStyle.PADDING * 0.2,
    //marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
  },
  reviewText: {
    color: '#0D4A7C',
    fontSize: 12,//Constants.CustomerFonts.normal.fontSize,
    //fontFamily:Constants.CustomerFonts.normal.fontFamily,
    paddingHorizontal: Constants.BaseStyle.PADDING * 0.1,
    //marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
  },
  update: {
    color: '#414141',
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    //paddingVertical: Constants.BaseStyle.PADDING * 0.3,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
    marginTop: Constants.BaseStyle.DEVICE_WIDTH * 4 / 100,
  },
  newPhotoText: {
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
    color: '#969297',
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
  },
  newImages: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 11,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 21,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2.5
  },
  ButtonStyle: {
    borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 15,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
    //width:Constants.BaseStyle.DEVICE_WIDTH/100*70,
    marginBottom: 10,
    marginTop: 0,//10,
    marginLeft: 0,//10,
    marginRight: 0,//10,
    borderRadius: 30,
    backgroundColor: Constants.Colors.White,
    borderColor: Constants.Colors.White,
  },
  SelectTextStyle: {
    fontSize: Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: '#53C8E5',
    textAlign: "center",
  },
  orangeText: {
    color: Constants.Colors.Orange,
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
  },
  transaparentView: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },

  centerView: { height: scaleHeight(360), width: scaleWidth(350), borderRadius: 5, backgroundColor: '#fff', alignSelf: 'center', alignItems: 'center' },

  topText: { top: scaleHeight(20), textAlign: 'justify', fontSize: normalizeFont(18), fontWeight: '700', color: '#314054', marginLeft: scaleWidth(25) },

  desc: { marginTop: scaleHeight(30), textAlign: 'justify', fontSize: normalizeFont(16), color: '#BBBBBB', opacity: 0.7, fontWeight: '600', marginLeft: 25 },
  desc1: { marginTop: scaleHeight(15), textAlign: 'justify', fontSize: normalizeFont(16), color: '#BBBBBB', opacity: 0.7, fontWeight: '600', marginLeft: scaleWidth(0), marginRight: scaleWidth(102), marginBottom: scaleHeight(20) },
  nextBtn: {
    marginTop: scaleHeight(25),
    borderRadius: scaleWidth(5),
    height: scaleHeight(50),
    width: scaleWidth(300),
    backgroundColor: '#366CB5'
  },
  nextText: {
    fontSize: normalizeFont(16),
    textAlign: 'center',
    padding: scaleWidth(14),
    color: "#FCFEFE",
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
  },
  headerColor: {
    marginTop: scaleHeight(0), height: scaleHeight(60), width: '100%', borderTopRightRadius: scaleWidth(5), backgroundColor: '#EFEDEE', borderTopLeftRadius: scaleWidth(5),
    flexDirection: 'row'
  },
  headText: {
    marginLeft: scaleWidth(20),
    color: 'grey',
    fontSize: normalizeFont(20),
    width: scaleWidth(80),
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    marginTop: scaleHeight(15)
  },
  closeicon: {
    backgroundColor: 'transparent',
    height: scaleHeight(25),
    width: scaleWidth(25),
    marginTop: scaleHeight(18),
    marginLeft: scaleWidth(200),
  }

});

export default connect(state => ({
  state: state.CustomerReducer,
  locationData: state.location
}))(CustomerMapView);
