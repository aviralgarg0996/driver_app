//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
var LATITUDE=22; 
var LONGITUDE=77;


// create a component
class MyClass extends Component {

constructor(props){
  super(props)

  this.state={
    markerList:[]
  }

}

  componentDidMount(){


setInterval(() => {
let markerList=this.state.markerList;
  markerList.push(  <MapView.Marker.Animated
    ref={marker => { this.marker = marker }}
    coordinate={ { latitude: 44+Math.random()*.002,
      longitude:55 }}
  />);


  this.setState({markerList})
  
},2000);

  }








  getInitialState() {
    return {
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
      }),
    };
  }
  
  componentWillReceiveProps(nextProps) {
    const duration = 500
  
    if (this.props.coordinate !== nextProps.coordinate) {
      if (Platform.OS === 'android') {
        if (this.marker) {
          this.marker._component.animateMarkerToCoordinate(
            nextProps.coordinate,
            duration
          );
        }
      } else {
        this.state.coordinate.timing({
          ...nextProps.coordinate,
          duration
        }).start();
      }
    }
  }









  render() {
    return (
      <View style={styles.container}>
      <MapView    style={{height:'100%',width:'100%'}} >
      {this.state.markerList}
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
export default MyClass;
