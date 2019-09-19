import React, { Component } from "react";
import { Alert, NetInfo,View } from "react-native";
import { Provider } from 'react-redux'
//import Permissions from 'react-native-permissions';
import configureStore from "./config/configureStore";
import Root from './Root';
import { pushNotificationInit , pushNotificationRemove }from "./utilities/PushNotification";
import { checkPermissions }from "./utilities/Locations";


export const store = configureStore();

/*
 * Main component
 * */
class Main extends Component{

	constructor(props) {
		super(props);
		this.state={
			appusesLocation:false,
			locationResponse:false
		}
		/* *
		 * @function: Initiliazing location utility
		 * */

	}
componentDidMount() {


	checkPermissions(store,(locationResponse)=>{

console.log("permissionscheck",locationResponse)
if(!locationResponse)
{
		this.setState({appusesLocation:true})
	return;
}

		if(locationResponse.coords)
			this.setState({appusesLocation:true})
		else
			alert(locationResponse.message+'\n'+'Please allow app to use your location')
		
	})
}



	componentWillUnmount() {
		/* *
		 * @function: Stop listening push notification events
		 * */
		pushNotificationRemove();
	}

	/* *
	 * @function: Default render function
	 * */
	render(){

		return(
	      <Provider store={store}>
		  <View style={{flex:1}}>
		   {this.state.appusesLocation && <Root/>}
		   </View>
	      </Provider>
	    )
	}
}

export default Main
