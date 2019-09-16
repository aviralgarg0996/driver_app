import React, { Component } from "react";
import Constants from '../../constants';
import CalendarStrip from "react-native-calendar-strip";
import moment from 'moment';
import { startLoading, stopLoading, showToast, hideToast } from '../../redux/modules/app';
export default class Calendar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      renderCalender: false,
      renderList: false,     
    }
  }

 
  render(){
    return (
      <CalendarStrip
        selectedDate={this.props.currentDate}
        minDate={moment(new Date())}
        maxDate={moment(new Date()).add(55, 'days')}
        daySelectionAnimation={{type: 'background', borderWidth:1,   highlightColor: Constants.Colors.LightBlue}}
        style={{height:100, paddingTop: 10, paddingBottom: 10}}
        calendarHeaderStyle={{color: Constants.Colors.Blue}}
        calendarColor={'white'}
        dateNumberStyle={{color: Constants.Colors.Blue}}
        dateNameStyle={{color: Constants.Colors.Blue}}
        iconLeft={Constants.Images.driver.backward}
        iconRight={Constants.Images.driver.next}
        iconContainer={{flex: 0.1}}
        onDateSelected={(date)=>this.props.getDateSelected(date)}
      />
    );
  }
};

