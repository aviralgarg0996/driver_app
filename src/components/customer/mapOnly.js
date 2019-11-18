/* eslint-disable keyword-spacing */
/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable space-infix-ops */
/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {Component} from 'react';
import {View, Image} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Constants from '../../constants';
import {connect} from 'react-redux';
//let GOOGLE_MAPS_APIKEY = 'AIzaSyCa2zZ-9wObLwsLh2B63QUcQlnAuYFTB4E'
let GOOGLE_MAPS_APIKEY = Constants.distanceAPIMatrix;
const DEFAULT_PADDING = {top: 40, right: 40, bottom: 40, left: 40};
var newRegion = null;
import socketUpdate from '../../utilities/socketUpdate';
let driverMap = {};
import HiddenMarker from '../common/customerMarker';
import _ from 'underscore';
let pickUpCoords = undefined;

let markerList = HiddenMarker.hiddenMarkerList();

// create a component
class mapViewOnly extends Component {
  fitAllMarkers(data) {
    var marker = [];
    data.forEach(element => {
      marker.push(element.coordinates);
    });
    if (data.length == 0) return;
    console.log(marker);

    // return;

    if (this.map == null) return;
    this.map.fitToCoordinates(marker, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  }

  updateDriverLoc = (data,newList) => {
    let markerAdded = false;
    let markerList = this.state.markerList ? this.state.markerList : [];
    if(newList){
      driverMap={};
      markerList=[];
      markerAdded=true;
    }

    data.driverList.map(item => {
      console.log(item);
      if (!driverMap[item._id]) {
        console.log('if part');
        //    let markerData= HiddenMarker.assign();
        let markerData = HiddenMarker.appendNewMarker(item);
        driverMap[item._id] = item._id;
        markerList.push(markerData);
        markerAdded = true;
      } else {
        console.log('else ___ part');

       
    

        HiddenMarker.moveMarkertoCurrenentPosition(item);
        //   HiddenMarker.hidemarker(item);
      }
    });

    if (markerAdded ) this.setState({markerList});
  };

  socketUpdateCallback = data => {
    switch (data.eventType) {
      case 'customerLatLng':
        this.updateDriverLoc(data,true);
        break;

      case 'driverInside':
        var tempData = {};
        console.log(data.data);
        tempData.driverList = [data.data];
        //   console.log(tempData.driverList);
        this.updateDriverLoc(tempData);
        break;

      case 'driverOutSide':
        console.log('driverOutSide' + '   ' + data.driverList.driver_id);
        HiddenMarker.hidemarker(data.driverList.driver_id);
        break;
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      showMap: true,
      VehicleList: [],
      vehicals: [],
      initialPosition: {
        latitude:
          this.props.locationData.currentLocation != null
            ? this.props.locationData.currentLocation.coords.latitude
            : 0,
        longitude:
          this.props.locationData.currentLocation != null
            ? this.props.locationData.currentLocation.coords.longitude
            : 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },

      vehicleArray: [],
      testMap: [],
      markerList: markerList,
    };
  //  this.initialPosition = this.state.initialPosition;
    this.markerPositionLength = this.props.state.markerPositions.length;
  }

  updateSocketParams = (data) => {

 console.log('Inside Socket Update');
data.customerid=this.props.user.userData.data._id;
//data.vehicle_category='5b969f17c9aa4c7ae37ef40e';
    socketUpdate.getDriverListUrgencyScreen(data);
  };

  componentDidMount() {
    this.props.onVechileChange(this);
    var requestObject = {
      customerId: this.props.user.userData.data._id,
      latitude:
        this.props.locationData.currentLocation != null
          ? this.props.locationData.currentLocation.coords.latitude
          : 0,
      longitude:
        this.props.locationData.currentLocation != null
          ? this.props.locationData.currentLocation.coords.longitude
          : 0,
      socketUpdateCallback: this.socketUpdateCallback,
    };
    console.log(requestObject);

    setTimeout(() => {
      socketUpdate.customerSocket(requestObject);
    }, 500);


    setInterval(() => {
      // eslint-disable-next-line no-alert
      HiddenMarker.rotateFront(driverMap);
    }, 3000);

  }

  shouldComponentUpdate = (nextProps, nextState) => {

    console.log("sdsdsdsdsdsds");

 let tempCoord = _.where(nextProps.state.markerPositions, {title: 'Pickup 1'});
 console.log( tempCoord);
if (tempCoord.length > 0 ){
    if ( !pickUpCoords || (pickUpCoords && pickUpCoords.coordinates.latitude != tempCoord[0].coordinates.latitude) )
    {
        pickUpCoords = tempCoord[0];
        setTimeout(() => {

          let locationData ={
            lat:pickUpCoords.coordinates.latitude,
            lng:pickUpCoords.coordinates.longitude,
          };

          this.updateSocketParams(locationData);
        }, 1000);
    }
   }
else if(pickUpCoords && tempCoord.length==0)
{
  pickUpCoords=undefined;

var data={
  lat:this.props.locationData.currentLocation != null? this.props.locationData.currentLocation.coords.latitude: 0,
lng:this.props.locationData.currentLocation != null? this.props.locationData.currentLocation.coords.longitude: 0,
}
  
  this.updateSocketParams(data);
     console.log('s222s');
}


return true;
    };

  render() {
    wayPoints = [];
    let destination;

    newRegion = null;

    this.props.state.markerPositions.map(marker => {
      if (marker.title != '') {
        newRegion = marker.coordinates;
        wayPoints.push(marker.coordinates);
      }
    });

   // if (newRegion == null) newRegion = this.state.initialPosition;

    if (wayPoints.length > 0) {
      origin = wayPoints[0];
      destination = wayPoints[wayPoints.length - 1];
    }

    return (
      <View>
        <MapView
          key={'FrontPage'}
          style={{
            height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 75,
            zIndex: 0,
          }}
          initialRegion={this.state.initialPosition}
          region={newRegion}
          showsUserLocation={true}
          followsUserLocation={true}>
          {this.props.state.markerPositions.map(marker => (
            <MapView.Marker
              coordinate={marker.coordinates}
              title={marker.title}
              key={marker.id}>
              <View>
                <Image
                  source={marker.img}
                  style={{height: 20, width: 20, resizeMode: 'center'}}
                />
              </View>
            </MapView.Marker>
          ))}

          {
            <MapView.Marker
              coordinate={this.props.locationData.currentLocation.coords}>
              <View>
                <Image style={{height: 20, width: 20, resizeMode: 'center'}} />
              </View>
            </MapView.Marker>
          }
          {wayPoints.length > 1 && (
            <MapViewDirections
              origin={origin}
              waypoints={wayPoints}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={8}
              strokeColor="#809fff"
            />
          )}

          {this.state.markerList}

          {this.state.testMap.map(item => {
            return (
              <MapView.Marker.Animated
                ref={marker => {
                  driverMap[item.driverId] = marker;
                }}
                coordinate={item}
              />
            );
          })}
        </MapView>
      </View>
    );
  }
}

//make this component available to the app
const mapStateToProps = state => ({
  state: state.CustomerReducer,
  locationData: state.location,
  user: state.user,
});

export default connect(
  mapStateToProps,
  null,
)(mapViewOnly);
