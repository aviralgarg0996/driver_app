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
  TouchableOpacity,Alert,
  ScrollView,Dimensions, 
} from 'react-native';
import Constants from "../../../constants";
import NavigationBar  from "react-native-navbar";
import Calendar from '../../../components/common/CalendarStrip';
import FormTextInput from "../../../components/common/FormTextInput";
import SubmitButton from "../../../components/common/FormSubmitButton";

import ToogleSwitch from '../../../components/common/ToggleSwitch';
import LabelSelect from '../../../components/common/LabelSelect';
import * as OrderActions from '../../../redux/modules/schedule';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import Maps from '../../../components/common/Map';
 
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
let LATITUDE = 28.669;
let LONGITUDE = 77.380311;
var LATITUDE_DELTA = 0.011;
var LONGITUDE_DELTA = 0.018;
const marker=null; 

const colors1=require('../../../assets/images/customer/Vehicle_icons/Top/b0.png')
const colors2=require('../../../assets/images/customer/Vehicle_icons/Top/sm.png')
import MapView, { Marker ,Circle,AnimatedRegion, Animated } from 'react-native-maps'; 
import * as UserActions from '../../../redux/modules/user';
import { Chip } from 'react-native-paper';
import RestClient from '../../../utilities/RestClient';
import { startLoading, stopLoading, showToast, hideToast } from '../../../redux/modules/app';
import { StackActions, NavigationActions } from 'react-navigation';

// const resetAction = NavigationActions.reset({
//   index: 1,
//   actions: [NavigationActions.navigate({ routeName: "Home" }),
//       NavigationActions.navigate({ routeName: "ManageSchedule",params:{selectedDateObj: data.selectedDateObj} })],
// });

let changeRegion = 0;


colors=[];
colors.push(colors1);
colors.push(colors2);


let mapStyle1 ={
    transform:[{
rotateY:'180deg'
    }]
}

let mapStyle =[
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#523735"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#c9b2a6"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#dcd2be"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ae9e90"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#93817c"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#a5b076"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#447530"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#fdfcf8"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f8c967"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#e9bc62"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e98d58"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#db8555"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#806b63"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8f7d77"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#b9d3c2"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#92998d"
        }
      ]
    }
  ]



class ManageScheduleWorkingHours extends Component<{}> {
 
