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
  Dimensions,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

import Background from '../../components/common/Background';
import Constants from "../../constants";
import SubmitButton from "../../components/common/FormSubmitButton";
import * as LocationActions from '../../redux/modules/location';
import MapView from 'react-native-maps';
import { Marker,Polyline,PROVIDER_GOOGLE } from "react-native-maps";
import moment from 'moment';

import DeliveryDetails from './DeliveryDetails';
import OrderDisplayWithCustomer from './OrderDisplayWithCustomer';

import MapViewDirections from 'react-native-maps-directions';
const origin = {latitude: 22.3318456, longitude: 77.0296002};
const destination = {latitude: 22.771707, longitude:77.4053769};
let GOOGLE_MAPS_APIKEY = 'AIzaSyD_QtRXrG2zXaf-Ji9UzmIGciw2CEJWj7E';



GOOGLE_MAPS_APIKEY='AIzaSyDTZy4xE7KtfwyDCV5-WMxxAEHpalwGATs';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 28.669;
const LONGITUDE = 77.380311;
const LATITUDE_DELTA = 0.25;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

import _ from "underscore";
import { SystemMessage } from 'react-native-switch';
const constMonthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" 
];

class MapViewWithCustomer extends Component<{}> {



  secondsToHms=(d)=> {
 
    d = Number(d);
  
    if(d<0)
    return 0;
   
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
  
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  
  
    return hDisplay + mDisplay + sDisplay; 
  }
  


test=(data)=>
{


wayPoint=[];
markers=[];

 if(this.props.locationData.nextPickUpLocation && this.props.locationData.nextPickUpLocation[0])
 {
   _.each(this.props.locationData.nextPickUpLocation,function(element){
  if(element.type)
  {
    wayPoint.push({
    latitude: element.start_location.lat,
    longitude: element.start_location.lng, 
  });
  wayPoint.push({
    latitude: element.end_location.lat,
    longitude: element.end_location.lng,
  });

  markers.push({coord:{ 
    latitude: element.start_location.lat,
    longitude: element.start_location.lng},
    title:element.end_address,
    description:'gggg'
    
  });

}

   })
   
   this.setState({polyLineCoordinates:wayPoint,markers:markers
  ,mapRegion:{latitude:wayPoint[0].latitude,longitude:wayPoint[0].longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  
  }

  

});

//alert(JSON.stringify(this.props.locationData.nextPickUpLocation))
//LocationActions.nextPickUpdata(this.state.mapRegion));

  }

}

  constructor(props){
    super(props);
    this.state={
      mapRegion:{

       
        latitude: LATITUDE,
         longitude: LONGITUDE,
         latitudeDelta: LATITUDE_DELTA,
         longitudeDelta: LONGITUDE_DELTA,
       

    },
    timeleft:this.props.timeleft,
      polyLineCoordinates:[
      ],
      markers:[],
    }
 //   this.mapRegion = this.state.mapRegion;
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
  componentDidMount()
  {
    this.startTime();
wayPoint=[];
markers=[];

console.log(this.props.orderstate.startedOrderData);

 if(this.props.orderstate.startedOrderData)
 {
   _.each(this.props.orderstate.startedOrderData,function(element){
  if(element.type)
  {
    wayPoint.push({
    latitude: element.start_location.lat,
    longitude: element.start_location.lng,
  });
  wayPoint.push({
    latitude: element.end_location.lat,
    longitude: element.end_location.lng,
  });

  markers.push({coord:{ 
    latitude: element.start_location.lat,
    longitude: element.start_location.lng},
    title:element.end_address, 
    description:'hhhh'
    
  });

}

   })
   
   this.setState({polyLineCoordinates:wayPoint,markers:markers
  ,mapRegion:{latitude:wayPoint[0].latitude,longitude:wayPoint[0].longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  }

});
//LocationActions.nextPickUpdata(this.state.mapRegion));

  }
}

  render() { 
    let {
      moneytitle,money,timeleft,id,date,timeframe,list,navigate,bottomText1,bottomText2,ButtonScreenNo,customerDetail
    } = this.props;



    return (
      <View style={{flex:1, backgroundColor:Constants.Colors.White}}>
        <ScrollView>
          <MapView
            style={{height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 40}}
            region={this.state.mapRegion}
            timeleft={timeleft}
            zoomEnabled={true}
            showsUserLocation={true}
            pitchEnabled={false}
            rotateEnabled={false}
            customMapStyle={Constants.MapStyle.default}
            
          >

     

  {this.state.markers.map(marker => (
    <Marker
      coordinate={marker.coord}
      title={marker.title}
      description={marker.description}
    />
  ))}

          </MapView>



          { this.props.orderstate.ScreenMaxFlag===true ?
          <View style={{bottom: Constants.BaseStyle.DEVICE_HEIGHT/100 * 15,}}>
            <View style={styles.orderDetails}>
              <OrderDisplayWithCustomer
                moneytitle={moneytitle}
                money={money}
                timeleft={timeleft}
                id={id}
                date={date}
                timeframe={timeframe}
                list={list}
                bottomText1={bottomText1}
                bottomText2={bottomText2}
                customerDetail={customerDetail}
                ButtonScreenNo={ButtonScreenNo}
              /> 
            </View>
            <DeliveryDetails navigate={navigate} ButtonScreenNo={ButtonScreenNo} test={this.test}/>
          </View>
          :
          <View style={{bottom: Constants.BaseStyle.DEVICE_HEIGHT/100 * 2,}}>
            <TouchableOpacity onPress={() => {
  
  // if(this.props.locationData.nextPickUpLocation!=null &&
  //   this.props.locationData.nextPickUpLocation[0])
  //      {alert(" All orders are completed.")
  //        return;
  //      }
              this.props.dispatch({type : 'SET_SCREENSIZE',flag:true}
              )}}>
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
                    <Text style={styles.itemInBlue}>{moment.utc(this.state.timeleft).format('mm:ss')}{' min left'}</Text>
                  </View>
                </View>

                <View style={[styles.row,{marginBottom:10}]}>
                  <View style={{flex:1}}>
                    <Text style={[styles.itemInBlue,{fontSize:14,textAlign:'left',fontWeight:'900'}]}>{id}</Text>
                    <Text style={[styles.itemInBlue,{fontSize:12,textAlign:'left',fontWeight:'400'}]}>{'Time Frame :'}{timeframe}</Text>
                  </View>
                  <View style={{flex:1,justifyContent:'flex-end'}}>
                    {/* <SubmitButton
                      onPress={() => console.log('Hello')}
                      text={'FAILED'}
                      style={[styles.ButtonStyle,{backgroundColor:Constants.Colors.LightBlue,borderColor: Constants.Colors.LightBlue,marginBottom:10,marginTop:10}]}
                      textStyle={[{fontSize:12,color:Constants.Colors.White}]}
                    /> */}
                  </View>
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

/*
const mapStateToProps = state => ({
  orderstate: state.OrdersHandleReducer,
  userData: (state.user && state.user.driverData) || (state.user && state.user.userData),
});

  

export default connect(mapStateToProps, null)(MapViewWithCustomer);*/


const mapStateToProps = state => ({
  modalstate: state.ModalHandleReducer,orderstate: state.OrdersHandleReducer,
  userData: (state.user && state.user.driverData) || (state.user && state.user.userData),
  locationData:state.location
});


export default connect(mapStateToProps)(MapViewWithCustomer);
