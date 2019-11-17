'use strict';
import {
  Platform,
} from 'react-native';

import Constants from "../../constants";
import moment from 'moment';
import CustomerConnection from "../../config/Connection";

import _ from "underscore";
import { Delivery_Type_USF } from '../../constants/Constants';


export const RESET_DETAILS = (data) => ({
  type: 'RESET_DETAILS',
});

/*import { startLoading, stopLoading, showToast, hideToast } from './app';
import { goBack, reset } from './nav';
//import { setDetails } from './location';
import CustomersAPI from '../../utilities/CustomersAPI';
import { ToastActionsCreators } from 'react-native-redux-toast';*/

// Actions
//export const SET_VEHICLECOST  = "SET_VEHICLECOST";

// Action Creators
//export const GET_VEHICLECOST = (data) => ({ type: SET_VEHICLECOST,data});

//perform api's related to customer
/*
GetVehicleCost
*/
/*export const get_vehiclecost = (data) => {
  let	requestObject = {
    pickupLocation: data.pickup,
    dropoffLocation: data.drop,
    date:data.date,
    time:data.time,
    quantity:data.quantity,
    service_type:data.service_type,
    }

    return dispatch => {
      dispatch(startLoading());
      CustomersAPI.post("place-order/vehiclecalculation/",requestObject).then((result) => {
        console.log('result dgunit ******* ',result)
      if(result.status == true){
          dispatch(stopLoading());
          dispatch(GET_VEHICLECOST(result.data));
        }else{
          dispatch(stopLoading());
          dispatch(ToastActionsCreators.displayInfo(result.message));
        }
      }).catch(error => {
          console.log("error=> ", error)
          dispatch(stopLoading());
      });
    }
}*/

/**
* Initial state
*/
const initialState = {
  DeliveryFlag: 1,
  HourlyFlag: 0,
  vehicleID: 0,
  vehicleName: 'bike',
  pickupArr: [{ id: 0, address: 'Pickup Location', img: 'plus', next: 3, prev: 1, lat: 0, long: 0 }],
  dropArr: [{ id: 0, address: 'Drop Off Location', img: 'plus', next: 3, prev: 1, lat: 0, long: 0 }],

  DisplayLocationAddress: [],
  LocationForService: 'Pickup ',
  LocationImgForService: Constants.Images.customer.markerBlue,

  Hourly_pickupArr: [{ id: 0, address: 'Choose Start Location', img: 'plus', lat: 0, long: 0 }],
  Hourly_dropArr: [{ id: 0, address: 'Choose End Location', img: 'plus', lat: 0, long: 0 }],

  PickDropFlag: 0,//1 for Pickup, 2 for Drop
  AddressCount: 0,
  placeModalVisibility: false,
  placeModalVisibility_hourly: false,
  CourierModalVisibility: false,
  CourierItemIndex: 0,
  DeliveryServiceOpacity: 0.8,
  EstimateColor: '#969297',
  pickUpControlCount: 1.9,
  EstimateButtonBackgroundColor: '#ffffff',//'#f4f5f7',
  HourlyServiceCount: 0,
  PICKUPTIMEUTC: (new Date().getHours()*60+new Date().getMinutes())*60000,
  PICKUPDATEUTC: new Date().setHours(0,0,0,0),
  Delivery_type_usf:Delivery_Type_USF.REGULAR,
  CountryCode: 'CA',//'CA',//  
//  CountryCode: 'IN',
  TransportArr: [
    {
      tag: '1', displayimg: Constants.Images.customer.bike, imgsource: Constants.Images.customer.bike,
      activeimgsource: Constants.Images.customer.active_bike, header: 'Bike', backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: '$10', name: 'bike'
    },
    {
      tag: '2', displayimg: Constants.Images.customer.small, imgsource: Constants.Images.customer.small,
      activeimgsource: Constants.Images.customer.active_small, header: 'Small', backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: '$30', name: 'small'
    },
    {
      tag: '3', displayimg: Constants.Images.customer.medium, imgsource: Constants.Images.customer.medium,
      activeimgsource: Constants.Images.customer.active_medium, header: 'Medium', backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: '$40', name: 'medium'
    },
    {
      tag: '4', displayimg: Constants.Images.customer.large, imgsource: Constants.Images.customer.large,
      activeimgsource: Constants.Images.customer.active_large, header: 'Large', backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: '$50', name: 'large'
    },
    {
      tag: '5', displayimg: Constants.Images.customer.xlarge, imgsource: Constants.Images.customer.xlarge,
      activeimgsource: Constants.Images.customer.active_xlarge, header: 'XLarge', backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: '$60', name: 'xlarge'
    },
    {
      tag: '6', displayimg: Constants.Images.customer.truck_deck, imgsource: Constants.Images.customer.truck_deck,
      activeimgsource: Constants.Images.customer.active_truck_deck, header: 'DeckTruck', backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: '$60', name: 'deck'
    },
    {
      tag: '7', displayimg: Constants.Images.customer.truck_fridge, imgsource: Constants.Images.customer.truck_fridge,
      activeimgsource: Constants.Images.customer.active_truck_fridge, header: 'FridgeTruck', backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: '$60', name: 'fridge'
    }
  ],

  TabHeaderImages: [
    {
      tag: 0,
      displayimg: Constants.Images.customer.locationmenu,
      img: Constants.Images.customer.locationmenu,
      activeimg: Constants.Images.customer.locationmenu_active,
      color: Constants.Colors.WhiteUpd
    },
    {
      tag: 1, displayimg: Constants.Images.customer.servicesmenu,
      img: Constants.Images.customer.servicesmenu,
      activeimg: Constants.Images.customer.servicesmenu_active,
      color: Constants.Colors.Black
    },
    {
      tag: 2, displayimg: Constants.Images.customer.paymentmenu,
      img: Constants.Images.customer.paymentmenu,
      activeimg: Constants.Images.customer.paymentmenu_active,
      color: Constants.Colors.Black
    },
    {
      tag: 3, displayimg: Constants.Images.customer.drivermenu,
      img: Constants.Images.customer.drivermenu,
      activeimg: Constants.Images.customer.drivermenu_active,
      color: Constants.Colors.Black
    },
  ],
  selectedTab: 0,

  HourlyServiceTabHeaderImages: [
    { tag: 0, displayimg: Constants.Images.customer.timemenu, img: Constants.Images.customer.timemenu, activeimg: Constants.Images.customer.timemenu_active, color: "#1E4281" },
    { tag: 1, displayimg: Constants.Images.customer.hourlylocationmenu, img: Constants.Images.customer.hourlylocationmenu, activeimg: Constants.Images.customer.hourlylocationmenu_active, color: "#1E4281" },
    { tag: 2, displayimg: Constants.Images.customer.paymentmenu, img: Constants.Images.customer.paymentmenu, activeimg: Constants.Images.customer.paymentmenu_active, color: "#1E4281" },
    { tag: 3, displayimg: Constants.Images.customer.drivermenu, img: Constants.Images.customer.drivermenu, activeimg: Constants.Images.customer.drivermenu_active, color: "#1E4281" },
  ],

  HourlyServiceDisplayDate: 'Select Date',
  HourlyServiceDate: new Date(),//moment().format('YYYY-MM-DD')
  HourlyServiceDisplayTime: 'Select Time',
  HourlyServiceTime: new Date(),//moment().format('hh:mm'),
  pickupdate: new Date(),
  pickupTime: new Date(),
  HourlyServiceDisplayDuration: 'Select Duration',
  HourlyServiceDuration: 1,
  SearchPlaceList: [],
  SearchPlaceList_Hourly: [],
  FoodRange: 0,
  DocumentWeight: 0,
  DeliveryCharge: 0,
  Orders: [],
  InvoiceData: [],
  DriverHelpCost: 0,
  ExtraHelperCost: 0,
  DeliveryTypeTransportArray: [
    {
      type: 'food',
      transport: [1, 2, 3, 7]
    },
    {
      type: 'document',
      transport: [1, 2, 3, 7]
    },
    {
      type: 'furniture',
      transport: [3, 4, 5, 6]
    },
    {
      type: 'courier',
      transport: [4, 5, 7]
    },
  ],
  FilteredTransportArray: [],
  DeliveryType: 0,
  HomeTabsIndex: 0,
  HourlyServiceTabIndex: 0,
  FurnitureItemList: [],
  ActiveNextBackColor: '#FFFFFF',
  ActiveNextTextColor: '#C3C1C0',
  ActiveButton: false,
  IsStartTime: false,
  IsDeliveryDate: false,
  IsVehicle: false,

  initialPosition:
  {
    latitude: 28.6139,
    longitude: 77.2090,
    latitudeDelta: 1,
    longitudeDelta: 1,
  },
  markerPositions: [

    //{ id: 0, title: '', coordinates: { latitude: 56.1304, longitude: -106.3468, latitudeDelta: .5, longitudeDelta: .5 }, img: ''},
  ],
  DriverPositions: [{
    latitude: 28.6139,
    longitude: 77.2090,
    latitudeDelta: 1,
    longitudeDelta: 1,
  }],

};

