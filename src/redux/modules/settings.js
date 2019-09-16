/* *
 * @file: app.js
 * @description: Application Reducer for handling toasts and spinner.
 * @date: 14.12.2017
 * @author: Ankush Rishi
 * */

'use strict';


import {
  Platform,
} from 'react-native';
import _ from "lodash";
import { startLoading, stopLoading } from './app';


import RestClient from '../../utilities/RestClient';
import { ToastActionsCreators } from 'react-native-redux-toast';







// Actions
const SUPPORT_MESSAGE = "SUPPORT_MESSAGE";

// Action Creators

//export const setSupportMsg = (data) => ({ type: SUPPORT_MESSAGE,data });

export const supportMessage = (data, token) => {

  let requestObject = {
    message: data.message

  }
  return dispatch => {
    dispatch(startLoading());
    RestClient.post("drivers/saveSupportMessages", requestObject, token).then((result) => {
      console.log('result saveSupportMessages ****** ', result)
      if (result.status === 1) {
        dispatch(stopLoading());
        dispatch(ToastActionsCreators.displayInfo(result.message));

      } else {
        dispatch(stopLoading());
        dispatch(ToastActionsCreators.displayInfo(result.message));
      }
    }).catch(error => {
      console.log("error=> ", error)
      dispatch(stopLoading());
    });
  }
}



//Miscellaneous setting api
export const miscellaneousSetting = (data, token) => {

  let requestObject = {
    currency: data.currency,
    weightUnits: data.weightUnits,
    lengthUnits: data.lengthUnits,
    furnitureService: data.furnitureService

  }
  return dispatch => {
    dispatch(startLoading());
    RestClient.post("drivers/saveMiscSettings", requestObject, token).then((result) => {
      console.log('result saveMiscSettings ****** ', result)
      if (result.status === 1) {
        dispatch(stopLoading());
        dispatch(ToastActionsCreators.displayInfo(result.message));

      } else {
        dispatch(stopLoading());
        dispatch(ToastActionsCreators.displayInfo(result.message));
      }
    }).catch(error => {
      console.log("error=> ", error)
      dispatch(stopLoading());
    });
  }
}



// Reducer

const initialState = {

};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SUPPORT_MESSAGE:
      return { ...state };



    default:
      return state;
  }
}