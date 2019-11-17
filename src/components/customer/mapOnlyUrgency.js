/* eslint-disable space-infix-ops */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-dupe-keys */
/* eslint-disable comma-dangle */
/* eslint-disable no-cond-assign */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
//import liraries
import React, { Component } from 'react';
import { View } from 'react-native';
import MapView, {  } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import Constants from "../../constants";
import { connect } from 'react-redux';
//let GOOGLE_MAPS_APIKEY = 'AIzaSyCa2zZ-9wObLwsLh2B63QUcQlnAuYFTB4E'
let GOOGLE_MAPS_APIKEY = Constants.distanceAPIMatrix;
import socketUpdate from '../../utilities/socketUpdate';
import HiddenMarker from '../common/customerMarker'
let driverMap = {};

let currecntVechile = null;




// create a component
class mapViewOnly extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            showMap: true,
            VehicleList: [],
            vehicals: [],
            initialPosition:
            {  markerList:[],

                latitude:this.props.locationData.currentLocation != null ? this.props.locationData.currentLocation.coords.latitude : 0,
                longitude: this.props.locationData.currentLocation != null ? this.props.locationData.currentLocation.coords.longitude : 0,


                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
            },

        }
        this.initialPosition = this.state.initialPosition;

        this.markerPositionLength = this.props.state.markerPositions.length;


    }




   updateDriverLoc=(data,newList)=>{

    let markerAdded = false;
      let markerList = this.state.markerList ? this.state.markerList : [];


      if (newList){
        driverMap = {};
        markerList = [];
        markerAdded = true;
      }

           data.driverList.map(item=>{
           console.log(item);
               if (!driverMap[item._id])
               {
                   isSocketUpdated = true;

              let markerData = HiddenMarker.appendNewMarker(item);
              driverMap[item._id] = item._id;
              markerList.push(markerData);
              markerAdded = true;
              }
               else {
                   console.log("else ___ part")
                       HiddenMarker.moveMarkertoCurrenentPosition(item)
                    //   HiddenMarker.hidemarker(item);

               }
                })

if (markerAdded)
       this.setState({markerList});




         }

         socketUpdateCB=(data)=>{

         switch (data.eventType)
         {
          case 'customerLatLng':
              try{
            this.updateDriverLoc(data,true); 
              }
              catch(ex){

              }
           break;

           case 'driverInside':
           var tempData = {};
           console.log(data.data);
           tempData.driverList = [data.data];
        //   console.log(tempData.driverList);
        try{
        this.updateDriverLoc(tempData);
        }
        catch(ex){

        }
           break;

           case 'driverOutSide':
               console.log('driverOutSide' + '   ' + data.driverList.driver_id )
               try{
                   HiddenMarker.hidemarker(data.driverList.driver_id);
               }
               catch(ex){
                   
               }
                   break;


        }


       }



    componentDidMount(){





      

                socketUpdate.urgencyMapCallback = {

                    soccketCB:this.socketUpdateCB
                };


    console.log( {lat:this.props.state.markerPositions[0].coordinates.longitude,
    lng:this.props.state.markerPositions[0].coordinates.latitude});
setTimeout(() => {

    socketUpdate.getDriverListUrgencyScreen(
        {
        customerid:this.props.user.userData.data._id,
        lat:this.props.locationData.currentLocation != null ? this.props.locationData.currentLocation.coords.latitude : 0,
        lng: this.props.locationData.currentLocation != null ? this.props.locationData.currentLocation.coords.longitude : 0,
        lat:this.props.state.markerPositions[0].coordinates.latitude,
        lng:this.props.state.markerPositions[0].coordinates.longitude,
        }
    );
    
}, 1000);
              

    }



    shouldComponentUpdate(nextProps){

        console.log(nextProps.state.vehicleID);
        console.log(currecntVechile);

        if (currecntVechile != nextProps.state.vehicleID)
        {
 
         
            currecntVechile=nextProps.state.vehicleID;
           
            setTimeout(() => {

                socketUpdate.getDriverListUrgencyScreen(
                    {
                    customerid:this.props.user.userData.data._id,
                    lat:this.props.locationData.currentLocation != null ? this.props.locationData.currentLocation.coords.latitude : 0,
                    lng: this.props.locationData.currentLocation != null ? this.props.locationData.currentLocation.coords.longitude : 0,
                    vehicle_type:nextProps.state.vehicleID
                    });
                
            }, 1000);
           

        }



        return true;
    }
    render() {

        var newRegion = null;
        let wayPoints = [];
        this.props.state.markerPositions.map((marker) => {
            if (marker.title != '') {
                newRegion = marker.coordinates;
                console.log(marker);
                wayPoints.push(marker.coordinates);
            }
        });
        if (wayPoints.length > 0) {
            origin = wayPoints[0];
            destination = wayPoints[wayPoints.length - 1];
        }


        return (
            <View style={{height:1030,width:454,backgroundColor:'red'}}>


                 <MapView
                        key={'urgencyMapScreen'}
                      
                        style={{height: '60%', zIndex: 0}}
                        zoomEnabled={true}
                        initialRegion={this.state.initialPosition}
                        region={this.state.initialPosition}
                        pitchEnabled={false}
                        showsUserLocation={true}

                    >
                    {this.props.state.markerPositions.map((marker) => (
                            <MapView.Marker
                                coordinate={marker.coordinates}
                                title={marker.title}
                                image={marker.img}
                                key={marker.id}
                            ></MapView.Marker>




                        ))

                        }

                        {wayPoints.length > 1 &&
                            <MapViewDirections
                                origin={origin}
                                waypoints={wayPoints}
                                destination={destination}
                                apikey={GOOGLE_MAPS_APIKEY}
                                strokeWidth={3}
                                strokeColor="#809fff"
                            />}
                              { this.state.markerList}
                    </MapView>


            </View>
        );
    }
}


//make this component available to the app
const mapStateToProps = state => ({
    state: state.CustomerReducer,
    locationData: state.location,
    user:state.user,
    
});

export default connect(mapStateToProps, null)(mapViewOnly);
