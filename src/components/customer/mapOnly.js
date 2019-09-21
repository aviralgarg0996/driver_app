//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import Constants from "../../constants";
import { connect } from 'react-redux';
//let GOOGLE_MAPS_APIKEY = 'AIzaSyCa2zZ-9wObLwsLh2B63QUcQlnAuYFTB4E'
let GOOGLE_MAPS_APIKEY = Constants.distanceAPIMatrix;
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
let previousState;
var newRegion = null;
let currentSelectedPage;
let pageChanged=false;
import socketUpdate from '../../utilities/socketUpdate';
let driverMap={};
let isSocketUpdated=false;
import CustomerConnection from "../../config/Connection";
import HiddenMarker from '../common/customerMarker'

let mediaUrl = CustomerConnection.mediaURL() + '/';
let markerList = HiddenMarker.hiddenMarkerList();

import blueFlag from '../../assets/images/blue.png';






// create a component
class mapViewOnly extends Component {

    fitAllMarkers(data) {

     var marker=[];
        data.forEach(element => {
            marker.push(element.coordinates); 
        });
        if(data.length==0)
        return;
        console.log(marker);

       // return; 

       if(this.map==null)
       return
        this.map.fitToCoordinates(marker, {
          edgePadding: DEFAULT_PADDING,
          animated: true,
        });
      }




      updateDriverLoc=(data)=>{

     
       let markerList=this.state.markerList?this.state.markerList:[]
            data.driverList.map(item=>{
            console.log(item);
                if(!driverMap[item._id])
                {   isSocketUpdated=true;

               //    let markerData= HiddenMarker.assign();
               let markerData= HiddenMarker.appendNewMarker(item);
               driverMap[item._id]=markerData.marker;
               markerList.push(markerData);
              

               return;

          /*  console.log(markerData);

                  driverMap[item._id]=markerData.marker;
                  var driverArray= [];
                  driverArray=this.state.vehicleArray;
                                   
                  console.log( driverMap[item._id]);

                              
                  driverMap[item._id]['markerCMP']._component.animateMarkerToCoordinate(
                    {
              
                      latitude:item.geometry[0].coordinates[1],
                      longitude: item.geometry[0].coordinates[0]
                    },
                       2000,
                     );

                    /* driverMap[item._id]['ImageCMP'].setNativeProps({
                        source:{uri:"http://www.schaik.com/pngsuite2011/ps2n2c16.png"},

                        style:{height:20,width:20, resizeMode:'contain'}

                       });*/
                     //  driverMap[item._id]['ImageCMP'].forceUpdate()
               
                  driverMap[item._id]['markerCMP'].setNativeProps({
                            coordinate: {
                                latitude:item.geometry[0].coordinates[1],
                                longitude: item.geometry[0].coordinates[0]
                                 },
                               
                                 title:item.firstName+' '+item.lastName,
                              
                           })

                         
                           
                     
                 
                }
                else
                {

                    console.log("gsgsggsggsgsggg");
                    driverMap[item._id]['markerCMP']._component.animateMarkerToCoordinate(
                        {
                  
                          latitude:item.geometry[0].coordinates[1],
                          longitude: item.geometry[0].coordinates[0]
                        },
                           2000,
                         );
                     
                         driverMap[item._id]['markerCMP'].setNativeProps({
                                coordinate: {
                                    latitude:item.geometry[0].coordinates[1],
                                    longitude: item.geometry[0].coordinates[0]
                                     },
                                      pinColor:'green',
                                      title:item.firstName+' '+item.lastName
                               })

                }
        })


        this.setState({markerList});

          }
        
          socketUpdateCallback=(data)=>{
        

         //   console.log
        
          switch (data.eventType)
          {
           case 'customerLatLng':
             this.updateDriverLoc(data);
            break;

            case 'driverInside':
            var tempData={};    
            console.log(data.data);    
            tempData.driverList=[data.data];
         //   console.log(tempData.driverList);
            this.updateDriverLoc(tempData);
            break;
         }
        
        
        }


    constructor(props) {
        super(props);
        this.state = {
            error: null,
            showMap: true,
            VehicleList: [],
            vehicals: [],
            initialPosition:
            {
                latitude:this.props.locationData.currentLocation!=null?this.props.locationData.currentLocation.coords.latitude:0,
                longitude: this.props.locationData.currentLocation!=null?this.props.locationData.currentLocation.coords.longitude:0,
                latitudeDelta: 0.010,
                longitudeDelta: 0.010,
            },

            vehicleArray:[],
            testMap:[],
            markerList:markerList

        }
        this.initialPosition = this.state.initialPosition;
        this.markerPositionLength = this.props.state.markerPositions.length;

//       HiddenMarker.hiddenMarker();
    }

