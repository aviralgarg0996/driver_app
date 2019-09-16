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
  KeyboardAvoidingView,
  Button,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import {Icon} from 'native-base'
import moment from 'moment';
import Background from '../../components/common/Background';
import Constants from "../../constants";
import FormTextInput from "../../components/common/FormTextInput";
import SubmitButton from "../../components/common/FormSubmitButton";
var buttonText=['FAILED','REVIEWS'];

const constMonthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" 
];

class OrderDisplayWithCustomer extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      code:'',
    }
  }

  render() {
    let {
      moneytitle,money,timeleft,id,date,timeframe,list,customerDetail,ButtonScreenNo
    } = this.props;
    var _buttontext=buttonText[0];
    if(parseInt(ButtonScreenNo)==4)
      _buttontext=buttonText[1];
    return (
        <View style={{ backgroundColor: Constants.Colors.White }}>
              <View style={{marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH/100)*4,marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100}}>
                <TouchableOpacity onPress={() => {
                //  if(this.props.locationData.nextPickUpLocation!=null &&
                //   this.props.locationData.nextPickUpLocation[0])
                //   {alert(" All orders are completed.")
                //      return;
                //   }
                  this.props.dispatch({type : 'SET_SCREENSIZE',flag:false})}}>
                  <Image
                    style={[styles.smallIcon]}
                    source={Constants.Images.driver.down}
                  />
                </TouchableOpacity>
                <View style={styles.cardView}>
                  <View style={[styles.row,{marginBottom:10}]}>
                    <View style={{flex:0.60}}>
                      <Text style={[styles.itemInBlue,{fontSize: 16,fontWeight:'900'}]}>{moneytitle}
                        <Text style={styles.itemInOrange}>{money}</Text>
                      </Text>
                    </View>
                    <View style={[styles.itemRight,{flex:0.40}]}>
                      <Image
                        style={styles.clockIcon}
                        source={Constants.Images.driver.clock}
                      />
                      <Text style={styles.itemInBlue}>{moment.utc(this.state.timeleft).format('mm:ss')}{' min left'}</Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={{flex:0.30}}>
                      <Text style={[styles.itemInBlue,{fontSize:12,fontWeight:'900'}]}>{id}</Text>
                    </View>
                    <View style={{flex:0.80}}>
                      <Text style={[styles.itemInBlue,{fontSize:10,fontWeight:'900'}]}>{'Delivery Date : '}Today</Text>
                      <Text style={[styles.itemInBlue,{fontSize:10,fontWeight:'900'}]}>{'Time Frame :'}{timeframe}</Text>
                    </View>
                    {/* <View style={[{flex:0.15}]}>
                      <Image
                        style={{width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 8,height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 8,margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1}}
                        source={Constants.Images.driver.request}
                      />
                    </View> */}
                    {/* <View style={[{flex:0.15}]}>
                      <Image
                        style={{width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 8,height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 8,margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1}}
                        source={Constants.Images.driver.Group}
                      />
                    </View> */}

                  </View>
                  <View style={[{justifyContent:'flex-end',borderTopWidth:1,borderTopColor:Constants.Colors.BlurGrey, marginTop:10}]}>
                    {list}
                  </View>
                  <View style={[{borderTopWidth:1,borderTopColor:Constants.Colors.SettingLightGray, marginTop:10,backgroundColor:Constants.Colors.SettingLightGray}]}>
                    <View style={[{marginTop:10,marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH/100)*3}]}>
                      <Text style={[styles.itemInBlue,{textAlign:'left',fontWeight:'900',marginLeft:10}]}>{'CUSTOMER DETAIL'}</Text>
                    </View>
                    <View style={styles.categoryRow}>
                      <View style={{flex:1}}>
          					      <Image source={customerDetail.img} style={styles.photo} resizeMode={'contain'}/>
                      </View>
                      <View style={{flex:1.5,alignItems:'stretch',justifyContent:'flex-start'}}>
                          <Text style={[styles.itemInBlue,styles.name,{fontWeight:'900',fontSize:14}]}>{customerDetail.name}</Text>

                      </View>
                      {(parseInt(ButtonScreenNo)<4) ?
                        <View style={{flex:2,justifyContent:'center'}}>
                           <View style={{flexDirection:"row",alignItems:"center"}}>
                           <Icon name="call"style={{fontSize: 13, color: Constants.Colors.DarkBlue,marginRight:5}}/>
                           <Text style={[styles.itemInBlue,styles.status]}>{customerDetail.phone}</Text>
                           </View> 
                           <View style={{flexDirection:"row",alignItems:"center"}}>
                           <Icon name="home"style={{fontSize: 13, color: Constants.Colors.DarkBlue,marginRight:5}}/>
                           <Text style={[styles.itemInBlue,styles.status]}>{customerDetail.address}</Text>
                           </View>
                        </View>
                        :
                        <View style={{flex:2,justifyContent:'center'}}>
                          <Text style={[styles.itemInBlue,{fontSize:16,fontWeight:'900'}]}>{'Order Delivered at'}</Text>
                          <Text style={[styles.itemInBlue,{fontSize:12,fontWeight:'900'}]}>{'Delivery Date : '}Today</Text>
                          <Text style={[styles.itemInBlue,{fontSize:12,fontWeight:'900'}]}>{'Time Frame :'}{timeframe}</Text>
                        </View>
                      }
                    </View>

                    {/* <View style={[styles.categoryRow,{marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH/100)*5}]}> */}
                        {/* <SubmitButton
                          onPress={() => console.log('Hello')}
                          text={'CHAT'}
                          style={[styles.ButtonStyle,{width:(Constants.BaseStyle.DEVICE_WIDTH/100)*30,marginBottom:10,marginTop:10}]}
                          textStyle={[{fontSize:12,color:Constants.Colors.White}]}
                        />
                        <SubmitButton
                          onPress={() => console.log('Hello')}
                          text={'NOTES'}
                          style={[styles.ButtonStyle,{width:(Constants.BaseStyle.DEVICE_WIDTH/100)*30,marginBottom:10,marginTop:10,marginLeft:10,marginRight:10}]}
                          textStyle={[{fontSize:12,color:Constants.Colors.White}]}
                        />
                        <SubmitButton
                          onPress={() => console.log('Hello')}
                          text={'Info'}
                          style={[styles.ButtonStyle,{width:(Constants.BaseStyle.DEVICE_WIDTH/100)*30,marginBottom:10,marginTop:10,marginLeft:10,marginRight:10}]}
                          textStyle={[{fontSize:12,color:Constants.Colors.White}]}
                        /> */}
                      {/* {(parseInt(ButtonScreenNo)<4) ?
                        <View style={{flex:1}}> */}
                          {/* <SubmitButton
                            onPress={() => console.log('Hello')}
                            text={'FAILED'}
                            style={[styles.ButtonStyle,{marginBottom:10,marginTop:10}]}
                            textStyle={[{fontSize:12,color:Constants.Colors.White}]}
                          /> */}
                        {/* </View> */}
                        
                        {/* <View style={{flex:1}}>
                          <SubmitButton
                            onPress={() => console.log('Hello')}
                            text={'REVIEWS'}
                            style={[styles.ButtonStyle,{backgroundColor:Constants.Colors.LightBlue,borderColor: Constants.Colors.LightBlue,marginBottom:10,marginTop:10}]}
                            textStyle={[{fontSize:12,color:Constants.Colors.White}]}
                          />
                        </View> */}
                      
                    {/* </View> */}
                  </View>
                </View>
              </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardView: {
			backgroundColor:'#fff',
			//borderColor:Constants.Colors.BlurGrey,
			//borderWidth:0.5,
			//paddingLeft:5,
			//paddingRight: 5,
			//marginLeft:5,
			//marginRight:5,
			marginTop:5,
      marginBottom:5,
		},
  row : {
    flexDirection:'row',
  },
  col : {
    flex:1,
  },
  smallIcon: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1,
    //transform: [{rotate: '180deg'}],
  },
  categoryRow:{
    flexDirection:'row',
    paddingTop:5,
    paddingBottom : 5,
    alignItems:'stretch',
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH/100)*3,
  },
  photo: {
    width:50,
    height:50,
    //padding: 8,
    borderWidth:0.5
  },
  name: {
    //fontWeight:'800',
    fontSize:12,
    textAlign:'left',
    justifyContent:'flex-start',
  },
  itemRight: {
    flexDirection: "row",
    //height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3,
    alignItems: "center",
    justifyContent:'flex-end'
  },
  clockIcon: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1
  },

  itemInBlue: {
    fontSize: 12,
    color: Constants.Colors.Blue
  },
  itemInOrange: {
    fontSize: 16,
    fontWeight:'900',
    color: Constants.Colors.Orange
  },
  ButtonStyle: {
    borderWidth: 1,
    borderRadius:10,
  },


});

export default connect(state => ({modalstate: state.ModalHandleReducer,
 locationData:state.location}))(OrderDisplayWithCustomer);
