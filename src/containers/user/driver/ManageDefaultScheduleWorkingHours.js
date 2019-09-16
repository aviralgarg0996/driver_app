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
  ScrollView,
} from 'react-native';
import Constants from "../../../constants";
import NavigationBar  from "react-native-navbar";
import Calendar from '../../../components/common/CalendarStrip';
import FormTextInput from "../../../components/common/FormTextInput";
import SubmitButton from "../../../components/common/FormSubmitButton";
import Maps from '../../../components/common/Map';
import ToogleSwitch from '../../../components/common/ToggleSwitch';
import LabelSelect from '../../../components/common/LabelSelect';
import * as OrderActions from '../../../redux/modules/schedule';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import RestClient from '../../../utilities/RestClient';
import { startLoading, stopLoading, showToast, hideToast } from '../../../redux/modules/app';
import { Chip } from 'react-native-paper';
import { StackActions, NavigationActions } from 'react-navigation';

const resetStack = (data)=> {
  return StackActions.reset({
    index: 1,
    key: null,
    actions: [NavigationActions.navigate({ routeName: "Home" }),
        NavigationActions.navigate({ routeName: "DefaultSchedule",params:{   daySelected:data.daySelected} })],
  
  });
};
// navigation.dispatch(resetStack({daySelected:this.state.daySelected})); 


