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
  TouchableOpacity
} from 'react-native';

import Background from '../../components/common/Background';
import Constants from "../../constants";

export default class PickUpLocation extends Component<{}> {
  constructor(props){
    super(props);

  }

  pickupList(item)
  {
    var aa=item.address;
    var index1=aa.indexOf("Choose");
    return(
      <View>
          {index1==0 ?
            <View style={[styles.flexRow/*,{marginTop:5}*/]}>
              <Image  source={Constants.Images.customer.pickup} style={[styles.pickupIcons,{flex : 0.2},this.props.tintColor]} resizeMode={'contain'}/>
                <Text style={[styles.textStyle]}>
                  {item.address}
                </Text>
              <TouchableOpacity onPress={() => this.props.onPress()}>
                <Image source={Constants.Images.customer.plus} style={[styles.rowRight,{flex : 0.5,justifyContent:'flex-end',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}]} resizeMode={'contain'}/>
              </TouchableOpacity>
            </View>
            :
            <View style={[styles.flexRow/*,{marginTop:5}*/]}>
              <Image  source={Constants.Images.customer.checkmark} style={[styles.checkIcon,{flex : 0.2}]} resizeMode={'contain'}/>
                <Text style={[styles.textStyle]}>
                  {item.address}
                </Text>
                <TouchableOpacity>
                  <Image source={Constants.Images.customer.none} style={[styles.rowRight,{flex : 0.5,backgroundColor:'transparent',tintColor:Constants.Colors.WhiteSmoke,justifyContent:'flex-end',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}]} resizeMode={'contain'}/>
                </TouchableOpacity>
            </View>
          }

        </View>
    )
  }

  render() {
    let {
      onPress,list,tintColor,placeHolderText
    } = this.props;
    return (
      <FlatList
        data={list}
        renderItem={({item})=>this.pickupList(item)}
      />
    );
  }
}

const styles = StyleSheet.create({
  flexRow:{
		flexDirection: 'row',
	},
  verticalLine:{
    width:1,
    backgroundColor: '#D7D7D7',
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  pickupIcons:{
    marginTop: 5,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 3,
    //tintColor:Constants.Colors.Blue,
  },
  checkIcon:{
    marginTop: 5,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 3,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 3,
    //tintColor:Constants.Colors.Blue,
  },
  rowRight : {
    flex: 1,
    flexDirection: 'row',
    padding: 0,
    marginLeft:10,
    marginHorizontal:0,
    marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,
    //marginTop: 5,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
    borderBottomWidth: 1,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 4,
    //backgroundColor:'transparent',
  },
  textStyle:{
    fontSize:Constants.CustomerFonts.normal.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
    flex : 1,
    justifyContent:'center',
    marginTop:5,
  },
});
