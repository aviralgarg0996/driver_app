import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import Constants from '../../constants';
import { BoxShadow } from 'react-native-shadow';

import { StackActions, NavigationActions } from 'react-navigation';


var navigate = null;
class HeaderMenu extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      selectedTabFlag: 0,
      headerStyle1: styles.unselectedTabStyle,
      headerStyle2: styles.unselectedTabStyle,
      headerStyle3: styles.unselectedTabStyle,
      headerStyle4: styles.unselectedTabStyle,
    }
  }

  componentWillReceiveProps() {
    this.setState({ selectedTabFlag: this.props.state.selectedTab })
  }
  onClickLocation() {
    if (this.props.state.HomeTabsIndex > 0) {
      let { dispatch } = this.props;

     

      const resetAction = StackActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: 'CustomerHomeNewx' })],
      });
      this.props.dispatch(resetAction);
      this.props.dispatch({ type: 'SET_SELECTED_FLAG', selectedTabFlag: 0 }, () => this.setState({ selectedTabFlag: 0 }));
   //   navigate('CustomerHome');
    }
  }

  onClickService() {
    if (this.props.catId > 2) {
      const resetAction = StackActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: 'Home_Food' })],
      });
      this.props.dispatch(resetAction);
      this.props.dispatch({ type: 'SET_SELECTED_FLAG', selectedTabFlag: 1 }, () => this.setState({ selectedTabFlag: 1 }));

    }

  }

  onClickPayment = () => {
    if (this.props.catId > 3) {
      const resetAction = StackActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: 'Home_PaymentProceed' })],
      });
      this.props.dispatch(resetAction);
      this.props.dispatch({ type: 'SET_SELECTED_FLAG', selectedTabFlag: 2 }, () => this.setState({ selectedTabFlag: 2 }));

    }
  }

  onClickSelectDriver = () => {
    if (this.props.state.HomeTabsIndex > 0) {
      let { dispatch } = this.props;
      this.props.dispatch({ type: 'SET_SELECTED_FLAG', selectedTabFlag: 3 }, () => this.setState({ selectedTabFlag: 3 }));
      navigate('Home_SelectDriver');
    }
  }

  render() {
    navigate = this.props.navigation;
    return (
      <View style={{ height: 40, backgroundColor: Constants.Colors.BackgroundBlue, flexDirection: 'row' }}>
        <View style={{
          paddingHorizontal: 12, height: 40,
          backgroundColor: this.props.state.selectedTab === 0 ? Constants.Colors.newBlue : Constants.Colors.WhiteUpd, borderTopEndRadius: 20,
          borderBottomEndRadius: 20, zIndex: 1, justifyContent: 'center',
          alignItems: 'center'
        }}>
        <TouchableOpacity onPress={() => this.onClickLocation()}>
          <Image
            style={{ width: 30, height: 30, resizeMode: 'contain', margin: 5 }}
            source={require("../../assets/images/breadcrumb_icon.png")} />
            </TouchableOpacity>
        </View>
        <View style={{
          paddingHorizontal: 7, height: 40, 
          backgroundColor: this.props.state.selectedTab === 1 ? Constants.Colors.newBlue : Constants.Colors.silverGray, 
          borderTopEndRadius: 20, borderBottomEndRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: -20, zIndex: -1
        }}>
          <TouchableOpacity onPress={() => this.onClickService()}>
            <Text style={{ marginLeft: 25, marginRight: 5,fontSize:Constants.BaseStyle.DEVICE_WIDTH/100*3.5,
              color: this.props.state.selectedTab === 1 ? Constants.Colors.WhiteUpd : Constants.Colors.LightGray }}>
               SERVICES & ITEMS </Text>
          </TouchableOpacity>
        </View>
        <View style={{
          paddingHorizontal: 7, height: 40, backgroundColor: this.props.state.selectedTab === 2 ? Constants.Colors.newBlue : Constants.Colors.WhiteUpd, borderTopEndRadius: 20, borderBottomEndRadius: 20,
          justifyContent: 'center',
          alignItems: 'center'
          , marginLeft: -20, zIndex: -2
        }}>
          <TouchableOpacity onPress={() => this.onClickPayment()}>
            <Text style={{ marginLeft: 25, marginRight: 5,fontSize:Constants.BaseStyle.DEVICE_WIDTH/100*3.5,
               color: this.props.state.selectedTab === 2 ? Constants.Colors.WhiteUpd : Constants.Colors.LightGray }}> 
               PAYMENT </Text>
          </TouchableOpacity>
        </View>
        <View style={{
          paddingHorizontal: 7, height: 40, 
          backgroundColor: this.props.state.selectedTab === 3 ? Constants.Colors.newBlue : Constants.Colors.silverGray
          , justifyContent: 'center',
          alignItems: 'center',
          borderTopEndRadius: 20, borderBottomEndRadius: 20, marginLeft: -20, zIndex: -3
        }}>
          <TouchableOpacity onPress={() => this.onClickSelectDriver()}>
            <Text style={{ marginLeft: 25, marginRight: 5, fontSize:Constants.BaseStyle.DEVICE_WIDTH/100*3.5,
              color: this.props.state.selectedTab === 3 ? Constants.Colors.WhiteUpd : Constants.Colors.LightGray }}>
               DRIVER </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Constants.BaseStyle.DEVICE_WIDTH,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    backgroundColor: '#FFFFFF'
  },
  flexRow: {
    flexDirection: 'row',
  },
  text: {
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    color: Constants.Colors.Black,
    textAlign: 'center'
  },
  backgroundImage: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4.9,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopEndRadius: 15,
    borderBottomEndRadius: 15
  },
  overlay: {
    left: (Constants.BaseStyle.DEVICE_WIDTH / 100 * -4),
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedTabStyle: {
    backgroundColor: Constants.Colors.newBlue,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 24,
    zIndex: 2,
    alignItems: 'center',
    borderTopEndRadius: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    borderBottomEndRadius: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    color: Constants.Colors.WhiteUpd
  },
  unselectedTabStyle: {
    backgroundColor: Constants.Colors.WhiteUpd,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 24,
    alignItems: 'center',
    borderTopEndRadius: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    borderBottomEndRadius: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    color: Constants.Colors.Black
  }
});

export default connect(state => ({ state: state.CustomerReducer }))(HeaderMenu);
