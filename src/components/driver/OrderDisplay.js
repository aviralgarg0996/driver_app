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
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  ScrollView,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';

import Background from '../../components/common/Background';
import Constants from "../../constants";
import FormTextInput from "../../components/common/FormTextInput";
import SubmitButton from "../../components/common/FormSubmitButton";
import moment from 'moment';
var timerVarOrderDispaly;
class OrderDisplay extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      code:'',
      timeleft:this.props.timeleft,
    }
  }

  startTime=()=>{

    that=this;

    timerVarOrderDispaly=setInterval(function(){

      if(that.state.timeleft-1000>0)
    {  var timeleft=that.state.timeleft-1000; 

that.setState({timeleft:timeleft})



    }
    else
    clearInterval(timerVarOrderDispaly);
    
    },1000); 

  }

  componentDidMount(){
   this.startTime();
  }

  componentWillUnmount(){

    clearInterval(timerVarOrderDispaly)
  }

  

  render() {
    let {
      moneytitle,money,id,date,timeframe,list,bottomText1,bottomText2,schedule
    } = this.props;

    return (
        <View style={{ backgroundColor: Constants.Colors.White }}>
              <View style={{marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH/100)*4,marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100}}>
                <TouchableOpacity onPress={() => {this.props.cb()}}>
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
                      <Text style={styles.itemInBlue}
                      key={"timeShow"} >{moment.utc(this.props.timeleft).format('mm:ss')}{' mins left'}</Text>
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
                    </View>
                    <View style={[{flex:0.15}]}>
                      <Image
                        style={{width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 8,height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 8,margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1}}
                        source={Constants.Images.driver.Group}
                      />
                    </View> */}

                  </View>
                  <View style={[{borderTopWidth:1,borderTopColor:Constants.Colors.BlurGrey, marginTop:10}]}>
                    {list}
                  </View>

                  <View style={{backgroundColor:Constants.Colors.SettingLightGray,borderTopWidth:1,borderTopColor:Constants.Colors.SettingLightGray, marginTop:10}}>
                    <View style={{flex:1,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 15}}>
                      <View style={{flex:1,alignSelf:'center'}}>
                        <Text style={[styles.itemInBlue,{fontWeight:'900',textAlign:'center'}]}>{'Your schedule for today'}</Text>
                      </View>
                      <View style={{flex:1}}>
                        {schedule}
                      </View>
                    </View>
                    {/* <View style={{flex:1}}>
                      <SubmitButton
                        onPress={() => console.log('Hello')}
                        text={'NOTES'}
                        style={[styles.ButtonStyle,{marginBottom:10,marginTop:10,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 20}]}
                        textStyle={[{fontSize:12,color:Constants.Colors.White}]}
                      />
                    </View> */}
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
			marginTop:10,
      marginBottom:5,
		},
  row : {
    flexDirection:'row',
  },
  col : {
    flex:1,
  },

  itemRight: {
    flexDirection: "row",
    //height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3,
    alignItems: "center",
    justifyContent:'flex-end'
  },
  smallIcon: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1,
    //transform: [{rotate: '180deg'}],
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
    padding:0,
    paddingTop:2,
    paddingBottom:2,
    paddingLeft:15,
    paddingRight:15,
    backgroundColor: Constants.Colors.Blue,
    borderColor: Constants.Colors.Blue,
    marginTop: 5,//Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginHorizontal:0,//(Constants.BaseStyle.DEVICE_WIDTH/100) * 5,
    borderRadius:10,
  },


});

export default connect(state => ({modalstate: state.ModalHandleReducer}))(OrderDisplay);
