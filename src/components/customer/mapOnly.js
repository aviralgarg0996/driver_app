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
let pageChanged = false;




// create a component
class mapViewOnly extends Component {

    fitAllMarkers(data) {

        var marker = [];
        data.forEach(element => {
            marker.push(element.coordinates);
        });
        if (data.length == 0)
            return;

        // return; 

        if (this.map == null)
            return
        this.map.fitToCoordinates(marker, {
            edgePadding: DEFAULT_PADDING,
            animated: true,
        });
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
                latitude: this.props.locationData.currentLocation != null ? this.props.locationData.currentLocation.coords.latitude : 0,
                longitude: this.props.locationData.currentLocation != null ? this.props.locationData.currentLocation.coords.longitude : 0,
                latitudeDelta: 0.20,
                longitudeDelta: 0.20,
            },

        }
        this.initialPosition = this.state.initialPosition;
        this.markerPositionLength = this.props.state.markerPositions.length;
    }

    componentDidMount() {
        currentSelectedPage = "CustomerHomeNewx";
        //      this.props.dispatch({ type: 'RESET_DETAILS', deliveryFlag: 0, hourlyFlag: 1 });

    }

    shouldComponentUpdate(nextProps, previousProp) {




        if (!pageChanged && !this.props.locationData.showmap[currentSelectedPage]) {


            pageChanged = true;
            return true;
        }

        if (pageChanged && this.props.locationData.showmap[currentSelectedPage] &&
            nextProps.locationData.showmap[currentSelectedPage]) {

            pageChanged = false;
            return true;
        }




        if (
            nextProps.state.markerPositions.length != this.markerPositionLength

        ) {
            this.markerPositionLength = nextProps.state.markerPositions.length;
            setTimeout(() => {
                this.fitAllMarkers(nextProps.state.markerPositions);
            }, 300);



            return true;
        }


        return false;
    }




    render() {

        wayPoints = [];
        let destination;

        newRegion = null

        this.props.state.markerPositions.map((marker, i) => {
            if (marker.title != '') {
                newRegion = marker.coordinates;
                wayPoints.push(marker.coordinates);
            }
        });

        if (newRegion == null)
            newRegion = this.state.initialPosition


        if (wayPoints.length > 0) {
            origin = wayPoints[0];
            destination = wayPoints[wayPoints.length - 1];
        }


        return (
            <View >
                <MapView
                    key={new Date().getTime()}
                    ref={ref => { this.map = ref; }}
                    style={{ height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 75, zIndex: 0 }}
                    zoomEnabled={true}
                    //    initialRegion={this.state.initialPosition}
                    region={newRegion}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    pitchEnabled={false}
                    showsMyLocationButton={true}
                    rotateEnabled={false}
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

                    {<MapView.Marker coordinate={this.props.locationData.currentLocation.coords
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
    locationData: state.location
});




export default connect(mapStateToProps, null)(mapViewOnly);
