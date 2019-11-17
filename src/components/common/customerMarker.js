/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
/* eslint-disable no-dupe-keys */
//import liraries
import React from 'react';

import MapView from 'react-native-maps';

var blankDriverMap = {};
var markerList = [];
import {View, Image} from 'react-native';
import Callout from 'react-native-maps';
import Bike from '../../assets/images/customer/Vehicle_icons/Top/small/bike.png';
import Small from '../../assets/images/customer/Vehicle_icons/Top/small/small.png';
import Medium from '../../assets/images/customer/Vehicle_icons/Top/small/medium.png';
import Large from '../../assets/images/customer/Vehicle_icons/Top/small/Large.png';
import XLarge from '../../assets/images/customer/Vehicle_icons/Top/small/Xlarge.png';
import DeckTruck from '../../assets/images/customer/Vehicle_icons/Top/small/Deck.png';
import FridgeTruck from '../../assets/images/customer/Vehicle_icons/Top/small/Fridge.png';


let vechile={
"Bike" : Bike,
"Small" : Small,
"Medium" : Medium,
"Large" : Large,
"XLarge" : XLarge,
"DeckTruck" : DeckTruck,
"FridgeTruck" : FridgeTruck,

}


var assignedDriver = 0;
import _ from 'underscore';
import CustomerConnection from '../../config/Connection';

let mediaUrl = CustomerConnection.mediaURL() + '/';

/*
this.state.vehicleArray.map((item)=>{

    return <MapView.Marker.Animated
    ref={marker => { driverMap[item.driverId] = marker 
    
    }}
    coordinate={item}
    title={item.title}
    //image={require('../assets/pin.png')}
    >*/

// create a component

export default {
  hiddenMarkerList: function() {
    if (markerList.length > 0) return;
  },

  getLatestMarkerList: function() {},

  assign: function() {
    return {
      marker: blankDriverMap[assignedDriver++],
      assignedDriverCount: assignedDriver - 1,
    };
  },

  getLatestMarkerList: function() {
    markerList.push(<MapMaker />);

    return markerList;
  },

  updateMarker: function() {
    _.each(blankDriverMap, function(driverMarker) {
      driverMarker.markerCMP._component.animateMarkerToCoordinate(
        {
          latitude: item.geometry[0].coordinates[1],
          longitude: item.geometry[0].coordinates[0],
        },
        2000,
      );
    });
  },

  moveMarkertoCurrenentPosition: function(item) {
    blankDriverMap[item._id].markerCMP._component.animateMarkerToCoordinate(
      {
        latitude: item.geometry[0].coordinates[1],
        longitude: item.geometry[0].coordinates[0],
      },
      2000,
    );

    if (blankDriverMap[item._id].hidden) {
      blankDriverMap[item._id].markerCMP._component.setNativeProps({
        // latitude: -85,
        // longitude: 180,
        opacity: 1,
      });

      blankDriverMap[item._id].hidden = false;
    }
  },

  hidemarker: function(driverId) {
    if (blankDriverMap[driverId]) {
      blankDriverMap[driverId].markerCMP._component.setNativeProps({
        latitude: -85,
        longitude: 180,
        opacity: 0,
      });

      blankDriverMap[driverId].hidden = true;
    }
  },

  onLocationChange: function(driverData, data) {
    if (!data) return;
    driverData._component.animateMarkerToCoordinate(
      {
        latitude: data.latitude,
        longitude: data.longitude,
      },
      1000,
    );
  },

  appendNewMarker: function(item) {
    console.log(JSON.stringify(item));
    var element = item;
    var ImagePath = element.profilePhoto
      ? mediaUrl + element.profilePhoto
      : 'https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg';
    var viechlePath = element.vechile
      ? mediaUrl + element.vechile
      : 'https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg';

    var viechleImagePath =
      element.vechilecategory && element.vechilecategory.imagePath
        ? mediaUrl + element.vechilecategory.imagePath
        : 'https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg';

    console.log(item);

    //console.log(viechlePath);
    //console.log(viechleImagePath);

    return (
      <MapView.Marker.Animated
        key={item._id}
        onLayout={this.onLayout}
        tracksViewChanges={false}
         image={vechile[element.vechilecategory.name]}
        ref={marker => {
          this.markerCMP = marker;
          blankDriverMap[item._id] = {
            markerCMP: this.markerCMP,
            hidden: false,
          }; 
        }}
        coordinate={{
          latitude: item.geometry[0].coordinates[1],
          longitude: item.geometry[0].coordinates[0],
        }}
        title={item.firstName + ' ' + item.lastName}
        onPress={() => {
          if (item.onMarkerAction) item.onMarkerAction(item.markerData);
        }}>
            {/* <Image source={{uri: viechleImagePath}}  style={{height:20,width:20}}/> */}
      </MapView.Marker.Animated>
    );
  },
};