  constructor(props){
    super(props);
    //console.log('281-ManageScheduleWorkingHours ----props------',props)
    this.saveValidScheduleHours = this.saveValidScheduleHours.bind(this);
     let scity=[]
     let selectedcts=[]
     let cityIds=[]
     var scity2=[]
     
    if(!!this.props.navigation.state.params.serving_city){
      //console.log('281-this.props.navigation.state.params.serving_city-',this.props.navigation.state.params.serving_city)
      selectedcts=this.props.navigation.state.params.serving_city;
        cityIds=this.props.navigation.state.params.serving_city.map((obj)=>{
        return obj._id;
      });
      //console.log('289--cityIds',cityIds)
        scity2=props.citiesList.map((obj2)=>{
        if(cityIds.includes(obj2._id)){
          obj2.isSelected=true
          return obj2;
        }else{
          obj2.isSelected=false
          return obj2;
        }
        
      });
      scity=scity2;
    }
    if(scity.length==0){
      //console.log('306-- if(scity.length==0',scity)
      scity=props.citiesList
      //console.log('306-- if(scity.length==0',scity)
    }
    try{
      let aresa=[{isSelected: false,
        name: "Burnaby1",
        _id: "1"},
        {isSelected: false,
          name: "Burnaby2 ",
          _id: "2"},
          {isSelected: false,
            name: "Burnaby4 ",
            _id: "4"},
            {isSelected: false,
              name: "Burnaby3 ",
              _id: "3"}
            ]
      this.state = {data: [], 
        availabilityStatus:props.driverAvailabilityStatus,
        setDefault :false,
        hasExtraHelper:false,
        myServingAreasList:[],
        fromTime: this.props.navigation.state.params.startTime,
        toTime:this.props.navigation.state.params.endTime,
        daySlots:this.props.navigation.state.params.daySlots,
        scheduleDate:moment(this.props.navigation.state.params.dateSelected).toISOString(),
        markerLatLng:[],
        cities:props.citiesList,
        citiesList:scity,//props.citiesList,// [{_id:1,cityName:'Delhi'},{_id:2,cityName:'Noida'}],
        selectedCity:'',
        serving_city:selectedcts,
        serving_city_ids:cityIds,


          title:'ssss',
          user:null,
          accessToken:null,
          SliderValue:0,
          mounted:false,
         // markers:this.genrateRandomMarker(),
          region: new AnimatedRegion({
             latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }),

            initialRegion:{
              latitude: 28.669,
              longitude: 77.380311,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },

            newRegion:[],
            enableIndicator:false,
              markers:[{
                  coordinate:{
                      latitude: LATITUDE,
                      longitude: LONGITUDE,
                  },
                  title:'Current Location',
                  description:'Demo ----'

              }],

              markersPosition:[]

           
            
      };

      this.mapRegion = this.state.mapRegion;
    }
    catch(ex)
    {
      alert(ex)
    }


    // this.state={
    //   availabilityStatus:props.driverAvailabilityStatus,
    //   setDefault :false,
    //   hasExtraHelper:false,
    //   fromTime: "",
    //   toTime:'',
    //   scheduleDate:moment(this.props.navigation.state.params.dateSelected).toISOString(),
    //   markerLatLng:[],
    //   cities:props.citiesList,
    //   citiesList:props.citiesList,
    //   selectedCity:'',
    //   serving_city:[],
    //   // cityArray:[{
    //   //   name: 'Panchkula',
    //   //   isSelected: true,
    //   //   value: 1,
    //   //   coordinates: {
    //   //     latitude: 30.695573651593037,
    //   //     longitude:76.86047809632487
    //   //   },
    //   //   radius: 10000,
    //   // }, {
    //   //   name: 'Chandigarh',
    //   //   isSelected: false,
    //   //   value: 2,
    //   //   coordinates: {
    //   //     latitude: 30.732469143794265,
    //   //     longitude:76.77825229676432
    //   //   },
    //   //   radius: 10000,
    //   // }, {
    //   //   name: 'Kharar',
    //   //   isSelected: false,
    //   //   value: 3,
    //   //   coordinates: {
    //   //     latitude: 30.753092749061906,
    //   //     longitude:76.64520390312498
    //   //   },
    //   //   radius:10000
    //   // }, {
    //   //   name: 'Zirkpur',
    //   //   isSelected: false,
    //   //   value: 4,
    //   //   coordinates: {
    //   //     latitude: 30.649181186565354,
    //   //     longitude:76.82647831718748
    //   //   },
    //   //   radius:10000
    //   // }, {
    //   //   name: 'Derabassi',
    //   //   isSelected: false,
    //   //   value: 5,
    //   //   coordinates: {
    //   //     latitude:30.604275712551637,
    //   //     longitude:76.84913761894529
    //   //   },
    //   //   radius:10000
    //   // }]

    // }

    ////console.log('***** data fetched ******* ',this.props.listOfSchedule)
  }


  componentWillReceiveProps(nextProps){
    ////console.log('nextProps ******* ',nextProps)
    this.setState({
      availabilityStatus:nextProps.driverAvailabilityStatus
    })
  }


  componentWillMount(){
   // this.getMapLatLng()
  //  setTimeout(function(that){ 
  //   //console.log('302-setTimeout-that ',that)
  //   //console.log('273--that ',that.state)
  //   //console.log('273--that ',that.props)
  //   startLoading();
  // }, 100,this );
  //call at home screen
   // this.props.OrderActions.getCitiesList(this.props.tokenforuser)
    //this.props.OrderActions.getSchedule3(this.props.scheduleDatesList)

    
    //console.log("componentWillMount" )
    RestClient.post("users/getDriver",{},this.props.tokenforuser).then((result) => {
     // startLoading();
      //console.log("result",result.data)
      if(result.status == 1){
        //  stopLoading();
          var data=result.data
          
          var test=data.cities && data.cities.map(function(item){

            let city3=item.cityName.split(',');
            

              return {_id:item._id,name:city3[0],selected:false}
          })
          //console.log("75-SA--test ", test)
  
          var obj = {};
          var servingAreas=test
  
          servingAreas = servingAreas.concat([])
          //console.log('83---servingAreas--b4--concat', servingAreas)
          for (var i = 0, len = servingAreas.length; i < len; i++)
            obj[servingAreas[i]['_id']] = servingAreas[i];
  
          servingAreas = new Array();
          for (var key in obj)
            servingAreas.push(obj[key]);
          //console.log('89---servingAreas--concat', servingAreas)
           
  
  
          this.setState({myServingAreasList:servingAreas},()=>{
            //console.log('95--updated-state-servingAreas-- ', this.state);
          //  stopLoading();
          }) 
       
      }
     }).catch(error => {
         //console.log("error=> "+error)
        // dispatch(stopLoading());
     });



  }
  componentDidUpdate(){
    // setTimeout(function(that){
    //   //console.log('526-componentDidUpdate- MSWH-timeout-- ',that)					 
    //    that.stop(); 
      
    //    }, 1000,{stop:stopLoading } );

  }
  componentDidMount(){
    // startLoading();
    // setTimeout(function(that){
    //   //console.log('526-componentDidUpdate- MSWH-timeout-- ',that)					 
    //    that.stop(); 
      
    //    }, 1000,{stop:stopLoading } );

    //console.log('MSWH-119',this.props.driverData)
    //console.log('MSWH-459--props',this.props)
    //this.props.OrderActions.getSchedule3(this.props.scheduleDatesList)
   
    // if( !!this.props.driverData && !!this.props.driverData.data  && this.props.driverData.data.cities.length !=0){
    //  // //console.log("add scheduled cities list",this.props.driverData.data.cities)
    //   for(let index in this.props.driverData.data.cities){
    //     let selectData= this.props.driverData.data.cities[index];
  
    //     for(let inerindex in this.state.citiesList){
    //       let activeData= this.state.citiesList[inerindex];
    //       if(selectData.cityName == activeData.cityName){
    //         this.state.citiesList[inerindex].isSelected = true;
         
    //       }
    //     }
    //   }
  
    // }

    // this.state.markerLatLng.length =0;
    // for(let index in this.state.citiesList){
    //   let activeData= this.state.citiesList[index];
    
    //   if(activeData.isSelected){
    //     this.state.markerLatLng.push(activeData)
    //   }
    // }
 


  }

