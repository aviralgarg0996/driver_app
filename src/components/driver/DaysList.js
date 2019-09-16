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
import Icon from 'react-native-vector-icons/FontAwesome';
export default class DaysList extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      SettingsData: [
        {
          id: 0,
          setting: "Sunday"
        },
        {
          id: 1,
          setting: "Monday"
        },
        {
          id: 2,
          setting: "Tuesday"
        },
        {
          id: 3,
          setting: "Wednesday"
        },
        {
          id: 4,
          setting: "Thursday "
        },
        {
          id: 5,
          setting: "Friday "
        },
        {
          id: 6,
          setting: "Saturday"
        }
      ]
    };
    //this.renderSettingList = this.renderSettingList.bind(this);
  }

  onItemSelected(id){
    switch (id) {
      case 0:
      this.props.navigate('DefaultSchedule',{daySelected:0});
        break;
      case 1:
      this.props.navigate('DefaultSchedule',{daySelected:'1'});

        break;
      case 2:
      this.props.navigate('DefaultSchedule',{daySelected:'2'});
        break;
      case 3:
      this.props.navigate('DefaultSchedule',{daySelected:'3'});
        break;
      case 4:
      this.props.navigate('DefaultSchedule',{daySelected:'4'});
        break;
      case 5:
      this.props.navigate('DefaultSchedule',{daySelected:'5'});
        break;
      case 6:
      this.props.navigate('DefaultSchedule',{daySelected:'6'});
        break;
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
          <Icon name="angle-right" size={30} color='black' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} />
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
