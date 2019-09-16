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
  FlatList
} from 'react-native';

import Background from '../../components/common/Background';
import Constants from "../../constants";
import * as UserActions from '../../redux/modules/user';

export default class OrderHistory extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      ordersData:[/*{id:'ID 92828', price:'$800', status:'Transfered', statusColor:Constants.Colors.LightBlue,date:'12/04/2018 02:50'},
                  {id:'ID 92829', price:'$500', status:'Cancel', statusColor:Constants.Colors.Orange,date:'10/04/2018 06:48'},
                  {id:'ID 92830', price:'$700', status:'Shipping', statusColor:Constants.Colors.Black,date:'11/04/2018 12:45'},
                  {id:'ID 92831', price:'$900', status:'Delivered', statusColor:Constants.Colors.LightGray,date:'09/04/2018 16:20'},
                  {id:'ID 92832', price:'$400', status:'Delivered', statusColor:Constants.Colors.LightGray,date:'09/04/2018 18:35'}*/
                ]
    }
  }

  ordersList(item){
    return(
      <View style={styles.ordersList}>
        <View style={{flex:2}}>
          <Text style={styles.id}>{item.id}</Text>
          <Text style={{color:Constants.Colors.Blue}}>{item.date}</Text>
        </View>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={[styles.status,{color:item.statusColor}]}>{item.status}</Text>
      </View>
    )
  }

  render() {
    return (
      <FlatList
        data={this.state.ordersData}
        renderItem={({item})=>this.ordersList(item)}
      />
    );
  }
}

const styles = StyleSheet.create({
  ordersList: {
    padding:Constants.BaseStyle.PADDING * 1.2,
    // borderBottomWidth:2,
    // borderBottomColor:Constants.Colors.BlurGrey,
    backgroundColor:Constants.Colors.White,
    flexDirection:'row',
    margin:3,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  id: {
    color:Constants.Colors.Blue,
    fontWeight:'700',
    fontSize:18
  },
  price: {
    flex:1,
    color:Constants.Colors.Blue,
    fontWeight:'800',
    fontSize:20,
    textAlign:'center'
  },
  status: {
    flex:2,
    fontWeight:'600',
    fontSize:20,
    textAlign:'right'
  }
});
