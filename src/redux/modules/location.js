/* *
 * @file: location.js
 * @description: Location reducer to handle user current location and selected location.
 * @date: 20.12.2017
 * @author: Ankush Rishi
 * */
'use strict';
// Actions
const SET_DETAILS = "SET_DETAILS";
const SELECTED_DETAILS = "SELECTED_DETAILS";
const LOCATION_ERROR = "LOCATION_ERROR";
const NEXT_PICKUP = "NEXT_PICKUP";
const SHOW_MAP = "SHOW_MAP";
let currentUser = '';

let currentStack = {

  tab1: 'CustomerHomeNewx',
  tab2: 'CustomerOrders',

  "tab1routesName": [
    "CustomerHomeNewx",
    "Home_Food",
    "Home_Services",
    "UrgencyForFood",
    "UrgencyForFood1",
    "UrgencyForDoc",
    "UrgencyForDoc1",
    "UrgencyForCourier",
    "UrgencyForCourier1",
    "UrgencyForFurniture",
    "UrgencyForFurniture1",
    "Home_ServicesDoc",
    "Home_ServicesItemsCourier",
    "Home_ServicesItemsFurniture",
    "Home_DocumentInvoice",
    "Home_CourierInvoice",
    "Home_FurnitureInvoice",
    "Home_Invoice",
    "Home_PaymentProceed",
    "Home_SelectDriver",
    "HourlyGetEstimate",
    "Hourly_Invoice",
    "Hourly_PaymentProceed",
    "Home_ServicesItemsCourier",
    "Home_ServicesItemsFurniture",
    "CustomerInfo",
    "NotesPick",
    "DraftPick",
    "Home_Invoice1",
    "PaymentSuccess"
  ],
  "tab2RoutesName": [

    "CustomerOrders",
    "Orders_Pending",
    "Orders_OnGoing",
    "Orders_Scheduled",
    "Orders_Canceled",
    "Orders_Drafts",
    "Orders_Delivered"

],
}




let mapScreen = {
  CustomerOrders: false,
  CustomerHomeNewx: false,
  Home_Food: false,
  Home_Services: false,
  UrgencyForFood: false,
  UrgencyForFood1: false,
  Home_Invoice: false,
  Home_PaymentProceed: false,
  PaymentSuccess: false,
  Home_SelectDriver: false,
  DrawerOpen: false,
  DrawerClose: false
}









import RestClient from '../../utilities/RestClient';
import socketUpdate from '../../utilities/socketUpdate';



// Action Creators
export const setDetails = (data) => ({ type: SET_DETAILS, data });
export const selectLocation = (data) => ({ type: SELECTED_DETAILS, data });
export const locationError = (data) => ({ type: LOCATION_ERROR, data });
export const nextPickUpdata = (data) => ({ type: NEXT_PICKUP, data });
export const setCurrentUser = (data) => { currentUser = data._id; }




export const RESET_MAP = (data) => {
  {

    if (data.back) {
      var action = {};
      action.routeName = data.data;
      for (var key in mapScreen)
        mapScreen[key] = false;

      if (currentStack.tab1routesName.indexOf(action.routeName) >= 0)
        currentStack.tab1 = action.routeName;
      if (currentStack.tab2RoutesName.indexOf(action.routeName) >= 0)
        currentStack.tab2 = action.routeName;

      mapScreen[action.routeName] = true;

      console.log(JSON.stringify(mapScreen));

    }


  }
}






// Reducer

const initialState = {
  currentLocation: null,
  selectedLocation: null,
  isError: false,
  nextPickUpLocation: null,
  showmap: {
    CustomerOrders: false,
    customerprofile: false,
    CustomerHomeNewx: false,
    Home_Food: false,
    Home_Services: false,
    UrgencyForFood: false,
    UrgencyForFood1: false,
    Home_Invoice: false,
    Home_PaymentProceed: false,
    PaymentSuccess: false,
    Home_SelectDriver: false,
    DrawerOpen: false,
    DrawerClose: false
  }

};



export const updateUserLocationAPI = (data) => {



  if (!currentUser)
    return;

console.log("-------" +    JSON.stringify(data))

  //  console.log(data);
  let requestObject = {
    driverid: currentUser,
    lat: data.coords.latitude,
    lng: data.coords.longitude,
    distance: 890,
  }

  socketUpdate.isTest(requestObject);
  /*RestClient.post_Synch("drivers/savedriverlatlng",requestObject).then((result) => {
          if(result.status==1){
        console.log(result.message);				
    }else{
    }
  }).catch(error => {
      console.log("error=> ", error)
  	
  });*/

};

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case SET_DETAILS:
      updateUserLocationAPI(action.data);
      //  socketUpdate.isTest();
      return { ...state, currentLocation: action.data };

    case SELECTED_DETAILS:

      return { ...state, selectedLocation: action.data };

    case LOCATION_ERROR:
      return { ...state, isError: action.data };

    case NEXT_PICKUP:
      return { ...state, nextPickUpLocation: action.data };


    case SHOW_MAP:


      return { ...state, showmap: action.data };

    case "Navigation/NAVIGATE":
      for (var key in mapScreen)
        mapScreen[key] = false;

      if (action.routeName == 'CustomerHomeNewx') {
        mapScreen[currentStack.tab1] = true;








      }
      else if (action.routeName == 'CustomerOrders') {
        mapScreen[currentStack.tab2] = true;
      } else {




        if (currentStack.tab1routesName.indexOf(action.routeName) >= 0)
          currentStack.tab1 = action.routeName;
        if (currentStack.tab2RoutesName.indexOf(action.routeName) >= 0)
          currentStack.tab2 = action.routeName;
        mapScreen[action.routeName] = true;
      }


      console.log(JSON.stringify(mapScreen));
      return { ...state, showmap: mapScreen }




    case "Navigation/RESET":
      for (var key in mapScreen)
        mapScreen[key] = false;
      action.routeName = action.actions[0].routeName;

      console.log(action.routeName);


      console.log(currentStack.tab1);

      console.log(mapScreen[currentStack.tab1]);




      if (currentStack.tab1routesName.indexOf(action.routeName) >= 0)
        currentStack.tab1 = action.routeName;
      if (currentStack.tab2RoutesName.indexOf(action.routeName) >= 0)
        currentStack.tab2 = action.routeName;

      mapScreen[action.routeName] = true;


      console.log(JSON.stringify(mapScreen));
      return { ...state, showmap: mapScreen }

    default:
      return state;
  }
}