  getMapLatLng(){
   

   // let cityArr=JSON.parse(JSON.stringify(this.state.cityArray))
    //let citiesSelected=[];
    this.state.markerLatLng.length =0;
    for(let index in this.state.citiesList){
      let activeData=this.state.citiesList[index];
    //  //console.log("component will",activeData)

      if(activeData.isSelected){
        this.state.markerLatLng.push(activeData)
      }
    }
    ////console.log("marker component   array",this.state.markerLatLng)
  }

  getDateSelected(date){
    ////console.log(moment(date).toISOString())
    this.setState({scheduleDate:moment(date).toISOString()},()=>{
      //this.props.ScheduleActions.SET_SCHEDULE_ORDER_DATE(this.state.scheduleDate);
    })
  }

  demoSave(){
    //console.log('485--alert')
  }

  saveValidScheduleHours(){
        
    let initialdate = moment(this.state.scheduleDate).format("YYYY-MM-DD");
      let start_time =this.state.fromTime;
      let fromTimeSelected= moment(initialdate + " " + start_time).toISOString();
      let fromTimeSelected2=  initialdate + " " + start_time ;

      let end_time =this.state.toTime;
      let ToTimeSelected= moment(initialdate + " " + end_time).toISOString();
     //console.log('500---fromTimeSelected ',fromTimeSelected);
     // //console.log(ToTimeSelected);
      
     // //console.log('____________212_____this.state.hours')

     // //console.log(moment(fromTimeSelected).hours())
       let fromHours=moment(fromTimeSelected).hours()

       let toHours=moment(ToTimeSelected).hours()

      

      if((moment(ToTimeSelected).isSameOrAfter(fromTimeSelected))){
            // let cityArr=JSON.parse(JSON.stringify(this.state.cityArray))
          // let citiesSelected=[];
          // for(let index in this.state.citiesList){
          //   let activeData=this.state.citiesList[index];
          //   if(activeData.isSelected){
          //     citiesSelected.push(activeData.name)
          //   }
          // }
        //  //console.log("cities data",this.state.cities)

          if(this.state.markerLatLng!=null){
            let sendData={
              radius:5,
              location:this.state.markerLatLng,
              sDate:fromTimeSelected,
              eDate:ToTimeSelected,
              defaultScheduleAll:this.state.setDefault,
              fresh:this.props.navigation.state.params.refresh,
              helper:this.state.hasExtraHelper,
              navigate:this.props.navigation.navigate,
              selectedDateObj:initialdate
            }

            let sareas=this.state.serving_city.map((item, index) =>
            {
              return item._id;
            })
          //  //console.log('MSWH-243-sareas',sareas)

            let day=new Date(this.props.navigation.state.params.dateSelected).getDay()
           //console.log('562--MSWH- state',this.state)
            
            let slotTimes=[{"date":this.props.navigation.state.params.dateSelected,
            "time":[
               {
                 startTime:this.state.fromTime,
                 endTime:this.state.toTime,
                 serving_city:this.state.serving_city_ids,
                } 
              ],
            "lat":"77.66","lng":"12.8685688",
            "radius":"12",
            "geometry_type":"Point",
            "location" : sareas,
            "helper":this.state.hasExtraHelper,
            "equipment":"true",
            "scheduletype":["Manual"],
            "message":"www",
            "dayOff":false,
            "serving_city" : sareas
            }]
            

            let slotTimesDefault=[{"day":day,
            "time":[ {startTime:this.state.fromTime,endTime:this.state.toTime,serving_city:sareas} ],
            "lat":"77.66","lng":"12.8685688",
            "radius":"12",
            "geometry_type":"Point",
            "location" : sareas,
            "helper":"true",
            "equipment":"true",
            "scheduletype":["Default"],
            "message":"www",
            "serving_city" : sareas,
             
            }]

           
          
            let reqObject0={
              driver_id:this.props.driverData.data._id,
              created_by:"DRIVER",
              dayOff:false,
              navigate:this.props.navigation.navigate,
              selectedDateObj:moment(this.state.scheduleDate).format("YYYY-MM-DD"),
              week:slotTimes,
              timezone:"11",
              creater_id:"1222",
              navigate:this.props.navigation.navigate,
              serving_city :sareas,
              sDate:this.props.navigation.state.params.dateSelected+'T'
            }

            let reqObjectWrapper={
              reqObject:reqObject0,
              driverId:this.props.driverData.data._id,
              navigate:this.props.navigation.navigate,
              selectedDateObj:moment(this.state.scheduleDate).format("YYYY-MM-DD"),  
              navigation:this.props.navigation
            }

            let reqObjectDefault={
              driver_id:this.props.driverData.data._id,
              created_by:"DRIVER",
              navigate:this.props.navigation.navigate,
              week:slotTimesDefault,
              timezone:"11",
              creater_id:"1222",
              serving_city :sareas,
              sDate: new Date(this.props.navigation.state.params.dateSelected).toISOString(),
            }


            let reqObject2= {
              "driver_id": "5b5ab66b86e4295c2b519558",
                "week" : [
                    {"date":"2018-09-11",
                    "time":[{"startTime":"9","endTime":"10"} ],
                    "lat":"77.66","lng":"12.8685688",
                    "radius":"12",
                    "geometry_type":"Point",
                    "location" : ["noida","meerut"],
                    "helper":"true",
                    "equipment":"true",
                    "scheduletype":["Manual"],
                    "message":"www",
                    "serving_city" : ["puna","noida"]
                    }
                    ],
                "created_by":"DRIVER",
                "timezone":"11",
                "creater_id":"1222",
                "serving_city" : ["puna","noida"],
                "sDate":"2018-09-11T"
              }
              

            //console.log('______######___add-manual--reqObject')
            //console.log(reqObjectWrapper)

            // //console.log(fromTimeSelected)
            // //console.log(initialdate)
            // //console.log('__________212_________ props--')
            // //console.log(this.props)

            let sendDataDefault={
              requestObject:reqObjectDefault,
              navigate:this.props.navigation.navigate,
              
            }

            if(this.state.setDefault){
              this.props.OrderActions.saveDefaultSchedule(sendDataDefault,this.props.tokenforuser)
             // this.props.navigation.navigate('Home');
              
            }else{
              this.props.OrderActions.addManualSchedule(reqObjectWrapper,this.props.tokenforuser)
            }
            
      //       NavigationActions.reset({
			// 	index: 1,
			// 	actions: [NavigationActions.navigate({ routeName: "Home" }),
			// 			NavigationActions.navigate({ routeName: "ManageSchedule",params:{selectedDateObj: data.selectedDateObj} })],
			// }),
           
    // setTimeout(function(data){ 
    //     //data.navigate('Home');
      

    //   //  data.navigate('ManageSchedule', {selectedDateObj: data.state.params.dateSelected});
    //     data.navigate('ManageSchedule', {selectedDateObj: data.state.params.dateSelected});
    //   }, 2000,this.props.navigation);

 

            // setTimeout(function(data){ 
            //  // data.navigate('Home');
             

            //   //data.navigate('ManageSchedule', {selectedDateObj: data.state.params.dateSelected});
            //   data.navigate('ManageSchedule', {selectedDateObj: data.state.params.dateSelected});
            // }, 2000,this.props.navigation);


            

           

           //this.props.navigation.state.params.refresh();
           //this.props.navigationProps('ManageSchedule',{selectedDateObj:dateClicked.dateString,refreshCal: this.refreshCalendorFunction})

           
          }
          else{
            alert('Please enter city')
          }
      }
      else{
        alert('Please enter valid time')
      }
  }

