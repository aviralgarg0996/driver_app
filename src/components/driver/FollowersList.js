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

export default class FollowersList extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      followersData:[
        {name : 'Katrina Kate',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'Johne Doe',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'David Warner',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'Rosy Daisy',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'Will Smith',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'Jhonty Road',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'Katrina Kate',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'Johne Doe',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'David Warner',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'Rosy Daisy',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'Will Smith',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'Jhonty Road',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'Katrina Kate',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'Johne Doe',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'David Warner',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'Rosy Daisy',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'Will Smith',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'Jhonty Road',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'Katrina Kate',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'Johne Doe',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'David Warner',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'Rosy Daisy',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'Will Smith',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
        {name : 'Jhonty Road',followTime : 'MAR 2018, 25, 12:22',status:'FOLLOWER SINCE'},
      ]
    }
  }

  renderfollowersList(value){
    return(
      <TouchableOpacity style={[styles.cardView]}>
    			<View style={styles.categoryRow}>
            <View style={{flex:1}}>
					      <Image source={Constants.Images.driver.driver} style={styles.photo} resizeMode={'contain'}/>
            </View>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={[styles.name]}>{value.name}</Text>
            </View>
            <View style={{flex:2,justifyContent:'center'}}>
                <Text style={[styles.status]}>{value.status}</Text>
                <Text style={[styles.status]}>{value.followTime}</Text>
            </View>
    			</View>
  		</TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
          <View style = {[styles.searchContainer]}>
            <Image source={Constants.Images.driver.search} style={styles.searchIcon} resizeMode={'contain'}/>
            <TextInput
              style={[styles.txtInputSearch]}
              underlineColorAndroid="transparent"
              onChangeText={(text) => {this.FilterList(text)}}
              placeholder='Search'
            />
    			</View>
          <FlatList
            data={this.state.followersData}
            renderItem={({item})=>this.renderfollowersList(item)}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  categoryRow:{
    flexDirection:'row',
    paddingTop:5,
    paddingBottom : 5,
    alignItems:'center',
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH/100)*5,
  },
  scheduleList: {
    paddingTop:5,
    paddingBottom : 5,
    borderBottomWidth:2,
    borderBottomColor:Constants.Colors.BlurGrey,
    backgroundColor:Constants.Colors.White,
    flexDirection:'row'
  },
  searchContainer:{
      borderBottomColor:Constants.Colors.BlurGrey,
      borderBottomWidth:1,
			backgroundColor:'#fff',
			justifyContent:'center',
			height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 6,
			flexDirection:'row',
			justifyContent:'center',
			alignItems:'center',
			paddingLeft: 10,
			paddingRight:10,
		},
    searchIcon:{
      height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
      width: Constants.BaseStyle.DEVICE_WIDTH/100 * 7,
      tintColor:Constants.Colors.BlurGrey,
    },
  txtInputSearch: {//in use
  		backgroundColor:'#fff',
  		paddingRight:10,
  		paddingTop:3,
  		paddingBottom:3,
  		flex:1,
  	},
  cardView: {
  		backgroundColor:'#fff',
  		borderBottomColor:Constants.Colors.BlurGrey,
  		borderBottomWidth:1,

      //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,

      //marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*5
  		//padding:11,
  		//paddingLeft:15,
  		//paddingRight: 15,
  	//	marginLeft:15,
  		//marginRight:15,

  	},

    photo: {
      width:50,
      height:50,
      padding: 8,
      borderWidth:0.5
		},
    name: {
      //flex:0.45,
      //color:Constants.Colors.Blue,
      fontWeight:'800',
      fontSize:12,
      textAlign:'center',
      justifyContent:'center',
    },
    status: {
      flex:0.35,
      color:Constants.Colors.BlurGrey,
      fontWeight:'800',
      fontSize:12,
      textAlign:'right',
      justifyContent:'flex-end',
    },
});
