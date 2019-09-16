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

export default class ReviewsList extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      ReviewsData:[
        {name : 'Katrina Kate',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'Johne Doe',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'David Warner',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'Rosy Daisy',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'Will Smith',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'Jhonty Road',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'Katrina Kate',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'Johne Doe',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'David Warner',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'Rosy Daisy',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'Will Smith',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'Jhonty Road',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'Katrina Kate',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'Johne Doe',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'David Warner',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'Rosy Daisy',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'Will Smith',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'Jhonty Road',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'Katrina Kate',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'Johne Doe',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'David Warner',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'Rosy Daisy',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'Will Smith',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
        {name : 'Jhonty Road',reviewTime : 'MAR 2018, 25, 12:22',reviews:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'},
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
            <View style={{flex:3}}>
              <View style={{alignItems:'flex-start',justifyContent:'center',position:'relative'}}>
                <View style={{flexDirection:'row'}}>
                  <Text style={[styles.name]}>{value.name}</Text>
                  <StarRating
                    rating={"3"}
                    iconWidth={Constants.BaseStyle.DEVICE_WIDTH / 100 * 2}
                    iconHeight={Constants.BaseStyle.DEVICE_WIDTH / 100 * 2}
                  />
                  <View style={{flex:1}}>
                    <Text style={{color:Constants.Colors.Orange, fontSize:12, textAlign:'right',textDecorationLine:'underline'}}>Report Inappropriate</Text>
                  </View>
                </View>
                  <Text style={[styles.reviews]}>{value.reviews}</Text>
              </View>
              <View style={[{flex:1}]}>
                <Text style={[styles.reviewTime,{justifyContent:'flex-end'}]}>
                  {value.reviewTime}
                </Text>
              </View>

            </View>


    			</View>
  		</TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
          <FlatList
            data={this.state.ReviewsData}
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

  cardView: {
  		backgroundColor:'#fff',
  		borderBottomColor:Constants.Colors.BlurGrey,
  		borderBottomWidth:1,
  	},
    photo: {
      width:50,
      height:50,
      padding: 8,
      borderWidth:0.5
		},
    starIcon: {
      width:10,
      height:10,
      marginTop : 4,
      tintColor:'yellow',
      justifyContent:'space-between',//'center',
      alignItems:'center',
		},
    infoIcon: {
      width:10,
      height:10,
      marginTop : 4,
      tintColor:'orange',
      //flexDirection:'row',
  		alignItems:'flex-end',
  		justifyContent:'flex-end',
      //marginLeft:10,
      flex:3,
      //marginRight : (Constants.BaseStyle.DEVICE_WIDTH/100)*5
		},
    name: {
      color:Constants.Colors.Black,
      fontWeight:'900',
      fontSize:14,
      textAlign:'center',
      justifyContent:'center',
      marginRight : 6,
    },
    reviews:{
      fontSize:12,
      color:Constants.Colors.Black,
    },
    reviewTime: {
      color:Constants.Colors.BlurGrey,
      fontWeight:'800',
      fontSize:12,
      textAlign:'right',
      justifyContent:'flex-end',
    },
    RightTextView: {
  		flexDirection:'row',
  		alignItems:'flex-end',
  		justifyContent:'flex-end',
  	},
});