  saveScheduleHours(){
    if(!moment(moment(new Date()).format('YYYY-MM-DD')).isSameOrBefore(this.state.scheduleDate)   || !moment(moment(new Date()).add(55, 'days').format("YYYY-MM-DD")).isSameOrAfter(this.state.scheduleDate)){
        alert('Selected date is beyond allowed range.')
        //console.log('--returning--')
        return;
    }
    //console.log('--didnt--returning--')
    if(this.state.serving_city.length>0){
    if(this.state.fromTime!='' && this.state.toTime!=""){
      let initialdate = moment(this.state.scheduleDate).format("YYYY-MM-DD");
      var conflicts=false;
      var allSlots =this.state.daySlots!==undefined?this.state.daySlots:[];
      //console.log('489--MS--this.state.fromTime',this.state.fromTime)
      
      for (var i = 0; i < allSlots.length; i++) {
              slot2=allSlots[i]    
               
                let st1= moment(initialdate + " " + this.state.fromTime).toISOString();
                let et1= moment(initialdate + " " + this.state.toTime).toISOString();
                let st2= moment(initialdate + " " + slot2.startTime).toISOString();
                let et2= moment(initialdate + " " + slot2.endTime).toISOString();
               if((moment(st1).isBefore(st2)) && (moment(et1).isAfter(st2))  ){
                conflicts=true
               }else if( (moment(st2).isBefore(st1)) && (moment(et2).isAfter(st1))  ){
                conflicts=true
               }else if( (moment(st1).isAfter(st2)) && (moment(et1).isBefore(et2))  ){
                conflicts=true
               }else if((moment(st2).isAfter(st1)) && (moment(et2).isBefore(et1)) ){
                conflicts=true
               } 
                 
      };

      if(!conflicts){
        this.saveValidScheduleHours()
    }else{
      Alert.alert('MERGE SCHEDULES','Your schedule has a conflict with one of your existing schedules.',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
        {text: 'MERGE', onPress:this.saveValidScheduleHours},
      ],
      { cancelable: false })
    }
    }
    else{
      alert('Please enter time')
    }
  }else{
    alert('Please Select Serving Area')
  }
    //end SA check
  }

  checkForMergeSchedule(){
    
  }

  toggleCheckBoxes(checkBoxName){
    switch(checkBoxName){
      case 'Default':
      this.setState({setDefault:!this.state.setDefault})
      break;
      case 'Helper':
      this.setState({hasExtraHelper:!this.state.hasExtraHelper})
      break;
    }
  }


  renderCheckBoxView(){
    return(
        <View>
           {/* <TouchableOpacity onPress={()=> this.toggleCheckBoxes('Default')} style={styles.checkBoxView}>
                  <Image source={this.state.setDefault ? Constants.Images.driver.checked : Constants.Images.driver.unchecked} style={[styles.checkboxIcon]} resizeMode={'contain'} />
                  <Text style={[styles.checkboxText]}>{'Set to default'}</Text>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={()=> this.toggleCheckBoxes('Helper')} style={styles.checkBoxView}>
                  <Image source={this.state.hasExtraHelper ? Constants.Images.driver.checked : Constants.Images.driver.unchecked} style={styles.checkboxIcon} resizeMode={'contain'} />
                  <Text style={[styles.checkboxText]}>{'I have a helper with me for this time slot'}</Text>
            </TouchableOpacity>
        </View>
    )
  }

  renderHoursView(){
    return(
        <View style={{flexDirection:'row', marginTop:10}}>
        {/* alignItems:'flex-start',justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100)*5 */}
          <View  style={{flex :.35,alignItems:'center',justifyContent:'center'}}>
            <Text  style={{color:Constants.Colors.Blue,fontSize:14,fontWeight:'700',textAlign:'left'}}>{'WORKING HOURS'}</Text>
          </View>

          <View style={{flexDirection:'row',flex:.65,justifyContent:'flex-end',alignItems:'center'}}>
                <DatePicker
                style={{width:Constants.BaseStyle.DEVICE_WIDTH * .25}}
                placeholder={'From\r\nhhmm'}
                date={this.state.fromTime}
                mode="time"
                format="HH:mm"
                is24Hour={true}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={Constants.Images.driver.clock}
                //minuteInterval={10}
                onDateChange={(fromTime) => {this.setState({fromTime: fromTime});}}
                customStyles={{
                  dateIcon: {width: 20,height: 20,marginLeft: 5,marginRight: 5},
                  dateInput:{borderColor:Constants.Colors.Transparent,borderBottomColor:Constants.Colors.Blue},
                  placeholderText:{color:Constants.Colors.Blue,fontSize:12},
                  dateText:{color:Constants.Colors.Blue,fontSize:12},
                  // ... You can check the source to find the other keys.
                  }}
              />
              <DatePicker
                style={{width:Constants.BaseStyle.DEVICE_WIDTH * .25,marginLeft:10}}
                placeholder={'To\r\nhhmm'}
                date={this.state.toTime}
                mode="time"
                format="HH:mm"
                is24Hour={true}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={Constants.Images.driver.clock}
                //minuteInterval={10}
                onDateChange={(toTime) => {this.setState({toTime: toTime});}}
                customStyles={{
                  dateIcon: {width: 20,height: 20,marginLeft: 5,marginRight: 5},
                  dateInput:{borderColor:Constants.Colors.Transparent,borderBottomColor:Constants.Colors.Blue},
                  placeholderText:{color:Constants.Colors.Blue,fontSize:12},
                  dateText:{color:Constants.Colors.Blue,fontSize:12},
                  // ... You can check the source to find the other keys.
                  }}
              />
            </View>
        </View>
    )
  }

  selectConfirm=(list) =>{

    let {citiesList} = this.state;

   // //console.log('################.....select city...selectConfirm..selected--item...and...citiesList')
  //  //console.log(list)
  //console.log('list 773  ',list)
   // this.setState({markerLatLng:[]});
   let scitites=[]

    for (let item of list) {
      //console.log('MSWH-confrm-item-778',item)
      let index = citiesList.findIndex(ele => ele._id === item._id);
    //  //console.log('MSWH-confrm-item-397',(index))
     //// //console.log('MSWH-confrm-item-397',(~index))
      if (~index) {
        citiesList[index].isSelected = true;
        scitites.push(citiesList[index])
      }
      else continue;
    }
   // //console.log('MSWH-confrm-item-404',citiesList)
   //console.log('scitites 789',scitites) 

        var obj = {};
        var servingAreas=this.state.serving_city

        servingAreas = servingAreas.concat(scitites)
				for (var i = 0, len = servingAreas.length; i < len; i++)
					obj[servingAreas[i]['_id']] = servingAreas[i];

				servingAreas = new Array();
				for (var key in obj)
					servingAreas.push(obj[key]);
        //console.log('742---servingAreas', servingAreas)
        let serving_city_ids2=[]
        for (let i = 0, len = servingAreas.length; i < len; i++)
         serving_city_ids2.push(servingAreas[i]._id);
          
        
        //console.log('742---serving_city_ids2', serving_city_ids2)

        let myDAreas=this.state.myServingAreasList
       let  myDAreas2=myDAreas.map((obj)=>{
          if(serving_city_ids2.includes(obj._id)){
            obj.selected=true
            return obj;
          }else{
            return obj;
          }
        });
        
   this.setState({myServingAreasList:myDAreas2,citiesList: citiesList,serving_city_ids:serving_city_ids2,serving_city:servingAreas},()=>{
    //console.log('MSWH-confrm--791',this.state)
  });
  }

  deleteItem=(item)=> {
   // this.setState({markerLatLng:[]});
   //console.log("MSWH-482-",item)
    let {citiesList} = this.state;
   // //console.log("MSWH-482-citiesList",citiesList)
    //console.log("MSWH-485-this.state",this.state)
    let index = citiesList.findIndex(a => a === item);
    this.state.citiesList[index].isSelected = false;
    this.setState({citiesList: citiesList},()=>{
      //console.log("MSWH-488-this.state",this.state)
    });


   // let cityArr=JSON.parse(JSON.stringify(this.state.cityArray))
    // this.state.markerLatLng.length =0;
    // for(let index in this.state.citiesList){
    //   let activeData=this.state.citiesList[index];
    //   //console.log("marker active data",activeData)

    //   if(activeData.isSelected){
    //     this.state.markerLatLng.push(activeData)
    //   }
    // }



    // //console.log("cities  add **************",this.state.citiesList)
    // this.setState({citiesList: citiesList},()=>{
    //   this.setState({cities:this.state.citiesList});
    //   //console.log("cities new add **************",this.state.cities)
    // });

  }

  renderServingArea(){
    return(<View style={{margin:10}}>
        <View style={{flexDirection:'row'}}>
            <Text style={{color:Constants.Colors.Blue,fontSize:14,fontWeight:'700',textAlign:'left'}}>
            {'SERVING AREA'}</Text> 
            <Text style={{marginLeft:30, color:Constants.Colors.Blue,fontSize:12,fontWeight:'300',textAlign:'left'}}>
            {'Look for a city to serve'}</Text>
        </View>

        <View>
        <LabelSelect
            title="Select Cities"
            ref="select"
            style={styles.labelSelect}
            onConfirm={this.selectConfirm}
          >
            {this.state.citiesList.filter(item => item.isSelected).map((item, index) =>
              <LabelSelect.Label
                key={'label-' + index}
                data={item}
                onCancel={() => {this.deleteItem(item);}}
              >{item.name}</LabelSelect.Label>
            )}
            {this.state.citiesList.filter(item => !item.isSelected).map((item, index) =>
              <LabelSelect.ModalItem
                key={'modal-item-' + index}
                data={item}
              >{item.name}</LabelSelect.ModalItem>
            )}
          </LabelSelect>
    <View style={{flex:1,flexDirection:'row', }}>
        <ScrollView horizontal >
        <View style={{flex:1,flexDirection:'row', justifyContent:'space-around'}}>
        { this.state.myServingAreasList.map((city)=>{
          return(
          <Chip style={{flex:1,margin:5,justifyContent:'space-around',}}  
          mode ={'outlined'} selected ={city.selected} 
          onPress={( ) => {
            //console.log('977---chip--Pressed',city)
            //console.log('977---chip--Pressed--this.state',this.state)
            let areas2=[]
            for (var i = 0; i < this.state.myServingAreasList.length; i++) {
                let ar=this.state.myServingAreasList[i]
                //console.log('977---chip--ar',ar)
                if(ar._id===city._id){
                  ar.selected=!ar.selected
                  //console.log('977---chip--ar.selected',ar.selected)
                  areas2.push(ar)
                }else{                  
                  //console.log('977---chip--else ar.selected',ar.selected)
                  areas2.push(ar)
                }
            }
            //console.log('977---chip-setState',areas2)
            //citiesList
            let areas3=[]
            let selectedCity2=[]
            for (var j = 0; j < this.state.citiesList.length; j++) {
              let ar2=this.state.citiesList[j]
              //console.log('977---chip-ar2-ar',ar2)
              if(ar2._id===city._id  ){
                if( city.selected){
                  ar2.isSelected=true
                  selectedCity2.push(ar2)
                }else{
                  ar2.isSelected=false
                }
               
                //console.log('977---chip--arar2.selected',ar2.selected)
                areas3.push(ar2)
              }else{
                //console.log('977---chip--else arar2.selected',ar2.selected)
                areas3.push(ar2)
              }
          }
            //console.log('977---chip-setState areas3',areas3)

            var obj = {};
            var servingAreas=this.state.serving_city
    
            servingAreas = servingAreas.concat(selectedCity2)
            for (var i = 0, len = servingAreas.length; i < len; i++)
              obj[servingAreas[i]['_id']] = servingAreas[i];
    
            servingAreas = new Array();
            for (var key in obj)
              servingAreas.push(obj[key]);
            //console.log('1120---servingAreas', servingAreas)
            let serving_city_ids2=[]
            for (let i = 0, len = servingAreas.length; i < len; i++)
             serving_city_ids2.push(servingAreas[i]._id);
              
            
            //console.log('1120---serving_city_ids2', serving_city_ids2)
             
            this.setState({myServingAreasList:areas2,citiesList:areas3,serving_city_ids:serving_city_ids2,serving_city:servingAreas})

            
            }}>
          {city.name}
          
          </Chip>)
        })
         
        }
          </View>  
          
          </ScrollView>
          </View>
        </View>

    </View>
    )
  }

  rendermap(){
    return (<View style={{backgroundColor:'green'}}> <MapView
      //provider={PROVIDER_GOOGLE}
      style={{height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 40}}
      //onRegionChangeComplete={onRegionChangeComplete}
     // region={this.state.mapRegion}
      //annotations={this.state.annotations}
      zoomEnabled={true}
      showsUserLocation={true}
      pitchEnabled={false}
      rotateEnabled={false}
      //customMapStyle={Constants.MapStyle}
    /></View> )
  }

  renderBottomButtons(){
    const { goBack } = this.props.navigation;
    //console.log('***********************************renderBottomButtons__________________________-')
    return(
      <View style={[{flexDirection:'row',marginBottom:10}]}>
              <View style={[{flex : 0.5}]}>
                <SubmitButton
                  onPress={() => this.saveScheduleHours()}
                  text={'SAVE CHANGES'}
                  style={[styles.ButtonStyle,{backgroundColor:'#53C8E5'}]}
                  textStyle={[{fontSize:15}]}
                />
              </View>
              <View style={[{flex : 0.5}]}>
                <SubmitButton
                  onPress={() => goBack()}
                  text={'CANCEL'}
                  style={[styles.ButtonStyle]}
                  textStyle={[{fontSize:15}]}
                />
              </View>
        </View>
    )
  }

  render() {
    const titleConfig = {
      title: "MANAGE SCHEDULE HOURS",
      tintColor: "#fff",
      style:{fontSize:12,fontWeight:'400'}
    };
    //console.log("997--state",this.state)

    const { navigate, goBack } = this.props.navigation;
    //console.log("marker array default length",this.state.markerLatLng.length)
    //console.log("marker length",this.props.citiesList)
    return (
      
      <View style={styles.container}>
        <NavigationBar
          statusBar={{hidden:true}}
          style={styles.navigationBar}
          title={titleConfig}
          rightButton={
            <View style={styles.rightButtonNav}>
              <TouchableOpacity>
                <Image
                  source={Constants.Images.user.setting}
                  style={styles.navIcons} resizeMode={'contain'}/>
              </TouchableOpacity>
              <View style={{marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}} >
              <ToogleSwitch availabilityStatus={this.state.availabilityStatus}/>
              </View>
            </View>
          }
          leftButton={
            <TouchableOpacity onPress={()=>{
             
            goBack()}}>
            <Image source={Constants.Images.driver.back} style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2,tintColor:Constants.Colors.White}]} resizeMode={'contain'}/>
            </TouchableOpacity>
          }
        />

         <Calendar getDateSelected={this.getDateSelected.bind(this)} currentDate={this.state.scheduleDate}/>
        
          <ScrollView>

              {this.renderHoursView()}

              {this.renderServingArea()}
              
              {/* {this.state.markerLatLng.length!= 0? 
                
                <Maps showMarkers={true} markers={this.state.markerLatLng}/>                
                :
                null
              } */}


              {   

                // <View style={{flex:1, }}>
                // {this.rendermap()}
                // </View> 

              }  



              <View style={{flex:1, marginTop:10}}>
                  {this.renderCheckBoxView()}

                  {this.renderBottomButtons()}
              </View>

          </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar:{
    backgroundColor:Constants.Colors.LightBlue,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 10,
    alignItems:'center'
  },
  rightButtonNav:{
    flexDirection:'row',
    alignItems:'center'
  },
  navIcons:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 6,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 6
  },
  // btCloseModal:{
	// 		width: 40,
	// 		height:40,
	// 		borderRadius:40,
  //     backgroundColor:Constants.Colors.Orange,

	// },
  // btnCloseModalIcon:{
	// 	width:20,
	// 	height:20,
  //   margin:10,
  //   tintColor:'white',
	// },
  inputTextViewStyle: {
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/200*1,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/200,
  },
  inputStyle: {
    fontSize:14,
    padding:0,
  },
  ButtonStyle: {
    borderWidth: 0,
    backgroundColor: "rgba(115,115,115,0.4)",
    borderColor: "rgba(115,115,115,0.4)",
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*3,
    borderRadius:5,
    paddingLeft : 3,
    paddingRight : 3,
  },
  checkBoxView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,
  },
  checkboxIcon:{
    width:10,
    height:10,
    marginRight:5,
  },
  checkboxText:{
    color:Constants.Colors.Blue,
    fontSize:12,
    fontWeight:"900",
  },
  clockView:{
    flexDirection:'row',
    marginRight:10,
    borderBottomWidth: 1,
    borderBottomColor:Constants.Colors.Blue,
  },
  clockIcon:{
    width:10,
    height:10,
    marginTop:18,
    marginLeft:5,
  },
  labelSelect: {
    marginTop: 5,
    marginBottom: 20,
    padding: 2,
    borderBottomWidth: 1,
    borderColor: Constants.Colors.Blue
  },
});


const mapStateToProps = state => ({
  //tokenforuser:state.user.userData.token,
  tokenforuser:(state.user.driverData && state.user.driverData.token) || (state.user.userData && state.user.userData.token),
  //listOfSchedule:state.schedule.scheduleList,
  driverData:(state.user && state.user.driverData) || (state.user && state.user.userData),
  driverAvailabilityStatus: state.user.driverAvailabilityStatus,
  citiesList: state.schedule.citiesList,
  scheduleDatesList:state.schedule.scheduleDatesList
});

const mapDispatchToProps = dispatch => ({
  OrderActions: bindActionCreators(OrderActions, dispatch)
  
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageScheduleWorkingHours);
