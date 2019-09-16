'use strict';
import {
  Platform,
} from 'react-native';
import { startLoading, stopLoading} from './app';
import RestClient from '../../utilities/RestClient';
import { ToastActionsCreators } from 'react-native-redux-toast';

// Actions


// Action Creators


//perform api's related to user


/**
* Initial state
*/
const initialState = {
  OrderData:{},
  ScreenMaxFlag:true,
  acceptedOrderData:{},
  orderHistory:[],
  ongoingResult:{}
};



export const serachOrder = (data) => {



	//console.log('data ********* ',data)
/*	let	requestObject = {
		email : data
    }

	return dispatch => {
		dispatch(startLoading());
		RestClient.post("users/resend",requestObject).then((result) => {
			//console.log('result email verify ******* ',result)
 		if(result.status==1){
    		dispatch(stopLoading());
				alert(result.message);				
	  	}else{
	    	dispatch(stopLoading());
	    	alert(result.message);
	  	}
		}).catch(error => {
	  		console.log("error=> ", error)
	  		dispatch(stopLoading());
		});
	}*/
};


/**
* Reducer
*/
export default function OrdersHandleReducer(state = initialState, action = {})
{
    var newstate = Object.assign({}, state);
    switch (action.type) {
      case 'SET_ORDERDATA':
        newstate.OrderData = action.data;
        return newstate;

      case 'SET_ACCEPTED_OREDERDATA':
       
        newstate.acceptedOrderData = action.data;
        return newstate;
       
    case 'SET_START_ORDERDATA':
      newstate.startedOrderData = action.data;
      return newstate;

      case 'SET_ORDER_STATE':
      newstate.os = action.data;
      return newstate;

      case 'SET_PICKUPDATA':
//alert(JSON.stringify(action.data));
newstate.ongoingResult=action.data;
      return newstate;

      case 'SET_ORDER_HISTORY':
      newstate.orderHistory=action.data;
      return newstate;

      case 'SET_SCREENSIZE':
        newstate.ScreenMaxFlag = action.flag;
        return newstate;

      default:
          return newstate;

    }
}
