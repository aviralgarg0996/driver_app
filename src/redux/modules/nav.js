'use strict';
import Idx from "../../utilities/Idx";
import { NavigationActions } from "react-navigation";
import { AppNavigator } from "../../config/navigator";
import { REHYDRATE } from "redux-persist/lib/constants";
import { USER_LOGIN, LOG_OUT, NAVIGATE_TO_DRIVER_FORM, DRIVER_FORM_NAV } from './user';
import {RESET_DETAILS} from './customerreducer';
import {RESET_MAP} from './location';

//Actions
const GOBACK = "GOBACK";
const ResetNavigator = "ResetNavigator";
const GOTO = "GOTO";

// Action Creators
export const goBack = () => ({ type: GOBACK });
export const reset = (data) => {
    return ({ type: ResetNavigator, data })
};
export const goTo = (data) => ({ type: GOTO, data });


const initialState = AppNavigator.router.getStateForAction(NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({
            routeName: 'Loader',

        }),
    ],
}));


function getCurrentRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return getCurrentRouteName(route);
    }
    return route.routeName;
  }

export default function reducer(state = initialState, action) {

    let firstState = "SplashScreen";
  
    if(action.type=="Navigation/NAVIGATE" || action.type== "Navigation/RESET")
    {
if(action.routeName)  
        RESET_MAP({data:action.routeName});
        else{
        RESET_MAP({data:action.actions[0].routeName});
       
    }

     
    }

    if(action.type=="Navigation/POP_TO_TOP")
    {
        RESET_MAP({data:action.key,back:true});
    
    }


    if(!action){
        firstState = "Login";
    }
    else if(action.payload && action.payload.user &&  action.payload.user.userData && action.payload.user.userData.data && action.payload.user.userData.data.multiRole[0].role=="DRIVER")
    {
        firstState = "MainScreen"; 
    }
    else if(action.payload && action.payload.user &&  action.payload.user.userData && action.payload.user.userData.data && action.payload.user.userData.data.multiRole[0].role=="CUSTOMER")
    {
        firstState = "customerprofile"; 
    }
    else {
        firstState = "SplashScreen";
    }

    switch (action.type) {
        case USER_LOGIN:
            return AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: "MainScreen" })],
                }),
                state
            );
        case NAVIGATE_TO_DRIVER_FORM:
            return AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: "DriverForm" })],
                }),
                state
            );
        case DRIVER_FORM_NAV:
            return AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: "DriverForm" })],
                }),
                state
            );

        case ResetNavigator:


          RESET_DETAILS();
            return AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: "Login" })],
                }),
                state
            );

        case GOBACK:
            return AppNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );

        case GOTO:
            console.log('route name ******* ', action.data)
            return AppNavigator.router.getStateForAction(
                NavigationActions.navigate({
                    routeName: action.data.route,
                    params: action.data.params || {},
                }),
                state
            );

        case LOG_OUT:
        RESET_DETAILS();
            return AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    key: null,
                    actions: [NavigationActions.navigate({ routeName: "Login" })],
                }),
                state
            );
        case REHYDRATE:
            return AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: firstState })],
                }),
                state
            );

        default:
            //console.log(JSON.stringify(state)    +   new Date().getTime());
            return AppNavigator.router.getStateForAction(action, state);
    }
}
