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
  Image,
  FlatList,
  TouchableOpacity,
  TextInput
} from 'react-native';

import Background from '../../components/common/Background';
import Constants from "../../constants";
import StarRating from "../../components/driver/StarRating";

export default class ServingAreaList extends Component<{}> {
  constructor(props){
    super(props);
    console.log('SAL-26-props',props)
    this.state={
      AreaData:[
        {area : 'Ottawa, ONTRAIO'},
          {area : 'Ottawa, ONTRAIO'},
            {area : 'Ottawa, ONTRAIO'},
              {area : 'Ottawa, ONTRAIO'},
                {area : 'Ottawa, ONTRAIO'},
                  {area : 'Ottawa, ONTRAIO'}

      ]
    }
  }

  renderAreaList(value){
    return(
      <TouchableOpacity >

      <View style={styles.inputCard}>
      <Image
        source={Constants.Images.driver.map}
        style={styles.mapIcons} resizeMode={'contain'}/>
        <Text style={styles.areaText}  >
        {value.cityName}
        </Text>
      </View>

  		</TouchableOpacity>
    )
  }

  renderSA(){
    if(this.props.myServingAreas.length>0){
      return(
        <FlatList
        data={this.props.myServingAreas}
        renderItem={({item})=>this.renderAreaList(item)}
      />
      )
    }else{
      return(
        <View>
          <Text>No Serving Area</Text>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
         {this.renderSA()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:Constants.BaseStyle.PADDING * 0.9,
  },
  mapIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6
  },
  inputCard: {
    alignItems:'center',
    flexDirection:'row',
    padding:Constants.BaseStyle.PADDING * 0.4,
    backgroundColor:'white',
  shadowColor:Constants.Colors.LightGray,
     shadowOffset: {
       width: 1,
       height: 1
     },
     shadowRadius: 3,
     shadowOpacity: 1.0,
     borderRadius:2,
     borderWidth:1,
     borderColor:Constants.Colors.WhiteBlur,
     marginVertical: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1
  },
  areaText: {
    fontSize: 17,
    fontWeight:'900',
    color: Constants.Colors.Blue,
    paddingVertical: Constants.BaseStyle.PADDING * 0.2
  },

});
