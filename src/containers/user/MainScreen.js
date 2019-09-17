/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
   
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import Background from '../../components/common/Background';
import Constants from "../../constants";
import * as ScheduleActions from '../../redux/modules/schedule';
import { bindActionCreators } from "redux";
// import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driverId: props.userData.data._id,
      initialPosition: 'unknown',
    }
   
  }
//   componentWillMount() {

//   openCustomerApp = () => {

//     this.props.navigation.navigate('customerprofile')

//     return;

//   }
// }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Background style={styles.container}>
        <Image source={Constants.Images.user.logo} style={styles.logo} resizeMode={'contain'} />
        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignSelf:"center",marginTop:Constants.BaseStyle.DEVICE_HEIGHT*0.10 }}>
          <View style={[styles.singleContainer]}>
            <ImageBackground source={require("../../assets/images/customer/blue-box.png")}
             style={styles.outerContainer}>
              <TouchableOpacity onPress={() => {
                try {
                  navigate('profile')
                }
                catch (e) {
                  alert(e);
                }

              }} style={styles.imgContainer}>
                <Image source={Constants.Images.user.driver_van}
                 style={styles.imageStyle} resizeMode={'contain'} />
              </TouchableOpacity>
            </ImageBackground>
            <Text style={styles.text}>Driver App</Text>
          </View>
          <View style={[styles.singleContainer]}>
            <ImageBackground 
            source={require("../../assets/images/customer/blue-box.png")} 
            style={styles.outerContainer}>
              <TouchableOpacity onPress={() => { navigate('customerprofile') }
              }
                style={styles.imgContainer}>
                <Image source={Constants.Images.user.customer_cart} 
                style={styles.imageStyle} resizeMode={'contain'} />
              </TouchableOpacity>
            </ImageBackground>
            <Text style={styles.text}>Customer App</Text>
          </View>
        </View>
        <View style={{ alignSelf:"center",bottom:10,position:'absolute' }}>
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <Text onPress={() => alert("terms")} style={[styles.register, { color: Constants.Colors.silverGray }]}>Terms & Conditions</Text>
            <Text style={[styles.register, { marginHorizontal: 15 }]}>|</Text>
            <Text onPress={() => alert("privacy")} style={[styles.register, { color: Constants.Colors.silverGray }]}>Privacy Policy</Text>
          </View>
          <View style={{ alignSelf: "center" }}>
            <Text style={[styles.register, { color: Constants.Colors.WhiteUpd }]}>All Rights Reserved</Text>
          </View>
        </View>
      </Background>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  outerContainer:{
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 40,
              height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 40,
              borderRadius: 5, 
              alignItems: "center",
              overflow:"hidden",
              justifyContent: "center"
  },
  logo: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 25,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 40
  },
  imageStyle: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 15,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 25,
    alignSelf: 'center',
  },
  register: {
    fontSize: 17,
    backgroundColor: 'transparent',
    color: Constants.Colors.WhiteUpd,
    textAlign: 'center',
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1.5
  },
  text: {
    fontSize: 22,
    backgroundColor: 'transparent',
    color: Constants.Colors.silverGray,
    alignSelf: "center",
    marginTop: 10
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent:"center",
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 22,
    width: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 22,
    backgroundColor: 'transparent',
    borderRadius: 8
  },
  singleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
});

const mapStateToProps = state => (
  {
    scheduleDatesList: state.schedule.scheduleDatesList,
    userData: (state.user && state.user.driverData) || (state.user && state.user.userData),
  });

const mapDispatchToProps = dispatch => ({
  ScheduleActions: bindActionCreators(ScheduleActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);