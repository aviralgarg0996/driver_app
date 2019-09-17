//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {  createAppContainer,createBottomTabNavigator } from "react-navigation";

import { connect } from 'react-redux'
//import routes from "./routesNew";
import routes from "./routes";

import { BackHandler, Alert } from 'react-native';
// import { reduxMiddleware, addListener } from './reduxHelpers'
import {RESET_MAP} from '../redux/modules/location';
import { createStackNavigator } from 'react-navigation-stack'; 



const stackNavigatorConfiguration = {
    headerMode: "none",
    mode: "card",
    navigationOptions: {
      gesturesEnabled: false,
    },
  };
  rootNavigator = null
  /* *
   * @function: Making React navigation's stack navigator with routes and configuration 
   * */
  const AppNavigator = createStackNavigator(routes, stackNavigatorConfiguration);



  getCurrentActiveRouteName=(nav)=>
{

var CustomerProfile=nav['routes'][1]['routes'][0]['routes'][0]['routes'][0];
console.log(CustomerProfile);
if(CustomerProfile.routes.length>=2)
RESET_MAP({data:CustomerProfile.routes[CustomerProfile.routes.length-2].routeName,back:true})
}



// create a component
class MyClass extends Component {


    constructor(props) {
        super(props);
        rootNavigator = AppNavigator
      }



  
      render() {
        const { dispatch, nav } = this.props;
    
        //alert(JSON.stringify(this.props.nav))
    
        return (
          <AppNavigator
            navigation={{ dispatch, state: nav }}
          />
        );
      }

}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app

export default connect(state => ({ user: state.user }))(createAppContainer(AppNavigator));
