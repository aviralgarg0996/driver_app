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
  TextInput,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import CalendarStrip from "../common/CalendarStrip"
import { connect } from 'react-redux';

//import Background from '../../components/common/Background';
import Constants from "../../constants";
import Calendar from '../calendar/Calendar';
import { scaleHeight, normalizeFont } from '../../constants/responsive';

class TimeWindow extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      ProgressWidth: 5,
      ProgressData: 0,
      OutputText: 'Time Window',
    }

  }


  onSelectDate = (data: Moment) => {
    this.props.onSelectDate(data)
  }
  render() {
    let {
      OutputText, ProgressWidth, startTime, startAMPM, endTime, endAMPM, DeliveryDate, timeFrame
    } = this.props;
    return (
      <ImageBackground style={[styles.completePercent]} source={require('../../assets/images/customer/blue.png')}>
        <View style={[styles.flexRow, { marginBottom: scaleHeight(5) }]}>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'flex-start' }}>
            <Text style={[styles.TimeText, { textAlign: 'center', color: Constants.Colors.WhiteUpd, marginBottom: scaleHeight(15), marginTop: scaleHeight(20) }]}>Pick a date</Text>
          </TouchableOpacity>
        </View>
        <Calendar onSelectDate={this.onSelectDate} />
        <View>
          <Text style={[styles.progressText, { textAlign: 'center', color: Constants.Colors.WhiteUpd, marginVertical: 10, fontFamily: Constants.CustomerFonts.semibold.fontFamily, }]}>Start Time</Text>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity onPress={() => this.props.onChangeTime()}
            style={{
              justifyContent: 'center', alignSelf: "center",
              backgroundColor: Constants.Colors.WhiteUpd, height: scaleHeight(40), width: scaleHeight(140), borderRadius: scaleHeight(5)
            }}>
            <Text style={[styles.TimeText, { textAlign: 'center', fontSize: normalizeFont(24), fontFamily: Constants.CustomerFonts.normal.fontFamily, }]}>
              {startTime}
              <Text style={[styles.TimeAMPMText]}>
                {' '}{startAMPM}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ justifyContent: 'center', marginTop: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 10, marginBottom: scaleHeight(20) }}>
          <Text style={[styles.progressText, { textAlign: 'center', fontFamily: Constants.CustomerFonts.semibold.fontFamily, }]}>{timeFrame}{' '}{OutputText}</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({

  flexRow: {
    flexDirection: 'row',
  },
  completePercent: {
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
  },
  progressLineWrap: {
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 90 - (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,//Constants.BaseStyle.DEVICE_WIDTH-30,
    backgroundColor: '#C3C1C0',
    height: 2,
    borderRadius: 5,
  },
  progressLine: {
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 90,//Constants.BaseStyle.DEVICE_WIDTH-30,
    backgroundColor: '#53C8E5',
    height: 2,
    //height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 1,
    borderRadius: 5
  },
  progressCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16477C',
    borderWidth: 1,
    borderColor: '#16477C',
  },
  progressText: {
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    color: Constants.Colors.White,
  },
  TimeText: {
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.Black,
  },
  TimeAMPMText: {
    fontSize: normalizeFont(24),
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    color: Constants.Colors.Black,
  },
});
export default connect(state => ({ state: state.CustomerReducer }))(TimeWindow);
