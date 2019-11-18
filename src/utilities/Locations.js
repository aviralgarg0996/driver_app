/* eslint-disable prettier/prettier */
'use strict';
import { Platform } from 'react-native';
// import Permissions from 'react-native-permissions';
import * as LocationActions from '../redux/modules/location';
import Constants from '../constants';
import Geocoder from 'react-native-geocoder';
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';


Geocoder.fallbackToGoogle(Constants.GoogleAPIKey);

async function requestCameraPermission(store, type) {
  console.log('1111')
  // let coords='{"mocked":false,"timestamp":1549570060000,"coords":{"speed":0,"heading":0,"accuracy":20,"longitude":-123.1207,"altitude":0,"latitude":49.2827}}'
  // type(JSON.parse(coords))
  // console.log("111122",coords)
  // store.dispatch(LocationActions.setDetails(JSON.parse(coords)));
  // return
  if (Platform.OS === 'android') {

    androidCheck(store, type)
  } else {
    iosCheck(store, type)
  }
}

async function androidCheck(store, type) {
  try {
   
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Device Location',
        'message': 'It\'s here needs to access your Location'
      }

    )


    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

      try {

        Geolocation.getCurrentPosition(function (e) {
          console.log('success in coords', JSON.stringify(e))
          type(e)
          store.dispatch(LocationActions.setDetails(e));
        }, function (e) {
          type(e)
        });

        Geolocation.watchPosition(
          (success) => {

            console.log(success);

            store.dispatch(LocationActions.setDetails(success));

          },
          () => { 
            // alert('stopLoading errior'+error);
       //     store.dispatch(stopLoading())
         //   store.dispatch(LocationActions.setDetails(null));
           // store.dispatch(LocationActions.locationError(true));
          },
          {
            enableHighAccuracy: true, timeout: 20000, maximumAge: 1, distanceFilter:1,
          }
        );
      }
      catch (Ex) {
          alert(Ex);
      }
    } else {
     
      type();
    }
  } catch (err) {
    console.warn(err)
  }
}
async function iosCheck(store, type) {
  Geolocation.getCurrentPosition(function (e) {
    console.log('success in coords', JSON.stringify(e))
    type(e)
    store.dispatch(LocationActions.setDetails(e));
  }, function (e) {
    type(e)
  });
}


export function checkPermissions(store, type) {
  requestCameraPermission(store, type);
}


export function checkPermissions1() {
  // Permissions.getPermissionStatus('location', 'whenInUse').then(response => {
  //   if (response === "authorized") {
  //     InteractionManager.runAfterInteractions(() => {
  //       navigator.geolocation.watchPosition(
  //         (success) => {
  //           console.log('inside watchPosition', store.getState());

  //           Geocoder.geocodePosition({
  //             lat: success.coords.latitude,
  //             lng: success.coords.longitude
  //           }).then(res => {
  //             store.dispatch(stopLoading())
  //             store.dispatch(LocationActions.locationError(false));
  //             store.dispatch(LocationActions.setDetails(res[0]));
  //           }).catch(err => {
  //             console.log('inside watchPosition', store.getState());
  //             store.dispatch(stopLoading())

  //             // store.dispatch(LocationActions.setDetails(null));
  //             // store.dispatch(LocationActions.locationError(true));
  //           });
  //         },
  //         (error) => {
  //           console.log('stopLoading errior', error);
  //           store.dispatch(stopLoading())
  //           store.dispatch(LocationActions.setDetails(null));
  //           store.dispatch(LocationActions.locationError(true));
  //         },
  //         {
  //           enableHighAccuracy: false,
  //           timeout: 1000 * 60 * 1,
  //           maximumAge: 2000,
  //           distanceFilter: 100
  //         }
  //       );
  //     });
  //   } else {
  //     alert("test")
  //     requestPermissions(store, type);
  //   }
  // });
}

export function requestPermissions() {
  // Permissions.requestPermission('location', 'whenInUse').then(response => {
  //   if (response !== "authorized") {
  //     store.dispatch(LocationActions.setDetails(null));
  //     store.dispatch(LocationActions.locationError(true));
  //     setTimeout(() => {
  //       Alert.alert(
  //         type ? Constants.i18n.permissionsSignup.LocationPermissionHeader : Constants.i18n.permissions.LocationPermissionHeader,
  //         type ? Constants.i18n.permissionsSignup.LocationPermissionText : Constants.i18n.permissions.LocationPermissionText,
  //         [{
  //           text: "Enable",
  //           onPress: () => { Permissions.openSettings() }
  //         }, {
  //           text: "Cancel",
  //           onPress: () => { console.log("cancelable") }
  //         }],
  //         { cancelable: false }
  //       );
  //     }, 700);
  //   } else {
  //     checkPermissions(store);
  //   }
  // });
}


