/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  
} from "react-native";


import Constants from "../../constants";
import * as NotificationActions from '../../redux/modules/notifications';
import { connect } from 'react-redux';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { bindActionCreators } from "redux";

 class NotificationList extends Component<{}> {
  constructor(props) {
    super(props);
    // this.state = {

    
    //   notificationsList:props.notificationsList
     
    // };
  }

  componentWillMount(){


this.props.NotificationActions.getAllNotification(this.props.tokenforuser);

  }
  renderNotificationList(value) {
   
    return (
      <TouchableOpacity style={[styles.cardView]}>
        <View style={styles.categoryRow}>
          <Text style={[styles.notificationMsg]}>{value.message}</Text>
          <Text style={[styles.notifyTime]}>{value.updatedAt}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    console.log("notificationsList @@@@@@",this.props.notificationsList);
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.notificationsList}
          renderItem={({ item }) => this.renderNotificationList(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Constants.BaseStyle.PADDING * 0.5
  },
  categoryRow: {
    padding: Constants.BaseStyle.PADDING * 0.5
  },

  cardView: {
    backgroundColor: "#fff",
    marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 0.6
  },

  notificationMsg: {
    color: Constants.Colors.Black,
    fontWeight: "900",
    fontSize: 14
  },

  notifyTime: {
    color: Constants.Colors.BlurGrey,
    fontWeight: "600",
    fontSize: 12,
    textAlign: "right"
  }
});



const mapStateToProps = state => (
  {
  
  tokenforuser: (state.user.userData && state.user.userData.token) || (state.user.driverData && state.user.driverData.token),
  notificationsList:state.notifications.notificationsList
 
});

const mapDispatchToProps = dispatch => ({
  NotificationActions: bindActionCreators(NotificationActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList);

