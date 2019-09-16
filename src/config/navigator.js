import React, { Component } from 'react'
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import routes from "./routes";
import { BackHandler, Alert } from 'react-native';
// import { reduxMiddleware, addListener } from './reduxHelpers'
import {RESET_MAP} from '../redux/modules/location';
import { createStackNavigator } from 'react-navigation-stack'; 
/* *
 * React Navigation's Configuration
 * */
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


/* *
 * @function: Providing dispatch and nav state into app 
 * */
class AppWithNavigationState extends Component {
  constructor(props) {
    super(props);
    rootNavigator = AppNavigator
  }
  componentDidMount() {
  
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);

  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {

  

    const { dispatch, nav } = this.props;
    
console.log(dispatch);
console.log(nav);
    getCurrentActiveRouteName(nav);






  /*  nav.goBack();
    if (nav.index === 1) {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit?',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          {
            text: 'OK', onPress: () => {
              BackHandler.exitApp();
              return true;
            }
          },
        ],
        { cancelable: false }
      )
      return true;
      // return false;
    }*/
    dispatch(NavigationActions.back());
    return true;
  };

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

export { AppNavigator }

/* *
 * @function: Providing redux store's data in props 
 * */

const mapStateToProps = state => ({
  nav: state.nav,
  
})


/* *
 * @function: Connects a React component to a Redux store 
 * */
export default connect(
  mapStateToProps
)(AppWithNavigationState)