import MainScreen from "../containers/user/MainScreen";
import Login from "../containers/user/driver/Login";
import Register from "../containers/user/driver/Register";
import Home from "../containers/user/driver/home";
import { createStackNavigator } from 'react-navigation-stack'; 
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import NewUser from "../components/driver/NewUser";

//import EmailVerification from "../containers/user/driver/EmailVerification";
//import ForgotPassword from "../containers/user/driver/ForgotPassword";
import Orders from "../containers/user/driver/Orders";
import Messages from "../containers/user/driver/Messages";
import Notification from "../containers/user/driver/Notification";
// import DriverForm from "../containers/user/driver/DriverForm";
import DriverForm from "../screens/driverform/UpdDriverForm"
import Followers from "../containers/user/driver/Followers";
import RatingReviews from "../containers/user/driver/RatingReviews";
import ManageSchedule from "../containers/user/driver/ManageSchedule";
import ManageOrders from "../containers/user/driver/ManageOrders";
import PaymentSuccess from "../containers/user/customer/PaymentSuccess";
import Shedule from "../containers/user/driver/Shedule";
import DriverCalender from "../containers/user/driver/DriverCalender";

import DaysList from "../components/driver/DaysList";

import DefaultSchedule from "../containers/user/driver/DefaultSchedule";

import ManageScheduleTime from "../containers/user/driver/ManageScheduleTime";
import ManageScheduleWorkingHours from "../containers/user/driver/ManageScheduleWorkingHours";
import ManageDefaultScheduleWorkingHours from "../containers/user/driver/ManageDefaultScheduleWorkingHours";
import Home_ScheduleOrder from '../components/driver/Home_ScheduleOrder';
import Chat from '../components/chat/Chat';
import MessagesList from '../components/chat/MessagesList';
import Loader from "../components/common/Loader";
import AvailableOrders from '../components/driver/AvailableOrders';
import OnGoing from '../components/driver/OnGoing';
import Orders_ScheduledOrder from '../components/driver/Orders_ScheduledOrder';
import OrderDelivered from '../components/driver/OrderDelivered';
import Scheduled from "../containers/user/driver/Scheduled";
import DeliveryDetails from "../components/driver/DeliveryDetails";
import ProfileDrawer from "../containers/user/driver/ProfileDrawer";
import ProfileDrawer1 from "../containers/user/driver/ProfileDrawer1";
import Settings from "../containers/user/driver/Settings";
import WeekSchedule from "../containers/user/driver/WeekSchedule";
import ChangePassword from "../containers/user/driver/ChangePassword";
import DelgateSupport from "../containers/user/driver/DelgateSupport";
import Miscellaneous from "../containers/user/driver/Miscellaneous";
import PaymentSettings from "../containers/user/driver/PaymentSettings";
import PaymentHistory from "../containers/user/driver/PaymentHistory";
import NotificationSettings from "../containers/user/driver/NotificationSettings";
import ServingArea from "../containers/user/driver/ServingArea";
import AppIntroduction from "../containers/user/driver/AppIntroduction";
import SplashScreen from "../containers/user/driver/SplashScreen";
import LandingScreen from "../containers/user/driver/LandingScreen";
import tutorialVideo from "../containers/user/driver/Tutorial"
import annotationMap from "../containers/user/driver/CustomerMapReviewReplica";
// import annotationMap1 from "../containers/user/driver/CustomerMapReviewReplica1";
import driverNavigation from "../containers/user/driver/Driver_Navigation"
import PickUpPrioirty from "../containers/user/driver/Priority"



import socketUpdate from "../containers/user/driver/socketIo";

import { Image, StyleSheet, Platform, Text } from 'react-native';
import Constants from "../constants";
import React, { Component } from 'react';

// customer routes
import CustomerHomeNew from "../containers/user/customer/home";
import HourlyGetEstimate from "../containers/user/customer/HourlyGetEstimate";
import CustomerOrders from "../containers/user/customer/orders";
import CustomerMessages from "../containers/user/customer/messages";
import CustomerNotifications from "../containers/user/customer/notifications";
import CustomerProfileDrawer from "../containers/user/customer/CustomerProfileDrawer";
import Home_SelectDriver from "../containers/user/customer/Home_SelectDriver";

