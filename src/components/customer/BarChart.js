/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  processColor
} from 'react-native';

import Background from '../../components/common/Background';
import Constants from "../../constants";

// import {BarChart} from 'react-native-charts-wrapper';

export default class BarChartReport extends Component<{}> {
  constructor(props){
    super(props);
    this.state = {
      legend: {
        enabled: true,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 15,//10,
        yEntrySpace: 10,//5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5
      },
      data: {
        dataSets: [{
          values: [{y: 62}, {y: 56}, {y: 89}, {y: 36}, {y: 75}, {y: 59}],
          label: 'Bar Chart',
          config: {
            color: processColor('teal'),
            barSpacePercent: 40,
            barShadowColor: processColor('lightgrey'),
            highlightAlpha: 90,
            highlightColor: processColor('LightBlue'),
          }
        }],
      },
      highlights: [{x: 2}, {x: 4}],
      xAxis: {
        valueFormatter: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        granularityEnabled: true,
        granularity : 1,
      }
    };
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }

  }

  render() {

    return (
<View>Bar Chart</View>
              // <BarChart
              //   style={styles.chart}
              //   data={this.state.data}
              //   xAxis={this.state.xAxis}
              //   animation={{durationX: 2000}}
              //   legend={this.state.legend}
              //   gridBackgroundColor={processColor('#ffffff')}
              //   drawBarShadow={false}
              //   drawValueAboveBar={true}
              //   drawHighlightArrow={true}
              //   onSelect={this.handleSelect.bind(this)}
              //   highlights={this.state.highlights}
              //   onChange={(event) => console.log(event.nativeEvent)}
              // />
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 40,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 90,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*4/100,
  }
});
