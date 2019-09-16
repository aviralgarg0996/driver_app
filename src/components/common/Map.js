/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

import Constants from "../../constants";
import MapView from 'react-native-maps';
import { Marker, PROVIDER_GOOGLE,Circle } from "react-native-maps";

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

export default class Map extends Component<{}> {
  constructor(props){
    super(props);
    this.state = {
      markers: props.markers,

    
     }

  }

  fitAllMarkers() {
    this.map.fitToCoordinates(this.state.markers, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  }

  //onLayout = () => { setTimeout( () => { this.mapRef.fitToCoordinates([{ latitude: 33.9260206, longitude: 75.0173499 }, { latitude: 33.949817, longitude: 74.985655 }], { edgePadding: 10, animated: true, }); }, 2000 ); }

  render() {
    const LATITUDE = (this.props.markers != undefined) ? this.props.markers[0].coordinates.latitude : 30.695573651593037;
    const LONGITUDE = (this.props.markers != undefined) ? this.props.markers[0].coordinates.longitude : 76.86047809632487;
    var MARKERS = this.state.markers || [];
    if(this.props.showMarkers){
      return (
        <View style={{flex:1, backgroundColor:Constants.Colors.White}}>
          <MapView
            ref={ref => { this.map = ref; }}
            provider={PROVIDER_GOOGLE}
            style={{height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 40}}
            //ref={(ref) => { this.mapRef = ref; }}
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: 0.0922 * 5,
              longitudeDelta: 0.0421 * 5,
            }}
            // region={this.state.mapRegion}
            //zoomEnabled={true}
            //showsUserLocation={true}
            pitchEnabled={false}
            rotateEnabled={false}
            cacheEnabled={true}
            scrollEnabled={true}
            //customMapStyle={Constants.MapStyle}
           // onLayout={this.onLayout}
          >

          {
            MARKERS.map((marker,idx)=>{
              return (
                <Marker
                  key={idx}
                  coordinate={marker.coordinates}
                  title={marker.cityName}
                />
              )
            })
          }



          {
             MARKERS.map((marker,idx)=>{
             
              return (
                <Circle
                center={marker.coordinates}
                radius={marker.radius}
                //zIndex={2}
                //fillColor = { 'rgb(184, 230, 242,0.8)' }
                strokeWidth = { 1 }
                strokeColor = { Constants.Colors.LightBlue }
                fillColor = { 'rgb(184, 230, 242)' }
                />
              )
            })
                





          }

          {/* {MARKERS.map((marker, idx) => (
            <Circle
            key={idx}
            center={marker.coordinates}
            radius={marker.radius}
            //zIndex={2}
            //fillColor = { 'rgb(184, 230, 242,0.8)' }
            strokeWidth = { 1 }
            strokeColor = { Constants.Colors.LightBlue }
            fillColor = { 'rgb(184, 230, 242)' }
          /> 
          ))} */}
           </MapView>
        </View>
      );
    }
    else{
      return (
        <View style={{flex:1, backgroundColor:Constants.Colors.White}}>
          <MapView
            style={{height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 40}}
            zoomEnabled={false}
            pitchEnabled={false}
            rotateEnabled={false}
          >

        
          </MapView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  orderDetails:{
    position:'absolute',
    bottom:Constants.BaseStyle.DEVICE_HEIGHT/100 * 25,
    width:Constants.BaseStyle.DEVICE_WIDTH/100 *90,
    alignSelf:'center',
    //marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100 * 2
  }
});