import Home_PaymentProceed from "../containers/user/customer/Home_PaymentProceed";
import Hourly_PaymentProceed from "../containers/user/customer/Hourly_PaymentProceed";
import Home_Food from "../containers/user/customer/Home_Food";

import Home_Services from "../containers/user/customer/Home_ServicesItemsFood";
import Home_ServicesDoc from "../containers/user/customer/Home_ServicesItemsDoc";
import Home_ServicesItemsCourier from "../containers/user/customer/Home_ServicesItemsCourier";
import Home_ServicesItemsFurniture from "../containers/user/customer/Home_ServicesItemsFurniture";

import Home_DocumentInvoice from "../containers/user/customer/Home_DocumentInvoice";
import Home_CourierInvoice from "../containers/user/customer/Home_CourierInvoice";
import Home_FurnitureInvoice from "../containers/user/customer/Home_FurnitureInvoice";
import UrgencyForFood from "../containers/user/customer/UrgencyForFood";
import UrgencyForDoc from "../containers/user/customer/UrgencyForDoc";

import UrgencyForCourier from "../containers/user/customer/UrgencyForCourier";
import UrgencyForFurniture from "../containers/user/customer/UrgencyForFurniture";
import Home_Invoice from "../containers/user/customer/Home_Invoice";
import Hourly_Invoice from "../containers/user/customer/Hourly_Invoice";

import Orders_Pending from "../containers/user/customer/Orders_Pending";
import OrdersInfo from "../containers/user/customer/OrdersInfo";
import Orders_OnGoing from "../containers/user/customer/Orders_OnGoing";
import Orders_Scheduled from "../containers/user/customer/Orders_Scheduled";
import Orders_Drafts from "../containers/user/customer/Orders_Drafts";
import Orders_Canceled from "../containers/user/customer/Orders_Canceled";
import Orders_Delivered from "../containers/user/customer/Orders_Delivered";

import Success from "../containers/user/driver/Success";
import PersonalInfo from "../screens/driverform/PersonalInfo";
import DriverEditProfile from "../screens/driverform/DriverEditProfile"
import VehicleInfo from "../screens/driverform/VehicleInfo";
import TermsnConditions from "../screens/TermsnConditions";
import Equipment from "../containers/user/driver/Equipment";
import Certificates from "../containers/user/driver/Certificates";
import NotesPick from "../containers/user/customer/NotesPick";
import CustomerDetails from "../containers/user/customer/CustomerDetails";
import DraftPick from "../containers/user/customer/DraftPick";
import testme from "../containers/user/customer/testme";
import UrgencyForFurniture1 from "../containers/user/customer/UrgencyForFurniture1";
import UrgencyForDoc1 from "../containers/user/customer/UrgencyForDoc1";
import UrgencyForCourier1 from "../containers/user/customer/UrgencyForCourier1";
import UrgencyForFood1 from "../containers/user/customer/UrgencyForFood1";
import customerSettings from "../containers/user/customer/customerSettings";
import Home_Invoice1 from "../containers/user/customer/Home_Invoice1";
import NotesHourly from "../containers/user/customer/NotesHourly";




