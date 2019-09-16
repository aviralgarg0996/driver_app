/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,Switch,
  TouchableOpacity,
} from 'react-native';
//import { Switch } from 'react-native-switch';
import Background from '../../../components/common/Background';
import Constants from "../../../constants";
import ChatModule from '../../../components/chat/MessagesList';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationBar from "react-native-navbar";
import ToogleSwitch from '../../../components/common/ToggleSwitch';
import { connect } from 'react-redux';
import Header from "../../../components/driver/Header"
class Messages extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      availabilityStatus:props.driverAvailabilityStatus
    }
  }

  componentWillReceiveProps(nextProps){
    //console.log('nextProps ******* ',nextProps)
    this.setState({
      availabilityStatus:nextProps.driverAvailabilityStatus
    })
  }

  render() {
    const titleConfig = {
      title: "MESSAGES",
      tintColor: "#fff",
      style: { fontSize: 18, fontWeight: "600" }
    };

    const { navigate,goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
       <Header
        headerText="Messages"
        onClickSettings={()=>navigate('Settings')}
        onDrawerOpen={()=>navigate('DrawerOpen')}
        value={this.state.available}
        goBackIcon={false}
        />

        <ChatModule navigation={this.props.navigation}/>
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
  driverAvailabilityStatus: state.user.driverAvailabilityStatus
});

export default connect(mapStateToProps, null)(Messages);