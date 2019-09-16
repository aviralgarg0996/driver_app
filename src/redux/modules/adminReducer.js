/* *
 * @file: location.js
 * @description: Location reducer to handle user current location and selected location.
 * @date: 20.12.2017
 * @author: Ankush Rishi
 * */
'use strict';
// Actions


import {
    Platform,AsyncStorage
  } from 'react-native';
  import _ from "underscore";
  import { startLoading, stopLoading, showToast, hideToast } from './app';
  import { goBack, reset } from './nav';
  import RestClient from '../../utilities/RestClient';
  import { ToastActionsCreators } from 'react-native-redux-toast';
  //import { destroySocketClient } from '../../utilities/SocketClient';
  import { cancelAllLocalNotifications } from '../../utilities/PushNotification';
  import  axios  from "axios";  


const SET_DETAILS_CATEGORY = "SET_DETAILS_CATEGORY";
export const setDetails = (data) => ({ type: SET_DETAILS_CATEGORY, data });


const initialState = {
   categoryData:null
};




export const Get_Admin_Data = (url,data,type) => {
    
  	  return  RestClient.get_New_Post(url,data,type);

}




 
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_DETAILS_CATEGORY:
            return { ...state, categoryData : action.data};

            default:
            return state;
    }
}
