//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import { bindActionCreators } from "redux";







let { width, height } = Dimensions.get('window');
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;
const ASPECT_RATIO = width / height;
let LATITUDE = 28.669;
let LONGITUDE = 77.380311;
var LATITUDE_DELTA = 0.011;
var LONGITUDE_DELTA = 0.018;
const marker = null;
import Constants from "../../../constants";
import CustomerConnection from "../../../config/Connection";


const colors1 = require('../../../assets/images/customer/Vehicle_icons/Top/b0.png')
const colors2 = require('../../../assets/images/customer/Vehicle_icons/Top/sm.png')
import MapView, { Marker, Circle, AnimatedRegion, Animated } from 'react-native-maps';
import * as UserActions from '../../../redux/modules/user';
import { connect } from 'react-redux';
let changeRegion = 0;



colors = [];
colors.push(colors1);
colors.push(colors2);




let mapStyle1 = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#E8EAEB"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#009999"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#566265"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]

// create a component
class MyClass extends Component {





  constructor(props) {
    super(props);

    try {
      this.state = {
        data: [],
        title: 'ssss',
        user: null,
        accessToken: null,
        SliderValue: 0,
        mounted: false,
        // markers:this.genrateRandomMarker(),
        region: new AnimatedRegion({
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }),

        initialRegion: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },

        newRegion: [],
        enableIndicator: false,
        markers: [{
          coordinate: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
          },
          title: 'Current Location',
          description: 'Demo ----'

        }],

        markersPosition: []



      };

      this.mapRegion = this.state.mapRegion;
    }
    catch (ex) {
      alert(ex)
    }



  }



  componentDidMount() {

    this.getCurrentOrderStatus();

    //this.fetchDriverLocation();






  }




  getCurrentOrderStatus = () => {




    this.props.UserActions.nextStop({
      driverId: '5ba512c5405cff32dcd952f4', lat_long: '49.2827,-123.1207'
    }).then((response) => {

      var localMarker = [];

      markersPosition = this.state.markersPosition;

      markersPosition.push({
        coordinate: {
          latitude: parseFloat(response.ongoingOrders[0].orders[0].pickup[0].pickup_point.split(",")[0]),
          longitude: parseFloat(response.ongoingOrders[0].orders[0].pickup[0].pickup_point.split(",")[1])
        },
        title: 'Pickup',
        description: 'Demo ----'

      });


      markersPosition.push({
        coordinate: {
          latitude: parseFloat(response.ongoingOrders[0].orders[0].drop_location[0].drop_point.split(",")[0]),
          longitude: parseFloat(response.ongoingOrders[0].orders[0].drop_location[0].drop_point.split(",")[1])
        },
        title: 'Drop',
        description: 'Demo ----'

      });

      //

      this.setState({ markersPosition: markersPosition })



      that = this;
      setInterval(function () {
        that.fetchDriverLocation();
      }, 2000);


    })

    /*
      fetch(CustomerConnection.getTempUrl()+'place-order/start-order/', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          
            driverId:'5ba512c5405cff32dcd952f4',lat_long:
          }),
        }).then((response) => response.json())
          .then((arr) => {
    
            alert(arr);
        
          })
          .catch((error) => {
         alert(error);
          });*/

  }


  componentWillReceiveProps(nextProps) {

  }





  fetchDriverLocation = () => {
    fetch(CustomerConnection.getAdminUrl()+'drivers/getdriverlatlng?driverid=5ba512c5405cff32dcd952f4')
      .then((response) => response.json())
      .then((responseJson) => {
        //   this.setState({markers:[]});

        if (this.marker) {
          this.marker._component.animateMarkerToCoordinate(
            {
              latitude: responseJson.message.lat,
              longitude: responseJson.message.lng,
            },
            2000,
          );
        }
        if (changeRegion > 7 || changeRegion == 0) {
          this.setState({
            region: new AnimatedRegion({
              latitude: responseJson.message.lat,
              longitude: responseJson.message.lng,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            })
          })
          changeRegion = 0;
        }
        changeRegion++;
      })
      .catch((error) => {

        console.error(error);
      });
  }

  onRegionChange = (region) => {

    console.log(region);

    LATITUDE_DELTA = region.latitudeDelta;
    LONGITUDE_DELTA = region.longitudeDelta;

    //LATITUDE_DELTA =region.latitudeDelta
    //LONGITUDE_DELTA = region.longitude
    //  this.setState({ region });
  }



  render() {

    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });



    return (
      <View style={styles.container}>



        {<MapView
          style={{ flex: 1 }}
          zoomEnabled={true}
          showsUserLocation={true}
          pitchEnabled={true}
          rotateEnabled={true}
          initialRegion={this.state.initialRegion}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          customMapStyle={mapStyle1}
          followsUserLocation={true}
        >


{this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}

{/* 
          {this.state.markers.map(marker => (
           
          //  <Marker.Animated
          //     ref={marker => { this.marker = marker }}
          //     coordinate={marker.coordinate}
          //     title={marker.title}
          //     description={marker.description}
          //     image={colors2}
          //   //    flat={true}
          //   // rotation={34}
          //   >

          //   </Marker.Animated>
          ))} */}

          {this.state.markersPosition.map(newMarker => (
            <Marker
              coordinate={newMarker.coordinate}
              title={newMarker.title}
              description={newMarker.description}
              image={colors2}
            >

            </Marker>
          ))}



        </MapView>}
      </View>
    );
  }
}





// define your styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'red'
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  },

  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: 'white',
  },
  item: {
    padding: 10,
    fontSize: 18,
    // height: 44,
    width: SCREEN_WIDTH,
    color: 'black'
  },
  mapcontainer: {
    flex: 1,
    width: width,
    height: height,
  },

  box1: {
    position: 'absolute',
    top: 0,
    left: 0,
    // width: '100%',
    bottom: 0,
    right: 0,
    //flex:1,
    //backgroundColor:'pink'

  },
  navIcons: {
    height: 20,
    width: 20
  },
  sectionHeaders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Constants.BaseStyle.PADDING * .5,
    alignItems: 'center'
  },







});






const mapStateToProps = state => ({

  userData: (state.user && state.user.driverData) || (state.user && state.user.userData),
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MyClass);