/**
* Reducer
*/
export default function CustomerReducer(state = initialState, action = {}) {
  var newstate = Object.assign({}, state);

  switch (action.type) {

    case 'SET_SELECTED_FLAG':
      newstate.selectedTab = action.selectedTabFlag;
      return newstate;

    case 'SET_SERVICEFLAG':
      newstate.HourlyFlag = action.hourlyFlag;
      newstate.DeliveryFlag = action.deliveryFlag;
      if (newstate.DeliveryFlag == 1) {
        if (newstate.dropArr.length > 1 && newstate.pickupArr.length > 1) {
          newstate.DeliveryServiceOpacity = 1;
          newstate.EstimateColor = '#53C8E5';
          newstate.EstimateButtonBackgroundColor = '#ffffff';
        }
        else {
          newstate.DeliveryServiceOpacity = 0.8;
          newstate.EstimateColor = '#969297';
          newstate.EstimateButtonBackgroundColor = '#ffffff';
        }

        var arrMarker = [];
        //var markerlen=newstate.markerPositions.length;
        if (newstate.pickupArr.length > 1) {
          newstate.pickupArr.map((addressVal, i) => {
            if (!(addressVal.address.indexOf('Choose') == 0)) {
              arrMarker.push({ id: addressVal.id, pickdropflag: 1, pickdropId: i, title: 'Pickup ' + (i + 1), coordinates: { latitude: addressVal.lat, longitude: addressVal.long, latitudeDelta: 1, longitudeDelta: 1 }, img: Constants.Images.customer.markerBlue });
            }
          });
        }
        if (newstate.dropArr.length > 1) {
          newstate.dropArr.map((addressVal, i) => {
            if (!(addressVal.address.indexOf('Choose') == 0)) {
              arrMarker.push({ id: addressVal.id, pickdropflag: 2, pickdropId: i, title: 'Drop ' + (i + 1), coordinates: { latitude: addressVal.lat, longitude: addressVal.long, latitudeDelta: 1, longitudeDelta: 1 }, img: Constants.Images.customer.markerOrange });
            }
          });
        }
        newstate.markerPositions = [];
        newstate.markerPositions = arrMarker;

      }
      else if (newstate.HourlyFlag == 1) {
        if (newstate.HourlyServiceCount > 1) {
          newstate.DeliveryServiceOpacity = 1;
          newstate.EstimateColor = '#53C8E5';
          newstate.EstimateButtonBackgroundColor = '#ffffff';
        }
        else {
          newstate.DeliveryServiceOpacity = 0.8;
          newstate.EstimateColor = '#969297';
          newstate.EstimateButtonBackgroundColor = '#ffffff';
        }
        newstate.markerPositions = [];
      }
      return newstate;
    case 'ACTIVE_VEHICLE':
      newstate.vehicleID = parseInt(action.tagid);
      var arr1 = [];
      newstate.TransportArr.map((val, i) => {
        if (parseInt(newstate.vehicleID) == parseInt(val.tag)) {
          newstate.vehicleName = val.name;
          arr1.push({
            tag: val.tag, displayimg: val.activeimgsource, imgsource: val.imgsource,
            activeimgsource: val.activeimgsource, header: val.header,
            backgroundColor: newstate.EstimateButtonBackgroundColor, borderBottomWidth: 4, borderBottomColor: "#1E4281", cost: val.cost, name: val.name
          });
        }
        else {
          arr1.push({
            tag: val.tag, displayimg: val.imgsource, imgsource: val.imgsource,
            activeimgsource: val.activeimgsource, header: val.header,
            backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: val.cost, name: val.name
          });
        }
      });
      newstate.TransportArr = [];
      newstate.TransportArr = arr1;
      return newstate;

    case 'IS_DELIVERYDATE':
      newstate.IsDeliveryDate = action.data;

      if (newstate.vehicleID && newstate.IsStartTime) {
        newstate.ActiveNextBackColor = '#53C8E5';
        newstate.ActiveNextTextColor = '#FFFFFF';
        newstate.ActiveButton = true;
      }
      return newstate;

    case 'IS_STARTUPTIME':
      newstate.IsStartTime = action.data;
      if (newstate.vehicleID && newstate.IsDeliveryDate) {
        newstate.ActiveNextBackColor = '#53C8E5';
        newstate.ActiveNextTextColor = '#FFFFFF';
        newstate.ActiveButton = true;
      }
      return newstate;

    case 'PICKUPDATE':
      newstate.pickupdate = action.data
      return newstate;

    case 'PICKUPTIME':
      newstate.pickupTime = action.data
      return newstate;

    case 'PICKUPDATE':
      newstate.pickupdate = action.data
      return newstate;

      case 'PICKUPDATEUTC':
      newstate.PICKUPDATEUTC = action.data
      return newstate;

      case 'PICKUPTIMEUTC':
      newstate.PICKUPTIMEUTC = action.data
      return newstate;

    case 'PICKUPTIME':
      newstate.pickupTime = action.data
      return newstate;

    case 'SET_DELIVERY_TYPE_USF':
    newstate.Delivery_type_usf=action.data
    return newstate;

      if (newstate.vehicleID == 0) {
        newstate.vehicleID = 1;
      }
      var arr1 = [];
      newstate.TransportArr.map((val, i) => {
        if (parseInt(newstate.vehicleID) == parseInt(val.tag))
          arr1.push({
            tag: val.tag, displayimg: val.activeimgsource, imgsource: val.imgsource,
            activeimgsource: val.activeimgsource, header: val.header,
            backgroundColor: newstate.EstimateButtonBackgroundColor, borderBottomWidth: 4, borderBottomColor: "#1E4281", cost: val.cost
          });
        else {
          arr1.push({
            tag: val.tag, displayimg: val.imgsource, imgsource: val.imgsource,
            activeimgsource: val.activeimgsource, header: val.header,
            backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: val.cost
          });
        }
      });
      newstate.TransportArr = [];
      newstate.TransportArr = arr1;

      newstate.FoodRange = 0;
      newstate.DocumentWeight = 0;
      newstate.DeliveryCharge = 0;
      newstate.Orders = [];
      return newstate;

    case 'ONCHANGE_PICKUP_ORDER':
      newstate.pickupArr = [];
      newstate.pickupArr = action.arr;
      return newstate;

    case 'ONCHANGE_DROP_ORDER':
      newstate.dropArr = [];
      newstate.dropArr = action.arr;
      return newstate;


    case 'RESET_DETAILS':

      var arr1 = [];
      arr1.push({ id: 0, address: 'Choose Pickup Location', img: 'plus', next: 3, prev: 1, lat: 0, long: 0 });
      var arr2 = []
      arr2.push({ id: 0, address: 'Choose Drop Off Location', img: 'plus', next: 3, prev: 1, lat: 0, long: 0 });


      newstate.pickupArr = arr1;
      newstate.dropArr = arr2;
      newstate.DeliveryServiceOpacity = 0.8;

      newstate.markerPositions = [];


      return newstate;

    case 'DELETE_PICKUP':
      var arr1 = [];
      var foundChoose = false;
      var len = newstate.pickupArr.length;
      newstate.pickupArr.map((val, i) => {
        if (val.address.indexOf("Choose") == 0) {
          foundChoose = true;
        }
      });

      var _id = 0;
      newstate.pickupArr.map((val, i) => {
        if (i != action.id)
          arr1.push({ id: _id++/*val.id*/, address: val.address, img: 'none', next: val.next, prev: val.prev, lat: val.lat, long: val.long });
      });
      if (!foundChoose)
        arr1.push({ id: _id/*len-1*/, address: 'Choose Pickup Location', img: 'plus', next: 3, prev: 1, lat: 0, long: 0 });
      else {
        newstate.pickUpControlCount = newstate.pickUpControlCount - 0.85;
        newstate.AddressCount = newstate.AddressCount - 1;
      }
      newstate.pickupArr = [];
      newstate.pickupArr = arr1;

      var arrMarker = [];
      newstate.markerPositions.map((val, i) => {
        if (!(val.pickdropId == action.id && val.pickdropflag == 1))
          arrMarker.push({ id: val.id, pickdropflag: val.pickdropflag, pickdropId: val.pickdropId, title: val.title, coordinates: val.coordinates, img: val.img });
      });

      newstate.markerPositions = [];
      newstate.markerPositions = arrMarker;

      foundChoose = true;
      if (newstate.dropArr.length >= 1 && newstate.pickupArr.length > 1) {
        if (newstate.dropArr.length == 1 && newstate.pickupArr.length < 3) {
          foundChoose = false;
          newstate.dropArr.map((val, i) => {
            if (val.address.indexOf("Choose") == 0) {
              foundChoose = true;
            }
          });
        }
        if (!foundChoose) {
          newstate.DeliveryServiceOpacity = 1;
          newstate.EstimateColor = '#53C8E5';
          newstate.EstimateButtonBackgroundColor = '#ffffff';

          var arr1 = [];
          var len = newstate.dropArr.length;
          newstate.dropArr.map((val, i) => {
            arr1.push({ id: val.id, address: val.address, img: 'none', next: val.next, prev: val.prev, lat: val.lat, long: val.long });
          });

          arr1.push({ id: len, address: 'Choose Another Drop Off Location', img: 'plus', next: 3, prev: 1, lat: 0, long: 0 });
          newstate.pickUpControlCount = newstate.pickUpControlCount + 0.85;


          newstate.dropArr = [];
          newstate.dropArr = arr1;
        }

      }
      else {
        newstate.DeliveryServiceOpacity = 0.8;
        newstate.EstimateColor = '#969297';
        newstate.EstimateButtonBackgroundColor = '#ffffff';//'#f4f5f7',
      }
      newstate.FoodRange = 0;
      newstate.DocumentWeight = 0;
      newstate.DeliveryCharge = 0;
      newstate.Orders = [];

      return newstate;

    case 'DELETE_DROP':
      var arr1 = [];
      var foundChoose = false;
      var len = newstate.dropArr.length;
      newstate.dropArr.map((val, i) => {
        if (val.address.indexOf("Choose") == 0) {
          foundChoose = true;
        }
      });

      var _id = 0;
      newstate.dropArr.map((val, i) => {
        if (i != action.id)
          arr1.push({ id: _id++, address: val.address, img: 'none', next: val.next, prev: val.prev, lat: val.lat, long: val.long });
      });

      if (!foundChoose)
        arr1.push({ id: _id/*len-1*/, address: 'Choose Drop Off Location', img: 'plus', next: 3, prev: 1, lat: 0, long: 0 });
      else {
        newstate.pickUpControlCount = newstate.pickUpControlCount - 0.85;
        newstate.AddressCount = newstate.AddressCount - 1;
      }

      newstate.dropArr = [];
      newstate.dropArr = arr1;

      var arrMarker = [];
      newstate.markerPositions.map((val, i) => {
        if (!(val.pickdropId == action.id && val.pickdropflag == 2))
          arrMarker.push({ id: val.id, pickdropflag: val.pickdropflag, pickdropId: val.pickdropId, title: val.title, coordinates: val.coordinates, img: val.img });
      });

      newstate.markerPositions = [];
      newstate.markerPositions = arrMarker;

      foundChoose = true;
      if (newstate.dropArr.length > 1 && newstate.pickupArr.length >= 1) {
        if (newstate.pickupArr.length == 1 && newstate.dropArr.length < 3) {
          foundChoose = false;
          newstate.pickupArr.map((val, i) => {
            if (val.address.indexOf("Choose") == 0) {
              foundChoose = true;
            }
          });
        }
        if (!foundChoose) {
          newstate.DeliveryServiceOpacity = 1;
          newstate.EstimateColor = '#53C8E5';
          newstate.EstimateButtonBackgroundColor = '#ffffff';

          var arr1 = [];
          var len = newstate.pickupArr.length;
          newstate.pickupArr.map((val, i) => {
            arr1.push({ id: val.id, address: val.address, img: 'none', next: val.next, prev: val.prev, lat: val.lat, long: val.long });
          });

          arr1.push({ id: len, address: 'Choose Another Pickup Location', img: 'plus', next: 3, prev: 1, lat: 0, long: 0 });
          newstate.pickUpControlCount = newstate.pickUpControlCount + 0.85;


          newstate.pickupArr = [];
          newstate.pickupArr = arr1;
        }

      }
      else {
        newstate.DeliveryServiceOpacity = 0.8;
        newstate.EstimateColor = '#969297';
        newstate.EstimateButtonBackgroundColor = '#ffffff';//'#f4f5f7',
      }

      newstate.FoodRange = 0;
      newstate.DocumentWeight = 0;
      newstate.DeliveryCharge = 0;
      newstate.Orders = [];

      return newstate;

    case 'SETPICKDROPFLAG':
      newstate.PickDropFlag = action.flag;
      return newstate;
    case 'PLACE_FINDER_MODAL':
      newstate.placeModalVisibility = action.visibility;
      return newstate;
    case 'COURIER_MODAL':
      newstate.CourierModalVisibility = action.visibility;
      newstate.CourierItemIndex = action.itemindex;
      return newstate;

    case 'SET_HOUR':
      if (newstate.HourlyServiceDisplayDate.indexOf('Select') == 0) {
        newstate.HourlyServiceCount = newstate.HourlyServiceCount + 1;
      }
      newstate.HourlyServiceDisplayDate = action.displayDate;
      newstate.HourlyServiceDate = moment(action.date).format('YYYY-MM-DD');
      if (newstate.HourlyServiceCount == 3) {
        newstate.EstimateColor = '#53C8E5';
        newstate.EstimateButtonBackgroundColor = '#ffffff';
        newstate.DeliveryServiceOpacity = 1;

        if (newstate.vehicleID == 0) {
          newstate.vehicleID = 1;
        }
        var arr1 = [];
        newstate.TransportArr.map((val, i) => {
          if (parseInt(newstate.vehicleID) == parseInt(val.tag))
            arr1.push({
              tag: val.tag, displayimg: val.activeimgsource, imgsource: val.imgsource,
              activeimgsource: val.activeimgsource, header: val.header,
              backgroundColor: newstate.EstimateButtonBackgroundColor, borderBottomWidth: 4, borderBottomColor: "#1E4281", cost: val.cost
            });
          else {
            arr1.push({
              tag: val.tag, displayimg: val.imgsource, imgsource: val.imgsource,
              activeimgsource: val.activeimgsource, header: val.header,
              backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: val.cost
            });
          }
        });
        newstate.TransportArr = [];
        newstate.TransportArr = arr1;

        var arr1 = [];
        newstate.HourlyServiceTabHeaderImages.map((val, i) => {
          if (parseInt(val.tag) == 0)
            arr1.push({
              tag: val.tag, displayimg: val.activeimg, img: val.img,
              activeimg: val.activeimg, color: Constants.Colors.White
            });
          else {
            arr1.push({
              tag: val.tag, displayimg: val.img, img: val.img,
              activeimg: val.activeimg, color: "#1E4281"
            });
          }
        });
        newstate.HourlyServiceTabHeaderImages = [];
        newstate.HourlyServiceTabHeaderImages = arr1;
      }
      return newstate;
    case 'SET_TIME':
      if (newstate.HourlyServiceDisplayTime.indexOf('Select') == 0) {
        newstate.HourlyServiceCount = newstate.HourlyServiceCount + 1;
      }
      newstate.HourlyServiceDisplayTime = action.displayTime;
      newstate.HourlyServiceTime = action.time;
      if (newstate.HourlyServiceCount == 3) {
        newstate.EstimateColor = '#53C8E5';
        newstate.EstimateButtonBackgroundColor = '#ffffff';
        newstate.DeliveryServiceOpacity = 1;
        if (newstate.vehicleID == 0) {
          newstate.vehicleID = 1;
        }
        var arr1 = [];
        newstate.TransportArr.map((val, i) => {
          if (parseInt(newstate.vehicleID) == parseInt(val.tag))
            arr1.push({
              tag: val.tag, displayimg: val.activeimgsource, imgsource: val.imgsource,
              activeimgsource: val.activeimgsource, header: val.header,
              backgroundColor: newstate.EstimateButtonBackgroundColor, borderBottomWidth: 4, borderBottomColor: "#1E4281", cost: val.cost
            });
          else {
            arr1.push({
              tag: val.tag, displayimg: val.imgsource, imgsource: val.imgsource,
              activeimgsource: val.activeimgsource, header: val.header,
              backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: val.cost
            });
          }
        });
        newstate.TransportArr = [];
        newstate.TransportArr = arr1;

        var arr1 = [];
        newstate.HourlyServiceTabHeaderImages.map((val, i) => {
          if (parseInt(val.tag) == 0)
            arr1.push({
              tag: val.tag, displayimg: val.activeimg, img: val.img,
              activeimg: val.activeimg, color: Constants.Colors.White
            });
          else {
            arr1.push({
              tag: val.tag, displayimg: val.img, img: val.img,
              activeimg: val.activeimg, color: "#1E4281"
            });
          }
        });
        newstate.HourlyServiceTabHeaderImages = [];
        newstate.HourlyServiceTabHeaderImages = arr1;
      }
      return newstate;
    case 'SET_DURATION':
      if (newstate.HourlyServiceDisplayDuration.indexOf('Select') == 0) {
        newstate.HourlyServiceCount = newstate.HourlyServiceCount + 1;

      }
      newstate.HourlyServiceDisplayDuration = action.displayDuration;
      newstate.HourlyItem = parseInt(action.displayItem) + 3;
      if (newstate.HourlyServiceCount == 3) {
        newstate.EstimateColor = '#53C8E5';
        newstate.EstimateButtonBackgroundColor = '#ffffff';
        newstate.DeliveryServiceOpacity = 1;
        if (newstate.vehicleID == 0) {
          newstate.vehicleID = 1;
        }
        var arr1 = [];
        newstate.TransportArr.map((val, i) => {
          if (parseInt(newstate.vehicleID) == parseInt(val.tag))
            arr1.push({
              tag: val.tag, displayimg: val.activeimgsource, imgsource: val.imgsource,
              activeimgsource: val.activeimgsource, header: val.header,
              backgroundColor: newstate.EstimateButtonBackgroundColor, borderBottomWidth: 4, borderBottomColor: "#1E4281", cost: val.cost
            });
          else {
            arr1.push({
              tag: val.tag, displayimg: val.imgsource, imgsource: val.imgsource,
              activeimgsource: val.activeimgsource, header: val.header,
              backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: val.cost
            });
          }
        });
        newstate.TransportArr = [];
        newstate.TransportArr = arr1;

        var arr1 = [];
        newstate.HourlyServiceTabHeaderImages.map((val, i) => {
          if (parseInt(val.tag) == 0)
            arr1.push({
              tag: val.tag, displayimg: val.activeimg, img: val.img,
              activeimg: val.activeimg, color: Constants.Colors.White
            });
          else {
            arr1.push({
              tag: val.tag, displayimg: val.img, img: val.img,
              activeimg: val.activeimg, color: "#1E4281"
            });
          }
        });
        newstate.HourlyServiceTabHeaderImages = [];
        newstate.HourlyServiceTabHeaderImages = arr1;
      }
      return newstate;

    case 'SET_FOODRANGE':
      newstate.FoodRange = action.range;
      newstate.DeliveryType = action._deliverytype;
      newstate.DocumentWeight = action._weight;
      var arr1 = [];
      console.log("data====>")
      if (newstate.pickupArr.length >= newstate.dropArr.length) {
        newstate.pickupArr.map((val, i) => {
          if (!(val.address.indexOf('Choose') == 0))
            arr1.push({
              id: val.id, address: val.address, img: val.img, next: action.range, prev: 1, lat: val.lat, long: val.long,
              opacity: 1, activecolor: '#C3C1C0',
            });
        });
        newstate.LocationForService = 'Pickup ';
        newstate.LocationImgForService = Constants.Images.customer.markerBlue;
      }
      else {
        newstate.dropArr.map((val, i) => {
          if (!(val.address.indexOf('Choose') == 0))
            arr1.push({
              id: val.id, address: val.address, img: val.img, next: action.range, prev: 1, lat: val.lat, long: val.long,
              opacity: 1, activecolor: '#C3C1C0',
            });
        });
        newstate.LocationForService = 'Drop ';
        newstate.LocationImgForService = Constants.Images.customer.markerOrange;
      }
      newstate.DisplayLocationAddress = [];
      newstate.DisplayLocationAddress = arr1;

      return newstate;

    case 'ACTIVE_VEHICLE_FILTER':
      newstate.vehicleID = action.tagid;
      var arr1 = [];


      newstate.FilteredTransportArray.map((val, i) => {
        if (newstate.vehicleID == val.tag) {
          newstate.vehicleName = val.name;
          arr1.push({
            tag: val.tag, displayimg: val.activeimgsource, imgsource: val.imgsource,
            activeimgsource: val.activeimgsource, header: val.header,
            backgroundColor: newstate.EstimateButtonBackgroundColor, borderBottomWidth: 4, borderBottomColor: "#1E4281", cost: val.cost, name: val.name
          });
        }
        else {
          arr1.push({
            tag: val.tag, displayimg: val.imgsource, imgsource: val.imgsource,
            activeimgsource: val.activeimgsource, header: val.header,
            backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: val.cost, name: val.name
          });
        }
      });
      newstate.FilteredTransportArray = [];
      newstate.FilteredTransportArray = arr1;
      if (newstate.IsDeliveryDate && newstate.IsStartTime) {
        newstate.ActiveNextBackColor = '#53C8E5';
        newstate.ActiveNextTextColor = '#FFFFFF';
        newstate.ActiveButton = true;
      }


      if (!action.tagid) {

        newstate.ActiveNextBackColor = '#FFFFFF';
        newstate.ActiveNextTextColor = '#C3C1C0';
        newstate.ActiveButton = false;

      }

      return newstate;

    case 'SET_ITEMRANGE_ARRAY':
      var arr1 = [];
      var temp = action.array;
      newstate.DisplayLocationAddress.map((val, i) => {
        arr1.push({
          id: val.id, address: val.address, img: val.img, next: action.array[i].next, prev: action.array[i].prev, lat: val.lat, long: val.long,
          opacity: action.array[i].opacity, activecolor: action.array[i].activecolor,
        });
      });
      newstate.DisplayLocationAddress = [];
      newstate.DisplayLocationAddress = arr1;
      return newstate;

    case 'SEARCHPLACE':
      newstate.SearchPlaceList = action.arr;
      return newstate;

    case 'SET_INVOICE':
      //newstate.DeliveryCharge=action.amount;
      newstate.InvoiceData = action._data;
      newstate.Orders = action._orders;
      //alert(JSON.stringify(newstate.Orders))
      //console.log('hourly data is ++++',newstate.Orders)
      return newstate;

    // PickUp Props Values start

    case 'PICK1':
      newstate.pick1 = action.data;
      return newstate;
    case 'PICK2':
      newstate.pick2 = action.data;
      return newstate;
    case 'PICK3':
      newstate.pick3 = action.data;
      return newstate;
    case 'PICK4':
      newstate.pick4 = action.data;
      return newstate;

    // PickUp Props Values end

    // Drafts Props Values start
    case 'DRAFT1':
      newstate.draft1 = action.data;
      return newstate;

    case 'DRAFT2':
      newstate.draft2 = action.data;
      return newstate;

    case 'DRAFT3':
      newstate.draft3 = action.data;
      return newstate;

    case 'DRAFT4':
      newstate.draft4 = action.data;
      return newstate;

    // Drafts Props Values end

    case 'DRAFT_PICKUP':
      newstate.DraftPick = action._data;
      return newstate;

    case 'DRAFT_DROP':
      newstate.DraftDrop = action._data;
      return newstate;

    case 'SET_SELECTDRIVER':
      newstate.flagChange = action._data;
      return newstate;

    case 'SET_VEHICLECOST':
      console.log("SET_VEHICLECOST", action);
      var transportArr1 = action._data && action._data.vehicle;
      newstate.vehicleID = action.id;
      if (newstate.vehicleID == 0) {
        newstate.ActiveNextBackColor = '#FFFFFF';
        newstate.ActiveNextTextColor = '#C3C1C0';
        newstate.ActiveButton = false;
        newstate.IsStartTime = false;
        newstate.IsDeliveryDate = false;
        newstate.IsVehicle = false;
      }


      var arr1 = [];
      var val = {};
      transportArr1 && transportArr1.map((val, i) => {
        //   for(var i=0;i<transportArr1.length;i++)
        // {
        //    if(parseInt(val.tag)==transportArr1[i].id)
        {
          arr1.push({
            tag: val.id, displayimg: CustomerConnection.mediaURL() + val.imagePath, imgsource: CustomerConnection.mediaURL() + val.imagePath,
            activeimgsource: CustomerConnection.mediaURL() + val.activeImagePath, header: val.name,
            backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: '$' + val.charge, name: val.name
          });
        }
        //   }
      });

      newstate.FilteredTransportArray = [];
      newstate.FilteredTransportArray = arr1;
      console.log(arr1);
      console.log(newstate.vehicleID);
      if (newstate.vehicleID > 0) {
        var arr1 = [];
        newstate.FilteredTransportArray.map((val, i) => {
          if (parseInt(newstate.vehicleID) == parseInt(val.tag)) {
            newstate.vehicleName = val.name;
            arr1.push({
              tag: val.tag, displayimg: val.activeimgsource, imgsource: val.imgsource,
              activeimgsource: val.activeimgsource, header: val.header,
              backgroundColor: newstate.EstimateButtonBackgroundColor, borderBottomWidth: 4, borderBottomColor: "#1E4281", cost: val.cost, name: val.name
            });
          }
          else {
            arr1.push({
              tag: val.tag, displayimg: val.imgsource, imgsource: val.imgsource,
              activeimgsource: val.activeimgsource, header: val.header,
              backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: val.cost, name: val.name
            });
          }
        });
        newstate.FilteredTransportArray = [];
        newstate.FilteredTransportArray = arr1;
      }

      console.log(arr1);
      return newstate;

    case 'SET_VEHICLECOST_Courier':
      console.log("SET_VEHICLECOST Courier==", action);
      var transportArr1 = action._data && action._data.vehicle;
      var arr1 = [];
      newstate.TransportArr.map((val, i) => {
        for (var i = 0; i < newstate.DeliveryTypeTransportArray[3].transport.length; i++) {
          if (parseInt(val.tag) == newstate.DeliveryTypeTransportArray[3].transport[i]) {
            arr1.push({
              tag: val.tag, displayimg: val.imgsource, imgsource: val.imgsource,
              activeimgsource: val.activeimgsource, header: val.header,
              backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent',
              cost: '$' + transportArr1[i].charge, name: transportArr1[i].name
            });
          }
        }
      });

      newstate.FilteredTransportArray = [];
      newstate.FilteredTransportArray = arr1;
      return newstate;

    case 'SET_HOURLYINVOICE':
      newstate.DeliveryCharge = action.amount;
      newstate.Orders = action._orders;
      newstate.DriverHelpCost = action.driverhelp;
      newstate.ExtraHelperCost = action.extrahelper;
      return newstate;

    case 'SET_TABINDEX':
      newstate.HomeTabsIndex = action.index;

      var arr1 = [];
      newstate.TabHeaderImages.map((val, i) => {
        if (parseInt(newstate.HomeTabsIndex) == parseInt(val.tag))
          arr1.push({
            tag: val.tag, displayimg: val.activeimg, img: val.img,
            activeimg: val.activeimg, color: Constants.Colors.White
          });
        else {
          arr1.push({
            tag: val.tag, displayimg: val.img, img: val.img,
            activeimg: val.activeimg, color: "#1E4281"
          });
        }
      });
      newstate.TabHeaderImages = [];
      newstate.TabHeaderImages = arr1;

      return newstate;

    case 'SET_HOURLYSERVICE_TABINDEX':
      newstate.HourlyServiceTabIndex = action.index;

      var arr1 = [];
      newstate.HourlyServiceTabHeaderImages.map((val, i) => {
        if (parseInt(newstate.HourlyServiceTabIndex) == parseInt(val.tag))
          arr1.push({
            tag: val.tag, displayimg: val.activeimg, img: val.img,
            activeimg: val.activeimg, color: Constants.Colors.White
          });
        else {
          arr1.push({
            tag: val.tag, displayimg: val.img, img: val.img,
            activeimg: val.activeimg, color: "#1E4281"
          });
        }
      });
      newstate.HourlyServiceTabHeaderImages = [];
      newstate.HourlyServiceTabHeaderImages = arr1;

      /*var arr1 =  newstate.TransportArr.filter((val) => {
        for(var i=0;i<newstate.DeliveryTypeTransportArray[0].transport.length;i++)
        {
            if(parseInt(val.tag)==newstate.DeliveryTypeTransportArray[0].transport[i])
                return true;
        }
        });
        newstate.FilteredTransportArray=[];
        newstate.FilteredTransportArray=arr1;*/

      return newstate;

    case 'ADD_PICKUP':
      {
        var arr1 = [];
        var len = newstate.pickupArr.length;
        newstate.pickupArr.map((val, i) => {
          if (i < len - 1)
            arr1.push({ id: val.id, address: val.address, img: 'none', next: val.next, prev: val.prev, lat: val.lat, long: val.long });
        });
        arr1.push({ id: len - 1, address: action.pickup, img: 'none', next: 3, prev: 1, lat: action.lat, long: action.long });

        var arrMarker = [];
        var markerlen = newstate.markerPositions.length;

        newstate.markerPositions.map((val, i) => {
          if (!(val.title.indexOf('You are here') == 0))
            arrMarker.push({ id: val.id, pickdropflag: val.pickdropflag, pickdropId: val.pickdropId, title: val.title, coordinates: val.coordinates, img: val.img });
        });
        arrMarker.push({ id: markerlen, pickdropflag: newstate.PickDropFlag, pickdropId: len - 1, title: 'Pickup ' + (len), coordinates: { latitude: action.lat, longitude: action.long, latitudeDelta: 1, longitudeDelta: 1 }, img: Constants.Images.customer.markerBlue });
        newstate.markerPositions = [];
        newstate.markerPositions = arrMarker;
        if (len < 3 && newstate.dropArr.length < 3) {
          arr1.push({ id: len, address: 'Choose Another Pickup Location', img: 'plus', next: 3, prev: 1, lat: 0, long: 0 });
          newstate.pickUpControlCount = newstate.pickUpControlCount + 0.85;
        }
        newstate.pickupArr = [];
        newstate.pickupArr = arr1;
        newstate.AddressCount = newstate.AddressCount + 1;
        newstate.placeModalVisibility = action.visibility;
        if (newstate.dropArr.length > 1) {
          newstate.DeliveryServiceOpacity = 1;
          newstate.EstimateColor = '#53C8E5';
          newstate.EstimateButtonBackgroundColor = '#ffffff';

          if (newstate.pickupArr.length > 2) {
            var arr1 = [];
            var len = newstate.dropArr.length;
            newstate.dropArr.map((val, i) => {
              if (i < len - 1)
                arr1.push({ id: val.id, address: val.address, img: 'none', next: val.next, prev: val.prev, lat: val.lat, long: val.long });
            });

            newstate.dropArr = [];
            newstate.dropArr = arr1;
            newstate.AddressCount = newstate.AddressCount - 1;
            newstate.pickUpControlCount = newstate.pickUpControlCount - 0.85;
          }
        }

        if (newstate.vehicleID == 0) {
          newstate.vehicleID = 1;
        }
        var arr1 = [];
        newstate.TransportArr.map((val, i) => {
          if (parseInt(newstate.vehicleID) == parseInt(val.tag))
            arr1.push({
              tag: val.tag, displayimg: val.activeimgsource, imgsource: val.imgsource,
              activeimgsource: val.activeimgsource, header: val.header,
              backgroundColor: newstate.EstimateButtonBackgroundColor, borderBottomWidth: 4, borderBottomColor: "#1E4281", cost: val.cost
            });
          else {
            arr1.push({
              tag: val.tag, displayimg: val.imgsource, imgsource: val.imgsource,
              activeimgsource: val.activeimgsource, header: val.header,
              backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: val.cost
            });
          }
        });
        newstate.TransportArr = [];
        newstate.TransportArr = arr1;

        newstate.FoodRange = 0;
        newstate.DocumentWeight = 0;
        newstate.DeliveryCharge = 0;
        newstate.Orders = [];
        return newstate;
      }

    case 'ADD_PICKUP_HOURLY':
      {
        var arr1 = [];
        var len = newstate.Hourly_pickupArr.length;
        newstate.Hourly_pickupArr.map((val, i) => {
          if (i < len - 1)
            arr1.push({ id: val.id, address: val.address, img: 'none', next: val.next, prev: val.prev, lat: val.lat, long: val.long });
        });
        arr1.push({ id: len - 1, address: action.pickup, img: 'none', next: 3, prev: 1, lat: action.lat, long: action.long });

        var arrMarker = [];
        // var markerlen = newstate.markerPositions.length;

        // newstate.markerPositions.map((val, i) => {
        //   if (!(val.title.indexOf('You are here') == 0))
        //     arrMarker.push({ id: val.id, pickdropflag: val.pickdropflag, pickdropId: val.pickdropId, title: val.title, coordinates: val.coordinates, img: val.img });
        // });
        arrMarker.push({ id: 0, pickdropflag: newstate.PickDropFlag, pickdropId: 0, title: 'Pickup ' + (1), coordinates: { latitude: action.lat, longitude: action.long, latitudeDelta: 1, longitudeDelta: 1 }, img: Constants.Images.customer.markerBlue });
        newstate.markerPositions = [];
        newstate.markerPositions = arrMarker;
        // if (len < 3 && newstate.Hourly_dropArr.length < 3) {
        //   arr1.push({ id: len, address: 'Choose Another Pickup Location', img: 'plus', next: 3, prev: 1, lat: 0, long: 0 });
        //   newstate.pickUpControlCount = newstate.pickUpControlCount + 0.85;
        // }


        newstate.Hourly_pickupArr = [];
        newstate.Hourly_pickupArr = arr1;
        newstate.AddressCount = newstate.AddressCount + 1;
        newstate.placeModalVisibility = action.visibility;
        if (newstate.Hourly_dropArr.length > 1) {
          newstate.DeliveryServiceOpacity = 1;
          newstate.EstimateColor = '#53C8E5';
          newstate.EstimateButtonBackgroundColor = '#ffffff';

          // if (newstate.Hourly_pickupArr.length > 2) {
          //   var arr1 = [];

          //   var len = newstate.Hourly_dropArr.length;
          //   newstate.Hourly_dropArr.map((val, i) => {
          //     if (i < len - 1)
          //       arr1.push({ id: val.id, address: val.address, img: 'none', next: val.next, prev: val.prev, lat: val.lat, long: val.long });
          //   });

          //   newstate.Hourly_dropArr = [];
          //   newstate.Hourly_dropArr = arr1;
          //   newstate.AddressCount = newstate.AddressCount - 1;
          //   newstate.pickUpControlCount = newstate.pickUpControlCount - 0.85;
          // }
        }

        if (newstate.vehicleID == 0) {
          newstate.vehicleID = 1;
        }
        var arr1 = [];
        newstate.TransportArr.map((val, i) => {
          if (parseInt(newstate.vehicleID) == parseInt(val.tag))
            arr1.push({
              tag: val.tag, displayimg: val.activeimgsource, imgsource: val.imgsource,
              activeimgsource: val.activeimgsource, header: val.header,
              backgroundColor: newstate.EstimateButtonBackgroundColor, borderBottomWidth: 4, borderBottomColor: "#1E4281", cost: val.cost
            });
          else {
            arr1.push({
              tag: val.tag, displayimg: val.imgsource, imgsource: val.imgsource,
              activeimgsource: val.activeimgsource, header: val.header,
              backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: val.cost
            });
          }
        });
        newstate.TransportArr = [];
        newstate.TransportArr = arr1;

        newstate.FoodRange = 0;
        newstate.DocumentWeight = 0;
        newstate.DeliveryCharge = 0;
        newstate.Orders = [];
        return newstate;
      }

    case 'ADD_DROP':
      var arr1 = [];
      var len = newstate.dropArr.length;
      newstate.dropArr.map((val, i) => {
        if (i < len - 1)
          arr1.push({ id: val.id, address: val.address, img: 'none', next: val.next, prev: val.prev, lat: val.lat, long: val.long });
      });
      arr1.push({ id: len - 1, address: action.drop, img: 'none', next: 3, prev: 1, lat: action.lat, long: action.long });

      var arrMarker = [];
      var markerlen = newstate.markerPositions.length;

      newstate.markerPositions.map((val, i) => {
        if (!(val.title.indexOf('You are here') == 0))
          arrMarker.push({ id: val.id, pickdropflag: val.pickdropflag, pickdropId: val.pickdropId, title: val.title, coordinates: val.coordinates, img: val.img });
      });
      // if (newstate.markerPositions[0].title.indexOf('You are here') == 0) {
      //   arrMarker.push({ id: 0, pickdropflag: newstate.PickDropFlag, pickdropId: len - 1, title: 'Drop ' + (len), coordinates: { latitude: action.lat, longitude: action.long, latitudeDelta: 1, longitudeDelta: 1 }, img: Constants.Images.customer.markerOrange });
      // }
      // else {
      arrMarker.push({ id: markerlen, pickdropflag: newstate.PickDropFlag, pickdropId: len - 1, title: 'Drop ' + (len), coordinates: { latitude: action.lat, longitude: action.long, latitudeDelta: 1, longitudeDelta: 1 }, img: Constants.Images.customer.markerOrange });
      // }

      newstate.markerPositions = [];
      newstate.markerPositions = arrMarker;

      if (len < 3 && newstate.Hourly_pickupArr.length < 3) {
        arr1.push({ id: len, address: 'Choose Another Drop Off  Location', img: 'plus', next: 3, prev: 1, lat: 0, long: 0 });
        newstate.pickUpControlCount = newstate.pickUpControlCount + 0.85;
      }

      newstate.dropArr = [];
      newstate.dropArr = arr1;
      newstate.AddressCount = newstate.AddressCount + 1;
      newstate.placeModalVisibility = action.visibility;
      if (newstate.Hourly_pickupArr.length > 1) {
        newstate.DeliveryServiceOpacity = 1;
        newstate.EstimateColor = '#53C8E5';
        newstate.EstimateButtonBackgroundColor = '#ffffff';

        if (newstate.dropArr.length > 2) {
          var arr1 = [];

          var len = newstate.Hourly_pickupArr.length;
          newstate.Hourly_pickupArr.map((val, i) => {
            if (i < len - 1)
              arr1.push({ id: val.id, address: val.address, img: 'none', next: val.next, prev: val.prev, lat: val.lat, long: val.long });
          });

          newstate.Hourly_pickupArr = [];
          newstate.Hourly_pickupArr = arr1;
          newstate.AddressCount = newstate.AddressCount - 1;

          newstate.pickUpControlCount = newstate.pickUpControlCount - 0.85;
        }
      }

      if (newstate.vehicleID == 0) {
        newstate.vehicleID = 1;
      }
      var arr1 = [];
      newstate.TransportArr.map((val, i) => {
        if (parseInt(newstate.vehicleID) == parseInt(val.tag))
          arr1.push({
            tag: val.tag, displayimg: val.activeimgsource, imgsource: val.imgsource,
            activeimgsource: val.activeimgsource, header: val.header,
            backgroundColor: newstate.EstimateButtonBackgroundColor, borderBottomWidth: 4, borderBottomColor: "#1E4281", cost: val.cost
          });
        else {
          arr1.push({
            tag: val.tag, displayimg: val.imgsource, imgsource: val.imgsource,
            activeimgsource: val.activeimgsource, header: val.header,
            backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: val.cost
          });
        }
      });
      newstate.TransportArr = [];
      newstate.TransportArr = arr1;

      newstate.FoodRange = 0;
      newstate.DocumentWeight = 0;
      newstate.DeliveryCharge = 0;
      newstate.Orders = [];
      return newstate;

    case 'ADD_DROP_HOURLY':
      var arr1 = [];
      var len = newstate.Hourly_dropArr.length;
      newstate.Hourly_dropArr.map((val, i) => {
        if (i < len - 1)
          arr1.push({ id: val.id, address: val.address, img: 'none', next: val.next, prev: val.prev, lat: val.lat, long: val.long });
      });
      arr1.push({ id: len - 1, address: action.drop, img: 'none', next: 3, prev: 1, lat: action.lat, long: action.long });

      var arrMarker = [];
      var markerlen = newstate.markerPositions.length;

      newstate.markerPositions.map((val, i) => {
        if (!(val.title.indexOf('You are here') == 0))
          arrMarker.push({ id: val.id, pickdropflag: val.pickdropflag, pickdropId: val.pickdropId, title: val.title, coordinates: val.coordinates, img: val.img });
      });
      // if (newstate.markerPositions[0].title.indexOf('You are here') == 0) {
      //   arrMarker.push({ id: 0, pickdropflag: newstate.PickDropFlag, pickdropId: len - 1, title: 'Drop ' + (len), coordinates: { latitude: action.lat, longitude: action.long, latitudeDelta: 1, longitudeDelta: 1 }, img: Constants.Images.customer.markerOrange });
      // }
      // else {
      arrMarker.push({ id: markerlen, pickdropflag: newstate.PickDropFlag, pickdropId: len - 1, title: 'Drop ' + (len), coordinates: { latitude: action.lat, longitude: action.long, latitudeDelta: 1, longitudeDelta: 1 }, img: Constants.Images.customer.markerOrange });
      // }

      newstate.markerPositions = [];
      newstate.markerPositions = arrMarker;

      // if (len < 3 && newstate.pickupArr.length < 3) {
      //   arr1.push({ id: len, address: 'Choose Another Drop Off  Location', img: 'plus', next: 3, prev: 1, lat: 0, long: 0 });
      //   newstate.pickUpControlCount = newstate.pickUpControlCount + 0.85;
      // }

      newstate.Hourly_dropArr = [];
      newstate.Hourly_dropArr = arr1;
      newstate.AddressCount = newstate.AddressCount + 1;
      newstate.placeModalVisibility = action.visibility;
      if (newstate.pickupArr.length > 1) {
        newstate.DeliveryServiceOpacity = 1;
        newstate.EstimateColor = '#53C8E5';
        newstate.EstimateButtonBackgroundColor = '#ffffff';

        if (newstate.Hourly_dropArr.length > 2) {
          var arr1 = [];

          var len = newstate.pickupArr.length;
          newstate.pickupArr.map((val, i) => {
            if (i < len - 1)
              arr1.push({ id: val.id, address: val.address, img: 'none', next: val.next, prev: val.prev, lat: val.lat, long: val.long });
          });

          newstate.pickupArr = [];
          newstate.pickupArr = arr1;
          newstate.AddressCount = newstate.AddressCount - 1;

          newstate.pickUpControlCount = newstate.pickUpControlCount - 0.85;
        }
      }

      if (newstate.vehicleID == 0) {
        newstate.vehicleID = 1;
      }
      var arr1 = [];
      newstate.TransportArr.map((val, i) => {
        if (parseInt(newstate.vehicleID) == parseInt(val.tag))
          arr1.push({
            tag: val.tag, displayimg: val.activeimgsource, imgsource: val.imgsource,
            activeimgsource: val.activeimgsource, header: val.header,
            backgroundColor: newstate.EstimateButtonBackgroundColor, borderBottomWidth: 4, borderBottomColor: "#1E4281", cost: val.cost
          });
        else {
          arr1.push({
            tag: val.tag, displayimg: val.imgsource, imgsource: val.imgsource,
            activeimgsource: val.activeimgsource, header: val.header,
            backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: val.cost
          });
        }
      });
      newstate.TransportArr = [];
      newstate.TransportArr = arr1;

      newstate.FoodRange = 0;
      newstate.DocumentWeight = 0;
      newstate.DeliveryCharge = 0;
      newstate.Orders = [];
      return newstate;

    case 'DELETE_PICKUP_HOURLY':
      var arr1 = [];

      var len = newstate.Hourly_pickupArr.length;
      newstate.Hourly_pickupArr.map((val, i) => {
        if (i != action.id)
          arr1.push({ id: val.id, address: val.address, img: 'none', lat: val.lat, long: val.long });
      });

      newstate.Hourly_pickupArr = [];
      newstate.Hourly_pickupArr = arr1;
      newstate.AddressCount = newstate.AddressCount - 1;
      if (newstate.Hourly_dropArr.length > 1 && newstate.Hourly_pickupArr.length > 1) {
        newstate.DeliveryServiceOpacity = 1;
        newstate.EstimateColor = '#53C8E5';
        newstate.EstimateButtonBackgroundColor = '#ffffff';

      }
      else {
        newstate.DeliveryServiceOpacity = 0.8;
        newstate.EstimateColor = '#969297';
        newstate.EstimateButtonBackgroundColor = '#ffffff';//'#f4f5f7',
      }
      newstate.pickUpControlCount = newstate.pickUpControlCount - 0.85;


      return newstate;

    case 'DELETE_DROP_HOURLY':
      var arr1 = [];

      var len = newstate.Hourly_dropArr.length;
      newstate.Hourly_dropArr.map((val, i) => {
        if (i != action.id)
          arr1.push({ id: val.id, address: val.address, img: 'none', lat: val.lat, long: val.long });
      });

      newstate.Hourly_dropArr = [];
      newstate.Hourly_dropArr = arr1;
      newstate.AddressCount = newstate.AddressCount - 1;
      if (newstate.Hourly_dropArr.length > 1 && newstate.Hourly_pickupArr.length > 1) {
        newstate.DeliveryServiceOpacity = 1;
        newstate.EstimateColor = '#53C8E5';
        newstate.EstimateButtonBackgroundColor = '#ffffff';

      }
      else {
        newstate.DeliveryServiceOpacity = 0.8;
        newstate.EstimateColor = '#969297';
        newstate.EstimateButtonBackgroundColor = '#ffffff';//'#f4f5f7',
      }
      newstate.pickUpControlCount = newstate.pickUpControlCount - 0.85;

      return newstate;

    case 'PLACE_FINDER_MODAL_HOURLY':
      newstate.placeModalVisibility_hourly = action.visibility;
      return newstate;

    case 'SEARCHPLACE_HOURLY':
      newstate.SearchPlaceList_Hourly = action.arr;
      return newstate;

    case 'SET_INITIALLOCATION':
      newstate.initialPosition = action.initialPosition;
      //newstate.markerPositions=action.markerPosition;
      var arr1 = [];
      arr1.push({ id: -1, pickdropflag: newstate.PickDropFlag, pickdropId: -1, title: 'You are here', coordinates: { latitude: action.markerPosition.latitude, longitude: action.markerPosition.longitude, latitudeDelta: 1, longitudeDelta: 1 }, img: Constants.Images.customer.markerBlue });
      newstate.markerPositions = [];
      newstate.markerPositions = arr1;

      return newstate;

    case 'SET_COURIER_UNITS':
      var arr1 = [];
      var courieritems = [];
      if (newstate.pickupArr.length >= newstate.dropArr.length) {
        newstate.pickupArr.map((val, i) => {
          arr1.push({ id: val.id, address: val.address, lat: val.lat, long: val.long, IsTailgate: false, IsResidential: false, courieritems: courieritems });
        });
        newstate.LocationForService = 'Pickup ';
        newstate.LocationImgForService = Constants.Images.customer.markerBlue;
      }
      else {
        newstate.dropArr.map((val, i) => {
          arr1.push({ id: val.id, address: val.address, lat: val.lat, long: val.long, IsTailgate: false, IsResidential: false, courieritems: courieritems });
        });
        newstate.LocationForService = 'Drop ';
        newstate.LocationImgForService = Constants.Images.customer.markerOrange;
      }
      newstate.DisplayLocationAddress = [];
      newstate.DisplayLocationAddress = arr1;

      return newstate;

    case 'COURIER_ITEMADD':
      var _courieritems = [];
      var _size = action.height * action.width * action.depth;
      var _weight = action.weight;
      var name = action.itemname;
      var arr1 = [];




      newstate.DisplayLocationAddress.map((val, b) => {
        if (parseInt(newstate.CourierItemIndex) == parseInt(val.id)) {
          for (var i = 0; i < val.courieritems.length; i++) {
            console.log("Adding Items",val.courieritems[i])
            _courieritems.push({
              parentId: newstate.CourierItemIndex, 
              id: val.courieritems[i].id, 
              name: val.courieritems[i].name,
              size: val.courieritems[i].size,
               weight: val.courieritems[i].weight, 
               quantity: val.courieritems[i].quantity,
              height: val.courieritems[i].height,
               width: val.courieritems[i].width,
                depth: val.courieritems[i].depth,
              isSkid: val.courieritems[i].isSkid,
              heightUnit: val.courieritems[i].unitLength,
              weightUnit: val.courieritems[i].unitWeight
            });
          }
          var len = val.courieritems.length;
          _courieritems.push({
            parentId: newstate.CourierItemIndex, id: len, name: name,
            heightUnit: action.unitLength,
            weightUnit: action.unitWeight,

            size: _size.toFixed(2), weight: _weight, quantity: 1, height: action.height,
            width: action.width, depth: action.depth, isSkid: action.isSkid
          });
          arr1.push({ id: val.id, address: val.address, lat: val.lat, long: val.long, IsTailgate: val.IsTailgate, IsResidential: val.IsResidential, courieritems: _courieritems });
        }
        else {
          arr1.push({
            id: val.id, address: val.address,

            heightUnit: val.unitLength,
            weightUnit: val.unitWeight,

            lat: val.lat, long: val.long, IsTailgate: val.IsTailgate, IsResidential: val.IsResidential, courieritems: val.courieritems
          });
        }

      });
      newstate.DisplayLocationAddress = [];
      newstate.DisplayLocationAddress = arr1;

      return newstate;

    case 'COURIER_TAILGATE':
      newstate.CourierItemIndex = action.itemindex;
      var arr1 = [];
      newstate.DisplayLocationAddress.map((val, b) => {
        if (parseInt(newstate.CourierItemIndex) == parseInt(val.id)) {
          arr1.push({ id: val.id, address: val.address, lat: val.lat, long: val.long, IsTailgate: !val.IsTailgate, IsResidential: val.IsResidential, courieritems: val.courieritems });
        }
        else {
          arr1.push({ id: val.id, address: val.address, lat: val.lat, long: val.long, IsTailgate: val.IsTailgate, IsResidential: val.IsResidential, courieritems: val.courieritems });
        }

      });
      newstate.DisplayLocationAddress = [];
      newstate.DisplayLocationAddress = arr1;

      return newstate;

    case 'COURIER_RESIDENTIAL':
      newstate.CourierItemIndex = action.itemindex;
      var arr1 = [];
      newstate.DisplayLocationAddress.map((val, b) => {
        if (parseInt(newstate.CourierItemIndex) == parseInt(val.id)) {
          arr1.push({ id: val.id, address: val.address, lat: val.lat, long: val.long, IsTailgate: val.IsTailgate, IsResidential: !val.IsResidential, courieritems: val.courieritems });
        }
        else {
          arr1.push({ id: val.id, address: val.address, lat: val.lat, long: val.long, IsTailgate: val.IsTailgate, IsResidential: val.IsResidential, courieritems: val.courieritems });
        }

      });
      newstate.DisplayLocationAddress = [];
      newstate.DisplayLocationAddress = arr1;

      return newstate;

    case 'COURIER_ITEMQUANTITY':
      var _courieritems = [];
      var _qty = action.qty;
      var _id = action.id;
      var _parentid = action.parentid;
      var arr1 = [];

      newstate.DisplayLocationAddress.map((val, b) => {
        if (parseInt(_parentid) == parseInt(val.id)) {
          for (var i = 0; i < val.courieritems.length; i++) {
            if (val.courieritems[i].id == _id) {
              _courieritems.push({
                parentId: val.courieritems[i].parentId, id: val.courieritems[i].id, name: val.courieritems[i].name,
                size: val.courieritems[i].size, weight: val.courieritems[i].weight, quantity: _qty,
                height: val.courieritems[i].height, width: val.courieritems[i].width, depth: val.courieritems[i].depth,
                isSkid: val.courieritems[i].isSkid
              });
            }
            else {
              _courieritems.push({
                parentId: val.courieritems[i].parentId, id: val.courieritems[i].id, name: val.courieritems[i].name,
                size: val.courieritems[i].size, weight: val.courieritems[i].weight, quantity: val.courieritems[i].quantity,
                height: val.courieritems[i].height, width: val.courieritems[i].width, depth: val.courieritems[i].depth,
                isSkid: val.courieritems[i].isSkid
              });
            }
          }
          arr1.push({ id: val.id, address: val.address, lat: val.lat, long: val.long, IsTailgate: val.IsTailgate, IsResidential: val.IsResidential, courieritems: _courieritems });
        }
        else {
          arr1.push({ id: val.id, address: val.address, lat: val.lat, long: val.long, IsTailgate: val.IsTailgate, IsResidential: val.IsResidential, courieritems: val.courieritems });
        }

      });
      newstate.DisplayLocationAddress = [];
      newstate.DisplayLocationAddress = arr1;

      return newstate;

    case 'COURIER_ITEMDELETE':
      var _courieritems = [];
      var _id = action.id;
      var _parentid = action.parentid;
      var arr1 = [];

      newstate.DisplayLocationAddress.map((val, b) => {
        if (parseInt(_parentid) == parseInt(val.id)) {
          for (var i = 0; i < val.courieritems.length; i++) {
            if (val.courieritems[i].id != _id) {
              _courieritems.push({
                parentId: val.courieritems[i].parentId, id: val.courieritems[i].id, name: val.courieritems[i].name,
                size: val.courieritems[i].size, weight: val.courieritems[i].weight, quantity: val.courieritems[i].quantity,
                height: val.courieritems[i].height, width: val.courieritems[i].width, depth: val.courieritems[i].depth,
                isSkid: val.courieritems[i].isSkid
              });
            }
          }
          arr1.push({ id: val.id, address: val.address, lat: val.lat, long: val.long, IsTailgate: val.IsTailgate, IsResidential: val.IsResidential, courieritems: _courieritems });
        }
        else {
          arr1.push({ id: val.id, address: val.address, lat: val.lat, long: val.long, IsTailgate: val.IsTailgate, IsResidential: val.IsResidential, courieritems: val.courieritems });
        }

      });
      newstate.DisplayLocationAddress = [];
      newstate.DisplayLocationAddress = arr1;

      return newstate;

    case 'FURNITURE_MODAL_NEWADD':
      newstate.CourierModalVisibility = action.visibility;
      newstate.CourierItemIndex = action.itemindex;

      var furnitureItems = [];
      var products = [];
      //var ItemList=action.ItemList;
      var arr1 = [];
      var _qty = 0;
      var k = 0;

      newstate.FurnitureItemList.map((obj, a) => {
        products = [];
        for (var j = 0; j < obj.products.length; j++) {
          _qty = 0;
          products.push({
            category: obj.products[j].category, id: obj.products[j].id,
            name: obj.products[j].name, desc: obj.products[j].desc, quantity: 0, img: obj.products[j].img
          });

        }
        furnitureItems.push({ category: obj.category, categoryName: obj.categoryName, products: products });

      });

      newstate.FurnitureItemList = [];
      newstate.FurnitureItemList = furnitureItems;

      return newstate;

    case 'FURNITURE_MODAL':
      newstate.CourierModalVisibility = action.visibility;
      newstate.CourierItemIndex = action.itemindex;
      var furnitureItems = [];
      var products = [];
      var arr1 = [];
      var _qty = 0;
      var k = 0;
      newstate.DisplayLocationAddress.map((val, b) => {
        if (parseInt(newstate.CourierItemIndex) == parseInt(val.id)) {
          if (val.furnitureitems.length > 0) {
            newstate.FurnitureItemList.map((obj, a) => {
              products = [];
              for (var j = 0; j < obj.products.length; j++) {
                _qty = obj.products[j].quantity;
                for (var i = k; i < val.furnitureitems.length; i++) {
                  if (obj.category == val.furnitureitems[i].category) {
                    if (obj.products[j].id == val.furnitureitems[i].id) {
                      _qty = val.furnitureitems[i].quantity;
                    }
                  }
                }

                products.push({
                  category: obj.products[j].category, id: obj.products[j].id,
                  name: obj.products[j].name, desc: obj.products[j].desc, quantity: _qty, img: obj.products[j].img, qtyInCircle: _qty
                });

              }
              furnitureItems.push({ category: obj.category, categoryName: obj.categoryName, products: products });

            });
          }
          else {
            newstate.FurnitureItemList.map((obj, a) => {
              furnitureItems.push({ category: obj.category, categoryName: obj.categoryName, products: obj.products });
            });
          }
        }
      });
      newstate.FurnitureItemList = [];
      newstate.FurnitureItemList = furnitureItems;

      return newstate;

    case 'FURNITURE_ONCLICK_CIRCLEPLUS':
      var category = action.category;
      var id = action.id;
      var arr1 = [];
      var furnitureItems = [];
      newstate.FurnitureItemList.map((val, b) => {
        if (category == val.category) {
          for (var i = 0; i < val.products.length; i++) {
            if (id == val.products[i].id) {
              furnitureItems.push({ category: val.products[i].category, id: val.products[i].id, name: val.products[i].name, desc: val.products[i].desc, quantity: 1, img: val.products[i].img, qtyInCircle: 0 });
            }
            else {
              furnitureItems.push({ category: val.products[i].category, id: val.products[i].id, name: val.products[i].name, desc: val.products[i].desc, quantity: val.products[i].quantity, img: val.products[i].img, qtyInCircle: val.products[i].quantity });
            }
          }
          arr1.push({ category: val.category, categoryName: val.categoryName, products: furnitureItems });
        }
        else {
          var arrNew = [];
          for (var i = 0; i < val.products.length; i++) {
            arrNew.push({ category: val.products[i].category, id: val.products[i].id, name: val.products[i].name, desc: val.products[i].desc, quantity: val.products[i].quantity, img: val.products[i].img, qtyInCircle: val.products[i].quantity });
          }
          arr1.push({ category: val.category, categoryName: val.categoryName, products: arrNew });
          //arr1.push({category:val.category,categoryName:val.categoryName,products:val.products});
        }
      });
      newstate.FurnitureItemList = [];
      newstate.FurnitureItemList = arr1;
      return newstate;

    case 'FURNITURE_ONCLICK_CIRCLEQUANTITY':
      var category = action.category;
      var id = action.id;
      var arr1 = [];
      var furnitureItems = [];
      newstate.FurnitureItemList.map((val, b) => {
        if (category == val.category) {
          for (var i = 0; i < val.products.length; i++) {
            if (id == val.products[i].id) {
              furnitureItems.push({ category: val.products[i].category, id: val.products[i].id, name: val.products[i].name, desc: val.products[i].desc, quantity: val.products[i].quantity, img: val.products[i].img, qtyInCircle: 0 });
            }
            else {
              furnitureItems.push({ category: val.products[i].category, id: val.products[i].id, name: val.products[i].name, desc: val.products[i].desc, quantity: val.products[i].quantity, img: val.products[i].img, qtyInCircle: val.products[i].quantity });
            }
          }
          arr1.push({ category: val.category, categoryName: val.categoryName, products: furnitureItems });
        }
        else {
          var arrNew = [];
          for (var i = 0; i < val.products.length; i++) {
            arrNew.push({ category: val.products[i].category, id: val.products[i].id, name: val.products[i].name, desc: val.products[i].desc, quantity: val.products[i].quantity, img: val.products[i].img, qtyInCircle: val.products[i].quantity });
          }
          arr1.push({ category: val.category, categoryName: val.categoryName, products: arrNew });
          //arr1.push({category:val.category,categoryName:val.categoryName,products:val.products});
        }
      });
      newstate.FurnitureItemList = [];
      newstate.FurnitureItemList = arr1;
      return newstate;

    case 'FURNITURE_ONCLICKPLUS':
      var category = action.category;
      var id = action.id;
      var arr1 = [];
      var furnitureItems = [];
      newstate.FurnitureItemList.map((val, b) => {
        if (category == val.category) {
          for (var i = 0; i < val.products.length; i++) {
            if (id == val.products[i].id) {
              furnitureItems.push({ category: val.products[i].category, id: val.products[i].id, name: val.products[i].name, desc: val.products[i].desc, quantity: val.products[i].quantity + 1, img: val.products[i].img, qtyInCircle: 0 });
            }
            else {
              furnitureItems.push({ category: val.products[i].category, id: val.products[i].id, name: val.products[i].name, desc: val.products[i].desc, quantity: val.products[i].quantity, img: val.products[i].img, qtyInCircle: val.products[i].quantity });
            }
          }
          arr1.push({ category: val.category, categoryName: val.categoryName, products: furnitureItems });
        }
        else {
          arr1.push({ category: val.category, categoryName: val.categoryName, products: val.products });
        }
      });
      newstate.FurnitureItemList = [];
      newstate.FurnitureItemList = arr1;
      return newstate;

    case 'FURNITURE_ONCLICKMINUS':
      var category = action.category;
      var id = action.id;
      var arr1 = [];
      var furnitureItems = [];
      newstate.FurnitureItemList.map((val, b) => {
        if (category == val.category) {
          for (var i = 0; i < val.products.length; i++) {
            if (id == val.products[i].id) {
              furnitureItems.push({ category: val.products[i].category, id: val.products[i].id, name: val.products[i].name, desc: val.products[i].desc, quantity: val.products[i].quantity - 1, img: val.products[i].img, qtyInCircle: 0 });
            }
            else {
              furnitureItems.push({ category: val.products[i].category, id: val.products[i].id, name: val.products[i].name, desc: val.products[i].desc, quantity: val.products[i].quantity, img: val.products[i].img, qtyInCircle: val.products[i].quantity });
            }
          }
          arr1.push({ category: val.category, categoryName: val.categoryName, products: furnitureItems });
        }
        else {
          arr1.push({ category: val.category, categoryName: val.categoryName, products: val.products });
        }
      });
      newstate.FurnitureItemList = [];
      newstate.FurnitureItemList = arr1;
      return newstate;

    case 'FURNITURE_ONCLICKDELETE':
      var category = action.category;
      var id = action.id;
      var arr1 = [];
      var furnitureItems = [];
      newstate.FurnitureItemList.map((val, b) => {
        if (category == val.category) {
          for (var i = 0; i < val.products.length; i++) {
            if (id == val.products[i].id) {
              furnitureItems.push({ category: val.products[i].category, id: val.products[i].id, name: val.products[i].name, desc: val.products[i].desc, quantity: 0, img: val.products[i].img, qtyInCircle: 0 });
            }
            else {
              furnitureItems.push({ category: val.products[i].category, id: val.products[i].id, name: val.products[i].name, desc: val.products[i].desc, quantity: val.products[i].quantity, img: val.products[i].img, qtyInCircle: val.products[i].quantity });
            }
          }
          arr1.push({ category: val.category, categoryName: val.categoryName, products: furnitureItems });
        }
        else {
          arr1.push({ category: val.category, categoryName: val.categoryName, products: val.products });
        }
      });
      newstate.FurnitureItemList = [];
      newstate.FurnitureItemList = arr1;
      return newstate;

    case 'SET_FURNITURE_UNITS':

      var arr1 = [];
      var furnitureitems = [];
      furnitureitems = [];

      newstate.FurnitureItemList = action.funData;
      console.log("actioninreducer",action)
      //alert(JSON.stringify(furnitureitems));

      if (newstate.pickupArr.length >= newstate.dropArr.length) {
        newstate.pickupArr.map((val, i) => {
          arr1.push({ id: val.id, address: val.address, lat: val.lat, long: val.long, IsService: false, furnitureitems: furnitureitems });
        });
        newstate.LocationForService = 'Pickup ';
        newstate.LocationImgForService = Constants.Images.customer.markerBlue;
      }
      else {
        newstate.dropArr.map((val, i) => {
          arr1.push({ id: val.id, address: val.address, lat: val.lat, long: val.long, IsService: false, furnitureitems: furnitureitems });
        });
        newstate.LocationForService = 'Drop ';
        newstate.LocationImgForService = Constants.Images.customer.markerOrange;
      }
      newstate.DisplayLocationAddress = [];
      console.log("arra1inreducer",arr1)
      newstate.DisplayLocationAddress = arr1;

      return newstate;

    case 'FURNITURE_WHITEGLOVE':
      newstate.CourierItemIndex = action.itemindex;
      var arr1 = [];
      newstate.DisplayLocationAddress.map((val, b) => {
        if (parseInt(newstate.CourierItemIndex) == parseInt(val.id)) {
          arr1.push({ id: val.id, address: val.address, lat: val.lat, long: val.long, IsService: !val.IsService, furnitureitems: val.furnitureitems });
        }
        else {
          arr1.push({ id: val.id, address: val.address, lat: val.lat, long: val.long, IsService: val.IsService, furnitureitems: val.furnitureitems });
        }

      });
      newstate.DisplayLocationAddress = [];
      newstate.DisplayLocationAddress = arr1;

      return newstate;

    case 'FURNITURE_ITEMADD':
      var furnitureItems = [];
      var ItemList = action.ItemList;
      var arr1 = [];

      newstate.DisplayLocationAddress.map((val, b) => {
        if (parseInt(newstate.CourierItemIndex) == parseInt(val.id)) {
          ItemList.map((val1, i) => {
            for (var i = 0; i < val1.products.length; i++) {
              if (val1.products[i].quantity > 0) {
                furnitureItems.push({ parentId: newstate.CourierItemIndex, category: val1.products[i].category, id: val1.products[i].id, name: val1.products[i].name, desc: val1.products[i].desc, quantity: val1.products[i].quantity, img: val1.products[i].img });
              }
            }
          });


          arr1.push({ id: val.id, address: val.address, lat: val.lat, long: val.long, IsService: val.IsService, furnitureitems: furnitureItems });
        }
        else {
          arr1.push({ id: val.id, address: val.address, lat: val.lat, long: val.long, IsService: val.IsService, furnitureitems: val.furnitureitems });
        }
      });
      newstate.DisplayLocationAddress = [];
      newstate.DisplayLocationAddress = arr1;

      return newstate;

    case 'FURNITURE_ITEMDELETE':
      var furnitureItems = [];
      var _id = action.id;
      var _parentid = action.parentid;
      var arr1 = [];

      newstate.DisplayLocationAddress.map((val, b) => {
        if (parseInt(_parentid) == parseInt(val.id)) {
          for (var i = 0; i < val.furnitureitems.length; i++) {
            if (val.furnitureitems[i].id != _id) {
              furnitureItems.push({ parentId: val.furnitureitems[i].parentId, category: val.furnitureitems[i].category, id: val.furnitureitems[i].id, name: val.furnitureitems[i].name, desc: val.furnitureitems[i].desc, quantity: val.furnitureitems[i].quantity, img: val.furnitureitems[i].img });
            }
          }
          arr1.push({ id: val.id, address: val.address, lat: val.lat, long: val.long, IsService: val.IsService, furnitureitems: furnitureItems });
        }
        else {
          arr1.push({ id: val.id, address: val.address, lat: val.lat, long: val.long, IsService: val.IsService, furnitureitems: val.furnitureitems });
        }
      });
      newstate.DisplayLocationAddress = [];
      newstate.DisplayLocationAddress = arr1;

      var furnitureItems = [];
      var arr1 = [];
      var category = action.category;
      newstate.FurnitureItemList.map((val, b) => {
        if (category == val.category) {
          for (var i = 0; i < val.products.length; i++) {
            if (_id == val.products[i].id) {
              furnitureItems.push({ category: val.products[i].category, id: val.products[i].id, name: val.products[i].name, desc: val.products[i].desc, quantity: 0, img: val.products[i].img });
            }
            else {
              furnitureItems.push({ category: val.products[i].category, id: val.products[i].id, name: val.products[i].name, desc: val.products[i].desc, quantity: val.products[i].quantity, img: val.products[i].img });
            }
          }
          arr1.push({ category: val.category, categoryName: val.categoryName, products: furnitureItems });
        }
        else {
          arr1.push({ category: val.category, categoryName: val.categoryName, products: val.products });
        }
      });
      newstate.FurnitureItemList = [];
      newstate.FurnitureItemList = arr1;

      return newstate;

    case 'FURNITURE_ITEMQUANTITY':
      var furnitureItems = [];
      var _qty = action.qty;
      var _id = action.id;
      var _parentid = action.parentid;
      var arr1 = [];

      newstate.DisplayLocationAddress.map((val, b) => {
        if (parseInt(_parentid) == parseInt(val.id)) {
          for (var i = 0; i < val.furnitureitems.length; i++) {
            if (val.furnitureitems[i].id == _id) {
              furnitureItems.push({
                parentId: val.furnitureitems[i].parentId, category: val.furnitureitems[i].category, id: val.furnitureitems[i].id,
                name: val.furnitureitems[i].name, desc: val.furnitureitems[i].desc,
                quantity: _qty, img: val.furnitureitems[i].img
              });
            }
            else {
              furnitureItems.push({
                parentId: val.furnitureitems[i].parentId, category: val.furnitureitems[i].category, id: val.furnitureitems[i].id,
                name: val.furnitureitems[i].name, desc: val.furnitureitems[i].desc,
                quantity: val.furnitureitems[i].quantity, img: val.furnitureitems[i].img
              });
            }
          }
          arr1.push({ id: val.id, address: val.address, lat: val.lat, long: val.long, IsService: val.IsService, furnitureitems: furnitureItems });
        }
        else {
          arr1.push({ id: val.id, address: val.address, lat: val.lat, long: val.long, IsService: val.IsService, furnitureitems: val.furnitureitems });
        }

      });
      newstate.DisplayLocationAddress = [];
      newstate.DisplayLocationAddress = arr1;

      return newstate;

    default:
      return newstate;
  }
}
