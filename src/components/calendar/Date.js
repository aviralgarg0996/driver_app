// @flow

import React, { component } from 'react';

import {
  Text,
  ReactNative,
  TouchableOpacity,
  View,
} from 'react-native';
//import type Momentimport { element } from '../../../../Library/Caches/typescript/3.2/node_modules/@types/prop-types';
import Moment from 'moment';
import Constants from "../../constants"
const UIManager = require('NativeModules').UIManager;



var monthData=[
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"]






export default class Date extends React.Component {

  props: {
    // Date to render
    date: Moment,
    // Index for `onPress` and `onRender` callbacks
    index: number,
    // Whether it's the currently selected date or no
    isActive: boolean,
    // Called when user taps a date
    onPress: (index: number) => void,
    // Called after date is rendered to pass  its width up to the parent component
    onRender: (index: number, width: number) => void
  };

 


  constructor(props)
  {
    super(props)
    this.myElement=undefined
  }

  componentDidMount(){
  this.props.onRef(this.myElement);
  }

  // Style helper functions that merge active date styles with the default ones
  // when rendering a date that was selected by user or was set active by default

  getContainerStyle = () => ({
    ...styles.container,
    ...(this.props.isActive ? styles.containerActive : {})
  });

  getInnerContainerStyle = () => ({
    ...styles.innerContainer,
    ...(this.props.isActive ? styles.containerActive : {})
  });

  getDayStyle = () => ({
    ...styles.text,
    ...styles.day,
    ...(this.props.isActive ? styles.textActive : {})
  });

  getDateStyle = () => ({
    ...styles.text,
    ...styles.date,
    ...(this.props.isActive ? styles.textActive : {})
  });

  // Call `onRender` and pass component's with when rendered
  onLayout = (event: { nativeEvent: { layout: { x: number, y: number, width: number, height: number } } }) => {
    const {
      index, 
      onRender,
      x,
      y
    } = this.props;
    const { nativeEvent: { layout: { width } } } = event;
    onRender(index, width);
  };

  // Call `onPress` passed from the parent component when date is pressed
  onPress = () => {
    const { index, onPress } = this.props;
    onPress(index);

  };

  render() {
    const { date } = this.props;
    return (
      <TouchableOpacity
        style={this.getContainerStyle()}
    //    onLayout={this.onLayout}
        onPress={this.onPress}
        ref={component => this.myElement=component}
      >
      <View style={this.getInnerContainerStyle()}>
      <Text style={this.getDateStyle()}>{date.format('MMM').toUpperCase()}</Text>
      <Text style={this.getDateStyle()}>{date.format('DD')}</Text>
        <Text style={this.getDateStyle()}>{date.format('YYYY').toUpperCase()}</Text>
      
      </View>
      </TouchableOpacity>
    );
  }

}

const styles = {
  container: {
//    paddingHorizontal: 15,
 //   paddingVertical: 10,
borderRadius: 45,
//borderBottomColor:'red',
//borderWidth:1,
width:90,
height:90,
justifyContent: 'center',
alignItems: 'center',
//margin:10,
    
  },

innerContainer:{
  borderRadius: 35,
   borderWidth:1,
  width:70,
  height:70,
  backgroundColor:"#c0c0bf",
  justifyContent: 'center',
alignContent: 'center',
borderColor:'white'


},

  containerActive: {
    borderColor: '#FFFFFF',
    backgroundColor:Constants.Colors.newBlue,
    borderWidth:1,
    width:90,
  height:90,
  borderRadius: 45,
  },
  day: {
    fontSize: 12,
  },
  date: {
    fontSize: 14,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    
   
  },
  textActive: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
};