class ManageDefaultScheduleWorkingHours extends Component<{}> {
  constructor(props){
    super(props);

    //console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&managdefau--props----------')
    //console.log(props)
    
    ////console.log('$$$$$$$$$$$.........calling citiy api.2... ******* ')
   // this.props.OrderActions.getCitiesList(this.props.tokenforuser)
   let scity=[]
   let selectedcts=[]
   let cityIds=[]
   var scity2=[]
   
  if(!!this.props.navigation.state.params.serving_city){
    ////console.log('281-this.props.navigation.state.params.serving_city-',this.props.navigation.state.params.serving_city)
    selectedcts=this.props.navigation.state.params.serving_city;
      cityIds=this.props.navigation.state.params.serving_city.map((obj)=>{
      return obj._id;
    });
    ////console.log('289--cityIds',cityIds)
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
    ////console.log('306-- if(scity.length==0',scity)
    scity=props.citiesList
    ////console.log('306-- if(scity.length==0',scity)
  }

    this.state={
      availabilityStatus:props.driverAvailabilityStatus,
      setDefault :true,
      hasExtraHelper:false,
      fromTime: "",
      toTime:'',
      scheduleDate:moment(this.props.navigation.state.params.dateSelected).toISOString(),
      daySelected:this.props.navigation.state.params.daySelected,
      markerLatLng:[],
       
       
      selectedCity:'',
      serving_city:[],
      driver_id:props.userData.data._id, 
      myServingAreasList:[],
      cities:props.citiesList,
      citiesList:scity,//props.citiesList,

      // cityArray:[{
      //   name: 'Panchkula',
      //   isSelected: true,
      //   value: 1,
      //   coordinates: {
      //     latitude: 30.695573651593037,
      //     longitude:76.86047809632487
      //   },
      //   radius: 10000,
      // }, {
      //   name: 'Chandigarh',
      //   isSelected: false,
      //   value: 2,
      //   coordinates: {
      //     latitude: 30.732469143794265,
      //     longitude:76.77825229676432
      //   },
      //   radius: 10000,
      // }, {
      //   name: 'Kharar',
      //   isSelected: false,
      //   value: 3,
      //   coordinates: {
      //     latitude: 30.753092749061906,
      //     longitude:76.64520390312498
      //   },
      //   radius:10000
      // }, {
      //   name: 'Zirkpur',
      //   isSelected: false,
      //   value: 4,
      //   coordinates: {
      //     latitude: 30.649181186565354,
      //     longitude:76.82647831718748
      //   },
      //   radius:10000
      // }, {
      //   name: 'Derabassi',
      //   isSelected: false,
      //   value: 5,
      //   coordinates: {
      //     latitude:30.604275712551637,
      //     longitude:76.84913761894529
      //   },
      //   radius:10000
      // }]

    }

    //////console.log('***** data fetched ******* ',this.props.listOfSchedule)
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
  componentDidMount(){

    // setTimeout(function(that){ 
    //   //console.log('302-setTimeout-that ',that)
    //   //console.log('273--that ',that.state)
    //   //console.log('273--that ',that.props)
    //   stopLoading();
    // }, 100,this );

    // if( this.props.driverData && this.props.driverData.data  && this.props.driverData.data.cities.length !=0){
    //   //console.log("add scheduled cities list",this.props.driverData.data.cities)
    //   for(let index in this.props.driverData.data.cities){
    //     let selectData= this.props.driverData.data.cities[index];
  
    //     for(let inerindex in this.state.citiesList){
    //       let activeData= this.state.citiesList[inerindex];
    //       if(selectData.cityName == activeData.name){
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
              // this.state.markerLatLng.length =0;
              // for(let index in this.state.citiesList){
              //   let activeData=this.state.citiesList[index];
              //   //console.log("component will",activeData)

              //   if(activeData.isSelected){
              //     this.state.markerLatLng.push(activeData)
              //   }
              // }
    //console.log("marker component   array",this.state.markerLatLng)
  }

  getDateSelected(date){
    ////console.log(moment(date).toISOString())
    this.setState({scheduleDate:moment(date).toISOString()},()=>{
      //this.props.ScheduleActions.SET_SCHEDULE_ORDER_DATE(this.state.scheduleDate);
    })
  }


  saveDefaultScheduleHours()
  {
    //console.log('****************saveScheduleHours_________________________')
    
    let weekslots=this.props.defaultSchedule;
    let weekDataList=[];
    //console.log('****************weekslots________________________')
    //console.log(weekslots)
    let sendData={}
    sendData['navigate']=this.props.navigation.navigate

    for(let dayKey in  Object.keys(weekslots)){
     // let key of Object.keys(meals)
        let weekData={}
        weekData['day']=dayKey        

        if(weekslots[dayKey].length>0){
          //console.log('###################,,,,,,,,,,,,,,,=weekslots[dayKey][0].serving_city')
          //console.log(weekslots[dayKey][0].serving_city)
          weekData['lat']='77'
          weekData['lng']='12'
          weekData['radius']='12'
          weekData['geometry_type']='Point'
          weekData['helper']='false'
          weekData['scheduletype']=["Default"]
          weekData['equipment']='true'
          
          weekData['message']='www'
          weekData['serving_city']=weekslots[dayKey][0].serving_city
          weekData['location']=weekslots[dayKey][0].serving_city

          let weekDaySlots=weekslots[dayKey]

          var timeSlotsOnly = weekDaySlots.map(obj => ({ startTime: obj.startTime, endTime: obj.endTime }));

          //console.log('................timeSlotsOnly..........')
          //console.log(timeSlotsOnly)

        //   for (let i = 0; i < weekDaySlots.length; i++) {
        //     let slotItemObj=weekDaySlots[i]   
        // }
 

          weekData['time']=timeSlotsOnly  
          weekDataList.push(weekData)

        }
        // else{
        //   weekData['dayOff']= 'false'
        //   weekData['message']='www'          
        //   weekDataList.push(weekData)
        // }

    }

    let	requestObject = {
      driver_id:this.props.driverData.data._id,
      week:weekDataList,
      created_by:'DRIVER',
      timezone:'11',
      
      creater_id:'1222',
      serving_city:["noida","meerut"],
      sDate:new Date().toISOString(),      
      }
      sendData['requestObject']=requestObject

      //navigate:this.props.navigation.navigate,

      //console.log('****************requestObject ________________________')
      //console.log(sendData)
      let clean={msg:'clean'}
      clean['navigate']=this.props.navigation.navigate

    this.props.ScheduleActions.saveDefaultSchedule(sendData,this.props.tokenforuser)
    //this.props.ScheduleActions.cleanDaySlotSchedule(clean,this.props.tokenforuser)
   
    

  }

  saveScheduleHours(){
  if(this.state.serving_city.length>0){
    if(this.state.fromTime!='' && this.state.toTime!=""){
      //console.log('____________212________state________')
      //console.log(this.state)

      //console.log('____________212_____this.state.fromTime__toTime___')
      //console.log(this.state.fromTime)
      //console.log(this.state.toTime)
   


      let initialdate = moment(this.state.scheduleDate).format("YYYY-MM-DD");
      
      let start_time =this.state.fromTime;
      let fromTimeSelected= moment(initialdate + " " + start_time).toISOString();

      let end_time =this.state.toTime;
      let ToTimeSelected= moment(initialdate + " " + end_time).toISOString();
      //console.log(fromTimeSelected);
      //console.log(ToTimeSelected);
      
      //console.log('____________212_____this.state.hours')

      //console.log(moment(fromTimeSelected))
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
         // //console.log("cities data",this.state.cities)

          if(this.state.markerLatLng!=null){
            let weekData={}

            let sareas=this.state.serving_city.map((item, index) =>
            {
              return item._id;
            })
            //console.log('MDSWH-312-sareas',sareas)


          weekData['day']=this.state.daySelected 

          weekData['lat']='77'
          weekData['lng']='12'
          weekData['radius']='12'
          weekData['geometry_type']='Point'
          weekData['helper']=this.state.hasExtraHelper
          weekData['scheduletype']=["Default"]
          weekData['equipment']='true'
          
          weekData['message']='www'
          weekData['serving_city']=sareas
          weekData['location']=sareas
         
          let slotTimes={
            startTime:this.state.fromTime,
            endTime:this.state.toTime,
            serving_city : sareas
          };
 
 

          weekData['time']=[slotTimes]  
          
          let	requestObject3 = {
            driver_id:this.props.driverData.data._id,
            week:[weekData],
            created_by:'DRIVER',
            timezone:'11',            
            creater_id:'1222',
            serving_city:sareas,
            sDate:new Date().toISOString(),      
            }

            /////////////////////////////
            let sendData={
              requestObject:requestObject3,
              navigate:this.props.navigation.navigate,
              daySelected:this.state.daySelected,
              navigation:this.props.navigation
            }

           
    

            //console.log('____MDSWH-345--sendData-')
            //console.log(sendData)            
            //console.log('__________212_________ props--')
            //console.log(this.props)

            this.props.OrderActions.saveDefaultSchedule(sendData,this.props.tokenforuser )
            this.props.navigation.navigate('DefaultSchedule',{daySelected:this.state.daySelected})
          // this.props.navigation.navigate('ManageSchedule', {selectedDateObj: initialdate});
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
    else{
      alert('Please enter time')
    }  //end time check
  }else{
    alert('Please Select Serving Area')
  }
    //end SA check
  }

  checkForMergeSchedule(){
    
  }

  toggleCheckBoxes(checkBoxName){
    switch(checkBoxName){
      // case 'Default':
      // this.setState({setDefault:!this.state.setDefault})
      // break;
      case 'Helper':
      this.setState({hasExtraHelper:!this.state.hasExtraHelper})
      break;
    }
  }


  renderCheckBoxView(){
    return(<View>
        <View pointerEvents="none">
           <TouchableOpacity  style={styles.checkBoxView}>
                  <Image source={ Constants.Images.driver.checked } style={[styles.checkboxIcon]} resizeMode={'contain'} />
                  <Text style={[styles.checkboxText]}>{'Set to default'}</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity onPress={()=> this.toggleCheckBoxes('Helper')} style={styles.checkBoxView}>
                  <Image source={this.state.hasExtraHelper ? Constants.Images.driver.checked : Constants.Images.driver.unchecked} style={styles.checkboxIcon} resizeMode={'contain'} />
                  <Text style={[styles.checkboxText]}>{'I have a helper with me for this time slot'}</Text>
            </TouchableOpacity>
        </View>
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

    //console.log('################.....select city...selectConfirm..selected--item...and...citiesList')
    //console.log(list)
   // this.setState({markerLatLng:[]});
   let scitites=[]

    for (let item of list) {
      //console.log('MSWH-confrm-item-397',item)
      let index = citiesList.findIndex(ele => ele.name === item.name);
      //console.log('MSWH-confrm-item-397',(index))
      //console.log('MSWH-confrm-item-397',(~index))
      if (~index) {
        citiesList[index].isSelected = true;
        scitites.push(citiesList[index])
      }
      else continue;
    }
    //console.log('MSWH-confrm-item-404',citiesList)
    //console.log(scitites) 
    this.setState({citiesList: citiesList,serving_city:scitites},()=>{
      //console.log('MSWH-confrm--402',this.state)
    });
 

  }

  deleteItem=(item)=> {
   // this.setState({markerLatLng:[]});
    let {citiesList} = this.state;
    let index = citiesList.findIndex(a => a === item);
    this.state.citiesList[index].isSelected = false;
    this.setState({citiesList: citiesList});


   // let cityArr=JSON.parse(JSON.stringify(this.state.cityArray))
    this.state.markerLatLng.length =0;
    for(let index in this.state.citiesList){
      let activeData=this.state.citiesList[index];
      //console.log("marker active data",activeData)

      if(activeData.isSelected){
        this.state.markerLatLng.push(activeData)
      }
    }



    // //console.log("cities  add **************",this.state.citiesList)
    // this.setState({citiesList: citiesList},()=>{
    //   this.setState({cities:this.state.citiesList});
    //   //console.log("cities new add **************",this.state.cities)
    // });

  }


  renderServingArea(){
    return(<View style={{margin:10}}>
        <View >
            <Text style={{color:Constants.Colors.Blue,fontSize:14,fontWeight:'700',textAlign:'left'}}>{'SERVING AREA'}</Text>
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

            

            this.setState({myServingAreasList:areas2,citiesList:areas3})

            
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
              this.props.navigation.dispatch(resetStack({daySelected:this.state.daySelected})); 
               //goBack()
            }}>
            <Image source={Constants.Images.driver.back} style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2,tintColor:Constants.Colors.White}]} resizeMode={'contain'}/>
            </TouchableOpacity>
          }
        />
{/*           
         <Calendar getDateSelected={this.getDateSelected.bind(this)} currentDate={this.state.scheduleDate}/>
         */}
          <ScrollView>

              {this.renderHoursView()}

              {this.renderServingArea()}
              
              {/* {this.state.markerLatLng.length!= 0? 
                
                <Maps showMarkers={true} markers={this.state.markerLatLng}/>                
                :
                null
              } */}

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
    padding: 5,
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
  userData: (state.user && state.user.driverData) || (state.user && state.user.userData),
});

const mapDispatchToProps = dispatch => ({
  OrderActions: bindActionCreators(OrderActions, dispatch)
  
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageDefaultScheduleWorkingHours);
