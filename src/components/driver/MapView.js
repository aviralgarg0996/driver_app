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
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import { connect } from 'react-redux';
import moment from 'moment';

import Background from '../../components/common/Background';
import Constants from "../../constants";
import SubmitButton from "../../components/common/FormSubmitButton";
import MapView from 'react-native-maps';
import { Marker, PROVIDER_GOOGLE,Circle } from "react-native-maps";
import DeliveryDetails from './DeliveryDetails';
import OrderDisplay from './OrderDisplay';
//let GOOGLE_MAPS_APIKEY = 'AIzaSyAD_dYT9A74FgpqqwvHbJMHSjAkCYjw_MY';
//GOOGLE_MAPS_APIKEY='AIzaSyD5dEfEk92wAbVum3DII4f0zGdt6UHqol0';
let GOOGLE_MAPS_APIKEY = Constants.distanceAPIMatrix;

import MapViewDirections from 'react-native-maps-directions';

let origin ={};
let wayPoints =[]; 
  


let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 28.669;
const LONGITUDE = 77.380311;
const LATITUDE_DELTA = 1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
var timerVarM;
const constMonthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" 
];
  
class MapModule extends Component<{}> {
  constructor(props){
    super(props);


let marker=[];

pickupAddress=[];
dropAddress=[];

//alert(JSON.stringify(this.props.orderstate.OrderData.placedOrderData.orders))

this.props.orderstate.OrderData.placedOrderData.orders.map(data=>{


data.drop_location.map(mark=>{
  dropAddress.push(mark.address);
  wayPoints.push({latitude:  parseFloat(mark.drop_point.split(",")[0]),
  longitude:parseFloat(mark.drop_point.split(",")[1])});

  marker.push(

    {coordinates:{latitude:  parseFloat(mark.drop_point.split(",")[0]),
      longitude:parseFloat(mark.drop_point.split(",")[1])},
      title:mark.Name,
      key:1,
      pinColor:require("../../assets/images/d.png")
    }


  
  )

})



destination=wayPoints[wayPoints.length-1];



data.pickup.map(mark=>{
  pickupAddress.push(mark.address);

  wayPoints.push({latitude: parseFloat(mark.pickup_point.split(",")[0]),
  longitude:parseFloat(mark.pickup_point.split(",")[1])});

  marker.push(

    {coordinates:{latitude: parseFloat(mark.pickup_point.split(",")[0]),
      longitude:parseFloat(mark.pickup_point.split(",")[1])},
      title:mark.Name,
      key:1,
      pinColor:require("../../assets/images/p.png")
    }
  
  )

})

}

)

    this.state={
      mapRegion:{

       
          latitude: LATITUDE,
           longitude: LONGITUDE,
           latitudeDelta: LATITUDE_DELTA,
           longitudeDelta: LONGITUDE_DELTA,
         

      },

      timeleft:this.props.timeleft,
      marker

    }
    this.mapRegion = this.state.mapRegion;
  }




  secondsToHms=(d)=> {
 
    d = Number(d);
  
    if(d<0)
    return '0';
   
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
  
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  
  
    return hDisplay + mDisplay + sDisplay; 
  }
  
  
  
  constructDate=(min,max)=>{ 
    var toStr='';
    var fromStr='';
  
  
  
    minTimeStr=min.getHours()>=12 ?min.getHours()-12+':'+min.getMinutes()+' PM ':min.getHours()-12+':'+min.getMinutes()+' AM '; 
    maxTimeStr=max.getHours()>=12 ?max.getHours()-12+':'+max.getMinutes()+' PM ':max.getHours()-12+':'+max.getMinutes()+' AM '; 
  if(min.getDate()==max.getDate())
   { 
     toStr= min.getDate()+' '+ constMonthArray[min.getMonth()]+' '+ min.getFullYear()%100 + ' ' + minTimeStr; 
     fromStr='To ' + maxTimeStr; 
   }
   else
   {
     toStr= min.getDate()+' '+ constMonthArray[min.getMonth()]+' '+ min.getFullYear()%100 + ' ' + minTimeStr; 
     fromStr= max.getDate()+' '+ constMonthArray[max.getMonth()]+' '+ max.getFullYear() + ' ' + maxTimeStr; 
   }
   return toStr +' to ' +fromStr; 
  }


  startTime=()=>{

    that=this;
    
    timerVarM=setInterval(function(){

      // console.log("Sdsdsd")

      if(that.state.timeleft-1000>0)
    {  var timeleft=that.state.timeleft-1000;
that.setState({timeleft:timeleft})
    }
    else
    clearInterval(timerVarM);
    
    },1000); 

  }

  componentDidMount(){
    this.startTime();
  }

  componentWillUnmount(){
    clearInterval(timerVarM)
  }


  shouldComponentUpdate(nextProps, nextState) {

       return false; 
   }


  onMarkerPress(e,id)
  {
     
  }

