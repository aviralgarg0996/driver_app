import { createStackNavigator } from 'react-navigation-stack'; 
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Loader from "../components/common/Loader";
import Login from "../containers/user/driver/Login";
import MainScreen from "../containers/user/MainScreen";
import Register from "../containers/user/driver/Register";
import Home from "../containers/user/driver/home";
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









export default routes = {

  
    MainScreen: { screen: MainScreen },
    Login: { screen: Login },
    Loader: { screen: Loader },
  

};