// export list of routes.
export default routes = {


  
 // Loader: { screen: Loader },
  Login: { screen: Login },
  PersonalInfo: { screen: PersonalInfo },
  VehicleInfo: { screen: VehicleInfo },
  MainScreen: { screen: MainScreen },
  Register: { screen: Register },
  DriverForm: { screen: PersonalInfo },
  DriverEditProfile: { screen: DriverEditProfile },
  TermsnConditions: { screen: TermsnConditions },
  Followers: { screen: Followers },
  RatingReviews: { screen: RatingReviews },
  ManageScheduleTime: { screen: ManageScheduleTime },
  ManageScheduleWorkingHours: { screen: ManageScheduleWorkingHours },
  ManageSchedule: { screen: ManageSchedule },
  Home: { screen: Home },
  DefaultSchedule: { screen: DefaultSchedule },
  DriverCalender: { screen: DriverCalender },
  ManageDefaultScheduleWorkingHours: { screen: ManageDefaultScheduleWorkingHours },
  DaysList: { screen: DaysList },
  NewUser: { screen: NewUser },
  OnGoing: { screen: OnGoing },
  Settings: { screen: Settings },
  customerSettings: { screen: customerSettings },
  WeekSchedule: { screen: WeekSchedule },
  Shedule: { screen: Shedule },
  Scheduled: { screen: Scheduled },
  DeliveryDetails: { screen: DeliveryDetails },
  PickUpPrioirty: { screen: PickUpPrioirty },
  socketUpdate: { screen: socketUpdate },
  driverNavigation: { screen: driverNavigation },
  tutorialVideo: { screen: tutorialVideo },
  annotationMap: { screen: annotationMap },
  // annotationMap1: { screen: annotationMap1 },
  ChangePassword: { screen: ChangePassword },
  DelgateSupport: { screen: DelgateSupport },
  Miscellaneous: { screen: Miscellaneous },
  PaymentSettings: { screen: PaymentSettings },
  PaymentHistory: { screen: PaymentHistory },
  NotificationSettings: { screen: NotificationSettings },
  ServingArea: { screen: ServingArea },
  Equipment: { screen: Equipment },
  Certificates: { screen: Certificates },
  AppIntroduction: { screen: AppIntroduction },
  SplashScreen: { screen: SplashScreen },
  LandingScreen: { screen: LandingScreen },
  Success: { screen: Success },
  testme: { screen: testme },
  //HourlyGetEstimate: { screen: HourlyGetEstimate },
  UrgencyForFood1: { screen: UrgencyForFood1 },
  UrgencyForDoc1: { screen: UrgencyForDoc1 },
  UrgencyForCourier1: { screen: UrgencyForCourier1 },
  UrgencyForFurniture1: { screen: UrgencyForFurniture1 },
  UrgencyForFood: { screen: UrgencyForFood },
  UrgencyForDoc: { screen: UrgencyForDoc },
  UrgencyForCourier: { screen: UrgencyForCourier },
  UrgencyForFurniture: { screen: UrgencyForFurniture },
  //
  profile: {
    screen: createDrawerNavigator({
      Home: {
        screen: createBottomTabNavigator({
          Home: {
            screen: createStackNavigator({
              Home: { screen: Home },
              Home_ScheduleOrder: { screen: Home_ScheduleOrder },
              ManageSchedule: { screen: ManageSchedule },
              ManageOrders: { screen: ManageOrders },
              DriverCalender: { screen: DriverCalender },
              Shedule: { screen: Shedule },
              WeekSchedule: { screen: WeekSchedule },
              DefaultSchedule: { screen: DefaultSchedule },
              DaysList: { screen: DaysList },
            }, { headerMode: "none", }),
            navigationOptions: ({ navigation }) => ({
              // title: 'Home',
              tabBarLabel: "Home",
              tabBarLabel: <Text style={{ marginTop: 5, textAlign: 'center', fontSize: 13, color: '#1E4281' }}>Home</Text>,
              tabBarIcon: ({ tintColor }) => {
                return <Image source={Constants.Images.driver.home} style={[styles.icon, { tintColor }]} />
              },
            }),
          },
          Orders: {
            screen: createStackNavigator({
              Orders: { screen: Orders },
              AvailableOrders: { screen: AvailableOrders },
              Orders_ScheduledOrder: { screen: Orders_ScheduledOrder },
              OnGoing: { screen: OnGoing },
              OrderDelivered: { screen: OrderDelivered },
            }, { headerMode: "none", }),
            navigationOptions: ({ navigation }) => ({
              // title: 'Orders',
              tabBarLabel: "Orders",
              tabBarLabel: <Text style={{ marginTop: 5, textAlign: 'center', fontSize: 13, color: '#1E4281' }}>Orders</Text>,
              tabBarIcon: ({ tintColor }) => {
                return <Image source={Constants.Images.driver.taxi} 
                style={[styles.icon, { tintColor }]} />
              },
            }),
          },
          Messages: {
            screen: createStackNavigator({
              Messages: { screen: Messages },
              MessagesList: { screen: MessagesList },
              Chat: { screen: Chat },
            }, { headerMode: "none", }),
            navigationOptions: ({ navigation }) => ({
              // title: 'Messages',
              tabBarLabel: "Messages",
              tabBarLabel: <Text style={{ marginTop: 5, textAlign: 'center', fontSize: 13, color: '#1E4281' }}>Messages</Text>,
              tabBarIcon: ({ tintColor }) => {
                return <Image source={Constants.Images.driver.message} style={[styles.icon, { tintColor }]} />
              },
            }),
          },
          Notification: {
            screen: Notification,
            navigationOptions: ({ navigation }) => ({
              // title: 'Notifications',
              tabBarLabel: "Notifications",
              tabBarLabel: <Text style={{ marginTop: 5, textAlign: 'center', fontSize: 13, color: '#1E4281' }}>Notifications</Text>,
              tabBarIcon: ({ tintColor }) => {
                return <Image source={Constants.Images.driver.notification} style={[styles.icon, { tintColor }]} />
              },
            }),
          },
        }, {
            tabBarOptions: {
              //upperCaseLabel:false,
              //labelStyle: {
              //fontSize: Constants.BaseStyle.DEVICE_WIDTH <= 360 ? 8 : 12
              //},
              showIcon: true,
              //showLabel: Platform.OS === 'ios' ? true : false,
              activeTintColor: "#1E4281",
              inactiveTintColor: Constants.Colors.Gray,
              style: {
                height: 58,
                //width: Constants.BaseStyle.DEVICE_WIDTH,
                backgroundColor: Constants.Colors.White,
              },
              indicatorStyle: {
                backgroundColor: "#1E4281",

              }
            },
            tabBarPosition: 'bottom'
          }),
        navigationOptions: ({ navigation }) => ({
          title: 'Home',
        }),
      },

    }, {
        contentComponent: ProfileDrawer1,
        mode: 'modal',
        headerMode: 'none',
        drawerWidth: Constants.BaseStyle.DEVICE_WIDTH / 100 * 85,
      }
    )
  },


  customerprofile: {
    screen: createDrawerNavigator({
      CustomerHomeNew: {
        screen: createBottomTabNavigator({

          CustomerHomeNewx: {
            screen: createStackNavigator({
              CustomerHomeNewx: { screen: CustomerHomeNew },
              Home_Food: { screen: Home_Food },
              Home_Services: { screen: Home_Services },
              UrgencyForFood: { screen: UrgencyForFood },
              UrgencyForFood1: { screen: UrgencyForFood1 },
              UrgencyForDoc: { screen: UrgencyForDoc },
              UrgencyForDoc1: { screen: UrgencyForDoc1 },
              UrgencyForCourier: { screen: UrgencyForCourier },
              UrgencyForCourier1: { screen: UrgencyForCourier1 },
              UrgencyForFurniture: { screen: UrgencyForFurniture },
              UrgencyForFurniture1: { screen: UrgencyForFurniture1 },
              Home_ServicesDoc: { screen: Home_ServicesDoc },
              Home_ServicesItemsCourier: { screen: Home_ServicesItemsCourier },
              Home_ServicesItemsFurniture: { screen: Home_ServicesItemsFurniture },
              Home_DocumentInvoice: { screen: Home_DocumentInvoice },
              Home_CourierInvoice: { screen: Home_CourierInvoice },
              Home_FurnitureInvoice: { screen: Home_FurnitureInvoice },
              Home_Invoice: { screen: Home_Invoice },
              Home_PaymentProceed: { screen: Home_PaymentProceed },
              Home_SelectDriver: { screen: Home_SelectDriver },
              HourlyGetEstimate: { screen: HourlyGetEstimate },
              Hourly_Invoice: { screen: Hourly_Invoice },
              Hourly_PaymentProceed: { screen: Hourly_PaymentProceed },
              Home_ServicesItemsCourier: { screen: Home_ServicesItemsCourier },
              Home_ServicesItemsFurniture: { screen: Home_ServicesItemsFurniture },
              CustomerInfo: { screen: CustomerDetails },
              NotesPick: { screen: NotesPick },
              DraftPick: { screen: DraftPick },
              Home_Invoice1: { screen: Home_Invoice1 },
              PaymentSuccess: { screen: PaymentSuccess },
              NotesHourly: { screen: NotesHourly }
            }, { lazy: true, headerMode: 'none' }

            ),
            navigationOptions: ({ navigation }) => ({
              // title: 'Home',
              tabBarLabel: "Home",
              tabBarLabel: <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 13, color: '#1E4281' }}>Home</Text>,
              tabBarIcon: ({ tintColor }) => {
                return <Image source={Constants.Images.driver.home} style={[styles.icon, { tintColor }]} />
              },
            }),
          },


          CustomerOrders: {
            screen: createStackNavigator({
              CustomerOrders: { screen: CustomerOrders },
              Orders_Pending: { screen: Orders_Pending },
              OrdersInfo: { screen: OrdersInfo },
              Orders_OnGoing: { screen: Orders_OnGoing },
              Orders_Scheduled: { screen: Orders_Scheduled },
              Orders_Canceled: { screen: Orders_Canceled },
              Orders_Drafts: { screen: Orders_Drafts },
              Orders_Delivered: { screen: Orders_Delivered },
              Home_SelectDriver: { screen: Home_SelectDriver },
           

            }, { headerMode: "none", }),
            navigationOptions: ({ navigation }) => ({
              // title: 'Orders',
              tabBarLabel: "Orders",
              tabBarLabel: <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 13, color: '#1E4281' }}>Orders</Text>,
              tabBarIcon: ({ tintColor }) => {
                return <Image source={Constants.Images.driver.taxi} style={[styles.icon, { tintColor }]} />
              },
            }),
          },
          CustomerMessages: {
            screen: createStackNavigator({
              Messages: { screen: Messages },
              MessagesList: { screen: MessagesList },
              Chat: { screen: Chat },
            }, { headerMode: "none", }),
            navigationOptions: ({ navigation }) => ({
              // title: 'Messages',
              tabBarLabel: "Messages",
              tabBarLabel: <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 13, color: '#1E4281' }}>Messages</Text>,
              tabBarIcon: ({ tintColor }) => {
                return <Image source={Constants.Images.driver.message} style={[styles.icon, { tintColor }]} />
              },
            }),
          },
          CustomerNotifications: {
            screen: CustomerNotifications,
            navigationOptions: ({ navigation }) => ({
              // title: 'Notifications',
              tabBarLabel: "Notifications",
              tabBarLabel: <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 13, color: '#1E4281' }}>Notifications</Text>,
              tabBarIcon: ({ tintColor }) => {
                return <Image source={Constants.Images.driver.notification} style={[styles.icon, { tintColor }]} />
              },
            }),
          },
        }, { lazy: true })
      }
    },
      {
        contentComponent: CustomerProfileDrawer,
        mode: 'modal',
        headerMode: 'none',
        drawerWidth: Constants.BaseStyle.DEVICE_WIDTH / 100 * 85,
      }
    ),
  },
  /*
    customerprofile: {
      screen: DrawerNavigator({
        CustomerHomeNewX: {
          screen: TabNavigator({
            CustomerHomeNewX: {
              screen: StackNavigator({
                CustomerHomeNewX: { screen: CustomerHomeNew },
             //  CustomerHome: { screen: Home_SelectDriver },
               
               Home_Food: { screen: Home_Food },
                Home_Services: { screen: Home_Services },
                UrgencyForFood: { screen: UrgencyForFood },
                UrgencyForDoc: { screen: UrgencyForDoc },
                UrgencyForCourier: { screen: UrgencyForCourier },
                UrgencyForFurniture: { screen: UrgencyForFurniture },
                Home_ServicesDoc: { screen: Home_ServicesDoc },
                Home_ServicesItemsCourier: { screen: Home_ServicesItemsCourier },
                Home_ServicesItemsFurniture: { screen: Home_ServicesItemsFurniture },
                Home_DocumentInvoice: { screen: Home_DocumentInvoice },
                Home_CourierInvoice: { screen: Home_CourierInvoice },
                Home_FurnitureInvoice: { screen: Home_FurnitureInvoice },
                Home_Invoice: { screen: Home_Invoice },
                Home_PaymentProceed: { screen: Home_PaymentProceed },
                Home_SelectDriver: { screen: Home_SelectDriver },
                HourlyGetEstimate: { screen: HourlyGetEstimate },
                Hourly_Invoice: { screen: Hourly_Invoice },
                Hourly_PaymentProceed: { screen: Hourly_PaymentProceed },
                Home_ServicesItemsCourier: { screen: Home_ServicesItemsCourier },
                Home_ServicesItemsFurniture: { screen: Home_ServicesItemsFurniture },
  
              }, { headerMode: "none", }),
              navigationOptions: ({ navigation }) => ({
                // title: 'Home',
                tabBarLabel: "Home",
                tabBarLabel: <Text style={{ marginBottom: 5, textAlign: 'center', fontSize: 13, color: '#1E4281' }}>Home</Text>,
                tabBarIcon: ({ tintColor }) => {
                  return <Image source={Constants.Images.customer.home} style={[styles.customericon, { tintColor }]} resizeMode={'contain'} />
                },
              }),
            },
            CustomerOrders: {
              screen: StackNavigator({
                CustomerOrders: { screen: CustomerOrders },
                Orders_Pending: { screen: Orders_Pending },
                Orders_OnGoing: { screen: Orders_OnGoing },
                Orders_Scheduled: { screen: Orders_Scheduled },
                Orders_Canceled: { screen: Orders_Canceled },
                Orders_Drafts: { screen: Orders_Drafts },
                Orders_Delivered: { screen: Orders_Delivered },
  
              }, { headerMode: "none", }),
              navigationOptions: ({ navigation }) => ({
                // title: 'Orders',
                tabBarLabel: "Orders",
                tabBarLabel: <Text style={{ marginBottom: 5, textAlign: 'center', fontSize: 13, color: '#1E4281' }}>Orders</Text>,
                tabBarIcon: ({ tintColor }) => {
                  return <Image source={Constants.Images.customer.orders} style={[styles.customericon, { tintColor }]} resizeMode={'contain'} />
                },
              }),
            },
            CustomerMessages: {
              screen: StackNavigator({
                CustomerMessages: { screen: CustomerMessages },
              }, { headerMode: "none", }),
              navigationOptions: ({ navigation }) => ({
                tabBarLabel: "Messages",
                tabBarLabel: <Text style={{ marginBottom: 5, textAlign: 'center', fontSize: 13, color: '#1E4281' }}>Messages</Text>,
                tabBarIcon: ({ tintColor }) => {
                  return <Image source={Constants.Images.customer.message} style={[styles.customericon, { tintColor }]} resizeMode={'contain'} />
                },
              }),
            },
            CustomerNotifications: {
              screen: CustomerNotifications,
              navigationOptions: ({ navigation }) => ({
                tabBarLabel: "Notifications",
                tabBarLabel: <Text style={{ marginBottom: 5, textAlign: 'center', fontSize: 13, color: '#1E4281' }}>Notifications</Text>,
                tabBarIcon: ({ tintColor }) => {
                  return <Image source={Constants.Images.customer.notification} style={[styles.customericon, { tintColor }]} resizeMode={'contain'} />
                },
              }),
            },
          }, {
              tabBarOptions: {
                showIcon: true,
                //showLabel: Platform.OS === 'ios' ? true : false,
                activeTintColor: "#1E4281",
                // inactiveTintColor : Constants.Colors.BlurGrey,
                inactiveTintColor: Constants.Colors.Gray,
                style: {
                  //width: Constants.BaseStyle.DEVICE_WIDTH,
                  height: 58,
                  backgroundColor: Constants.Colors.White,
  
                },
                indicatorStyle: {
                  backgroundColor: "#1E4281",
  
                }
              },
              tabBarPosition: 'bottom',
              lazy:true
            }),
          navigationOptions: ({ navigation }) => ({
            title: 'Home',
          }),
        },
  
      }, {
          contentComponent: CustomerProfileDrawer,
          mode: 'modal',
          headerMode: 'none',
          drawerWidth: Constants.BaseStyle.DEVICE_WIDTH / 100 * 85,
        }
      )
    }*/

};

const styles = StyleSheet.create({
  icon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7,
    marginTop: 13,
    // marginBottom: 6
  },
  customericon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6.5,
    marginTop: 13,
    marginBottom: 6

  }
});
