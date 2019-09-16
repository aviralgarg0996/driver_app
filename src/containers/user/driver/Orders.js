
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
//import { Switch } from 'react-native-switch';
import Constants from "../../../constants";
import NavigationBar from "react-native-navbar";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";
import Scheduled from './Scheduled';
import Scheduled1 from './Scheduled';
import Scheduled2 from './Scheduled';
import Scheduled3 from './Scheduled';
import Scheduled4 from './Scheduled';
import Header from "../../../components/driver/Header"
import ToogleSwitch from '../../../components/common/ToggleSwitch';
import { connect } from 'react-redux';
import schedule from "../../../redux/modules/schedule";

import { bindActionCreators } from "redux";
import * as UserActions from '../../../redux/modules/user';

var param = {};
getTabData = {
  0: {
    tab: 'Available',
    obj: Scheduled
  },
  1:
  {
    tab: 'Schedule', obj: Scheduled1
  },
  2:
  {
    tab: 'Ongoing', obj: Scheduled2
  },
  3:
  {
    tab: 'Delivered',
    obj: Scheduled3
  },
  4:
  {
    tab: 'Failed',
    obj: Scheduled4
  }

}




class Orders extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      availabilityStatus: props.driverAvailabilityStatus
    };


  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      availabilityStatus: nextProps.driverAvailabilityStatus
    })
  }

  componentDidMount() {
    param = {
      status: getTabData[0].tab,
      page: 1,
      min: 0,
      max: 320044030,//value.maxRange,
      count: 10,
      datemin: new Date().getTime() - 2 * 24 * 60 * 60000,
      datemax: new Date().getTime(),
      sortBy: '',
      orderBy: '',
      driverId: this.props.userData.data._id
    }
    getTabData[0].obj.loadMore(param);
  }


  _retrieveData = (tabNo) => {

  }


  render() {
    const titleConfig = {
      title: "ORDERS",
      tintColor: "#fff",
      style: { fontSize: 18, fontWeight: "600" }
    };

    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header
          headerText="Orders"
          onClickSettings={() => navigate('Settings')}
          onDrawerOpen={() => navigate('DrawerOpen')}
          value={this.state.available}
          goBackIcon={false}
          toggleSwitch={false}
          onValueChange={() => {
            this.setAvailability()
          }}
        />


        <ScrollableTabView onChangeTab={(data) => {
          var url = 'place-order/available';
          param = {
            status: getTabData[data.i].tab,
            page: 1,
            min: 0,
            max: 320044030,//value.maxRange,
            count: 10,
            datemin: new Date().getTime() - 2 * 24 * 60 * 60000,
            datemax: new Date().getTime(),
            sortBy: '',
            orderBy: '',
            driverId: this.props.userData.data._id
          }

          getTabData[data.i].obj.loadMore(param);

        }}
          tabBarActiveTextColor={Constants.Colors.Black}
          renderTabBar={() => <TabBar underlineColor={Constants.Colors.LightBlue} />}>

          <Scheduled navigate={navigate} tabLabel={{ label: "Available", reset: true }}
            onRef={ref => (getTabData[0].obj = ref)}
            label="Available" />
          <Scheduled1 navigate={navigate} tabLabel={{ label: "Scheduled", reset: true }} label="Scheduled"
            onRef={ref => (getTabData[1].obj = ref)} />
          <Scheduled2 navigate={navigate} tabLabel={{ label: "On-Going", reset: true }} label="On-Going"
            onRef={ref => (getTabData[2].obj = ref)} />
          <Scheduled3 navigate={navigate} tabLabel={{ label: "Delivered", reset: true }} label="Delivered"
            onRef={ref => (getTabData[3].obj = ref)} />
          <Scheduled4 navigate={navigate} tabLabel={{ label: "Failed", reset: true }} label="Failed"
            onRef={ref => (getTabData[4].obj = ref)} />
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar: {
    backgroundColor: Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    alignItems: "center"
  },
  rightButtonNav: {
    flexDirection: "row",
    alignItems: "center"
  },
  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },

});

const mapStateToProps = state => ({
  driverAvailabilityStatus: state.user.driverAvailabilityStatus,
  userData: (state.user && state.user.driverData) || (state.user && state.user.userData),
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch),

});


/*
const mapStateToProps = state => ({
 
 
});

  

export default connect(mapStateToProps, null)(MapViewWithCustomer);*/

export default connect(mapStateToProps, mapDispatchToProps)(Orders);