  render() { 

    
origin={latitude:this.props.locationData.currentLocation.coords.latitude,longitude:this.props.locationData.currentLocation.coords.longitude}
    let {
      moneytitle,money,id,date,timeframe,list,navigate,bottomText1,bottomText2,ButtonScreenNo,schedule
    } = this.props;


  

    return (
      <View style={{flex:1, backgroundColor:Constants.Colors.White}}>
        <ScrollView>
          <MapView
            //provider={PROVIDER_GOOGLE}
            style={{height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 40}} 
            //onRegionChangeComplete={onRegionChangeComplete}
            region={this.state.mapRegion}
            annotations={this.state.annotations}
            zoomEnabled={true}
            showsUserLocation={true}
            pitchEnabled={true}
            rotateEnabled={false} 
        //   customMapStyle={Constants.MapStyle}
           customMapStyle={Constants.MapStyle.default}
              


            
          >

          {this.state.marker.map(marker => (
            <Marker 
              coordinate={marker.coordinates}
              title={marker.title}
              key={marker.key}
              image={marker.pinColor}
              style={{height:20,width:20}} 
            //  pinColor={}
              onPress={(e) => {e.stopPropagation(); this.onMarkerPress(e,marker.key)}}
              />
            ))}

            <MapViewDirections
              origin={origin}
              waypoints={wayPoints}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={6}
              strokeColor="blue"
            />



</MapView>

          { this.props.orderstate.ScreenMaxFlag===true ?
          <View style={{bottom: Constants.BaseStyle.DEVICE_HEIGHT/100 * 15,}}>
            <View style={styles.orderDetails}>
              <OrderDisplay
                moneytitle={moneytitle}
                money={money}
                timeleft={this.state.timeleft}
                id={id}
                date={date}
                cb={()=>{this.setState({ScreenMaxFlag:false})}}
                timeframe={timeframe}
                list={list}
                bottomText1={bottomText1}
                bottomText2={bottomText2}
                schedule={schedule}
              />
            </View>
              <DeliveryDetails navigate={navigate} ButtonScreenNo={ButtonScreenNo}
              goBack={this.props.goBack}
              />
          </View>
          :
          <View style={{bottom: Constants.BaseStyle.DEVICE_HEIGHT/100 * 2,}}>
            <TouchableOpacity onPress={() => {this.props.dispatch({type : 'SET_SCREENSIZE',flag:true})}}>
              <Image
                style={styles.smallIcon}
                source={Constants.Images.driver.down}
              />
            </TouchableOpacity>
            <View style={[styles.orderDetails,{ backgroundColor: Constants.Colors.White,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*3}]}>
                <View style={[styles.row,{marginBottom:10}]}>
                  <View style={{flex:0.60}}>
                    <Text style={[styles.itemInBlue,{fontSize: 16,fontWeight:'900'}]}>{moneytitle}
                      <Text style={[styles.itemInOrange,{fontSize: 16,fontWeight:'900'}]}>{money}</Text>
                    </Text>
                  </View>
                  <View style={[styles.itemRight,{flex:0.40}]}>
                    <Image
                      style={styles.Icon}
                      source={Constants.Images.driver.clock}
                    />
                    <Text style={styles.itemInBlue}
                    key={"timeShowM"}>{moment.utc(this.state.timeleft).format('mm:ss')}{'min left'}</Text>
                  </View>
                </View>

                <View style={[styles.row,{marginBottom:10}]}>
                  <View style={{flex:1}}>
                    <Text style={[styles.itemInBlue,{fontSize:14,textAlign:'left',fontWeight:'900'}]}>{id}</Text>
                    <Text style={[styles.itemInBlue,{fontSize:12,textAlign:'left',fontWeight:'400'}]}>{'Time Frame :'}{timeframe}</Text>
                  </View>
                  {/* <View style={{flex:1,justifyContent:'flex-end'}}>
                    { <SubmitButton
                      onPress={() => console.log('Hello')}
                      text={'FAILED'}
                      style={[styles.ButtonStyle,{backgroundColor:Constants.Colors.LightBlue,borderColor: Constants.Colors.LightBlue,marginBottom:10,marginTop:10}]}
                      textStyle={[{fontSize:12,color:Constants.Colors.White}]}
                    /> }
                  </View> */}
                </View>
            </View>
            <DeliveryDetails navigate={navigate} ButtonScreenNo={ButtonScreenNo}/>
          </View>
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  orderDetails:{
    width:Constants.BaseStyle.DEVICE_WIDTH/100 *90,
    alignSelf:'center',
  },
  orderDetailsMin:{
    width:Constants.BaseStyle.DEVICE_WIDTH/100 *60,
    alignSelf:'center',
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
    margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    transform: [{rotate: '180deg'}],
  },
  Icon: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1
  },
  itemInBlue: {
    fontSize: 13,
    color: Constants.Colors.Blue
  },
  itemInOrange: {
    fontSize: 13,
    color: Constants.Colors.Orange
  },
  itemRight: {
    flexDirection: "row",
    //height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3,
    alignItems: "center",
    justifyContent:'flex-end'
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

export default connect(state => ({orderstate: state.OrdersHandleReducer,
  locationData:state.location}))(MapModule);
