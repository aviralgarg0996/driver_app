'use strict';
import React, { Component } from "react";
import { Platform } from 'react-native';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType,
    NotificationActionType } from 'react-native-fcm';
import { mongoid } from 'mongoid-js';
import _ from "lodash";
import Idx from './Idx';
import moment from "moment";
import * as userActions from '../redux/modules/user';
import { goTo } from '../redux/modules/nav';
import RestClient from "./RestClient"
let notificationListener, refreshTokenListener;
let notificationToken = 'dummytoken';

/**
* Initiliazing push notification
*/

export function pushNotificationInit(store) {
    FCM.requestPermissions(); // for iOS
    // FCM token on intial app load.
    FCM.getFCMToken().then(token => {
        if (token) {
            scheduleNotifications({date:new Date()})
            store.dispatch(userActions.setDeviceToken(token));
        }
    });

    // Receive Notification in kill state, inactive state or bankground state.
    FCM.getInitialNotification().then(res => {
        let context = this;
        if (JSON.stringify(res)) {
            setTimeout(function () {

                onNotificationRedirection(res, store);
            }, 500);
        }
    });

    // Receive Notification in forground
    // notificationListener = FCM.on(FCMEvent.Notification, async (res) => {
    // 	let context = this;
    // 	if(res.opened_from_tray){
    // 	    setTimeout(function(){
    //         	onNotificationRedirection(res,store);
    // 	    },500);
    //     }
    // });



    // Fcm token may not be available on first load, catch it here
    refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
        if (token) {
            store.dispatch(userActions.setDeviceToken(token));
        }
    });
}


/**
* Schedule Local Notifications.
*/

export function scheduleNotifications(data) {
    let fire_date = parseInt(moment(data.date).seconds(0).format("x"));  
  //  alert(fire_date)
    // eliminate secs.
 /*   FCM.scheduleLocalNotification({
        fire_date: fire_date,
        id: data.id,
        body: 'notification body',
        show_in_foreground: true,
        priority: 'high',
        lights: true,
        vibrate: 500,
        notificationType: 6,
        sound: "default",
    });*/

    FCM.scheduleLocalNotification({
        id: "testnotif",
        fire_date: new Date().getTime() + 5000,
        vibrate: 500,
        title: "Hello",
        body: "Test Scheduled Notification",
        sub_text: "sub text",
        priority: "high",
        large_icon:
          "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg",
        show_in_foreground: false,
        picture:
          "https://firebase.google.com/_static/af7ae4b3fc/images/firebase/lockup.png",
        wake_screen: true,
        extra1: { a: 1 },
        extra2: 1
      });
};


/**
* Get Scheduled Notifications List.
*/

export function getScheduleNotifications(data, callback) {
    FCM.getScheduledLocalNotifications().then(notification => {
        if (_.isFunction(callback)) {
            callback(notification);
        }
    });
};

/**
*  Removes all future local notifications.
*/

export function cancelAllLocalNotifications() {
    FCM.cancelAllLocalNotifications();
};

/**
* Redirection on Notification Tap. 
*/

export function onNotificationRedirection(res, store) {

    if (res.type == 'driverForm') {
        store.dispatch({ type: 'FORMREJECT_VISIBILITY', visibility: true })
        store.dispatch(goTo({
            route: 'Login',
            params: {
                notiData: res.driverStatus
            }
        }));
    }

    if (res.type == 'profile') {
        //store.dispatch({type:'FORMREJECT_VISIBILITY',visibility:true})
        store.dispatch(goTo({
            route: 'Login',
            params: {
                notiData: res.driverStatus
            }
        }));
    }
    if(res.custom_notification)
    {
  
    const notificationdata=res.custom_notification && JSON.parse(res.custom_notification)
    const orderId=notificationdata && notificationdata.id=="id"?'5bf8616da6feab0ba68878e5':notificationdata.id
    if( notificationdata.body == 'Order Received'){
        RestClient.patch("place-order/orderDetails/", orderId).then((result) => {
            const element=result.data;
            let item={
                id: element._id,
                idno: "Id " + element.orderId,
                price: "$"+ element.totalCharge,
                date: "MAR/10/2018",
                // date: that.constructDate(new Date(element.maxTime),new Date(element.minTime)),
                timeframe : "12:00 pm to 4:00 pm",
                // timeframe:'', 
                time: new Date().getTime(),
                rowStyle:rowStyle,
                placedOrderData:element,
                timeLeft:timeLeft,
                orderStatus:element.orderStatus
            }
            store.dispatch(userActions.setOrderedData(item));
            store.dispatch(goTo({
                route: 'AvailableOrders'
            })
        );
        }).catch((error)=>{
    
        })
    }
}
}

/**
* Stop listening push notification events
*/

export function pushNotificationRemove(store) {
    notificationListener.remove();
    refreshTokenListener.remove();
}