    componentDidMount() {
        var requestObject={
            customerId:this.props.user.userData.data._id,
            latitude:this.props.locationData.currentLocation!=null?this.props.locationData.currentLocation.coords.latitude:0,
            longitude: this.props.locationData.currentLocation!=null?this.props.locationData.currentLocation.coords.longitude:0,
            socketUpdateCallback:this.socketUpdateCallback,
         };
         console.log(requestObject);

setTimeout(() => {
        socketUpdate.customerSocket(requestObject);
    }, 500);
         



   /* setInterval(() => {
       let markerList=this.state.markerList;
        markerList.push(HiddenMarker.appendNewMarker());
        this.setState({markerList});
        console.log(markerList);

    }, 5000);*/

    return;
       

        currentSelectedPage="CustomerHomeNewx";
       


     

    }

    shouldComponentUpdate(nextProps, previousProp) {

return true;

//markerList=HiddenMarker.getLatestMarkerList();

       


        if(isSocketUpdated)
        {
            isSocketUpdated=false;
            return true;
        }
         
        if(!pageChanged && !this.props.locationData.showmap[currentSelectedPage] )
           { 

             
               pageChanged=true;
               return true;
            }

        if(pageChanged && this.props.locationData.showmap[currentSelectedPage] &&
            nextProps.locationData.showmap[currentSelectedPage])
       { 
           
        console.log("22");
        pageChanged=false;
           return true;
       }

     
   

        if(
            nextProps.state.markerPositions.length != this.markerPositionLength
            
            )
      
     {
        console.log("33");
            this.markerPositionLength = nextProps.state.markerPositions.length;
            setTimeout(() => {
                this.fitAllMarkers(nextProps.state.markerPositions);
            }, 300);

          
               
            return true;
        }
        console.log( nextProps.state.markerPositions.length + '----' +this.markerPositionLength +' ------'+ pageChanged);
       

        return false;
    }




    render() {
       
        wayPoints = [];
        let destination;

        newRegion=null

        this.props.state.markerPositions.map((marker, i) => {
            console.log(marker);
            if (marker.title != '') {
                newRegion = marker.coordinates;
                wayPoints.push(marker.coordinates);
            }
        });

        if(newRegion==null)
        newRegion=this.state.initialPosition

console.log(wayPoints);

        if (wayPoints.length > 0) {
            origin = wayPoints[0];
            destination = wayPoints[wayPoints.length - 1];
        }

   
        return (
            <View >
              <MapView
                //    key={new Date().getTime()}
                  //  ref={ref => { this.map = ref; }}
                    style={{ height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 75, zIndex: 0 }}
               //     zoomEnabled={true}
                    initialRegion={this.state.initialPosition}
                    region={newRegion}
                       showsUserLocation={true}
                   followsUserLocation={true}
                   // pitchEnabled={false}
                   // showsMyLocationButton={true}
                   // rotateEnabled={false}
                    // customMapStyle={Constants.MapStyle.default}
                >

                    {this.props.state.markerPositions.map((marker, i) => (
                        <MapView.Marker coordinate={marker.coordinates}
                            title={marker.title}
                            key={marker.id}
                        >
                            <View>
                                <Image source={marker.img}
                                    style={{ height: 20, width: 20, resizeMode: 'center' }}
                                ></Image>
                            </View>
                        </MapView.Marker>

                    ))

                    }

                      {  <MapView.Marker coordinate={this.props.locationData.currentLocation.coords
                      }
                        >
                            <View>
                                <Image 
                                    style={{ height: 20, width: 20, resizeMode: 'center' }}
                                ></Image>
                            </View>
                        </MapView.Marker>
                      }
                    {wayPoints.length > 1 &&
                        <MapViewDirections
                            origin={origin}
                            waypoints={wayPoints}
                            destination={destination}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={8}
                            strokeColor="#809fff"
                        />}


                        { this.state.markerList}

{/*
this.state.vehicleArray.map((item)=>{

return <MapView.Marker.Animated
ref={marker => { driverMap[item.driverId] = marker 

}}
coordinate={item}
title={item.title}
//image={require('../assets/pin.png')}
>
<View>
                              
                            </View>
    </MapView.Marker.Animated>

     }
     )
    */}


{ this.state.testMap.map((item)=>{

return <MapView.Marker.Animated
ref={marker => { driverMap[item.driverId] = marker 

}}
coordinate={item}
/>

     })
    }

{/* <Circle
            center={this.state.initialPosition}
            radius={10 * 1000}
            fillColor="#80808090"
            strokeColor="red"
          /> */}
                </MapView>


            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
const mapStateToProps = state => ({
    state: state.CustomerReducer,
    locationData: state.location,
    user:state.user
});




export default connect(mapStateToProps, null)(mapViewOnly);
