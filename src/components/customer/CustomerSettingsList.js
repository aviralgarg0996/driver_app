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
  TextInput,Alert
} from "react-native";

import Background from "../../components/common/Background";
import Constants from "../../constants";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import moment from 'moment';
import { connect } from 'react-redux';
import * as UserActions from '../../redux/modules/user';
import { bindActionCreators } from "redux";
class CustomerSettingsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SettingsData: [
        {
          id: 0,
          setting: "Wallet"
        },
        {
          id: 1,
          setting: "Gift Card"
        },
       
        {
          id: 3,
          setting: "Address Book"
        },
         
        {
          id: 5,
          setting: "Sub-Member"
        },
         
        {
          id: 6,
          setting: "Following Driver"
        },
        {
          id: 7,
          setting: "Payment"
        },
        {
          id: 8,
          setting: "Change Password"
        },
        {
          id: 9,
          setting: "Change Phone"
        },
        {
          id: 10,
          setting: "Notifications"
        },
        {
          id: 11,
          setting: "Delgate Support"
        }
      ]
    };
    //this.renderSettingList = this.renderSettingList.bind(this);
  }

  onItemSelected(id){
    switch (id) {
      case 0:
      // this.props.navigate('NotificationSettings');
        break;
      case 1:
      // this.props.navigate('ServingArea');
        break;
      case 2:
      // this.props.navigate('WeekSchedule');
        break;
      // case 3:
      // this.props.navigate('PaymentSettings');
      //   break;
      case 4:
      // this.props.navigate('DriverCalender',{selectedDateObj:moment(new Date()).format('YYYY-MM-DD')}); 
        break;
      case 5:
        // this.props.navigate('Shedule');
        break; 
      case 6:
      // this.props.navigate("Certificates")      
        break;

      case 7:
      // this.props.navigate("Equipment")
        break;
      case 8:
        this.props.navigate('ChangePassword');
        break;
      case 9:
      // this.props.toggleModal()
       break;
      case 10:
      // this.props.navigate('Miscellaneous');
        break;
      // case 11:
      //   break;
      default:
    }
  }

  renderSettingList(value) {
    return (
      <TouchableOpacity
        style={[styles.cardView]}
        onPress={() => {

          this.onItemSelected(value.id);
        }}
      >
        <View style={styles.categoryRow}>
          <Text style={[styles.settingMsg]}>{value.setting}</Text>
          <Icon name="rocket" size={30} color='black' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.SettingsData}
          renderItem={({item})=>this.renderSettingList(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  categoryRow: {
    flexDirection: "row",
    padding: Constants.BaseStyle.PADDING * 0.5
  },

  cardView: {
    padding: Constants.BaseStyle.PADDING * 0.5,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: Constants.Colors.LightGray,
    alignItems: "center"
  },

  settingMsg: {
    flex: 1,
    color: Constants.Colors.Black,
    fontWeight: "800",
    fontSize: 18
  },
  rightIcon: {
    height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4
  }
});
const mapStateToProps = state => ({
  modalstate: state.ModalHandleReducer,
  phone: state.user.phone,
});

const mapDispatchToProps = dispatch => {
  return {
  toggleModal: () => {
    dispatch({type: UserActions.PHONEVERIFICATION_VISIBILITY, visibility:true});
}
}
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSettingsList);