//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import Constants from "../../constants";
import { connect } from 'react-redux';
//let GOOGLE_MAPS_APIKEY = 'AIzaSyCa2zZ-9wObLwsLh2B63QUcQlnAuYFTB4E'
let GOOGLE_MAPS_APIKEY = Constants.distanceAPIMatrix;
let currentSelectedPage;
let pageChanged=false;



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
            {
             
                latitude:this.props.locationData.currentLocation!=null?this.props.locationData.currentLocation.coords.latitude:0,
                longitude: this.props.locationData.currentLocation!=null?this.props.locationData.currentLocation.coords.longitude:0,
              
             
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
            },
           
        }
        this.initialPosition = this.state.initialPosition;
       
        this.markerPositionLength=this.props.state.markerPositions.length;
        
        
    }

    componentDidMount(){

       /* this.props.dispatch({ type: 'SHOW_MAP',  data:{home:false,
            urgency:true,
            selectDriver:false} });*/


              
                
            if(this.props.locationData.showmap.UrgencyForFood1)
                currentSelectedPage='UrgencyForFood1';
                else if(this.props.locationData.showmap.UrgencyForCourier1)
                currentSelectedPage='UrgencyForCourier1';
                else if(this.props.locationData.showmap.UrgencyForDoc1)
                currentSelectedPage='UrgencyForDoc1';
                else if(this.props.locationData.showmap.UrgencyForFurniture1)
                currentSelectedPage='UrgencyForFurniture1';

    }

    

    shouldComponentUpdate(nextProps){
        

       
        if(!pageChanged && !this.props.locationData.showmap[currentSelectedPage])
           { 
               pageChanged=true;
               return true;
            }

        if(pageChanged && this.props.locationData.showmap[currentSelectedPage] &&
            nextProps.locationData.showmap[currentSelectedPage])
       { pageChanged=false;
           return true;
       }

      


        return false;
    }
    render() {

        var newRegion = null;

        wayPoints = [];


        this.props.state.markerPositions.map((marker, i) => {
            if (marker.title != '') {
                newRegion = marker.coordinates;
                wayPoints.push(marker.coordinates);
            }
        });
        if (wayPoints.length > 0) {
            origin = wayPoints[0];
            destination = wayPoints[wayPoints.length - 1];
        }


        return (
            <View >
                {(this.props.locationData.showmap.UrgencyForFood1 ||
                this.props.locationData.showmap.UrgencyForCourier1 ||
                this.props.locationData.showmap.UrgencyForDoc1 ||
                this.props.locationData.showmap.UrgencyForFurniture1)
                
                && <MapView
                        key={new Date().getTime()}
                        style={{ height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * this.props.height, zIndex: 0 }}
                        zoomEnabled={true}
                       initialRegion={this.state.initialPosition}
                        region={newRegion}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        pitchEnabled={false}
                        showsMyLocationButton={true}
                        rotateEnabled={false}
                     //   customMapStyle={Constants.MapStyle.default}
                    >
                    {this.props.state.markerPositions.map((marker, i) => (
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

                    </MapView>}


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
    locationData: state.location
});

export default connect(mapStateToProps, null)(mapViewOnly);
