import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  //Image,
  TouchableOpacity,
} from 'react-native';
import Constants from "../../../constants";
import NavigationBar from "react-native-navbar";
import MapView from 'react-native-maps';
import { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";


export default class LandingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      circle: {
        center: {
          latitude: 37.78825,
          longitude: -122.4324,
        },
        radius: 700,
      },
    }
  }

  render() {
    const titleConfig = {
      title: "Set your pickup location",
      tintColor: Constants.Colors.Blue,
      style: { fontSize: 18, fontWeight: '600' }
    };

    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <NavigationBar
          statusBar={{ hidden: true }}
          style={styles.navigationBar}
          title={titleConfig}
        />
        {this.renderMap()}
        {this.renderToggleTabs()}
        {this.renderBottomButton()}
      </View>
    );
  }

  GoToSignIn() {
    this.props.navigation.navigate("Login")
    // User finished the introduction. Show "real" app
  }

  GoToSignUp() {
    this.props.navigation.navigate("Register")
    // User finished the introduction. Show "real" app
  }

  renderMap() {
    return (
      <View style={{ flex: 1, backgroundColor: Constants.Colors.White }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          //style={{height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 40}}
          style={{ flex: 1, zIndex: -1 }}
          //onRegionChangeComplete={onRegionChangeComplete}
          initialRegion={this.state.mapRegion}
          region={this.state.mapRegion}
          //annotations={this.state.annotations}
          zoomEnabled={true}
          //showsUserLocation={true}
          pitchEnabled={false}
          rotateEnabled={false}
          cacheEnabled={true}
          scrollEnabled={true}
        //customMapStyle={Constants.MapStyle}
        >
          <MapView.Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324
            }}
            title={"title"}
            description={"description"}
          />
          <Circle
            center={this.state.circle.center}
            radius={this.state.circle.radius}
            //zIndex={2}
            //fillColor = { 'rgb(184, 230, 242,0.8)' }
            strokeWidth={1}
            strokeColor={Constants.Colors.LightBlue}
            fillColor={'rgb(184, 230, 242)'}
          />
        </MapView>
      </View>
    )
  }

  renderBottomButton() {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this.GoToSignUp.bind(this)} style={[styles.btnView]}>
        <Text style={[styles.textstyle]}>{`JOIN US AS A DRIVER`}</Text>
      </TouchableOpacity>
    )
  }

  renderToggleTabs() {
    return (
      <View style={[styles.TabView, { flexDirection: 'row' }]}>
        <TouchableOpacity onPress={this.GoToSignIn.bind(this)} activeOpacity={0.8} style={[styles.TabSubLeftView]} underlayColor='#fee989'>
          <Text style={[styles.textstyle]}>{`Sign in`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.GoToSignUp.bind(this)} activeOpacity={0.8} style={[styles.TabSubRightView]} underlayColor='white'>
          <Text style={[styles.textstyle]}>{`Register`}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar: {
    backgroundColor: Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    alignItems: 'center'
  },
  btnView: {
    // ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 90,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 5,
    padding: 15,
    bottom: Constants.BaseStyle.DEVICE_HEIGHT * 0.04,
    backgroundColor: Constants.Colors.LightBlue,
    borderColor: Constants.Colors.LightBlue,
  },
  textstyle: {
    color: Constants.Colors.Blue,
    fontWeight: 'bold',
    fontSize: 16,
  },
  TabView: {
    position: 'absolute',
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 90,
    alignSelf: 'center',
    top: Constants.BaseStyle.DEVICE_HEIGHT * 0.15,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Constants.Colors.LightBlue,
    flexDirection: 'row',
    backgroundColor: Constants.Colors.LightBlue,
  },
  TabSubLeftView: {
    flex: 0.5,
    backgroundColor: Constants.Colors.LightBlue,
    alignItems: 'center',
    padding: 15,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4
  },
  TabSubRightView: {
    flex: 0.5,
    backgroundColor: Constants.Colors.White,
    alignItems: 'center',
    padding: 15,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  }


});
