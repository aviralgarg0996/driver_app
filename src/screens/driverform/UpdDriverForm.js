import React, { Component } from 'react'
import {View} from "react-native"
import PersonalInfo from "./PersonalInfo"
import VehicleInfo from "./VehicleInfo"
var ScrollableTabView = require('react-native-scrollable-tab-view');
export default class DriverForm extends Component {
  constructor(props)
  {
    super(props);
  }
  render() {
    return (
        // <ScrollableTabView>
        <PersonalInfo  />
      //   <VehicleInfo navigation={this.props.navigation} tabLabel="Vehicle Information" />
      // </ScrollableTabView>
    )
  }
}
