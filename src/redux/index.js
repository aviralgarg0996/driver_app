import { combineReducers } from 'redux';
import { toastReducer as toast } from 'react-native-redux-toast';
import app from "./modules/app";
import nav from "./modules/nav";
import user from "./modules/user";
import location from "./modules/location";
import notifications from './modules/notifications';
import ModalHandleReducer from './modules/modalclose';
import OrdersHandleReducer from './modules/orders';
import schedule from './modules/schedule';
import settings from './modules/settings';
import CustomerReducer from './modules/customerreducer';
import adminReducer from './modules/adminReducer';

export default function getRootReducer() {
    return combineReducers({
        toast,
        app,
        nav,
        user,
        location,
        notifications,
        ModalHandleReducer,
        OrdersHandleReducer,
        schedule,
        settings,
        adminReducer,
        CustomerReducer,
    });
}
